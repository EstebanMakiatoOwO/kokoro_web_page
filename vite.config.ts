import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/kokoro_web_page/',
  resolve: {
    alias: {
      '@domain': resolve(__dirname, 'src/domain'),
      '@application': resolve(__dirname, 'src/application'),
      '@infrastructure': resolve(__dirname, 'src/infrastructure'),
      '@presentation': resolve(__dirname, 'src/presentation'),
      '@components': resolve(__dirname, 'src/presentation/components'),
      '@sections': resolve(__dirname, 'src/presentation/sections'),
      '@hooks': resolve(__dirname, 'src/presentation/hooks'),
      '@layouts': resolve(__dirname, 'src/presentation/layouts'),
      '@animations': resolve(__dirname, 'src/presentation/animations'),
      '@styles': resolve(__dirname, 'src/presentation/styles'),
      '@admin': resolve(__dirname, 'src/presentation/admin'),
    },
  },
})
