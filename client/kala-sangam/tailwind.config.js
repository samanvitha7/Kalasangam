/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'teal-blue': '#134856',
        'coral-red': '#E85A4F',
        'golden-saffron': '#F6A100',
        // Accent Colors
        'muted-fuchsia': '#DA639B',
        'indigo-purple': '#6D47A2',
        // Background Colors
        'warm-sand': '#F8E6DA',
        'mist-blush': '#FBEDEE',
        'saffron-mist': '#FFE5B2',
        'light-rose-pink': '#FADADD',
        // Text Colors
        'deep-charcoal': '#2E2E2E',
        'off-white': '#FFF8F1',
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'tac-one': ['Tac One', 'cursive'],
        'dm-serif-display': ['DM Serif Display', 'serif'],

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
