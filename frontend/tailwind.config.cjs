const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0f172a',
          light: '#334155',
          dark: '#020617'
        }
      },
      fontFamily: {
        heading: ['"Baloo 2"', '"Quicksand"', '"Comic Neue"', ...defaultTheme.fontFamily.sans],
        body: ['"Quicksand"', '"Comic Neue"', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(6deg)' }
        }
      },
      animation: {
        float: 'float 12s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
