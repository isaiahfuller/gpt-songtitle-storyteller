import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/storyteller/story": {
        target: "https://isaiah.moe",
        changeOrigin: true
      }
    }
  }
})
