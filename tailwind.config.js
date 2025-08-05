/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#172090",
        darkGrey: {
          border: "#C7C7C7",
          label: "#757575",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      }
    },
  },
  plugins: [],
}