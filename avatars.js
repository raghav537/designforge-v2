const STYLES = {
  cartoon: 'adventurer',
  mascot: 'fun-emoji',
  persona: 'avataaars',
  bot: 'bottts',
}

export function cartoonAvatar(seed, style = 'cartoon', size = 128) {
  const styleKey = STYLES[style] || style
  return `https://api.dicebear.com/7.x/${styleKey}/png?seed=${encodeURIComponent(seed)}&size=${size}`
}

export const PAGE_MASCOTS = {
  home: {
    name: 'Pixel',
    seed: 'pixel-creative',
    style: 'mascot',
    message: "Hi! I'm Pixel. Describe your vision and let's create something amazing!",
    color: 'from-pink-500 to-purple-500',
  },
  studio: {
    name: 'Brush',
    seed: 'brush-studio',
    style: 'mascot',
    message: "Welcome to the Studio! Enter a prompt and I'll help you generate stunning designs.",
    color: 'from-indigo-500 to-blue-500',
  },
  gallery: {
    name: 'Frame',
    seed: 'frame-gallery',
    style: 'mascot',
    message: 'Your creations live here! Browse, organize, and manage all your generated images.',
    color: 'from-emerald-500 to-teal-500',
  },
  collections: {
    name: 'Curio',
    seed: 'curio-collections',
    style: 'mascot',
    message: 'Explore curated design collections for inspiration on your next creation!',
    color: 'from-amber-500 to-orange-500',
  },
  brandDna: {
    name: 'Brandie',
    seed: 'brandie-dna',
    style: 'persona',
    message: 'Define your visual style DNA to guide every image you generate!',
    color: 'from-purple-500 to-violet-500',
  },
  techpacks: {
    name: 'Tech',
    seed: 'tech-projects',
    style: 'bot',
    message: 'Track your design projects from concept to final image export.',
    color: 'from-cyan-500 to-blue-500',
  },
  features: {
    name: 'Spark',
    seed: 'spark-features',
    style: 'mascot',
    message: 'Discover powerful AI tools for image generation and design creation!',
    color: 'from-fuchsia-500 to-pink-500',
  },
  pricing: {
    name: 'Coin',
    seed: 'coin-pricing',
    style: 'persona',
    message: 'Pick the perfect plan for your creative workflow. Start generating for free!',
    color: 'from-yellow-500 to-amber-500',
  },
  bootcamp: {
    name: 'Professor',
    seed: 'professor-learn',
    style: 'persona',
    message: 'Learn the art of AI image generation with our expert-led courses!',
    color: 'from-rose-500 to-red-500',
  },
}

export function designerAvatar(name) {
  return cartoonAvatar(name, 'cartoon', 96)
}

export function userAvatar(name) {
  return cartoonAvatar(name, 'persona', 96)
}
