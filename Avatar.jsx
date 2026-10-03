import { useState } from 'react'
import { motion } from 'framer-motion'
import { cartoonAvatar, designerAvatar, userAvatar } from '../utils/avatars'

const GRADIENTS = [
  'from-primary to-secondary',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-purple-500 to-violet-500',
  'from-cyan-500 to-blue-500',
  'from-fuchsia-500 to-pink-500',
]

const SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-2xl',
}

const RINGS = {
  xs: 'ring-1',
  sm: 'ring-2',
  md: 'ring-2',
  lg: 'ring-[3px]',
  xl: 'ring-4',
}

const SIZE_MAP = { xs: 48, sm: 64, md: 88, lg: 112, xl: 160 }

function initialsFor(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function gradientFor(name = '') {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}

function resolveCartoonSrc(name, variant, src) {
  if (src) return src
  if (variant === 'user') return userAvatar(name)
  return designerAvatar(name)
}

const Avatar = ({
  name = '',
  src,
  size = 'md',
  ring = true,
  online = false,
  cartoon = true,
  variant = 'designer',
  animate = false,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = useState(false)
  const cartoonSrc = cartoon ? resolveCartoonSrc(name, variant, src) : src
  const showImage = Boolean(cartoonSrc) && !imgFailed
  const sizeClasses = SIZES[size] || SIZES.md
  const ringClass = ring ? `${RINGS[size] || RINGS.md} ring-white shadow-sm` : ''

  const imgEl = showImage ? (
    <img
      src={cartoonSrc}
      alt={name}
      onError={() => setImgFailed(true)}
      className={`${sizeClasses} rounded-full object-cover ${ringClass}`}
    />
  ) : (
    <span
      className={`${sizeClasses} rounded-full bg-gradient-to-br ${gradientFor(name)} text-white font-bold flex items-center justify-center select-none ${ringClass}`}
      aria-label={name}
      title={name}
    >
      {initialsFor(name)}
    </span>
  )

  const wrapper = (
    <span className={`relative inline-flex flex-shrink-0 ${className}`}>
      {imgEl}
      {online && (
        <span className="absolute bottom-0 right-0 w-[30%] h-[30%] min-w-[8px] min-h-[8px] bg-green-500 border-2 border-white rounded-full" />
      )}
    </span>
  )

  if (animate) {
    return (
      <motion.span
        className={`relative inline-flex flex-shrink-0 ${className}`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        {imgEl}
        {online && (
          <span className="absolute bottom-0 right-0 w-[30%] h-[30%] min-w-[8px] min-h-[8px] bg-green-500 border-2 border-white rounded-full" />
        )}
      </motion.span>
    )
  }

  return wrapper
}

export default Avatar
