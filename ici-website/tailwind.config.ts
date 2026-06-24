import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#E8EDF5',
          100: '#C5D0E8',
          200: '#8FA3CE',
          300: '#5876B4',
          400: '#2B4E99',
          500: '#1A3A7A',
          600: '#0F2A5E',
          700: '#0A1F44',  // PRIMARY NAVY — main brand color
          800: '#071530',
          900: '#040D1E',
        },
        gold: {
          50:  '#FDF8EC',
          100: '#FAF0D0',
          200: '#F5DFA0',
          300: '#EFC965',
          400: '#E6B030',
          500: '#C9A84C',  // PRIMARY GOLD — main accent
          600: '#A07830',  // DEEP GOLD — hover states
          700: '#7A5820',
          800: '#543B12',
          900: '#2E1F06',
        },
        brand: {
          navy: {
            50:  '#E8EDF5',
            100: '#C5D0E8',
            200: '#8FA3CE',
            300: '#5876B4',
            400: '#2B4E99',
            500: '#1A3A7A',
            600: '#0F2A5E',
            700: '#0A1F44',
            800: '#071530',
            900: '#040D1E',
          },
          gold: {
            50:  '#FDF8EC',
            100: '#FAF0D0',
            200: '#F5DFA0',
            300: '#EFC965',
            400: '#E6B030',
            500: '#C9A84C',
            600: '#A07830',
            700: '#7A5820',
            800: '#543B12',
            900: '#2E1F06',
          }
        },
        cream: {
          50:  '#FDFCF9',
          100: '#F9F6F0',  // SECTION BACKGROUND
          200: '#F2EDE3',
          300: '#E8E0D0',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'navy-gradient':  'linear-gradient(135deg, #0A1F44 0%, #1A3A7A 100%)',
        'gold-gradient':  'linear-gradient(135deg, #C9A84C 0%, #A07830 100%)',
        'hero-pattern':   "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':     'fadeUp 0.6s ease-out forwards',
        'fade-in':     'fadeIn 0.8s ease-out forwards',
        'pulse-dot':   'pulseDot 2s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'ticker':      'ticker 60s linear infinite',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulseDot:  { '0%, 100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.5)', opacity: '0.7' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        ticker:    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      boxShadow: {
        'card':    '0 4px 24px rgba(10, 31, 68, 0.08)',
        'card-hover': '0 12px 40px rgba(10, 31, 68, 0.16)',
        'gold':    '0 4px 20px rgba(201, 168, 76, 0.3)',
        'nav':     '0 2px 20px rgba(10, 31, 68, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config
