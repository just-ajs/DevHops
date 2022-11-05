/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      pale: "#EFF2F2",
      light: "#FCFCFC",
      brand: "#4285F4",
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
