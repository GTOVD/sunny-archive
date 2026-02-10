/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#d4af37",
          bright: "#fbbf24",
          muted: "#927238",
        },
        slate: {
          950: "#020617",
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          'to': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
