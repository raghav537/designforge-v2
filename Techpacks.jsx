import { FileText, Download, Share2, Eye, Clock, Users, CheckCircle, AlertCircle, Plus } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import Avatar from '../components/Avatar'

const initialTechpacks = [
  { id: 1, name: 'Summer Dress Collection', designer: 'Emma Wilson', status: 'completed', lastModified: '2 hours ago', views: 234, collaborators: 5, thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop', items: 12, gradient: 'from-pink-500 to-rose-500' },
  { id: 2, name: 'Urban Jacket Series', designer: 'Marcus Chen', status: 'in-progress', lastModified: '5 hours ago', views: 189, collaborators: 3, thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop', items: 8, gradient: 'from-indigo-500 to-blue-500' },
  { id: 3, name: 'Accessories Line 2024', designer: 'Sofia Martinez', status: 'review', lastModified: '1 day ago', views: 456, collaborators: 7, thumbnail: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop', items: 15, gradient: 'from-amber-500 to-orange-500' },
  { id: 4, name: 'Sustainable Basics', designer: 'David Kim', status: 'completed', lastModified: '2 days ago', views: 567, collaborators: 4, thumbnail: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop', items: 20, gradient: 'from-emerald-500 to-teal-500' },
  { id: 5, name: 'Athleisure Collection', designer: 'Jordan Lee', status: 'in-progress', lastModified: '3 days ago', views: 321, collaborators: 6, thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop', items: 18, gradient: 'from-purple-500 to-violet-500' },
  { id: 6, name: 'Formal Wear Series', designer: 'Alexandra Brown', status: 'review', lastModified: '4 days ago', views: 289, collaborators: 8, thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop', items: 10, gradient: 'from-cyan-500 to-blue-500' },
]

const statusTabs = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
]

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-100'
    case 'in-progress': return 'text-blue-600 bg-blue-100'
    case 'review': return 'text-amber-600 bg-amber-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4" />
    case 'in-progress': return <Clock className="w-4 h-4" />
    case 'review': return <AlertCircle className="w-4 h-4" />
    default: return null
  }
}

const features = [
  { icon: FileText, title: 'Detailed Specifications', description: 'Comprehensive technical drawings with measurements, materials, and construction details' },
  { icon: Users, title: 'Real-time Collaboration', description: 'Work together with your team on techpacks with live updates and comments' },
  { icon: Download, title: 'Export & Share', description: 'Generate PDFs, export to Excel, or share directly with manufacturers' },
  { icon: Eye, title: 'Version Control', description: 'Track changes and maintain version history for all your techpacks' },
]

const Techpacks = () => {
  const [techpacks, setTechpacks] = useState(initialTechpacks)
  const [statusFilter, setStatusFilter] = useState('all')
  const [newModalOpen, setNewModalOpen] = useState(false)
  const [viewTechpack, setViewTechpack] = useState(null)
  const [form, setForm] = useState({ name: '', designer: '', items: '' })
  const { addToast } = useApp()

  const filtered = useMemo(
    () => (statusFilter === 'all' ? techpacks : techpacks.filter((t) => t.status === statusFilter)),
    [techpacks, statusFilter]
  )

  const createTechpack = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.designer.trim()) {
      addToast('Name and designer are required', 'error')
      return
    }
    const gradients = ['from-pink-500 to-rose-500', 'from-indigo-500 to-blue-500', 'from-emerald-500 to-teal-500', 'from-purple-500 to-violet-500']
    const newEntry = {
      id: Date.now(),
      name: form.name.trim(),
      designer: form.designer.trim(),
      status: 'in-progress',
      lastModified: 'just now',
      views: 0,
      collaborators: 1,
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      items: Number(form.items) || 1,
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
    }
    setTechpacks((prev) => [newEntry, ...prev])
    setForm({ name: '', designer: '', items: '' })
    setNewModalOpen(false)
    setStatusFilter('all')
    addToast(`"${newEntry.name}" techpack created`)
  }

  const handleDownload = (techpack) => {
    const data = {
      name: techpack.name,
      designer: techpack.designer,
      status: techpack.status,
      items: techpack.items,
      collaborators: techpack.collaborators,
      lastModified: techpack.lastModified,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${techpack.name.replace(/\s+/g, '-').toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    addToast(`Downloading ${techpack.name}...`)
  }

  const handleShare = (techpack) => {
    const url = `${window.location.origin}/techpacks#${techpack.id}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => addToast('Link copied to clipboard'), () => addToast(url))
    } else {
      addToast(url)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Techpacks</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Create, manage, and share professional technical packages for your designs
            </p>
          </div>
          <button
            onClick={() => setNewModalOpen(true)}
            className="mt-4 md:mt-0 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Techpack
          </button>
        </div>

        {/* Features */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Techpacks Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-2xl font-bold">Your Techpacks</h2>
            <div className="flex gap-2 flex-wrap">
              {statusTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    statusFilter === tab.key ? 'gradient-bg text-white' : 'text-gray-600 hover:bg-gray-100 bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No techpacks in this status yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((techpack) => (
                <div key={techpack.id} id={techpack.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img src={techpack.thumbnail} alt={techpack.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(techpack.status)}`}>
                      {getStatusIcon(techpack.status)}
                      <span className="capitalize">{techpack.status.replace('-', ' ')}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{techpack.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar name={techpack.designer} size="xs" />
                      <p className="text-sm text-gray-500">by {techpack.designer}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{techpack.items} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{techpack.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{techpack.collaborators}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewTechpack(techpack)} className="flex-1 px-4 py-2 gradient-bg text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                        View
                      </button>
                      <button onClick={() => handleDownload(techpack)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button onClick={() => handleShare(techpack)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Streamline Your Production Process</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Create professional techpacks that manufacturers love, reducing errors and speeding up production
          </p>
          <button onClick={() => setNewModalOpen(true)} className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
            Start Creating Techpacks
          </button>
        </section>
      </div>

      {/* New Techpack Modal */}
      <Modal open={newModalOpen} onClose={() => setNewModalOpen(false)} title="Create new techpack">
        <form onSubmit={createTechpack} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Techpack name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Winter Coat Line"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designer</label>
            <input
              type="text"
              value={form.designer}
              onChange={(e) => setForm({ ...form, designer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of items</label>
            <input
              type="number"
              min="1"
              value={form.items}
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1"
            />
          </div>
          <button type="submit" className="w-full py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Create techpack
          </button>
        </form>
      </Modal>

      {/* View Techpack Modal */}
      <Modal open={!!viewTechpack} onClose={() => setViewTechpack(null)} title={viewTechpack?.name || ''}>
        {viewTechpack && (
          <div className="space-y-4">
            <img src={viewTechpack.thumbnail} alt={viewTechpack.name} className="w-full h-48 object-cover rounded-xl" />
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(viewTechpack.status)}`}>
              {getStatusIcon(viewTechpack.status)}
              <span className="capitalize">{viewTechpack.status.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar name={viewTechpack.designer} size="md" />
              <div>
                <p className="font-semibold text-gray-900">{viewTechpack.designer}</p>
                <p className="text-sm text-gray-500">Lead designer</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-gray-500">Designer</dt><dd className="font-semibold text-gray-900">{viewTechpack.designer}</dd></div>
              <div><dt className="text-gray-500">Items</dt><dd className="font-semibold text-gray-900">{viewTechpack.items}</dd></div>
              <div><dt className="text-gray-500">Collaborators</dt><dd className="font-semibold text-gray-900">{viewTechpack.collaborators}</dd></div>
              <div><dt className="text-gray-500">Last modified</dt><dd className="font-semibold text-gray-900">{viewTechpack.lastModified}</dd></div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Techpacks
