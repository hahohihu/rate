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
        "color-brand": "var(--color-brand)",
        "color-dominant": "var(--color-dominant)",
        "color-hover": "var(--color-hover)",
        "color-ordinary": "var(--color-ordinary)",
        "color-reach": "var(--color-reach)",
        "color-separator": "var(--color-separator)",
        "color-noise": "var(--color-noise)",
        "color-bottom": "var(--color-bottom)",
        "color-middle": "var(--color-middle)",
        "color-top": "var(--color-top)",
        "color-fly": "var(--color-fly)",
        "color-star": "var(--color-star)",
      }
    },
  },
  plugins: [],
};
export default config;
