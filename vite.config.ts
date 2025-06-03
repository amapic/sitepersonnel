import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glslify from "vite-plugin-glslify";
export default defineConfig({
  plugins: [react(),glslify()],
  server: {
    port: 3000,
    open: true
  }
})