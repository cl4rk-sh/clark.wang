import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#0f1729",
        background: "#ffffff",
        foreground: "#0f1729",
        primary: {
          DEFAULT: "#7c2aee",
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#F580B7",
          foreground: "#030712",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#f4f6fb",
          foreground: "#6c7281",
        },
        accent: {
          DEFAULT: "#F15253",
          foreground: "#030712",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f1729",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f1729",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
