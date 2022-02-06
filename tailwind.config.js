module.exports = {
  darkMode: "class",
  content: ["./views/*.{html,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        IBM: ["IBM Plex Mono", "monospace"],
        Source: ["Source Code Pro", "monospace"],
        Alegreya: ["Alegreya", "serif"],
        Poppins: ["Poppins", "sans-serif"],
        Baloo_Da_2: ["Baloo Da 2", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
