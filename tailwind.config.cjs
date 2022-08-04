/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gray: {
            100: '#E1E1E6',
            300: '#C4C4CC',
            400: '#8D8D99',
            500: '#7C7C8A',
            600: '#323238',
            700: '#29292E',
            800: '#202024',
            900: '#121214'
          },
          green: {
            300: '#00B37E',
            500: '#00875F',
            700: '#015F43'
          },
          red: {
            500: '#AB222E',
            700: '#7A1921'
          },
          yellow: {
            500: '#FBA94C'
          }
        }
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono]
      }
    }
  },
  plugins: []
}
