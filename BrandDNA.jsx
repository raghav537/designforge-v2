import { Palette, Target, Users, Zap, TrendingUp, Award, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import Avatar from '../components/Avatar'
import PageMascot from '../components/PageMascot'
import { AnimatedSection, AnimatedCard } from '../components/AnimatedSection'

const quizQuestions = [
  {
    question: 'How consistent is your visual identity across channels?',
    options: [
      { label: 'Very consistent', score: 3 },
      { label: 'Somewhat consistent', score: 2 },
      { label: 'Not consistent', score: 1 },
    ],
  },
  {
    question: 'How well do you know your target audience?',
    options: [
      { label: 'Deeply', score: 3 },
      { label: 'Reasonably well', score: 2 },
      { label: 'Not very well', score: 1 },
    ],
  },
  {
    question: 'How often do customers return or refer others?',
    options: [
      { label: 'Very often', score: 3 },
      { label: 'Sometimes', score: 2 },
      { label: 'Rarely', score: 1 },
    ],
  },
]

const BrandDNA = () => {
  const [quizOpen, setQuizOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState(null)
  const { addToast } = useApp()

  const selectAnswer = (score) => {
    const nextAnswers = [...answers, score]
    if (step + 1 < quizQuestions.length) {
      setAnswers(nextAnswers)
      setStep(step + 1)
    } else {
      const total = nextAnswers.reduce((a, b) => a + b, 0)
      const max = quizQuestions.length * 3
      const recognition = Math.round((total / max) * 100)
      const loyaltyScore = nextAnswers[2] || 0
      const loyalty = Math.round((loyaltyScore / 3) * 100)
      const marketShare = Math.round((total / max) * 70)
      setResults({
        recognition: Math.min(99, Math.max(20, recognition)),
        loyalty: Math.min(99, Math.max(20, loyalty)),
        marketShare: Math.min(90, Math.max(10, marketShare)),
      })
      setAnswers(nextAnswers)
      addToast('Your brand analysis is ready!')
    }
  }

  const closeQuiz = () => {
    setQuizOpen(false)
    setStep(0)
    setAnswers([])
  }

  const startQuiz = () => {
    setResults(null)
    setStep(0)
    setAnswers([])
    setQuizOpen(true)
  }

  const brandElements = [
    {
      icon: Palette,
      title: 'Color Psychology',
      description: 'Discover how colors influence perception and emotion in your brand identity',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Target,
      title: 'Brand Positioning',
      description: 'Define your unique market position and competitive advantage',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Users,
      title: 'Target Audience',
      description: 'Understand and connect with your ideal customer demographics',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Brand Voice',
      description: 'Develop a consistent tone and messaging style across all channels',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Brand Evolution',
      description: 'Plan strategic brand growth and adaptation over time',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Award,
      title: 'Brand Values',
      description: 'Establish core principles that guide your brand decisions',
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Deep dive into your business, market, and competitive landscape'
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Develop comprehensive brand strategy and positioning framework'
    },
    {
      step: '03',
      title: 'Identity',
      description: 'Create visual and verbal identity elements that resonate'
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'Roll out brand across all touchpoints consistently'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Lumina Fashion',
      content: 'Brand DNA helped us transform our brand identity. Our recognition increased by 340% in just 6 months.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, Artisan Labs',
      content: 'The strategic approach to brand positioning gave us a clear competitive edge in our market.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director, Bloom Studio',
      content: 'Finally, a tool that understands the emotional connection between brand and design.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Brand DNA</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build a powerful brand identity that resonates with your audience and stands the test of time
          </p>
        </div>

        {/* Brand Elements Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Core Brand Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandElements.map((element, index) => {
              const Icon = element.icon
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${element.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {element.title}
                  </h3>
                  <p className="text-gray-600">
                    {element.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                    <div className="text-4xl font-bold gradient-text mb-4">{step.step}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  AI-Powered Brand Analysis
                </h2>
                <p className="text-lg text-gray-200 mb-8">
                  Leverage machine learning to analyze market trends, competitor strategies, and consumer preferences to build a data-driven brand strategy.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span>Competitive analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span>Market trend prediction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span>Consumer sentiment analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span>Brand health monitoring</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                  <div className="space-y-6">
                    {[
                      { label: 'Brand Recognition', value: results ? results.recognition : 87 },
                      { label: 'Customer Loyalty', value: results ? results.loyalty : 92 },
                      { label: 'Market Share', value: results ? results.marketShare : 64 },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{stat.label}</span>
                          <span className="font-bold">{stat.value}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${stat.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                    {!results && (
                      <p className="text-xs text-gray-300">Sample data &mdash; take the quiz below for your real score</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Avatar name={testimonial.name} src={testimonial.avatar} size="lg" />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Define Your Brand DNA?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Start building a brand that connects, resonates, and converts
            </p>
            <button onClick={startQuiz} className="px-8 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Start Brand Analysis
            </button>
          </div>
        </section>
      </div>

      <Modal open={quizOpen} onClose={closeQuiz} title="Brand DNA Quick Analysis">
        {!results ? (
          <div>
            <p className="text-sm text-gray-500 mb-4">Question {step + 1} of {quizQuestions.length}</p>
            <h4 className="text-lg font-bold text-gray-900 mb-6">{quizQuestions[step].question}</h4>
            <div className="space-y-3">
              {quizQuestions[step].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => selectAnswer(opt.score)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-primary hover:bg-purple-50 transition-colors font-medium text-gray-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-600">Here's your brand health snapshot based on your answers:</p>
            {[
              { label: 'Brand Recognition', value: results.recognition },
              { label: 'Customer Loyalty', value: results.loyalty },
              { label: 'Market Share', value: results.marketShare },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-medium text-gray-700">{stat.label}</span>
                  <span className="font-bold text-gray-900">{stat.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${stat.value}%` }}></div>
                </div>
              </div>
            ))}
            <button onClick={closeQuiz} className="w-full py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Done
            </button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default BrandDNA
