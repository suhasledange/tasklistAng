/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

      colors:{
        blue:{
          DEFAULT:'#004b6e'
        }
      },

    },
  },
  plugins: [],
}