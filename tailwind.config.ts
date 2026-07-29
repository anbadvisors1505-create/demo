import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E1512",
          800: "#131C18",
          700: "#1A2620",
          600: "#223229",
        },
        paper: {
          DEFAULT: "#F6F3EA",
          dim: "#EDE9DA",
        },
        brass: {
          DEFAULT: "#C4A35A",
          light: "#DCC488",
          dark: "#A9843F",
        },
        teal: {
          DEFAULT: "#1F4B43",
          dark: "#123430",
          light: "#2F6F62",
        },
        graphite: "#2A2E2B",
        line: "rgba(196, 163, 90, 0.22)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        ledger:
          "repeating-linear-gradient(to bottom, transparent, transparent 39px, rgba(196,163,90,0.14) 40px)",
      },
      boxShadow: {
        panel: "0 30px 80px -30px rgba(14, 21, 18, 0.55)",
        brass: "0 0 0 1px rgba(196,163,90,0.35)",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
