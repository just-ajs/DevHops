/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      light: "#FCFCFC",
      medium: "#EBEBEB",
      brand: "#4285F4",
      slate: "#333333"
    },
    fontFamily: {
      'sans': ['Open Sans', 'sans-serif'],
    },
    extend: {
      height: {
        vh: '100vh',
        vw: '100vw',
      },
      width: {
        vh: '100vh',
        vw: '100vw',
      }
    },
  },
  plugins: [],
}
