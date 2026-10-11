/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // white · cream · ice blue
        ivory: '#FCFAF5',
        blush: '#F6F1E7',
        sand: '#ECE5D7',
        line: '#E6E1D7',
        ink: '#1B2733',
        muted: '#57636F',
        ice: { DEFAULT: '#2F6485', dark: '#214A63', soft: '#E7F2F9', mist: '#CDE4F2', glow: '#A9CFE6' },
        gold: { DEFAULT: '#C2A877', deep: '#76623F', soft: '#F4EDE0' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,39,51,.04), 0 8px 24px -8px rgba(27,39,51,.10)',
        lift: '0 2px 4px rgba(27,39,51,.05), 0 24px 48px -16px rgba(33,74,99,.24)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
}
