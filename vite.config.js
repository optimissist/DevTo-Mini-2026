import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/reddit': {
          target: 'https://old.reddit.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/reddit/, ''),
        },
      }
    },
   test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
