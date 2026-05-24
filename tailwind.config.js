/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          navy: '#023852',
          teal: '#079FA0',
          mint: '#9FD8C5',
          yellow: '#FAC005',
          orange: '#F58B01',
          red: '#DC2E2F'
        }
      },
      fontFamily: {
        arco: ['"Arco"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
