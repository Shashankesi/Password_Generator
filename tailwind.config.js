/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e6edff',
          200: '#c7d9ff',
          300: '#a8c5ff',
          400: '#89b1ff',
          500: '#6a9dff',
          600: '#5189ff',
          700: '#3875ff',
          800: '#1f61ff',
          900: '#064dff',
        },
        secondary: {
          50: '#f5f0ff',
          100: '#f0e6ff',
          200: '#e6c7ff',
          300: '#dca8ff',
          400: '#d289ff',
          500: '#c76aff',
          600: '#b851ff',
          700: '#a938ff',
          800: '#9a1fff',
          900: '#7f0ae6',
        },
        accent: {
          50: '#fff0f0',
          100: '#ffe6e6',
          200: '#ffc7c7',
          300: '#ffa8a8',
          400: '#ff8989',
          500: '#ff6a6a',
          600: '#ff5151',
          700: '#ff3838',
          800: '#ff1f1f',
          900: '#e60606',
        },
        dark: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#212529',
          900: '#0d0f12',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(106, 157, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(106, 157, 255, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(106, 157, 255, 0.4)',
        'glow-lg': '0 0 50px rgba(106, 157, 255, 0.5)',
        'glow-accent': '0 0 30px rgba(255, 106, 106, 0.4)',
        'glow-secondary': '0 0 30px rgba(199, 106, 255, 0.4)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      },
    },
  },
  plugins: [],
}
