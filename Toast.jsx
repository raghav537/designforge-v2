import { CheckCircle, XCircle, X } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useApp } from '../context/AppContext'

const ToastItem = ({ toast, onDismiss }) => {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-80, 0, 80], [0, 1, 0])

  const isError = toast.type === 'error'

  return (
    <motion.div
      key={toast.id}
      layout
      initial={{ opacity: 0, x: 80, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
      exit={{ opacity: 0, x: 80, scale: 0.85, transition: { duration: 0.22 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      drag="x"
      dragConstraints={{ left: 0, right: 120 }}
      dragElastic={{ left: 0, right: 0.4 }}
      style={{ x, opacity }}
      onDragEnd={(_, info) => { if (info.offset.x > 60) onDismiss() }}
      className={`relative flex items-start gap-3 px-4 py-3 pr-10 rounded-xl shadow-2xl text-white select-none cursor-grab active:cursor-grabbing overflow-hidden ${
        isError ? 'bg-red-500' : 'bg-gray-900'
      }`}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
        transition={{ duration: 1.4, delay: 0.1, ease: 'linear' }}
      />

      {/* Progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 ${isError ? 'bg-red-300' : 'bg-primary'}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: toast.duration ? toast.duration / 1000 : 4, ease: 'linear' }}
      />

      {isError
        ? <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        : <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.4, delay: 0.1 }}>
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
          </motion.span>
      }
      <span className="text-sm font-medium flex-1 relative">{toast.message}</span>
      <motion.button
        whileHover={{ scale: 1.15, opacity: 1 }}
        whileTap={{ scale: 0.85 }}
        onClick={onDismiss}
        className="absolute right-2 top-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}

const ToastStack = () => {
  const { toasts, dismissToast } = useApp()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={() => dismissToast(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastStack
