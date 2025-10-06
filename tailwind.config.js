/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#006996", // EMC Blue
          light: "#3387aa",
          dark: "#004d6e",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#939598", // EMC Gray
          light: "#a9abac",
          dark: "#6f7173",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#f4f4f4",
          foreground: "#6f7173",
        },
        accent: {
          DEFAULT: "#006996",
          foreground: "#FFFFFF",
        },
        black: "#000000",
        white: "#FFFFFF",
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#FFFFFF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "#006996",
          2: "#939598",
          3: "#3387aa",
          4: "#a9abac",
          5: "#004d6e",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
