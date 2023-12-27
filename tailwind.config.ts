import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        sizeIncrease: {
          '0%': {
            transform: 'translateY(-25%)'
          },
          '50%': {
            transform: 'translateY(0)' /* Increase the size by 20% */
          },
          '100%': {
            transform: 'translateY(-25%)'
          }
        }
      },
      animation: {
        sizeIncrease: 'sizeIncrease 3s infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },



    },
  },
  plugins: [],
}
export default config
