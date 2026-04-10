import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0a1628",
          card: "#111f36",
          elevated: "#1a2d4a",
        },
        accent: {
          DEFAULT: "#10b981",
          muted: "rgba(16, 185, 129, 0.2)",
        },
        chip: "#1e3a5f",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
