import { Search, Sparkles, Wand2, Image, Palette, Layers, Zap, ArrowRight, Star, TrendingUp, Users, Clock } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import PageMascot from '../components/PageMascot'
import ImageCard from '../components/ImageCard'
import {
  AnimatedSection, AnimatedCard, StaggerContainer, StaggerItem,
  SlideIn, ScaleReveal, FloatingOrb, FadeChars, ParallaxSection
} from '../components/AnimatedSection'
import Modal from '../components/Modal'

const EASE = [0.16, 1, 0.3, 1]

const Star2 = ({ style }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-white"
    style={style}
    animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.6, 1.3, 0.6] }}
    transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
  />
)

/* Animated counting number */
const CountUp = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = end / 60
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const TICKER_ITEMS = [
  '✦ 2.4M designs created', '✦ 120K+ active creators', '✦ 47 AI styles available',
  '✦ 99.9% uptime', '✦ 4.8★ avg rating', '✦ Export in 12 formats',
  '✦ 2.4M designs created', '✦ 120K+ active creators', '✦ 47 AI styles available',
  '✦ 99.9% uptime', '✦ 4.8★ avg rating', '✦ Export in 12 formats',
]

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const { addToast, generatedImages } = useApp()
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const quickPrompts = [
    'A serene mountain landscape at golden hour',
    'Minimalist logo for a coffee brand',
    'Futuristic fashion design concept',
    'Abstract watercolor floral pattern',
    'Cute cartoon mascot character',
    'Modern apartment interior design',
  ]

  const stats = [
    { label: 'Designs Created', value: 2400000, suffix: '+', icon: Sparkles, color: 'from-pink-500 to-rose-500' },
    { label: 'Active Creators', value: 120000, suffix: '+', icon: Users, color: 'from-violet-500 to-purple-500' },
    { label: 'Avg. Gen Time', value: 4, suffix: 's', icon: Clock, color: 'from-amber-500 to-orange-500' },
    { label: 'Satisfaction', value: 98, suffix: '%', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
  ]

  const creationTools = [
    { icon: Wand2,   title: 'AI Image Generation', description: 'Create stunning visuals from text prompts in seconds', color: 'from-pink-500 to-rose-500', path: '/studio', tag: 'Most used' },
    { icon: Palette, title: 'Style Transfer', description: 'Apply artistic styles to transform your designs', color: 'from-purple-500 to-violet-500', path: '/studio', tag: 'New' },
    { icon: Layers,  title: 'Design Projects', description: 'Organize and manage your creative design workflows', color: 'from-indigo-500 to-blue-500', path: '/techpacks', tag: null },
    { icon: Image,   title: 'Image Gallery', description: 'Browse, favorite, and download all your creations', color: 'from-emerald-500 to-teal-500', path: '/gallery', tag: null },
  ]

  const handleCreate = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) { addToast('Describe what you want to create', 'error'); return }
    navigate(`/studio?prompt=${encodeURIComponent(searchQuery.trim())}`)
  }

  const recentImages = generatedImages.slice(0, 4)

  const stars = Array.from({ length: 28 }, (_, i) => ({
    top: `${Math.random() * 90}%`, left: `${Math.random() * 100}%`,
  }))

  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white min-h-[88vh] flex items-center">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920')] bg-cover bg-center opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-40 pointer-events-none" />

        {stars.map((s, i) => <Star2 key={i} style={{ top: s.top, left: s.left }} />)}

        <motion.div
          animate={{ borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-4 w-80 h-80 bg-purple-600 mix-blend-screen opacity-15 filter blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ borderRadius: ['30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%'] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-10 right-4 w-96 h-96 bg-pink-600 mix-blend-screen opacity-15 filter blur-3xl pointer-events-none"
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/10"
              >
                <motion.span
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.span>
                AI-Powered Design Creation
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              >
                {['Create', 'stunning'].map((w) => (
                  <motion.span key={w} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }} className="inline-block mr-3">
                    {w}
                  </motion.span>
                ))}
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.14, ease: EASE } } }}
                  className="inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                >
                  designs &amp; images
                </motion.span>
                {' '}
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.28, ease: EASE } } }}
                  className="inline-block"
                >
                  with AI
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                className="text-lg text-gray-300 mb-8 max-w-lg"
              >
                Generate beautiful images, illustrations, and design concepts instantly. Your creative studio, powered by AI.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.6, ease: EASE }}
                onSubmit={handleCreate} className="relative mb-6"
              >
                <div className="relative group">
                  <motion.span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-focus-within:opacity-70 blur transition-all duration-500" />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Describe the image or design you want to create..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg transition-all duration-300"
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.06, boxShadow: '0 0 24px rgba(236,72,153,0.5)' }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 gradient-bg rounded-xl font-semibold flex items-center gap-2 text-white"
                    >
                      <Wand2 className="w-4 h-4" /> Create
                    </motion.button>
                  </div>
                </div>
              </motion.form>

              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.85 } } }}
              >
                {quickPrompts.slice(0, 4).map((p) => (
                  <motion.button
                    key={p}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } } }}
                    whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.25)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSearchQuery(p)}
                    className="px-3 py-1.5 bg-white/10 rounded-full text-xs transition-colors backdrop-blur-sm border border-white/10"
                  >
                    {p.length > 35 ? p.slice(0, 35) + '...' : p}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="hidden lg:block"
              style={{ transformPerspective: 1000 }}
            >
              <PageMascot page="home" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
          scroll
        </motion.div>
      </section>

      {/* ── Ticker Tape ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="text-white text-sm font-medium whitespace-nowrap px-8 opacity-90">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(99,102,241,0.2)' }}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </section>

      {/* ── Creation Tools ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
        <AnimatedSection className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">What you can build</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Design Creation Tools</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to generate, edit, and manage your creative designs</p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creationTools.map((tool) => {
            const Icon = tool.icon
            return (
              <StaggerItem key={tool.title}>
                <motion.div
                  whileHover={{ y: -10, rotateX: 3, rotateY: -3, boxShadow: '0 30px 60px -12px rgba(99,102,241,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(tool.path)}
                  className="group bg-white rounded-2xl p-6 shadow-lg cursor-pointer border border-gray-100 transition-colors hover:border-purple-100 relative overflow-hidden h-full"
                  style={{ transformPerspective: 800 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)', backgroundSize: '200% 100%' }}
                    animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
                  />
                  {tool.tag && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-white">{tool.tag}</span>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                  <motion.div
                    className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100"
                    initial={{ x: -6 }} whileHover={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Get started <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </section>

      {/* ── Bento Inspiration Grid ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatedSection className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Spark your creativity</p>
            <h2 className="text-3xl font-bold gradient-text">
              {recentImages.length > 0 ? 'Your Recent Creations' : 'Prompt Inspiration'}
            </h2>
            <p className="text-gray-600 mt-2">{recentImages.length > 0 ? 'Pick up where you left off' : 'Tap any card to open it in the Studio'}</p>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate(recentImages.length > 0 ? '/gallery' : '/studio')}
            className="text-sm font-semibold text-primary hover:text-secondary flex items-center gap-1"
          >
            {recentImages.length > 0 ? 'View Gallery' : 'Open Studio'} <ArrowRight className="w-4 h-4" />
          </motion.button>
        </AnimatedSection>

        {recentImages.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recentImages.map((img, i) => (
              <StaggerItem key={img.id}>
                <ImageCard image={img} index={i} onView={setSelectedImage} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          /* Bento grid for inspiration prompts */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
            {quickPrompts.map((prompt, i) => {
              const colors = [
                'from-indigo-900 via-purple-900 to-indigo-900',
                'from-rose-900 via-pink-900 to-rose-900',
                'from-violet-900 via-fuchsia-900 to-violet-900',
                'from-emerald-900 via-teal-900 to-emerald-900',
                'from-amber-900 via-orange-900 to-amber-900',
                'from-cyan-900 via-sky-900 to-cyan-900',
              ]
              const spans = [
                'md:col-span-2 md:row-span-2',
                'md:col-span-1',
                'md:col-span-1',
                'md:col-span-1',
                'md:col-span-1',
                'md:col-span-1',
              ]
              const accents = ['text-indigo-300', 'text-pink-300', 'text-violet-300', 'text-emerald-300', 'text-amber-300', 'text-cyan-300']
              return (
                <motion.button
                  key={prompt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 60px -12px rgba(0,0,0,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/studio?prompt=${encodeURIComponent(prompt)}`)}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors[i]} text-left p-6 flex flex-col justify-between group ${spans[i]}`}
                >
                  {/* Noise texture */}
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: 'cover' }}
                  />
                  {/* Hover shimmer */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)' }}
                  />
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: [0, 10, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: i + 1 }}
                    >
                      <Zap className={`w-5 h-5 ${accents[i]} mb-3`} />
                    </motion.div>
                    <p className="text-white font-semibold text-sm leading-snug">{prompt}</p>
                  </div>
                  <div className={`relative flex items-center gap-1 text-xs font-semibold ${accents[i]} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Generate this <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScaleReveal>
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white">
            <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-20 pointer-events-none" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-24 -right-24 w-72 h-72 border border-white/10 rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-20 -left-20 w-64 h-64 border border-white/10 rounded-full" />

            <div className="relative">
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <Sparkles className="w-10 h-10 mx-auto mb-4 text-yellow-300 opacity-90" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Creating Today</h2>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Open the Studio and generate your first AI design in seconds. No experience needed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  onClick={() => navigate('/studio')}
                  className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Wand2 className="w-5 h-5" /> Open Design Studio
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/pricing')}
                  className="px-8 py-4 border border-white/30 rounded-xl font-semibold flex items-center gap-2 backdrop-blur-sm"
                >
                  View Pricing <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </ScaleReveal>
      </section>

      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)} title="Design Preview" maxWidth="max-w-3xl">
        {selectedImage && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-4">
            <img src={selectedImage.url} alt={selectedImage.prompt} className="w-full rounded-xl" />
            <p className="text-gray-600">{selectedImage.prompt}</p>
          </motion.div>
        )}
      </Modal>
    </div>
  )
}

export default Home
