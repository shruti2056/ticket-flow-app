/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D3142',
          light: '#4F5D75',
        },
        accent: {
          DEFAULT: '#EF8354',
          dark: '#D66A3D',
        },
        dark: {
          bg: '#0A0E27',
          surface: '#1A1F3A',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        display: ['Archivo', 'sans-serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'slideIn': 'slideIn 0.6s ease forwards',
        'slideUp': 'slideUp 0.8s ease forwards',
        'slideDown': 'slideDown 0.2s ease',
        'fadeIn': 'fadeIn 0.2s ease',
        'fadeInDown': 'fadeInDown 0.8s ease',
        'fadeInUp': 'fadeInUp 1s ease',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
