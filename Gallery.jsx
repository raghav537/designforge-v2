import { useState, useMemo } from 'react'
import { Grid, List, Search, Heart, Trash2, ImageIcon, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PageMascot from '../components/PageMascot'
import ImageCard from '../components/ImageCard'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import Modal from '../components/Modal'

const Gallery = () => {
  const { generatedImages, deleteImage, addToast } = useApp()
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    let imgs = generatedImages
    if (filter === 'favorites') imgs = imgs.filter((i) => i.favorite)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      imgs = imgs.filter((i) => i.prompt.toLowerCase().includes(q) || i.style?.toLowerCase().includes(q))
    }
    return imgs
  }, [generatedImages, filter, searchQuery])

  const handleDeleteAll = () => {
    if (filtered.length === 0) return
    filtered.forEach((img) => deleteImage(img.id))
    addToast('All images cleared')
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <PageMascot page="gallery" />
        </AnimatedSection>

        <AnimatedSection delay={1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="gradient-text">My Gallery</span>
              </h1>
              <p className="text-gray-600">
                {generatedImages.length} design{generatedImages.length !== 1 ? 's' : ''} created
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/studio')}
              className="px-6 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg self-start"
            >
              + Create New Design
            </motion.button>
          </div>
        </AnimatedSection>

        {/* Toolbar */}
        <AnimatedSection delay={2} className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by prompt or style..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
            {['all', 'favorites'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  filter === f ? 'gradient-bg text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f === 'all' ? 'All' : 'Favorites'}
                {f === 'favorites' && (
                  <Heart className="w-3 h-3 inline ml-1" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {generatedImages.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          )}
        </AnimatedSection>

        {filtered.length === 0 ? (
          <AnimatedSection delay={3}>
            <div className="text-center py-20">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center"
              >
                <ImageIcon className="w-10 h-10 text-primary opacity-50" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {generatedImages.length === 0 ? 'No designs yet' : 'No matching designs'}
              </h3>
              <p className="text-gray-500 mb-6">
                {generatedImages.length === 0
                  ? 'Head to the Studio and create your first AI-generated design!'
                  : 'Try adjusting your search or filters.'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/studio')}
                className="px-8 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg"
              >
                Open Studio
              </motion.button>
            </div>
          </AnimatedSection>
        ) : viewMode === 'grid' ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((img, i) => (
              <StaggerItem key={img.id}>
                <ImageCard image={img} index={i} onView={setSelectedImage} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="space-y-3">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.url} alt={img.prompt} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{img.prompt}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{img.style}</span>
                    <span className="text-xs text-gray-400">{img.createdAt}</span>
                  </div>
                </div>
                {img.favorite && <Heart className="w-4 h-4 text-red-500 fill-current flex-shrink-0" />}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)} title="Design Detail" maxWidth="max-w-3xl">
        {selectedImage && (
          <div className="space-y-4">
            <img src={selectedImage.url} alt={selectedImage.prompt} className="w-full rounded-xl" />
            <p className="text-gray-700">{selectedImage.prompt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{selectedImage.style}</span>
              <span>{selectedImage.createdAt}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Gallery
