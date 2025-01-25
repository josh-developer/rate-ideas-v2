/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontSize: {
        'primary-heading': ['1.375rem', '1.815rem'],
      },
      backgroundColor: {
        primary: '#F2F4F7',
        secondary: '#F7F9FC',
        success: '#02BF67',
        'success-50': '#ECFDF3',
      },
      textColor: {
        primary: '#1D2939',
        secondary: '#101828',
        info: '#475467',
      },
      borderColor: {
        primary: '#E4E7EC',
      },
    },
  },
  plugins: [],
};
