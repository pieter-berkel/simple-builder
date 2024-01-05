import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: { preflight: false },
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class"],
  prefix: "sb-",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--sb-border))",
        input: "hsl(var(--sb-input))",
        ring: "hsl(var(--sb-ring))",
        background: "hsl(var(--sb-background))",
        foreground: "hsl(var(--sb-foreground))",
        primary: {
          DEFAULT: "hsl(var(--sb-primary))",
          foreground: "hsl(var(--sb-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--sb-secondary))",
          foreground: "hsl(var(--sb-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--sb-destructive))",
          foreground: "hsl(var(--sb-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--sb-muted))",
          foreground: "hsl(var(--sb-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--sb-accent))",
          foreground: "hsl(var(--sb-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--sb-popover))",
          foreground: "hsl(var(--sb-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--sb-card))",
          foreground: "hsl(var(--sb-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--sb-radius)",
        md: "calc(var(--sb-radius) - 2px)",
        sm: "calc(var(--sb-radius) - 4px)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
};
export default config;
