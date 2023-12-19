import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: { preflight: false },
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "sb-border": "hsl(var(--sb-border))",
        "sb-input": "hsl(var(--sb-input))",
        "sb-ring": "hsl(var(--sb-ring))",
        "sb-background": "hsl(var(--sb-background))",
        "sb-foreground": "hsl(var(--sb-foreground))",
        "sb-primary": {
          DEFAULT: "hsl( var(--sb-primary))",
          "sb-foreground": "hsl(var(--sb-primary-foreground))",
        },
        "sb-secondary": {
          DEFAULT: "hsl(var(--sb-secondary))",
          sforeground: "hsl(var(--sb-secondary-foreground))",
        },
        "sb-destructive": {
          DEFAULT: "hsl(var(--sb-destructive))",
          foreground: "hsl(var(--sb-destructive-foreground))",
        },
        "sb-muted": {
          DEFAULT: "hsl(var(--sb-muted))",
          foreground: "hsl(var(--sb-muted-foreground))",
        },
        "sb-accent": {
          DEFAULT: "hsl(var(--sb-accent))",
          foreground: "hsl(var(--sb-accent-foreground))",
        },
        "sb-popover": {
          DEFAULT: "hsl(var(--sb-popover))",
          foreground: "hsl(var(--sb-popover-foreground))",
        },
        "sb-card": {
          DEFAULT: "hsl(var(--sb-card))",
          foreground: "hsl(var(--sb-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--sb-radius)",
        md: "calc(var(--sb-radius) - 2px)",
        sm: "calc(var(--sb-radius) - 4px)",
      },
    },
  },
};
export default config;
