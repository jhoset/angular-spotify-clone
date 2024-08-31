/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        typewriter: "typewriter 2s steps(11) forwards"
      },
      keyframes: {
        typewriter: {
          to: {
            left: "100%"
          }
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

