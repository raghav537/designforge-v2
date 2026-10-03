import { Check, X, Star, Zap, Crown, Rocket, ChevronDown, Mail, ArrowRight, Shield } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection'

const EASE = [0.16, 1, 0.3, 1]

const Pricing = () => {
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)
  const [confirmPlan, setConfirmPlan] = useState(null)
  const [salesOpen, setSalesOpen] = useState(false)
  const [salesForm, setSalesForm] = useState({ name: '', email: '', team: '' })
  const { addToCart, isInCart, addToast } = useApp()

  const plans = [
    {
      name: 'Starter', icon: Rocket, price: { monthly: 19, annual: 15 },
      description: 'Perfect for individual designers and hobbyists',
      features: ['5 active projects', 'Basic AI design tools', '1GB cloud storage', 'Community support', 'Export to PNG/JPG', 'Basic templates'],
      limitations: ['No team collaboration', 'No 3D modeling', 'No brand analytics'],
      color: 'from-blue-500 to-cyan-500', accent: 'blue', popular: false
    },
    {
      name: 'Professional', icon: Zap, price: { monthly: 49, annual: 39 },
      description: 'For freelance designers and small studios',
      features: ['Unlimited projects', 'Advanced AI tools', '50GB cloud storage', 'Priority email support', 'Export to all formats', 'Premium templates', 'Team collaboration (5 users)', 'Version history', 'Custom branding'],
      limitations: ['Limited 3D features', 'No API access'],
      color: 'from-purple-500 to-pink-500', accent: 'purple', popular: true
    },
    {
      name: 'Enterprise', icon: Crown, price: { monthly: 149, annual: 119 },
      description: 'For large teams and design agencies',
      features: ['Everything in Professional', 'Unlimited team members', 'Unlimited cloud storage', '24/7 phone support', 'Full 3D modeling suite', 'API access', 'SSO & advanced security', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'White-label options'],
      limitations: [],
      color: 'from-amber-500 to-orange-500', accent: 'amber', popular: false
    }
  ]

  const addons = [
    { name: 'AI Design Credits', price: '$9/month', description: '100 additional AI design generations', icon: '⚡' },
    { name: 'Extra Storage', price: '$5/month per 100GB', description: 'Additional cloud storage space', icon: '💾' },
    { name: 'Team Members', price: '$10/month per user', description: 'Add more team members to your plan', icon: '👥' },
    { name: 'Priority Rendering', price: '$15/month', description: 'Faster rendering and processing times', icon: '🚀' }
  ]

  const faqs = [
    { question: 'Can I change my plan later?', answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing accordingly.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay via invoice.' },
    { question: 'Is there a free trial?', answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start. You\'ll have full access to all features during the trial period.' },
    { question: 'What happens to my data if I cancel?', answer: 'Your data remains accessible for 30 days after cancellation. You can export all your designs and projects before your account is closed.' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-30 pointer-events-none" />
        <motion.div animate={{ borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 opacity-10 filter blur-3xl pointer-events-none" />
        <motion.div animate={{ borderRadius: ['30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%'] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-600 opacity-10 filter blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6 border border-white/15 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-green-400" /> 14-day free trial · No credit card required
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Simple, <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Transparent</span> Pricing
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Choose the perfect plan for your design needs
          </motion.p>

          {/* Animated toggle */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="flex items-center justify-center gap-4">
            <span className={`font-medium transition-colors ${!annual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
            <motion.button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-gradient-to-r from-primary to-accent' : 'bg-white/20'}`}
            >
              <motion.div
                animate={{ x: annual ? 28 : 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </motion.button>
            <span className={`font-medium transition-colors flex items-center gap-2 ${annual ? 'text-white' : 'text-white/50'}`}>
              Annual
              <AnimatePresence>
                {annual && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    className="text-xs bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full font-semibold">
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards — float over the hero bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20 relative z-10">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const inCart = isInCart(plan.name, 'plan')
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: plan.popular ? -6 : -8, boxShadow: plan.popular ? '0 40px 80px -16px rgba(139,92,246,0.5)' : '0 30px 60px -12px rgba(0,0,0,0.15)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative rounded-3xl p-8 h-full flex flex-col ${
                    plan.popular
                      ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white border-2 border-purple-500/50 shadow-2xl shadow-purple-900/30'
                      : 'bg-white border border-gray-100 shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <>
                      <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-20 rounded-3xl pointer-events-none" />
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-current" /> Most Popular
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className={`text-2xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                    <p className={`text-sm mb-6 ${plan.popular ? 'text-white/60' : 'text-gray-500'}`}>{plan.description}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <AnimatePresence mode="wait">
                          <motion.span key={annual ? 'annual' : 'monthly'}
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                            ${annual ? plan.price.annual : plan.price.monthly}
                          </motion.span>
                        </AnimatePresence>
                        <span className={plan.popular ? 'text-white/50' : 'text-gray-400'}>/month</span>
                      </div>
                      {annual && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs mt-1 ${plan.popular ? 'text-green-300' : 'text-green-600'}`}>
                          Billed annually (${plan.price.annual * 12}/year)
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setConfirmPlan(plan)}
                      disabled={inCart}
                      className={`w-full py-3 rounded-xl font-semibold transition-all mb-8 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-white text-purple-700 hover:bg-gray-50 shadow-lg'
                          : 'gradient-bg text-white hover:opacity-90 shadow-md'
                      }`}
                    >
                      {inCart ? 'Trial started ✓' : 'Start Free Trial'} {!inCart && <ArrowRight className="w-4 h-4" />}
                    </motion.button>

                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-white/20' : 'bg-green-50'}`}>
                            <Check className={`w-3 h-3 ${plan.popular ? 'text-green-300' : 'text-green-500'}`} />
                          </div>
                          <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-700'}`}>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-50">
                            <X className="w-3 h-3 text-gray-300" />
                          </div>
                          <span className={`text-sm ${plan.popular ? 'text-white/30' : 'text-gray-400'}`}>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Add-ons */}
        <AnimatedSection className="mb-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Power up your plan</p>
            <h2 className="text-3xl font-bold text-gray-900">Add-ons & Extras</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => {
              const added = isInCart(addon.name, 'addon')
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(99,102,241,0.15)' }}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col group"
                >
                  <span className="text-3xl mb-4">{addon.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{addon.name}</h3>
                  <p className="text-xl font-bold gradient-text mb-2">{addon.price}</p>
                  <p className="text-sm text-gray-500 mb-5 flex-1">{addon.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { addToCart({ id: addon.name, type: 'addon', name: addon.name, price: addon.price }); addToast(`${addon.name} added to your plan`) }}
                    disabled={added}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${added ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'} disabled:cursor-not-allowed`}
                  >
                    {added ? '✓ Added' : 'Add to plan'}
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection className="mb-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Got questions?</p>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const open = openFaq === index
              return (
                <motion.div
                  key={index}
                  animate={{ boxShadow: open ? '0 10px 40px -8px rgba(99,102,241,0.2)' : '0 2px 8px rgba(0,0,0,0.06)' }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 px-6 pb-6 text-sm leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="pb-20">
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
            <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-20 pointer-events-none" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 w-60 h-60 border border-white/10 rounded-full" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-3">Not Sure Which Plan to Choose?</h2>
              <p className="text-gray-200 mb-8 max-w-xl mx-auto">Our team is here to help you find the perfect solution for your design needs</p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.97 }}
                onClick={() => setSalesOpen(true)}
                className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg flex items-center gap-2 mx-auto"
              >
                <Mail className="w-4 h-4" /> Contact Sales
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Confirm plan modal */}
      <Modal open={!!confirmPlan} onClose={() => setConfirmPlan(null)} title={confirmPlan ? `Start your ${confirmPlan.name} trial` : ''}>
        {confirmPlan && (
          <div className="space-y-5">
            <p className="text-gray-600">
              You're starting a 14-day free trial of the <span className="font-semibold text-gray-900">{confirmPlan.name}</span> plan
              at ${annual ? confirmPlan.price.annual : confirmPlan.price.monthly}/month ({annual ? 'billed annually' : 'billed monthly'}). No credit card required.
            </p>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { addToCart({ id: confirmPlan.name, type: 'plan', name: confirmPlan.name, price: annual ? confirmPlan.price.annual : confirmPlan.price.monthly }); addToast(`Trial started for the ${confirmPlan.name} plan!`); setConfirmPlan(null) }}
              className="w-full py-3 gradient-bg text-white font-semibold rounded-xl">
              Confirm & start trial
            </motion.button>
          </div>
        )}
      </Modal>

      {/* Contact sales modal */}
      <Modal open={salesOpen} onClose={() => setSalesOpen(false)} title="Talk to sales">
        <form onSubmit={(e) => { e.preventDefault(); if (!salesForm.name || !salesForm.email) { addToast('Please fill in your name and email', 'error'); return } addToast(`Thanks ${salesForm.name}! Our sales team will reach out to ${salesForm.email}.`); setSalesForm({ name: '', email: '', team: '' }); setSalesOpen(false) }} className="space-y-4">
          {[{ label: 'Name', key: 'name', type: 'text' }, { label: 'Work email', key: 'email', type: 'email' }, { label: 'Team size', key: 'team', type: 'text', placeholder: 'e.g. 10-50' }].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type={type} value={salesForm[key]} onChange={(e) => setSalesForm({ ...salesForm, [key]: e.target.value })} placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
            className="w-full py-3 gradient-bg text-white font-semibold rounded-xl flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Request a call
          </motion.button>
        </form>
      </Modal>
    </div>
  )
}

export default Pricing
