/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        customRed: '#A91D3A',
        customBlack: '#151515',
        customWhite: '#F1F1F1',
        costumMerah: '#C73659',
        costumBlue: '#344C64',
      },
    },
  },
  
  plugins: [
    require('daisyui'),
  ],
}
