const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  future: {
  },
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add more here
  ],
  darkMode: 'class',
  theme: {
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
    }
  ],
  content: [
    // ...
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ]
}
