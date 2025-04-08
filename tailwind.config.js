/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0c0e14', // Deeper blue-black
        'secondary': '#141a28', // Rich dark blue
        'accent': '#4361ee', // Vibrant blue
        'accent-secondary': '#3bc9db', // Cyan accent
        'accent-tertiary': '#7209b7', // Deep purple
        'accent-glow': '#4cc9f0', // Electric blue for glowing effects
        'accent-highlight': '#f72585', // Vibrant pink for highlights
        'muted': '#8d99ae',
        'card': 'rgba(20, 26, 40, 0.7)', // For glassmorphism
        'card-hover': 'rgba(30, 36, 50, 0.8)' // Darker shade for hover states
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'border-flow': 'border-flow 3s linear infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.7s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.7s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(67, 97, 238, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(67, 97, 238, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '300% 50%' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      backgroundImage: {
        'cyber-pattern': "url('/src/assets/cyber-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0c0e14 0%, #141a28 50%, #1a2236 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(20, 26, 40, 0.7) 0%, rgba(30, 36, 50, 0.7) 100%)',
        'glow-gradient': 'linear-gradient(45deg, #4361ee, #3bc9db, #7209b7, #4361ee)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 5px rgba(67, 97, 238, 0.5), 0 0 20px rgba(67, 97, 238, 0.3)',
        'neon-strong': '0 0 5px rgba(67, 97, 238, 0.7), 0 0 20px rgba(67, 97, 238, 0.5), 0 0 40px rgba(67, 97, 238, 0.3)',
        'neon-cyan': '0 0 5px rgba(59, 201, 219, 0.7), 0 0 20px rgba(59, 201, 219, 0.5), 0 0 40px rgba(59, 201, 219, 0.3)',
        'neon-purple': '0 0 5px rgba(114, 9, 183, 0.7), 0 0 20px rgba(114, 9, 183, 0.5), 0 0 40px rgba(114, 9, 183, 0.3)',
        'inner-glow': 'inset 0 0 10px rgba(67, 97, 238, 0.3)',
        'inner-glow-strong': 'inset 0 0 15px rgba(67, 97, 238, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(67, 97, 238, 0.3)'
      }
    },
  },
  plugins: [],
}