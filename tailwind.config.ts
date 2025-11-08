import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d6ecff",
          200: "#b0daff",
          300: "#7bbfff",
          400: "#469fff",
          500: "#1d7eff",
          600: "#0d63f0",
          700: "#084ed1",
          800: "#0a3b9f",
          900: "#0d327d",
        },
        slate: {
          950: "#0e1624",
        },
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(135deg, rgba(29,126,255,0.18), rgba(8,78,209,0.05))",
      },
      boxShadow: {
        glow: "0 20px 45px -20px rgba(13, 99, 240, 0.35)",
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
