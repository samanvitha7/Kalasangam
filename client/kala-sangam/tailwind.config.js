/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
        '1680': '1680px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3440px',
        '6xl': '3840px',
      },
      colors: {
        // New Design System Colors
        'deep-teal': '#134856',
        'blush-peach': '#F8E6DA',
        'coral-pink': '#E05264',
        'soft-coral': '#F48C8C',
        'lotus-green': '#1D7C6F',
        'rich-gold': '#FFD700',
        
        // Legacy colors for backward compatibility
        'vermilion': '#E84338',
        'rosehover': '#AC1E5E',
        'saffronglow': '#F2AA6B',
        'coral-red': '#E05264',
        'golden-saffron': '#FFD700',
        'muted-fuchsia': '#F48C8C',
        'indigo-purple': '#1D7C6F',
        'warm-sand': '#F8E6DA',
        'mist-blush': '#F48C8C',
        'saffron-mist': '#FFD700',
        'light-rose-pink': '#F48C8C',
        'deep-charcoal': '#134856',
        'off-white': '#F8E6DA',
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'tac-one': ['Tac One', 'serif'],
        'dm-serif-display': ['DM Serif Display', 'serif'],
        'yatra': ['Yatra One', 'serif'],
        'winky': ['Winky Sans', 'sans-serif'],
        'winky-rough': ['Winky Rough', 'serif'],
        'noto': ['Noto Sans', 'sans-serif'],
      },
      fontSize: {
        heading: '3rem', // You can adjust the size here (e.g., '3.75rem' for 6xl)
      },
      dropShadow: {
          glow: '0 0 8px #facc15', // glowing yellow
        },
      animation: {
        popFade: "popFade 1.2s ease-out both",
        sinkFade: "sinkFade 2s ease-out forwards",
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
      },
      keyframes: {
        popFade: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8) translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        sinkFade: {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(60vh)",
          },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
