/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#003D29',
        'secondary':'#3399ff',
        'textColor':'#000000',
        'warningColor':'#EA3A5B',
        'backgroundColor':'#E4F4FF',
        'inputColor':'#DBE4EE'
        
      }
    },
  },
  plugins: [],
}

