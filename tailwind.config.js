/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#A91D3A',
        costumBlack: '#151515',
        costumWhite: '#EEEEEE',
        costumMerah: '#C73659',
      },
    },
  },
  
  plugins: [
    require('daisyui'),
  ],
}
