import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps in production to prevent 404 errors
  },
  server: {
    proxy: {
      "/api": "http://localhost:5050",
    },
  },
})
