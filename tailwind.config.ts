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
        "fg-brand": "var(--fg-brand)",
        "fg-dominant": "var(--fg-dominant)",
        "fg-hover": "var(--fg-hover)",
        "fg-ordinary": "var(--fg-ordinary)",
        "fg-reach": "var(--fg-reach)",
        "fg-separator": "var(--fg-separator)",
        "fg-noise": "var(--fg-noise)",
        "bg-bottom": "var(--bg-bottom)",
        "bg-middle": "var(--bg-middle)",
        "bg-top": "var(--bg-top)",
      }
    },
  },
  plugins: [],
};
export default config;
