/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF8F3',
          100: '#F6F0E6',
          200: '#F0E7D8',
          300: '#E8DAC2',
        },
        gold: {
          50: '#F7EFDD',
          100: '#EBD8AE',
          200: '#DCBF80',
          300: '#C6A15C',
          400: '#A8823E',
          500: '#8C6A30',
          600: '#6E5225',
        },
        ink: {
          800: '#2B2621',
          900: '#1D1A16',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Jost"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        script: ['"Alex Brush"', 'cursive'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(43, 38, 33, 0.08)',
        card: '0 4px 18px rgba(43, 38, 33, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      }
    },
  },
  plugins: [],
}
