import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:5050",
    },
  },
  build: {
    // Output directory
    outDir: 'dist',
    // Generate sourcemaps for production debugging (optional, remove if not needed)
    sourcemap: false,
    // Target modern browsers for better optimization
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React chunks
          vendor: ['react', 'react-dom'],
          // Router chunk
          router: ['react-router-dom'],
          // Animation libraries
          animations: ['framer-motion', 'lottie-react', 'gsap', 'aos'],
          // UI components
          ui: ['@heroicons/react', '@tailwindcss/forms', 'lucide-react', 'react-icons'],
          // 3D libraries
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          // Utilities
          utils: ['axios', 'clsx', 'react-intersection-observer'],
          // Form and calendar components
          components: ['react-calendar', 'react-toastify'],
          // Other libraries
          misc: ['bootstrap', 'jquery', '@vishalvoid/react-india-map']
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.[^.]*$/, '') : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].[ext]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash].[ext]`;
          }
          if (/\.(mp3|wav|ogg|mp4|webm)$/i.test(assetInfo.name)) {
            return `media/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
      // External dependencies that shouldn't be bundled
      external: [],
    },
    // Increase chunk size warning limit for better optimization
    chunkSizeWarningLimit: 1000,
    // Enable minification with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.log and debugger in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        // Additional compression options
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
      },
      mangle: {
        // Mangle properties for smaller bundle size
        properties: {
          regex: /^_/,
        },
      },
      format: {
        // Remove comments
        comments: false,
      },
    },
    // Optimize assets - inline small assets
    assetsInlineLimit: 4096,
    // Report compressed bundle size
    reportCompressedSize: true,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize CSS
  css: {
    // Enable CSS source maps in development only
    devSourcemap: process.env.NODE_ENV === 'development',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'axios',
      'lottie-react',
    ],
    exclude: [
      // Exclude large dependencies that should be loaded separately
    ],
  },
  // Define constants for better tree shaking
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  // Improve build performance
  esbuild: {
    // Remove console.log in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Enable legal comments
    legalComments: 'none',
  },
})
