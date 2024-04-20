/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing:{
        25:'6.3rem',
      },
      colors: {
        'primary': '#184977',
        'secondry':'#FDA56F',
        'gray-main':'#fafafa',
        'blue-light':'#8499A7',
        'blue-little-light':'#6F899B',
        'blue-very-light':'#BFD6E7',

        'font-white':'#fefefe',
        'font-green':'#038C00',
      },
    },
  },
  plugins: [],
}

