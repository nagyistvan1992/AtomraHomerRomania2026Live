/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'beige': {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f2eb',
          300: '#f0ebe0',
          400: '#e8dfc8',
          500: '#ddd4b0',
          600: '#c7ba9a',
          700: '#a69b7f',
          800: '#857c64',
          900: '#6b634f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scroll-banner': 'scrollBanner 30s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '475px',
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'tighter': '-0.025em',
        'normal': '0em',
        'wider': '0.025em',
        'widest': '0.05em',
        'ultra-wide': '0.1em',
        'super-wide': '0.2em',
      },
      lineHeight: {
        'tighter': '1.1',
        'ultra-tight': '1.05',
      },
    },
  },
  plugins: [],
};