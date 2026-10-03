import { Download, Heart, Trash2, Maximize2, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const EASE = [0.16, 1, 0.3, 1]

const ActionBtn = ({ onClick, title, children }) => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,1)' }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 340, damping: 18 }}
    onClick={onClick}
    className="p-2.5 bg-white/90 rounded-full shadow-lg"
    title={title}
  >
    {children}
  </motion.button>
)

const ImageCard = ({ image, index = 0, onView, showActions = true }) => {
  const { toggleImageFavorite, deleteImage, addToast } = useApp()
  const [hovered, setHovered] = useState(false)
  const [favoriting, setFavoriting] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = image.url
    link.download = `design-${image.id}.png`
    link.target = '_blank'
    link.click()
    addToast('Download started!')
  }

  const handleCopyPrompt = () => {
    navigator.clipboard?.writeText(image.prompt).then(
      () => addToast('Prompt copied!'),
      () => addToast(image.prompt)
    )
  }

  const handleFavorite = () => {
    setFavoriting(true)
    toggleImageFavorite(image.id)
    setTimeout(() => setFavoriting(false), 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -6, boxShadow: '0 24px 48px -12px rgba(99,102,241,0.22)' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={image.url}
          alt={image.prompt}
          loading="lazy"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
        />

        {/* Action buttons */}
        {showActions && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ActionBtn onClick={() => onView?.(image)} title="View full size">
                  <Maximize2 className="w-4 h-4 text-gray-700" />
                </ActionBtn>
                <ActionBtn onClick={handleDownload} title="Download">
                  <Download className="w-4 h-4 text-gray-700" />
                </ActionBtn>
                <ActionBtn onClick={handleCopyPrompt} title="Copy prompt">
                  <Copy className="w-4 h-4 text-gray-700" />
                </ActionBtn>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Style badge */}
        {image.style && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 + 0.2, duration: 0.35, ease: EASE }}
            className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full"
          >
            {image.style}
          </motion.span>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{image.prompt}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{image.createdAt}</span>
          {showActions && (
            <div className="flex items-center gap-1">
              <motion.button
                onClick={handleFavorite}
                whileTap={{ scale: 0.75 }}
                animate={favoriting ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 0.4 }}
                className={`p-1.5 rounded-lg transition-colors ${
                  image.favorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-4 h-4 transition-all ${image.favorite ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => { deleteImage(image.id); addToast('Image deleted') }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ImageCard
