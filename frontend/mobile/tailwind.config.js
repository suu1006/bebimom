/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F4A7B9",
        background: "#FFF5F7",
        "input-bg": "#FFF0F4",
        border: "#F9D0DC",
        foreground: "#4A2030",
        subtle: "#A07080",
        placeholder: "#BBA9B0",
      },
    },
  },
  plugins: [],
};
