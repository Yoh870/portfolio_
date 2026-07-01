import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        card: "#111827",
        accent: {
          DEFAULT: "#3B82F6",
          secondary: "#8B5CF6",
        },
        success: "#10B981",
        muted: "#9CA3AF",
        border: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        accent: ["var(--font-manrope)", "sans-serif"],
      },
      keyframes: {
        blobMove1: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(60px,80px) scale(1.15)" },
        },
        blobMove2: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px,-60px) scale(1.1)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        scrollPulse: {
          "0%": { height: "0", opacity: "0" },
          "50%": { height: "32px", opacity: "1" },
          "100%": { height: "0", opacity: "0" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.3" },
          "100%": { transform: "translateY(-100vh)", opacity: "0" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
      },
      animation: {
        blob1: "blobMove1 22s ease-in-out infinite",
        blob2: "blobMove2 26s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        scrollPulse: "scrollPulse 1.8s ease-in-out infinite",
        floatUp: "floatUp linear infinite",
        borderFlow: "borderFlow 8s linear infinite",
      },
    },
  },
  plugins: [],
  safelist: [
    // Dynamic gradient classes in ProjectCard thumbnails — computed at runtime
    // from THUMB_STYLES map so Tailwind's purge pass can't see them statically.
    "from-violet-500/20", "to-purple-500/20",
    "from-pink-500/20",   "to-rose-500/20",
    "from-sky-500/20",    "to-cyan-500/20",
    "from-rose-500/20",   "to-orange-500/20",
    "from-amber-500/20",  "to-yellow-500/20",
    "from-teal-500/20",   "to-emerald-500/20",
  ],
};

export default config;
