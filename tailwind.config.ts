import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "70": "17.5rem", // 280px
        "75": "18.75rem", // 300px
        "80": "20rem", // 320px
        "95": "23.75rem", // 380px
        "105": "26.25rem", // 420px
        "160": "40rem", // 640px
      },
      borderWidth: {
        "50": "50px",
        "60": "60px",
      },
      zIndex: {
        "12": "12",
      },
    },
  },
  plugins: [],
};

export default config;
