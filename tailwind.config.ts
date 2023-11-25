import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "600px",
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateRows: {
        projects: "4rem 1fr",
        "projects-xs": "3rem 1fr",
      },
    },
  },
  plugins: [],
};
export default config;
