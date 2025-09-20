/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-devanagari': ['Noto Sans Devanagari', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'title-black': '#000000',
        'azul-codea': '#132F56',
        'verde-codea': '#53C1A9',
      },
    },
  },
  plugins: [],
}
