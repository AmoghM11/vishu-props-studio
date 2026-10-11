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
        ink: '#1D2B38',
        muted: '#57636F',
        // light blue family: `light` is the signature fill, DEFAULT/dark are for readable text & icons
        ice: { DEFAULT: '#2F739C', dark: '#225878', light: '#B9DDF2', hover: '#A2D0EC', soft: '#EBF6FC', mist: '#D6ECF8', glow: '#9FCDEA' },
        // cream family (labels now use the readable blue so the palette stays blue · cream · white)
        gold: { DEFAULT: '#D8BF8E', deep: '#2F739C', soft: '#F5EFE3' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,39,51,.04), 0 8px 24px -8px rgba(27,39,51,.10)',
        lift: '0 2px 4px rgba(27,39,51,.05), 0 24px 48px -16px rgba(47,115,156,.20)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
}
