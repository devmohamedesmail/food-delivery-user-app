/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "red",
        secondary: "#ed5108ff",
        accent: "#FBBF24",
        background: "#F3F4F6"
    },
  },
  plugins: [],
}
};
