/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#000', 
          100: '#000', 
          200: '#000',
          300: '#000',
          400: '#000',
          500: '#000',
          600: '#000',
          700: '#000',
          800: '#000',
          900: '#000', 
        },
      },
      backgroundColor: {
        'app-bg': {
          light: '#000', 
          dark: '#000',  
        },
        'sidebar-bg': {
          light: '#000', 
          dark: '#000',  
        },
      },
      animation: {
        'wave': 'wave 1s infinite linear, loading 10s infinite linear alternate',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wave: {
          '0%': { backgroundPosition: '0 bottom' },
          '100%': { backgroundPosition: '200px bottom' }
        },
        loading: {
          '0%': { backgroundSize: '200px 0px' },
          '100%': { backgroundSize: '200px 200px' }
        },
      },
      boxShadow: {
        'loader': 'inset 0 0 20px -5px #fff, inset 0 -40px 40px -20px #fff',
      },
    },
  },
  plugins: [],
};