/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in": "url('../public/images/64.svg')",
      },
      colors: {
        primary: "#980DFF",
        "primary-200": "#D396FF",
        "primary-400": "#BF68FF",
        "primary-600": "#AC3BFF",
        "primary-800": "#8000DE",
        "primary-1000": "#4B0082",
        success: "#06d6a0",
        failure: "#e71d36",
      },
      screens: {
        xs: "420px",
        xxs: "240px",
      },
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
    },
  },
  plugins: [require("daisyui")],
};
