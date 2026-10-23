import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths so the site works from GitHub Pages' /repo-name/ subfolder
  base: './',
  plugins: [
    react(),
    tailwindcss()
  ],
})