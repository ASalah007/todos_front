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
    },
  },
  plugins: [],
};
