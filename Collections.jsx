import { Heart, Share2, Eye, Filter, Grid, List } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Avatar from '../components/Avatar'
import PageMascot from '../components/PageMascot'
import { AnimatedSection, AnimatedCard } from '../components/AnimatedSection'

const baseCollections = [
  { id: 1, name: 'Summer Collection 2024', designer: 'Alexandra Chen', items: 24, likes: 342, views: 1250, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop', category: 'Fashion', gradient: 'from-pink-500 to-rose-500' },
  { id: 2, name: 'Minimalist Jewelry', designer: 'Marcus Webb', items: 18, likes: 289, views: 980, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop', category: 'Jewelry', gradient: 'from-purple-500 to-violet-500' },
  { id: 3, name: 'Urban Streetwear', designer: 'Jordan Lee', items: 32, likes: 567, views: 2100, image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop', category: 'Fashion', gradient: 'from-indigo-500 to-blue-500' },
  { id: 4, name: 'Bohemian Home', designer: 'Sofia Martinez', items: 15, likes: 198, views: 756, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop', category: 'Home Decor', gradient: 'from-amber-500 to-orange-500' },
  { id: 5, name: 'Tech Accessories', designer: 'David Kim', items: 21, likes: 423, views: 1567, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop', category: 'Accessories', gradient: 'from-cyan-500 to-teal-500' },
  { id: 6, name: 'Eco Fashion', designer: 'Emma Green', items: 28, likes: 612, views: 2340, image: 'https://images.unsplash.com/photo-1542272617-08f08630329e?w=600&h=400&fit=crop', category: 'Fashion', gradient: 'from-emerald-500 to-green-500' },
  { id: 7, name: 'Luxury Watches', designer: 'Thomas Brown', items: 12, likes: 345, views: 1120, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop', category: 'Accessories', gradient: 'from-slate-500 to-gray-500' },
  { id: 8, name: 'Artisan Ceramics', designer: 'Lily Zhang', items: 19, likes: 267, views: 890, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop', category: 'Home Decor', gradient: 'from-rose-500 to-pink-500' },
]

const filters = ['All', 'Fashion', 'Jewelry', 'Home Decor', 'Accessories', 'Nature']

const Collections = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(4)
  const [searchParams, setSearchParams] = useSearchParams()
  const { favorites, toggleFavorite, addToast } = useApp()
  const query = searchParams.get('q') || ''

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return baseCollections.filter((c) => {
      const matchesFilter = activeFilter === 'All' || c.category === activeFilter
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.designer.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  useEffect(() => setVisibleCount(4), [activeFilter, query])

  const visible = filtered.slice(0, visibleCount)

  const handleShare = (collection) => {
    const url = `${window.location.origin}/collections#${collection.id}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => addToast('Link copied to clipboard'),
        () => addToast(url)
      )
    } else {
      addToast(url)
    }
  }

  const clearSearch = () => setSearchParams({})

  const renderStats = (collection) => {
    const liked = favorites.includes(collection.id)
    const likeCount = collection.likes + (liked ? 1 : 0)
    return { liked, likeCount }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <PageMascot page="collections" />
        </AnimatedSection>

        <AnimatedSection className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Design Inspiration</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Browse curated AI-generated design collections for your next creation
          </p>
          {query && (
            <p className="mt-3 text-sm text-gray-500">
              Showing results for <span className="font-semibold text-gray-800">"{query}"</span>{' '}
              <button onClick={clearSearch} className="text-primary font-semibold hover:text-secondary ml-1">clear</button>
            </p>
          )}
        </AnimatedSection>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeFilter === filter
                      ? 'gradient-bg text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 text-primary' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-100 text-primary' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
              </button>
            </div>
          </div>
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
              Sorted by relevance &middot; {filtered.length} collection{filtered.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No collections match your filters.</p>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visible.map((collection, i) => {
              const { liked, likeCount } = renderStats(collection)
              return (
                <AnimatedCard key={collection.id} index={i} id={collection.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img src={collection.image} alt={collection.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${collection.gradient} text-white text-xs font-semibold rounded-full`}>
                      {collection.category}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button onClick={() => toggleFavorite(collection.id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                      </button>
                      <button onClick={() => handleShare(collection)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{collection.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar name={collection.designer} size="xs" animate />
                      <p className="text-sm text-gray-500">by {collection.designer}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
                        <span>{likeCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{collection.views}</span>
                      </div>
                      <span className="font-medium">{collection.items} items</span>
                    </div>
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((collection, i) => {
              const { liked, likeCount } = renderStats(collection)
              return (
                <AnimatedCard key={collection.id} index={i} id={collection.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-72 overflow-hidden">
                    <img src={collection.image} alt={collection.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${collection.gradient} text-white text-xs font-semibold rounded-full`}>
                      {collection.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{collection.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar name={collection.designer} size="xs" animate />
                          <p className="text-sm text-gray-500">by {collection.designer}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => toggleFavorite(collection.id)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                          <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                        </button>
                        <button onClick={() => handleShare(collection)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500 mt-4">
                      <div className="flex items-center gap-1">
                        <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
                        <span>{likeCount} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{collection.views} views</span>
                      </div>
                      <span className="font-medium">{collection.items} items</span>
                    </div>
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        )}

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-12">
            <button onClick={() => setVisibleCount((c) => c + 4)} className="px-8 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Load More Collections
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections
