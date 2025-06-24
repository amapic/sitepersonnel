import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glslify from "vite-plugin-glslify";
// import compression from 'vite-plugin-compression'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    glslify()
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        confidentialite: resolve(__dirname, 'confidentialite.html'),
        mentionsLegales: resolve(__dirname, 'mentions-legales.html'),
        error404: resolve(__dirname, '404.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
          gsap: ['gsap'],
        }
      }
    }
  },
  publicDir: 'public'
})