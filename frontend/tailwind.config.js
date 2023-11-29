import VitePluginSass from 'vite-plugin-sass';
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.html',
    './src/**/*.js',
  ],
  theme: {
    screens: {
      'xs': '540px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    VitePluginSass({
      // Options de configurations pour sass a mettre ici
    }),
  ],
}