/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DC2626",
        secondary: "#10B981	",
        background: "#F9FAFB",
        textd: "#1F2937",
        textl: "#6B7280",
        info: "#38BDF8",
        warnings: "#F59E0B",
        divider: "#E5E7EB	"
      },
      fontFamily: {
        patrik: "Patrick Hand",
        urban: "Urbanist"

      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

