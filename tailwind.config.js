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
        'custom-md': '767px',    // Custom medium screen breakpoint
      },
    },
  },
  plugins: [],
};
