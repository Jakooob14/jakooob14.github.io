import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        alt: {
          gray: {
            primary: 'hsl(0, 0%, 18%)',
            50: 'hsl(0, 0%, 5%)',
            100: 'hsl(0, 0%, 10%)',
            200: 'hsl(0, 0%, 20%)',
            250: 'hsl(0, 0%, 25%)',
            300: 'hsl(0, 0%, 30%)',
            400: 'hsl(0, 0%, 40%)',
            500: 'hsl(0, 0%, 50%)',
            600: 'hsl(0, 0%, 60%)',
            700: 'hsl(0, 0%, 70%)',
            800: 'hsl(0, 0%, 80%)',
            900: 'hsl(0, 0%, 90%)',
            950: 'hsl(0, 0%, 95%)'
          }
        },
        aero: {
          50:  'hsl(198,87%,97%)', // #f1fafe
          100: 'hsl(197,88%,94%)', // #e1f5fd
          200: 'hsl(195,86%,86%)', // #bdebfa
          300: 'hsl(194,86%,74%)', // #83dbf6
          400: 'hsl(193,84%,60%)', // #41caef
          500: 'hsl(193,80%,50%)', // #19b9e6
          600: 'hsl(195,89%,39%)', // #0b91be
          700: 'hsl(196,88%,32%)', // #0a749a
          800: 'hsl(196,81%,27%)', // #0d617f
          900: 'hsl(196,72%,24%)', // #115169
          950: 'hsl(199,73%,16%)'  // #0b3346
        },
        navy: {
          50: '#f1f4ff',
          100: '#e5e8ff',
          200: '#ced5ff',
          300: '#a7b1ff',
          400: '#767fff',
          500: '#3f42ff',
          600: '#2118ff',
          700: '#1007fa',
          800: '#0d05d2',
          900: '#0c06ac',
          950: '#000080'
        },
      },
      backgroundImage: {
        gridPattern: "url('/diagonal-stripes.svg')"
      },
      fontFamily: {
        heading: "'Montserrat', sans-serif",
        text: "'Poppins', sans-serif"
      }
    },
  },
  plugins: [],
} satisfies Config;
