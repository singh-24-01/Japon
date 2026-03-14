/** @type {import('tailwindcss').Config} */
export default {
  // Fichiers à scanner pour les classes Tailwind
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Palette de couleurs inspirée du Japon
      colors: {
        japon: {
          rouge:   '#D62828', // Rouge soleil levant
          blanc:   '#FFF8F0', // Blanc cassé / washi
          noir:    '#1A1A2E', // Noir encre de Chine
          dore:    '#D4AF37', // Doré / laque
          rose:    '#FFB7C5', // Rose sakura
          gris:    '#8C8C9E', // Gris ardoise
          vert:    '#2D6A4F', // Vert matcha
          bleu:    '#1B4F72', // Bleu indigo
        }
      },
      // Polices de caractères
      fontFamily: {
        serif:  ['"Noto Serif JP"', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      // Animations personnalisées
      animation: {
        'sakura-fall':    'sakuraFall 8s linear infinite',
        'sakura-sway':    'sakuraSway 3s ease-in-out infinite',
        'fade-in-up':     'fadeInUp 0.8s ease-out forwards',
        'fade-in':        'fadeIn 1s ease-out forwards',
        'pulse-slow':     'pulse 3s ease-in-out infinite',
        'brush-stroke':   'brushStroke 1.5s ease-out forwards',
      },
      keyframes: {
        sakuraFall: {
          '0%':   { transform: 'translateY(-100px) rotate(0deg)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' }
        },
        sakuraSway: {
          '0%, 100%': { marginLeft: '0px' },
          '50%':      { marginLeft: '40px' }
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' }
        },
        brushStroke: {
          '0%':   { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      // Espacement personnalisé
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Hauteur minimale
      minHeight: {
        'screen-nav': 'calc(100vh - 4rem)'
      }
    }
  },
  plugins: []
}
