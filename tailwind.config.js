/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: {
          500: "#242424",
          800: "#1E1E1E",
        },
        text: {
          500: "#ABAEB0",
          800: "#D1D1D1",
        },
        icon: {
          500: "#A5E844",
          800: "#4A8615",
          html: "#F78C6C",
          css: "#89DDFF",
          js: "#FFCB6B",
        },
      },
    },
  },
  plugins: [],
};
