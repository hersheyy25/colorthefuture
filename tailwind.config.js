/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka"', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Sage green — primary (muted, soft, NOT neon)
        brand: {
          50: '#f4f8f4',
          100: '#e8f0e8',
          200: '#d1e2d1',
          300: '#b3cbb3',
          400: '#8fb08f',
          500: '#6e956e',
          600: '#557a55',
          700: '#426042',
          800: '#364d36',
          900: '#2c3f2c',
        },
        // Soft blush pink — secondary
        coral: {
          50: '#fdf6f3',
          100: '#fae8e2',
          200: '#f4d2c7',
          300: '#ecb3a3',
          400: '#e08c75',
          500: '#d06a50',
          600: '#b85540',
          700: '#944434',
        },
        // Soft supporting accents
        sky: {
          50: '#f0f7fa',
          100: '#dceef3',
          200: '#bcdde6',
          300: '#8cc5d4',
          400: '#5aa6ba',
          500: '#3d8aa0',
          600: '#306f82',
          700: '#285968',
        },
        butter: {
          50: '#fdf8ed',
          100: '#faeecb',
          200: '#f5dd95',
          300: '#eec65f',
          400: '#e0ad3a',
          500: '#c4902a',
          600: '#a0741f',
        },
        ink: {
          50: '#f7f8f6',
          100: '#eef0ec',
          200: '#dde2dc',
          300: '#c2cbc1',
          400: '#94a392',
          500: '#6b7a69',
          600: '#4d5a4b',
          700: '#3a4438',
          800: '#283027',
          900: '#1a201a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 18s ease-in-out infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      backgroundImage: {
        'grid-faint':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM0 0h40v1H0z' fill='%23000000' fill-opacity='0.025'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
