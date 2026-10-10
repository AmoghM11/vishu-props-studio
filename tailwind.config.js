/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F3',
        blush: '#F4EAE5',
        sand: '#EADFD4',
        line: '#E6DBD2',
        ink: '#211B1E',
        muted: '#665A5F',
        plum: { DEFAULT: '#6E2F4F', dark: '#4E1F38', soft: '#F1E3EA' },
        gold: { DEFAULT: '#B48A4E', deep: '#8A6633', soft: '#F5ECDD' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(33,27,30,.04), 0 8px 24px -8px rgba(33,27,30,.10)',
        lift: '0 2px 4px rgba(33,27,30,.05), 0 24px 48px -16px rgba(78,31,56,.22)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
}
