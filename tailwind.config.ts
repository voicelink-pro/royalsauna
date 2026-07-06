import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium wellness palette: brown, beige, ivory, sand, dark brown, brass accent.
        ivory: {
          DEFAULT: "#FBF8F2",
          50: "#FEFDFB",
          100: "#FBF8F2",
          200: "#F4EEE2",
        },
        sand: {
          DEFAULT: "#E7DBC6",
          100: "#F1E9D9",
          200: "#E7DBC6",
          300: "#D9C8AC",
          400: "#C9B189",
        },
        clay: {
          DEFAULT: "#B08D57",
          400: "#C2A472",
          500: "#B08D57",
          600: "#977542",
        },
        bark: {
          DEFAULT: "#5A4632",
          400: "#6E563D",
          500: "#5A4632",
          600: "#46371F",
          700: "#33281A",
          800: "#241C12",
          900: "#171109",
        },
        brass: {
          DEFAULT: "#C9A24B",
          light: "#DCC079",
          dark: "#A9842F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
      },
      maxWidth: {
        content: "1280px",
        prose: "68ch",
      },
      boxShadow: {
        soft: "0 12px 40px -12px rgba(70, 55, 31, 0.25)",
        card: "0 8px 30px -10px rgba(70, 55, 31, 0.20)",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "zoom-slow": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1s ease both",
        "step-in": "fade-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 7s ease-in-out infinite",
        "zoom-slow": "zoom-slow 24s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
