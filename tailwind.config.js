const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('./named-colors'),
    require('@tailwindcss/forms')({strategy: 'class'}),
    require('tailwind-scrollbar-hide'),
    require("@headlessui/tailwindcss"),
  ]
}
