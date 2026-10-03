import { Play, Clock, Users, Award, BookOpen, Target, CheckCircle, Calendar, Star, ArrowRight, Video, FileText, Code } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import Avatar from '../components/Avatar'

const Bootcamp = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const { addToCart, isInCart, addToast } = useApp()

  const courses = [
    {
      id: 1,
      title: 'Fashion Design Fundamentals',
      instructor: 'Maria Santos',
      duration: '8 weeks',
      level: 'Beginner',
      students: 2340,
      rating: 4.9,
      price: 299,
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=250&fit=crop',
      category: 'Fashion',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      title: 'Advanced Pattern Making',
      instructor: 'James Wilson',
      duration: '12 weeks',
      level: 'Advanced',
      students: 1890,
      rating: 4.8,
      price: 499,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      category: 'Technical',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      id: 3,
      title: 'Digital Illustration Masterclass',
      instructor: 'Emma Chen',
      duration: '6 weeks',
      level: 'Intermediate',
      students: 3120,
      rating: 4.9,
      price: 349,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop',
      category: 'Digital',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      id: 4,
      title: 'Brand Identity Design',
      instructor: 'Alex Rivera',
      duration: '10 weeks',
      level: 'Intermediate',
      students: 2670,
      rating: 4.7,
      price: 399,
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop',
      category: 'Branding',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 5,
      title: 'Sustainable Fashion Design',
      instructor: 'Sophie Green',
      duration: '8 weeks',
      level: 'All Levels',
      students: 1560,
      rating: 4.8,
      price: 279,
      image: 'https://img.freepik.com/premium-photo/sustainable-fashion-design-models-natureinspired-fashion-runway_1143726-9379.jpg?w=996',
      category: 'Sustainability',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 6,
      title: '3D Product Visualization',
      instructor: 'David Kim',
      duration: '14 weeks',
      level: 'Advanced',
      students: 980,
      rating: 4.9,
      price: 599,
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=250&fit=crop',
      category: '3D',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ]

  const courseCategories = useMemo(() => ['All', ...new Set(courses.map((c) => c.category))], [])
  const filteredCourses = useMemo(
    () => (categoryFilter === 'All' ? courses : courses.filter((c) => c.category === categoryFilter)),
    [categoryFilter]
  )

  const mentors = [
    {
      name: 'Maria Santos',
      role: 'Fashion Director',
      company: 'Luxury Fashion House',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      expertise: ['Fashion Design', 'Pattern Making', 'Textiles']
    },
    {
      name: 'James Wilson',
      role: 'Technical Designer',
      company: 'Sportswear Brand',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      expertise: ['Technical Design', 'Production', 'Quality Control']
    },
    {
      name: 'Emma Chen',
      role: 'Digital Artist',
      company: 'Creative Agency',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      expertise: ['Digital Art', 'Illustration', 'Animation']
    },
    {
      name: 'Alex Rivera',
      role: 'Brand Strategist',
      company: 'Design Studio',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      expertise: ['Branding', 'Strategy', 'Visual Identity']
    }
  ]

  const curriculum = [
    {
      week: 'Week 1-2',
      title: 'Foundation & Basics',
      topics: ['Design principles', 'Color theory', 'Introduction to tools', 'First project']
    },
    {
      week: 'Week 3-4',
      title: 'Skill Development',
      topics: ['Advanced techniques', 'Pattern creation', 'Material selection', 'Portfolio building']
    },
    {
      week: 'Week 5-6',
      title: 'Specialization',
      topics: ['Niche focus areas', 'Industry trends', 'Client projects', 'Feedback sessions']
    },
    {
      week: 'Week 7-8',
      title: 'Final Project',
      topics: ['Capstone project', 'Presentation skills', 'Portfolio review', 'Career guidance']
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      course: 'Fashion Design Fundamentals',
      content: 'This bootcamp transformed my career. I went from a complete beginner to landing my dream job at a fashion house within 6 months.',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop'
    },
    {
      name: 'Michael Chen',
      course: 'Digital Illustration Masterclass',
      content: 'The hands-on projects and mentor feedback were invaluable. I now run my own freelance design business.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    {
      name: 'Emily Rodriguez',
      course: 'Brand Identity Design',
      content: 'Best investment I ever made in my education. The curriculum is practical and immediately applicable.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Design Bootcamp</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master the art of design with our intensive, project-based learning programs
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>10,000+ Graduates</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Industry Recognized</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span>4.9 Average Rating</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div id="design-bootcamp-courses" className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'courses' ? 'gradient-bg text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'curriculum' ? 'gradient-bg text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab('mentors')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'mentors' ? 'gradient-bg text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Mentors
            </button>
          </div>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <section className="mb-20">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {courseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    categoryFilter === cat ? 'gradient-bg text-white' : 'bg-white text-gray-600 hover:bg-gray-100 shadow'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${course.gradient} text-white text-xs font-semibold rounded-full`}>
                      {course.category}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900">
                      ${course.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">by {course.instructor}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {course.level}
                      </span>
                      <button
                        onClick={() => {
                          addToCart({ id: course.id, type: 'course', name: course.title, price: course.price })
                          addToast(`Enrolled in ${course.title}!`)
                        }}
                        disabled={isInCart(course.id, 'course')}
                        className="flex items-center gap-1 text-primary font-semibold hover:text-secondary transition-colors disabled:text-green-600 disabled:cursor-default"
                      >
                        {isInCart(course.id, 'course') ? (
                          <>Enrolled <CheckCircle className="w-4 h-4" /></>
                        ) : (
                          <>Enroll <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-primary mb-1">{item.week}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {item.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold text-gray-900 mb-1">{mentor.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{mentor.role}</p>
                  <p className="text-sm text-primary mb-4">{mentor.company}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {mentor.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Sessions</h3>
              <p className="text-gray-600">Weekly live classes with Q&A sessions and real-time feedback</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Project-Based</h3>
              <p className="text-gray-600">Build a professional portfolio through hands-on projects</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Support</h3>
              <p className="text-gray-600">Job placement assistance and interview preparation</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Avatar name={testimonial.name} src={testimonial.avatar} size="lg" />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.course}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Design Journey?</h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Join our next cohort and transform your design skills in just 8 weeks
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('design-bootcamp-courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Enroll Now
              </button>
              <button onClick={() => setScheduleOpen(true)} className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                View Schedule
              </button>
            </div>
          </div>
        </section>
      </div>

      <Modal open={scheduleOpen} onClose={() => setScheduleOpen(false)} title="Weekly Cohort Schedule">
        <div className="space-y-3">
          {[
            { day: 'Monday', activity: 'Live lecture + design brief' },
            { day: 'Wednesday', activity: 'Studio hours with mentors' },
            { day: 'Friday', activity: 'Peer critique & portfolio review' },
            { day: 'Sunday', activity: 'Weekly project submission deadline' },
          ].map((item) => (
            <div key={item.day} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
              <span className="font-semibold text-gray-900">{item.day}</span>
              <span className="text-sm text-gray-600">{item.activity}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default Bootcamp
