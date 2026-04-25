import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        festival: {
          blue: "#2563EB",
          dark: "#1E3A8A",
          light: "#DBEAFE",
          background: "#F8FAFC",
          text: "#0F172A",
          muted: "#64748B",
          border: "#E2E8F0"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
