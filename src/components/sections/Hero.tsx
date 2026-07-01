"use client";

import { motion } from "framer-motion";
import { FolderOpen, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { Spotlight } from "@/components/effects/Spotlight";
import { Particles } from "@/components/effects/Particles";
import { TypingText } from "@/components/effects/TypingText";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { fadeUp, fadeIn, staggerChildren } from "@/lib/animations";

const ROTATING_PHRASES = [
  "Frontend craftsmanship.",
  "Reliable backend systems.",
  "Real-world problem solving.",
  "Pixel-perfect interfaces.",
];

/**
 * POLISH:
 * - Scroll cue icon replaced with a proper animated chevron shape
 *   so it reads as "scroll down" on first glance, not just a line.
 * - Availability badge now links to the contact section — actionable,
 *   not just decorative.
 * - Hero tagline split onto two lines controlled precisely via
 *   max-width so the line break point is intentional on all screens.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16"
    >
      <AnimatedBackground />
      <Spotlight />
      <Particles />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren(0.12, 0.1)}
        className="mx-auto w-full max-w-5xl"
      >
        {/* Availability badge — links to contact */}
        <motion.a
          href="#contact"
          variants={fadeUp}
          className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted transition-colors duration-200 hover:border-accent/40 hover:text-white sm:text-sm"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-success" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Available for new opportunities
        </motion.a>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="max-w-[14ch] font-display text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[1.03] tracking-tight text-white"
        >
          Building software that actually{" "}
          <span className="bg-gradient-to-br from-accent to-accent-secondary bg-clip-text text-transparent">
            solves problems.
          </span>
        </motion.h1>

        {/* Lead */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg"
        >
          I&rsquo;m Yoh, a full stack web developer. I build web applications and
          information systems that solve real-world problems &mdash; pairing intuitive
          interfaces with scalable systems underneath.
        </motion.p>

        {/* Typing line */}
        <motion.div
          variants={fadeUp}
          className="mt-4 h-7 font-display text-base text-accent sm:text-lg"
        >
          <TypingText phrases={ROTATING_PHRASES} />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <MagneticButton>
            <Button
              href="#featured"
              variant="primary"
              icon={<FolderOpen size={16} aria-hidden="true" />}
            >
              View featured work
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              href="#contact"
              variant="secondary"
              icon={<Send size={16} aria-hidden="true" />}
            >
              Get in touch
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted/60">Scroll</span>
        <svg
          width="16" height="24" viewBox="0 0 16 24"
          className="animate-bounce text-muted/40"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M8 4v12M3 13l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
