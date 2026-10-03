import { Sparkles, Zap, Shield, Globe, Lock, Palette, Layers, Smartphone, Clock, Users, Target, BarChart, Check, Image, Wand2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import PageMascot from '../components/PageMascot'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection'

const EASE = [0.16, 1, 0.3, 1]

/* Live metrics widget */
const MetricsWidget = () => {
  const metrics = [
    { label: 'Images generated today', value: '14,280', change: '+12%', up: true },
    { label: 'Avg. quality score', value: '9.4/10', change: '+0.2', up: true },
    { label: 'Active sessions', value: '3,891', change: '+341', up: true },
    { label: 'Avg. generation time', value: '3.8s', change: '-0.4s', up: true },
  ]
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/15">
      <div className="flex items-center gap-2 mb-5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
        </span>
        <span className="text-xs text-white/70 font-medium">Live Platform Metrics</span>
      </div>
      <div className="space-y-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: EASE }}
            className="flex items-center justify-between">
            <span className="text-sm text-white/60">{m.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{m.value}</span>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${m.up ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {m.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const Features = () => {
  const navigate = useNavigate()
  const { connectedIntegrations, toggleIntegration, addToast } = useApp()

  const coreFeatures = [
    { icon: Sparkles, title: 'AI Image Generation', description: 'Create stunning images from text prompts using state-of-the-art AI models trained on creative works', color: 'from-pink-500 to-rose-500', stat: '2M+ images generated' },
    { icon: Wand2, title: 'Style Transfer', description: 'Apply artistic styles — watercolor, anime, 3D render, and more — to any generated design', color: 'from-violet-500 to-purple-500', stat: '47 styles available' },
    { icon: Zap, title: 'Lightning Fast', description: 'Create designs in seconds with our optimized rendering engine and cloud-based processing', color: 'from-amber-500 to-orange-500', stat: '<4s avg generation' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption and security protocols to protect your intellectual property', color: 'from-emerald-500 to-teal-500', stat: 'SOC 2 compliant' },
    { icon: Image, title: 'Gallery Management', description: 'Organize, favorite, and download all your AI-generated images in one beautiful gallery', color: 'from-cyan-500 to-blue-500', stat: 'Unlimited storage' },
    { icon: Lock, title: 'Version Control', description: 'Track every change with comprehensive version history and rollback capabilities', color: 'from-purple-500 to-violet-500', stat: 'Full history access' },
    { icon: Palette, title: 'Custom Branding', description: 'Maintain brand consistency with customizable templates and style guides', color: 'from-fuchsia-500 to-pink-500', stat: 'White-label ready' },
  ]

  const workflowSteps = [
    { num: '01', title: 'Describe your vision', description: 'Type a detailed prompt — the more specific, the better. Our AI understands natural language so you can describe exactly what you imagine.', icon: Sparkles, color: 'text-pink-400' },
    { num: '02', title: 'Choose your style', description: 'Pick from 47+ artistic styles — watercolor, cinematic, anime, flat design — or let AI decide based on your prompt\'s mood.', icon: Palette, color: 'text-violet-400' },
    { num: '03', title: 'Generate & refine', description: 'Watch your design come to life in under 4 seconds. Iterate with variations, adjustments, and style blending until it\'s perfect.', icon: Wand2, color: 'text-indigo-400' },
    { num: '04', title: 'Export & publish', description: 'Download in any format — PNG, SVG, PDF, or share directly to your portfolio. All outputs are commercial-use ready.', icon: Zap, color: 'text-amber-400' },
  ]

  const integrations = [
    { name: 'Adobe Creative Cloud', icon: '🎨' },
    { name: 'Figma', icon: '🖌️' },
    { name: 'Sketch', icon: '✏️' },
    { name: 'Notion', icon: '📝' },
    { name: 'Slack', icon: '💬' },
    { name: 'Dropbox', icon: '📦' },
    { name: 'Google Drive', icon: '🗂️' },
    { name: 'Jira', icon: '📋' }
  ]

  const advancedFeatures = [
    { icon: Layers, title: '3D Modeling', description: 'Create stunning 3D visualizations and prototypes directly in the browser' },
    { icon: Smartphone, title: 'Mobile First', description: 'Full-featured mobile app for designing on the go, anywhere, anytime' },
    { icon: Clock, title: 'Automated Workflows', description: 'Streamline repetitive tasks with powerful automation and scripting' },
    { icon: Users, title: 'Team Management', description: 'Advanced user roles, permissions, and team organization features' },
    { icon: Target, title: 'Precision Tools', description: 'Industry-grade measurement and specification tools for professional output' },
    { icon: BarChart, title: 'Analytics Dashboard', description: 'Track design performance, user engagement, and project metrics in real-time' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-30 pointer-events-none" />
        <motion.div animate={{ borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-96 h-96 bg-purple-600 opacity-10 filter blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-8">
            <PageMascot page="features" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-xs font-semibold tracking-widest text-purple-300 uppercase mb-3">Everything you need</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Built for <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Creatives</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powerful AI tools for generating, styling, and managing your creative designs
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Core Features Grid */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Core capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What DesignForge can do</h2>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: '0 20px 40px -8px rgba(99,102,241,0.2)' }}
                    className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 h-full flex flex-col"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-gray-500 flex-1 leading-relaxed">{feature.description}</p>
                    <div className={`mt-4 text-xs font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>{feature.stat}</div>
                  </motion.div>
                </StaggerItem>
              )
            })}
            {/* Extra CTA card */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8 }}
                onClick={() => navigate('/studio')}
                className="group bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-md h-full flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-semibold">...and much more coming</p>
                  <p className="text-white/60 text-sm mt-2">New AI capabilities ship every week</p>
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold mt-6 group-hover:gap-3 transition-all">
                  Try the Studio <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>

        {/* How it Works — numbered steps */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">The workflow</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From idea to design in 4 steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.55, ease: EASE }}
                  whileHover={{ x: 6 }}
                  className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                      <span className="text-xs font-black text-gray-300 group-hover:text-primary transition-colors">{step.num}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 ${step.color}`} />
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </AnimatedSection>

        {/* AI Assistant Feature Highlight */}
        <AnimatedSection className="mb-24">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 md:p-14 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-20 pointer-events-none" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-16 -right-16 w-64 h-64 border border-white/10 rounded-full" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">Powered by AI</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-5">Your AI Design Assistant</h2>
                <p className="text-lg text-gray-200 mb-8">
                  Our intelligent assistant learns your design preferences and helps you create faster than ever. Get suggestions, auto-complete designs, and let AI handle the repetitive tasks.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Smart design suggestions', 'Auto-color matching', 'Pattern generation', 'Style transfer capabilities'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/studio')}
                  className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl shadow-lg flex items-center gap-2">
                  <Wand2 className="w-4 h-4" /> Try it now
                </motion.button>
              </div>
              <div className="relative">
                <MetricsWidget />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Advanced Features */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Power features</p>
            <h2 className="text-3xl font-bold text-gray-900">Advanced Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
                  whileHover={{ borderColor: 'rgba(99,102,241,0.4)', y: -4 }}
                  className="group bg-gradient-to-br from-gray-50 to-purple-50/50 rounded-2xl p-7 border border-gray-100 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Integrations */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Works with your stack</p>
            <h2 className="text-3xl font-bold text-gray-900">Seamless Integrations</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Connect with your favorite tools and streamline your workflow</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((integration, index) => {
              const connected = connectedIntegrations.includes(integration.name)
              return (
                <motion.button
                  key={index}
                  whileHover={{ y: -4, boxShadow: connected ? '0 12px 30px rgba(99,102,241,0.25)' : '0 12px 30px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { toggleIntegration(integration.name); addToast(connected ? `Disconnected ${integration.name}` : `Connected to ${integration.name}`) }}
                  className={`relative bg-white rounded-2xl p-5 shadow-sm border text-center group cursor-pointer transition-all ${connected ? 'border-primary/40 ring-2 ring-primary/20' : 'border-gray-100'}`}
                >
                  {connected && (
                    <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                  )}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{integration.icon}</div>
                  <div className="font-medium text-gray-900 text-sm">{integration.name}</div>
                  <div className={`text-xs mt-1 ${connected ? 'text-primary font-medium' : 'text-gray-400'}`}>{connected ? 'Connected' : 'Click to connect'}</div>
                </motion.button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection>
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center">
            <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Wand2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Ready to Transform Your Design Process?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">Join thousands of designers who are already creating amazing work with DesignForge</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/studio')}
                className="px-8 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg flex items-center gap-2">
                Open Design Studio <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/pricing')}
                className="px-8 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 flex items-center gap-2">
                See Pricing
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default Features
