import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stellar: {
          DEFAULT: '#7B61FF',
          light: '#9B85FF',
          dark: '#5A43D6',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
