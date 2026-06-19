/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // هنا يتم توجيه Tailwind لقراءة كافة ملفات المكونات
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}