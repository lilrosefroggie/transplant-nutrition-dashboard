import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/transplant-nutrition-dashboard/', // Use root path for local dev
  // When deploying to GitHub Pages, change to: base: './'
})