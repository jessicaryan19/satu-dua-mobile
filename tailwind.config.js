/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#172090",
        secondary: "#D90000",
        disabled: "#8A8FC7",
        accent: "#D8E7FF",
        darkGrey: {
          border: "#C7C7C7",
          label: "#757575",
        },
        warning: {
          default: "#FAAD14",
          accent: "#FFFBE6"
        }
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      }
    },
  },
  plugins: [],
}