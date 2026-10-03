import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, User, MessageCircle, Menu, X, ShoppingBag, LogOut, Wand2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Modal from './Modal'
import Avatar from './Avatar'

const EASE = [0.16, 1, 0.3, 1]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [contactOpen, setContactOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const searchInputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, logout, cart, addToast, generatedImages } = useApp()

  useEffect(() => { if (searchOpen) searchInputRef.current?.focus() }, [searchOpen])

  const navLinks = [
    { name: 'Home',        path: '/' },
    { name: 'Studio',      path: '/studio', highlight: true },
    { name: 'Gallery',     path: '/gallery', badge: generatedImages.length || null },
    { name: 'Collections', path: '/collections' },
    { name: 'Features',    path: '/features' },
    { name: 'Pricing',     path: '/pricing' },
  ]

  const submitSearch = (e) => {
    e.preventDefault()
    if (!searchValue.trim()) return
    navigate(`/studio?prompt=${encodeURIComponent(searchValue.trim())}`)
    setSearchOpen(false)
  }

  const submitContact = (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      addToast('Please fill in all fields', 'error'); return
    }
    addToast(`Thanks ${contactForm.name}, we'll reply to ${contactForm.email} soon!`)
    setContactForm({ name: '', email: '', message: '' })
    setContactOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 16 }}
              className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:shadow-purple-300/40"
            >
              <Wand2 className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text">DesignForge</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative"
                >
                  {link.highlight ? (
                    <motion.span
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-block px-4 py-2 rounded-lg gradient-bg text-white shadow-md text-sm font-medium"
                    >
                      {link.name}
                    </motion.span>
                  ) : (
                    <motion.span
                      whileHover={{ color: '#6366f1' }}
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active ? 'text-primary bg-purple-50' : 'text-gray-600 hover:bg-purple-50'
                      }`}
                    >
                      {link.name}
                      {/* Active underline */}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      )}
                    </motion.span>
                  )}
                  {link.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                    >
                      {link.badge > 9 ? '9+' : link.badge}
                    </motion.span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">

            {/* Search */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    key="search-form"
                    initial={{ opacity: 0, width: 0, x: 10 }}
                    animate={{ opacity: 1, width: 220, x: 0 }}
                    exit={{ opacity: 0, width: 0, x: 10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    onSubmit={submitSearch}
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onBlur={() => !searchValue && setSearchOpen(false)}
                      placeholder="Describe a design..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen((s) => !s)}
                className="p-2 text-gray-500 hover:text-primary hover:bg-purple-50 rounded-lg transition-colors"
              >
                <motion.span animate={{ rotate: searchOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>
                  {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </motion.span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setContactOpen(true)}
              className="p-2 text-gray-500 hover:text-primary hover:bg-purple-50 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>

            {cart.length > 0 && (
              <Link to="/pricing" className="relative p-2 text-gray-500 hover:text-primary hover:bg-purple-50 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 gradient-bg text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                >
                  {cart.length}
                </motion.span>
              </Link>
            )}

            {/* User */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => (user ? setUserMenuOpen((s) => !s) : login())}
                className="p-2 text-gray-500 hover:text-primary hover:bg-purple-50 rounded-lg transition-colors"
              >
                {user ? (
                  user.photoURL
                    ? <img src={user.photoURL} alt={user.name} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                    : <Avatar name={user.name} size="xs" online variant="user" animate />
                ) : <User className="w-5 h-5" />}
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && user && (
                  <motion.div
                    key="user-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-3">
                      <Avatar name={user.name} size="sm" variant="user" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ backgroundColor: '#f9fafb', x: 2 }}
                      onClick={() => { navigate('/gallery'); setUserMenuOpen(false) }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600"
                    >
                      My Gallery
                    </motion.button>
                    <motion.button
                      whileHover={{ backgroundColor: '#f9fafb', x: 2 }}
                      onClick={() => { logout(); setUserMenuOpen(false); addToast('Logged out') }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-gray-500 hover:text-primary rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-6 h-6" /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-6 h-6" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="md:hidden overflow-hidden py-4 border-t border-gray-100"
            >
              <motion.div
                className="flex flex-col space-y-1"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg font-medium ${
                        link.highlight ? 'gradient-bg text-white' : 'text-gray-600 hover:text-primary hover:bg-purple-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Get in touch">
        <form onSubmit={submitContact} className="space-y-4">
          {['name','email','message'].map((f) => (
            <div key={f}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{f}</label>
              {f === 'message'
                ? <textarea rows={4} value={contactForm[f]} onChange={(e) => setContactForm({ ...contactForm, [f]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                : <input type={f === 'email' ? 'email' : 'text'} value={contactForm[f]} onChange={(e) => setContactForm({ ...contactForm, [f]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
              }
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 gradient-bg text-white font-semibold rounded-xl">
            Send message
          </motion.button>
        </form>
      </Modal>

    </motion.header>
  )
}

export default Header
