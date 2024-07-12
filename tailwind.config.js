/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'only-content': 'auto',
        'sidebar-content': '20rem auto',
      },
    },
  },
  plugins: [],
};
