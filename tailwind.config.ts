/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        maru: ['"Zen Maru Gothic"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        // CSS-variable-backed so dark mode works via [data-dark="true"]
        cream: 'rgb(var(--cream) / <alpha-value>)',
        ink:   'rgb(var(--ink)   / <alpha-value>)',
        red:   '#e84040',
        blue:  '#3a7bd5',
        green: '#2daa55',
        yellow:'#f0a020',
      },
      borderRadius: {
        pill: '9999px',
        card: '18px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(.34,1.56,.64,1) forwards',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
        bounceIn:  { from: { opacity: '0', transform: 'scale(0.85)' },      to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
