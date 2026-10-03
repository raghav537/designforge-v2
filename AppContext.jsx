import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, googleProvider, db } from '../firebase'

const AppContext = createContext(null)

// Falls back to localStorage when there's no signed-in user, so the app still
// works for guests. Once a user is signed in, this same key is mirrored to
// Firestore (see the sync effects below).
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore storage errors
    }
  }, [key, value])
  return [value, setValue]
}

export function buildImageUrl(prompt, style = 'digital art', width = 512, height = 512) {
  const fullPrompt = `${prompt}, ${style}, high quality, detailed`
  const seed = Date.now()
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`
}

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = usePersistentState('df_favorites', [])
  const [cart, setCart] = usePersistentState('df_cart', [])
  const [connectedIntegrations, setConnectedIntegrations] = usePersistentState('df_integrations', [])
  const [generatedImages, setGeneratedImages] = usePersistentState('df_generated_images', [])
  const [toasts, setToasts] = useState([])

  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Guards against writing back to Firestore the same snapshot we just
  // received from it (would otherwise loop / stomp remote edits).
  const hydratingRef = useRef(false)

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 3200)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id))
  }, [])

  // --- Auth ---------------------------------------------------------------

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email,
          photoURL: fbUser.photoURL || null,
        })
      } else {
        setUser(null)
      }
      setAuthLoading(false)
    })
    return unsub
  }, [])

  const login = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      addToast(`Welcome, ${result.user.displayName || 'there'}!`)
    } catch (err) {
      addToast(err?.message || 'Sign-in failed', 'error')
    }
  }, [addToast])

  const logout = useCallback(async () => {
    await signOut(auth)
    addToast('Signed out')
  }, [addToast])

  // --- Firestore sync -------------------------------------------------------
  // One document per user at users/{uid} holding their favorites, cart,
  // connectedIntegrations and generatedImages. A real-time listener keeps
  // state in sync across tabs/devices; local changes are written back
  // through the effects below.

  useEffect(() => {
    if (!user) return
    const ref = doc(db, 'users', user.uid)
    const unsub = onSnapshot(ref, (snap) => {
      hydratingRef.current = true
      const data = snap.data()
      if (data) {
        if (data.favorites) setFavorites(data.favorites)
        if (data.cart) setCart(data.cart)
        if (data.connectedIntegrations) setConnectedIntegrations(data.connectedIntegrations)
        if (data.generatedImages) setGeneratedImages(data.generatedImages)
      } else {
        // First sign-in: seed Firestore with whatever local/guest state exists.
        setDoc(ref, {
          favorites, cart, connectedIntegrations, generatedImages,
          updatedAt: serverTimestamp(),
        }, { merge: true })
      }
      // Let the write-back effects skip the snapshot that triggered them.
      setTimeout(() => { hydratingRef.current = false }, 0)
    })
    return unsub
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (!user || hydratingRef.current) return
    setDoc(doc(db, 'users', user.uid), { favorites, updatedAt: serverTimestamp() }, { merge: true })
  }, [favorites, user])

  useEffect(() => {
    if (!user || hydratingRef.current) return
    setDoc(doc(db, 'users', user.uid), { cart, updatedAt: serverTimestamp() }, { merge: true })
  }, [cart, user])

  useEffect(() => {
    if (!user || hydratingRef.current) return
    setDoc(doc(db, 'users', user.uid), { connectedIntegrations, updatedAt: serverTimestamp() }, { merge: true })
  }, [connectedIntegrations, user])

  useEffect(() => {
    if (!user || hydratingRef.current) return
    setDoc(doc(db, 'users', user.uid), { generatedImages, updatedAt: serverTimestamp() }, { merge: true })
  }, [generatedImages, user])

  // --- Feature actions --------------------------------------------------

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }, [setFavorites])

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      if (prev.some((c) => c.id === item.id && c.type === item.type)) return prev
      return [...prev, item]
    })
  }, [setCart])

  const isInCart = useCallback((id, type) => cart.some((c) => c.id === id && c.type === type), [cart])

  const toggleIntegration = useCallback((name) => {
    setConnectedIntegrations((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    )
  }, [setConnectedIntegrations])

  const addGeneratedImage = useCallback((prompt, style, url) => {
    const image = {
      id: Date.now(),
      prompt,
      style,
      url,
      favorite: false,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    setGeneratedImages((prev) => [image, ...prev])
    return image
  }, [setGeneratedImages])

  const deleteImage = useCallback((id) => {
    setGeneratedImages((prev) => prev.filter((img) => img.id !== id))
  }, [setGeneratedImages])

  const toggleImageFavorite = useCallback((id) => {
    setGeneratedImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, favorite: !img.favorite } : img))
    )
  }, [setGeneratedImages])

  const value = {
    favorites, toggleFavorite,
    cart, addToCart, isInCart,
    connectedIntegrations, toggleIntegration,
    user, login, logout, authLoading,
    toasts, addToast, dismissToast,
    generatedImages, addGeneratedImage, deleteImage, toggleImageFavorite,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
