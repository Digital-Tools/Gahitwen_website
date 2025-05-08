/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          50: '#fffbeb',
          100: '#fff6d6',
          200: '#ffeead',
          300: '#ffe685',
          400: '#ffdc4d',
          500: '#FFC200', // Primary yellow
          600: '#e6af00',
          700: '#cc9b00',
          800: '#a37c00',
          900: '#7a5d00',
          950: '#4d3a00',
        },
        brown: {
          50: '#f9f6f5',
          100: '#efe8e5',
          200: '#ded0cc',
          300: '#c8b2aa',
          400: '#ac8f83',
          500: '#967566',
          600: '#816155',
          700: '#6c5047',
          800: '#5c443e',
          900: '#3B271F', // Primary brown
          950: '#2b1d18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        smooth: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};