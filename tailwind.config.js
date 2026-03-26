/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bounceDelayed: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'bounce-1': 'bounceDelayed 1.2s infinite 0ms',
        'bounce-2': 'bounceDelayed 1.2s infinite 200ms',
        'bounce-3': 'bounceDelayed 1.2s infinite 400ms',
      },
    },
  },
  plugins: [],
}
