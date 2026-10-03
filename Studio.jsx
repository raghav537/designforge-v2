import { useState, useEffect } from 'react'
import { Sparkles, Wand2, Download, RefreshCw, Palette, Image as ImageIcon, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp, buildImageUrl } from '../context/AppContext'
import PageMascot from '../components/PageMascot'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import Modal from '../components/Modal'

const STYLES = [
  { name: 'Digital Art', value: 'digital art, vibrant colors' },
  { name: 'Watercolor', value: 'watercolor painting, soft edges' },
  { name: '3D Render', value: '3D render, octane, cinematic lighting' },
  { name: 'Flat Design', value: 'flat design, minimalist, clean' },
  { name: 'Anime', value: 'anime style, detailed illustration' },
  { name: 'Photorealistic', value: 'photorealistic, 8k, ultra detailed' },
  { name: 'Sketch', value: 'pencil sketch, hand drawn' },
  { name: 'Pop Art', value: 'pop art, bold colors, comic style' },
]

const SIZES = [
  { label: 'Square', width: 512, height: 512 },
  { label: 'Portrait', width: 512, height: 768 },
  { label: 'Landscape', width: 768, height: 512 },
  { label: 'Wide', width: 1024, height: 512 },
]

const Studio = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0])
  const [selectedSize, setSelectedSize] = useState(SIZES[0])
  const [generating, setGenerating] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const { addGeneratedImage, addToast, generatedImages } = useApp()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('prompt')
    if (q) setPrompt(q)
  }, [searchParams])

  const handleGenerate = async (e) => {
    e?.preventDefault()
    if (!prompt.trim()) {
      addToast('Enter a prompt to generate your design', 'error')
      return
    }

    setGenerating(true)
    const url = buildImageUrl(prompt.trim(), selectedStyle.value, selectedSize.width, selectedSize.height)

    const img = new Image()
    img.onload = () => {
      setPreviewUrl(url)
      setGenerating(false)
      addGeneratedImage(prompt.trim(), selectedStyle.name, url)
      addToast('Design generated successfully!')
    }
    img.onerror = () => {
      setGenerating(false)
      addToast('Generation failed. Please try again.', 'error')
    }
    img.src = url
  }

  const recentImages = generatedImages.slice(0, 4)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <PageMascot page="studio" />
        </AnimatedSection>

        <AnimatedSection delay={1}>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">AI Design Studio</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Create stunning images and designs with AI. Describe your vision and watch it come to life.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Controls */}
          <AnimatedSection delay={2} className="lg:col-span-2 space-y-6">
            <form onSubmit={handleGenerate} className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Sparkles className="w-4 h-4 inline mr-1 text-primary" />
                  Describe your design
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic cityscape at sunset with neon lights reflecting on wet streets..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1 text-primary" />
                  Art Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLES.map((style) => (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedStyle.name === style.name
                          ? 'gradient-bg text-white shadow-md scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-primary'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1 text-primary" />
                  Canvas Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size.label}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedSize.label === size.label
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={generating}
                whileHover={{ scale: generating ? 1 : 1.02 }}
                whileTap={{ scale: generating ? 1 : 0.98 }}
                className="w-full py-4 gradient-bg text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating your design...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Design
                  </>
                )}
              </motion.button>
            </form>
          </AnimatedSection>

          {/* Preview */}
          <AnimatedSection delay={3} className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[400px] flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Preview</h3>
                {previewUrl && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewOpen(true)}
                      className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      Full Size
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Regenerate
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center p-6 relative">
                {generating ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl gradient-bg animate-pulseGlow flex items-center justify-center">
                      <Wand2 className="w-10 h-10 text-white animate-bounceSoft" />
                    </div>
                    <p className="text-gray-500 font-medium">Creating your masterpiece...</p>
                    <p className="text-xs text-gray-400 mt-1">This usually takes 5-15 seconds</p>
                  </motion.div>
                ) : previewUrl ? (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={previewUrl}
                    alt={prompt}
                    className="max-w-full max-h-[500px] rounded-xl shadow-lg cursor-pointer"
                    onClick={() => setPreviewOpen(true)}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Your generated design will appear here</p>
                    <p className="text-sm mt-1">Enter a prompt and click Generate</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Recent generations */}
        {recentImages.length > 0 && (
          <AnimatedSection delay={4} className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold gradient-text">Recent Creations</h2>
              <button
                onClick={() => navigate('/gallery')}
                className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
              >
                View all in Gallery →
              </button>
            </div>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentImages.map((img) => (
                <StaggerItem key={img.id}>
                  <div
                    className="group relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer"
                    onClick={() => { setPreviewUrl(img.url); setPrompt(img.prompt); setPreviewOpen(true) }}
                  >
                    <img src={img.url} alt={img.prompt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-white text-xs line-clamp-2">{img.prompt}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>
        )}
      </div>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Design Preview" maxWidth="max-w-3xl">
        {previewUrl && (
          <div className="space-y-4">
            <img src={previewUrl} alt={prompt} className="w-full rounded-xl" />
            <p className="text-sm text-gray-600">{prompt}</p>
            <a
              href={previewUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-lg text-sm font-semibold"
            >
              <Download className="w-4 h-4" /> Download
            </a>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Studio
