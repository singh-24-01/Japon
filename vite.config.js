import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Configuration Vite pour l'application Japon
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Alias @ pointe vers le dossier src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
