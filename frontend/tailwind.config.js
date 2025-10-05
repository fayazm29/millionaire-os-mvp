/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B6CB0",
        accent: "#63B3ED",
        ink: "#1A202C",
        muted: "#4A5568",
        soft: "#F7FAFC",
        border: "#E2E8F0"
      },
      boxShadow: { card: "0 2px 8px rgba(0,0,0,0.06)" },
      borderRadius: { xl: "16px", "2xl": "20px" }
    },
  },
  plugins: [],
};
