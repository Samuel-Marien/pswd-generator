/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    letterSpacing: {
      widest: '.30em'
    },
    extend: {
      fontFamily: {
        cousine: ['Cousine']
      },
      width: {
        550: '550px'
      }
    },
    screens: {
      mysm: '550px'
      // => @media (min-width: 550px) { ... }
    }
  },
  plugins: []
}
