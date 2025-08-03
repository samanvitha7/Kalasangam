import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    base: '/',
    build: {
      sourcemap: false, // Disable source maps in production to prevent 404 errors
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      proxy: {
        "/api": "http://localhost:5050",
      },
    },
    define: {
      // Make env variables available to the app
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
  }
})
