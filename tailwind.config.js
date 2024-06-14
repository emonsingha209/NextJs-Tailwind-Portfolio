/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "360px",
        xns: "480px",
      },
      backgroundImage: {
        "cardBg":
          "radial-gradient(150% 150% at 0% 100%, #261c45 0%, rgba(35, 25, 74, 0) 100%)",
      },
      fontFamily: {
        oswald: ["var(--font-oswald)"],
        lato: ["var(--font-lato)"],
        playfair: ["var(--font-playfair)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scale: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        opacityUp: {
          "0%": { opacity: 0 },
          "50%": { opacity: 0 },
          "70%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        ring: {
          "0%": {
            opacity: 1,
            transform: "scale(0)",
          },
          "20%": {
            opacity: 1,
          },
          "80%, 100%": {
            opacity: 0,
            transform: "scale(1)",
          },
        },
        opacityDown: {
          "0%": { opacity: 1 },
          "10%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
        glow: {
          "0%": {
            color: "hsl(var(--ring))",
            textShadow: "none",
          },
          "20%": {
            color: "hsl(var(--ring))",
            textShadow: "none",
          },
          "40%": {
            color: "#5BA0F9",
            textShadow: "0 0 7px #3E7FF1, 0 0 50px #468CF7",
          },
          "60%": {
            color: "hsl(var(--ring))",
            textShadow: "none",
          },
          "80%": {
            color: "hsl(var(--ring))",
            textShadow: "none",
          },
          "100%": {
            color: "hsl(var(--ring))",
            textShadow: "none",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scale: "scale 0.5s ease-in-out",
        glow: "glow 4s linear infinite",
        opacityUp: "opacityUp",
        opacityDown: "opacityDown",
        ringOne: "ring 4s ease-out 1s infinite",
        ringTwo: "ring 4s ease-out 2s infinite",
        ringThree: "ring 4s ease-out 3s infinite",
      },
      transitionTimingFunction: {
        primary: "cubic-bezier(.47,1.64,0.41,0.8)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
