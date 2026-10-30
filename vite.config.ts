import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glslify from "vite-plugin-glslify"
import { resolve } from 'path'
// import { createHtmlPlugin } from 'vite-plugin-html'
// import Critters from 'critters'
import { beasties } from 'vite-plugin-beasties'
export default defineConfig({
  plugins: [
    react(),
    glslify(),
    // beasties({
    //   // optional beasties configuration
    //   options: {
    //     preload: 'swap',
    //   }
    // })
  
    // Plugin pour générer le HTML et éventuellement injecter des variables (si besoin)
    // createHtmlPlugin({
    //   inject: {
    //     // Ajoute ici uniquement les propriétés valides pour InjectOptions
    //   },
    //   minify: true,
    // }),
    // Plugin pour inline le CSS critique avec Critters
    // {
    //   name: 'vite-plugin-inline-critical-css',
    //   enforce: 'post',
    //   apply: 'build',
    //   transformIndexHtml: {
    //     enforce: 'post',
    //     async transform(html, { bundle }) {
    //       const critters = new Critters({
    //         // Options de Critters selon tes besoins
    //         preload: 'swap',
    //         pruneSource: true,
    //         logLevel: 'info'
    //       })
    //       return await critters.process(html)
    //     }
    //   }
    // }
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
          gsap: ['gsap']
        }
      }
    },
    sourcemap: true
  },
  publicDir: 'public'
})