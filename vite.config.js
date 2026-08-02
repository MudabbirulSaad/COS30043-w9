import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/cos30043/student/w9/',
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
