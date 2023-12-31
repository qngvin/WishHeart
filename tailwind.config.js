/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      backgroundImage: {
        color_1: "linear-gradient(to right, #ddddb2bd, #78a7d7)",
      },
      boxShadow:{
        box_shadow_1:'19px 17px 26px -10px #647784'
      }
    },
  },
  plugins: [],
};
