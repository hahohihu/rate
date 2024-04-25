import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "fg-c": "var(--foreground-color)",
        "fg2-c": "var(--foreground2-color)",
        "fg3-c": "var(--foreground3-color)",
        "h1-c": "var(--header1-color)",
        "h2-c": "var(--header2-color)",
        "sep-c": "var(--separator-color)",
        "act-c": "var(--action-color)",
        "hi-c": "var(--highlight-color)",
      }
    },
  },
  plugins: [],
};
export default config;
