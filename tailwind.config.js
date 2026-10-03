/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        dark: '#1e1b4b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
        'grid-pattern-dark': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-14px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0)' }, '50%': { boxShadow: '0 0 32px 8px rgba(236,72,153,0.35)' } },
        gradientShift: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        blobMorph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 40% 60% 70%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 40%' },
        },
        twinkle: { '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' }, '50%': { opacity: '1', transform: 'scale(1.2)' } },
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        progressBar: { '0%': { width: '0%' }, '100%': { width: '100%' } },
        countUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        ping2: { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.55s ease-out forwards',
        fadeInUp: 'fadeInUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards',
        float: 'float 3.5s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        gradientShift: 'gradientShift 5s ease infinite',
        blobMorph: 'blobMorph 9s ease-in-out infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        ticker: 'ticker 28s linear infinite',
        ping2: 'ping2 1.8s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
}
