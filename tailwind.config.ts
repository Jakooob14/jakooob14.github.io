import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          930: '#003673',
          950: '#022349',
          1000: '#001e41'
        }
      },
      screens: {
        fhd: '1920px'
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
      },
      fontFamily: {
        'Rubik': ['Rubik', 'sans-serif'],
        'Arial': ['arial', 'sans-serif']
      },
      brightness: {
        30: '30%'
      },
      spacing: {
        'half': '50%'
      }
    },
  },
  plugins: [],
}
export default config
