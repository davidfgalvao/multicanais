import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: "#041308",
          900: "#062210",
          850: "#0a2e16",
        },
        surface: {
          DEFAULT: "#07120f",
          card: "#0c1f18",
          elevated: "#123026",
        },
        accent: {
          DEFAULT: "#22c55e",
          bright: "#4ade80",
          muted: "rgba(34, 197, 94, 0.18)",
        },
        chip: "#1e3a5f",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: [
          "var(--font-barlow)",
          "var(--font-geist-sans)",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "glow-sm": "0 0 28px -6px rgba(34, 197, 94, 0.35)",
        "glow-md": "0 0 40px -4px rgba(34, 197, 94, 0.45)",
        card: "0 12px 40px -12px rgba(0, 0, 0, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
