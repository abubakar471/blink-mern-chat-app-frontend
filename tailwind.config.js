/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.jsx",
    "./src/components/*.jsx",
    "./src/components/routes/*.jsx",
    "./src/pages/*.jsx"
  ],
  theme: {
    
    extend: {
      screens: {
        'xxs': '440px', // min-width
      }
    },
  },
  plugins: [],
}

