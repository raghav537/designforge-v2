import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Gallery from './pages/Gallery'
import Collections from './pages/Collections'
import BrandDNA from './pages/BrandDNA'
import Techpacks from './pages/Techpacks'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Bootcamp from './pages/Bootcamp'
import { AppProvider } from './context/AppContext'
import ToastStack from './components/Toast'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/brand-dna" element={<BrandDNA />} />
            <Route path="/techpacks" element={<Techpacks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/bootcamp" element={<Bootcamp />} />
          </Routes>
          <ToastStack />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
