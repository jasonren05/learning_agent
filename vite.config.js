import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // 允许外部访问
    port: 5173,       // 明确指定端口
    proxy: {
      '/api': {
        target: 'http://172.24.0.2:5001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
