import { motion } from 'framer-motion'
import { cartoonAvatar, PAGE_MASCOTS } from '../utils/avatars'

const PageMascot = ({ page = 'home', className = '' }) => {
  const mascot = PAGE_MASCOTS[page]
  if (!mascot) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`flex items-start gap-4 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex-shrink-0"
      >
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mascot.color} p-1 shadow-lg`}>
          <img
            src={cartoonAvatar(mascot.seed, mascot.style, 160)}
            alt={mascot.name}
            className="w-full h-full rounded-xl object-cover bg-white"
          />
        </div>
        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="relative bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-lg border border-gray-100 max-w-sm"
      >
        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white" />
        <p className="text-xs font-bold text-primary mb-0.5">{mascot.name}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{mascot.message}</p>
      </motion.div>
    </motion.div>
  )
}

export default PageMascot
