import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // هذا السطر يجبر المتصفح على قراءة ملفات الـ جافاسكربت والـ CSS بشكل صحيح
})