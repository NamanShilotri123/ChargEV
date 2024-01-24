/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-300px)",
          },
          "80%": {
            opacity: "0.8",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        "fade-in-down": {
          " 0%": {
            opacity: "0",
            transform: "translateY(-50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        navbar: "fade-in-left 1s ease-in-out",
        fadeInDown: "fade-in-down .8s ease-in",
        fadeInUp: "fade-in-up .8s ease-in",
      },
    },
  },
  plugins: [],
};
