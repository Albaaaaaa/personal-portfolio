/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Custom breakpoint used by the hero heading scale.
        xs: '420px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        serifDisplay: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        // Apple-leaning palette.
        accent: '#0071E3',
        ink: '#1d1d1f',
        mist: '#F5F5F7',
      },
    },
  },
  plugins: [],
}