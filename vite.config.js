import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Set base to your repo name for GitHub Pages
  base: '/football-chatbot-frontend/',
})