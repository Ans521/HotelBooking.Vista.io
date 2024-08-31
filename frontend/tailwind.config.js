/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(148, 88, 8)', // Adding the custom color
      },
    },
  },
  plugins: [],
};


