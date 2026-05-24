import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@gamecards/data': path.resolve(__dirname, './src/data'),
      '@gamecards/application': path.resolve(__dirname, './src/application'),
      '@gamecards/presentation': path.resolve(__dirname, './src/presentation')
    }
  }
})
