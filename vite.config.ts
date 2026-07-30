import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiDevMiddleware } from './server/dev-middleware.js'

export default defineConfig({
  plugins: [react(), apiDevMiddleware()],
})
