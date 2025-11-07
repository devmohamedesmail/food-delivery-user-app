/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // primary: "#fd4a12",
        // secondary: "#ed5108ff",
        // accent: "#FBBF24",
        // background: "#F3F4F6"
        primary: {
          DEFAULT: "#fd4a12",   // Light mode
          dark: "#fd4a12",      // Dark mode (نفس اللون إذا تريده يكون ثابت)
        },
        background: {
          DEFAULT: "#F3F4F6",   // Light mode background
          dark: "#0D0D0D",      // Dark mode background
        },
        text: {
          DEFAULT: "#1E293B",   // Light text
          dark: "#FFFFFF",      // Dark text
        },
    },
  },
  plugins: [],
}
};
