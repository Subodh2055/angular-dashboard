/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          primary: '#0066FF',
          secondary: '#6B2CFF',
          success: '#00B386',
          warning: '#E69A00',
          error: '#E62E4D',
          info: '#0080FF',
        }
      }
    },
  },
  plugins: [],
}
