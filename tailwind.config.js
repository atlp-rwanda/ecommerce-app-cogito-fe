/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#003D29',
        secondary: '#3399ff',
        textColor: '#000000',
        warningColor: '#EA3A5B',
        backgroundColor: '#E4F4FF',
        inputColor: '#DBE4EE',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      screens: {
        'custom-md': '640px',  
        'custom-sm': '380px',
        'view-profile-welcome': '410px',
        'view-profile-card': '1020px',
        'hero-bg': '800px',
        'hero-bg-md': '600px',
        'hero-bg-sm': '515px'
      },
      backgroundImage: {
        'hero-bg': "url('./src/assets/images/heroBackground.jpg')"
      },
    },
  },
  plugins: [],
};
