import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

/* ─── Shared Easings ─────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
const EASE_SPRING = { type: 'spring', stiffness: 80, damping: 18 }

/* ─── Base fade-up used by AnimatedSection ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: EASE_OUT_EXPO },
  }),
}

/* ─── AnimatedSection ────────────────────────────────────────── */
export const AnimatedSection = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={fadeUp}
    custom={delay}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── AnimatedGrid ───────────────────────────────────────────── */
export const AnimatedGrid = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-30px' }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── AnimatedCard: lift + subtle 3D tilt on hover ──────────── */
export const AnimatedCard = ({ children, index = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.94 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.55, delay: index * 0.09, ease: EASE_OUT_EXPO }}
    whileHover={{
      y: -10,
      rotateX: 2,
      rotateY: -2,
      transition: { duration: 0.25, ease: 'easeOut' },
    }}
    className={className}
    style={{ transformPerspective: 800 }}
  >
    {children}
  </motion.div>
)

/* ─── StaggerContainer ───────────────────────────────────────── */
export const StaggerContainer = ({ children, className = '', stagger = 0.09 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── StaggerItem: fan-in from below with spring ─────────────── */
export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 32, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: EASE_OUT_EXPO },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── SlideIn: directional reveal ───────────────────────────── */
export const SlideIn = ({ children, from = 'left', delay = 0, className = '' }) => {
  const axis = from === 'left' || from === 'right' ? 'x' : 'y'
  const sign = from === 'right' || from === 'bottom' ? 1 : -1
  return (
    <motion.div
      initial={{ opacity: 0, [axis]: sign * 50 }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── ScaleReveal: zoom-in entrance ─────────────────────────── */
export const ScaleReveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── ParallaxSection: scroll-driven vertical shift ─────────── */
export const ParallaxSection = ({ children, speed = 0.15, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed])
  const y = useSpring(raw, { stiffness: 60, damping: 20 })
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ─── FadeChar: letter-by-letter text reveal ─────────────────── */
export const FadeChars = ({ text, className = '', delay = 0 }) => {
  const chars = Array.from(text)
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, delay: delay + i * 0.025, ease: EASE_OUT_EXPO },
            },
          }}
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* ─── CountUp: animated number counter ───────────────────────── */
export const CountUp = ({ to, suffix = '', duration = 1.5, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ textContent: '0' }}
        whileInView={{
          textContent: to,
          transition: { duration, delay, ease: 'easeOut' },
        }}
        viewport={{ once: true }}
        onUpdate={(latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest.textContent ?? 0) + suffix
          }
        }}
      >
        {to}{suffix}
      </motion.span>
    </motion.span>
  )
}

/* ─── FloatingOrb: ambient background blobs ─────────────────── */
export const FloatingOrb = ({
  color = 'bg-purple-500',
  size = 'w-72 h-72',
  top, left, right, bottom,
  delay = 0,
  duration = 7,
}) => (
  <motion.div
    animate={{ y: [0, -24, 0], x: [0, 12, 0], scale: [1, 1.05, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute ${size} ${color} rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none`}
    style={{ top, left, right, bottom }}
  />
)

/* ─── PulseRing: glowing ring effect ────────────────────────── */
export const PulseRing = ({ className = '', color = 'border-purple-400' }) => (
  <motion.span
    className={`absolute inset-0 rounded-full border-2 ${color} ${className}`}
    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
  />
)

export default AnimatedSection
