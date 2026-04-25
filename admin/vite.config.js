import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    port: 5174,
    host: 'localhost',
    strictPort: true,
=======
    host: '127.0.0.1',
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  }
})

