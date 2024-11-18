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
        primary: {
          gray: "hsl(0,0%,17%)",
        },
        aero: {
          50: '#f1fafe',
          100: '#e1f5fd',
          200: '#bdebfa',
          300: '#83dbf6',
          400: '#41caef',
          500: '#19b9e6',
          600: '#0b91be',
          700: '#0a749a',
          800: '#0d617f',
          900: '#115169',
          950: '#0b3346',
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
          950: '#000080',
        },
      },
      backgroundImage: {
        gridPattern: "url('/diagonal-stripes.svg')"
      }
    },
  },
  plugins: [],
} satisfies Config;
