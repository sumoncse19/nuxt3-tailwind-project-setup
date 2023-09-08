/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        'lgx': '1200px',
        'lgdx': '1280px',
        'dx': '1366px',
        '2dx': '1440px',
        '3xl': '1920px',
      },
      colors: {
        heading: "#2F2F2F",
        orange: "#FF7B00",
        "primary": "#FDB21D",
        "light-white": "#F0F0F0",
      },
    },
  },
  plugins: [],
}

