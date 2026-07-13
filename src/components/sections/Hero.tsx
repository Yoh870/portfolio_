"use client";

import { motion, useSpring, useTransform, motionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Spotlight } from "@/components/effects/Spotlight";
import { Particles } from "@/components/effects/Particles";
import { TypingText } from "@/components/effects/TypingText";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { fadeUp, fadeIn, staggerChildren } from "@/lib/animations";
import { useParallax } from "@/hooks/useParallax";

const ROTATING_PHRASES = [
  "Frontend craftsmanship.",
  "Reliable backend systems.",
  "Real-world problem solving.",
  "Pixel-perfect interfaces.",
];

/**
 * Hero section with scroll + mouse parallax on content elements.
 *
 * PARALLAX LAYERS (front to back):
 * 1. CTAs + trust line — fastest scroll (most "in front")
 * 2. Headline + lead — medium speed
 * 3. Badge — slowest (furthest back of foreground)
 * 4. AnimatedBackground blobs — slowest (background layer)
 *
 * MOUSE PARALLAX:
 * - Headline tilts subtly toward cursor (rotateX/rotateY)
 * - Badge drifts slightly in cursor direction
 * - Lead paragraph has micro horizontal drift
 *
 * Spring physics on mouse values makes motion feel weighted
 * and natural rather than mechanical.
 */
export function Hero() {
  const { scrollY, mouseX, mouseY } = useParallax();

  // Spring-smoothed mouse values for natural feel
  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };
  const smoothMouseX = useSpring(motionValue(0), springConfig);
  const smoothMouseY = useSpring(motionValue(0), springConfig);

  useEffect(() => {
    smoothMouseX.set(mouseX);
    smoothMouseY.set(mouseY);
  }, [mouseX, mouseY, smoothMouseX, smoothMouseY]);

  // Headline 3D tilt from mouse
  const headlineRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3, -3]);
  const headlineRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);

  // Badge drift from mouse
  const badgeX = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const badgeY = useTransform(smoothMouseY, [-0.5, 0.5], [-4, 4]);

  // Lead paragraph micro drift
  const leadX = useTransform(smoothMouseX, [-0.5, 0.5], [-3, 3]);

  // Scroll parallax offsets for content layers
  const badgeParallax = -scrollY * 0.06;
  const headlineParallax = -scrollY * 0.04;
  const leadParallax = -scrollY * 0.02;

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:px-16"
    >
      <Spotlight />
      <Particles />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren(0.11, 0.15)}
        className="mx-auto w-full max-w-5xl"
        style={{ perspective: "1200px" }}
      >
        {/* ── Availability badge — slowest parallax layer ────────── */}
        <motion.a
          href="#contact"
          variants={fadeUp}
          style={
            reducedMotion
              ? undefined
              : { x: badgeX, y: badgeParallax }
          }
          className="group mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-muted/80 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm"
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Available for new opportunities
          <ArrowRight
            size={11}
            aria-hidden="true"
            className="text-muted/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </motion.a>

        {/* ── Headline — 3D tilt on mouse + scroll parallax ──────── */}
        <motion.h1
          id="hero-heading"
          variants={fadeUp}
          style={
            reducedMotion
              ? undefined
              : {
                  rotateX: headlineRotateX,
                  rotateY: headlineRotateY,
                  y: headlineParallax,
                  transformStyle: "preserve-3d",
                }
          }
          className="font-display text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white"
        >
          Building software
          <br />
          that actually{" "}
          <span
            className="bg-gradient-to-br from-accent via-accent to-accent-secondary bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
          >
            solves problems.
          </span>
        </motion.h1>

        {/* ── Lead paragraph — micro drift ───────────────────────── */}
        <motion.p
          variants={fadeUp}
          style={reducedMotion ? undefined : { x: leadX, y: leadParallax }}
          className="mt-6 max-w-[48ch] text-[1.05rem] leading-[1.75] text-muted sm:text-[1.1rem]"
        >
          I&rsquo;m Yoh &mdash; a full stack developer based in Ilagan, Isabela. I build
          web applications and information systems that solve real-world
          problems, from database schema to polished UI.
        </motion.p>

        {/* ── Typing line ────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mt-4 flex h-7 items-center"
          aria-hidden="true"
        >
          <span className="mr-2 text-sm text-white/30">Currently focused on</span>
          <span className="font-display text-sm font-medium text-accent">
            <TypingText phrases={ROTATING_PHRASES} />
          </span>
        </motion.div>

        {/* ── CTAs ───────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
        >
          <MagneticButton>
            <Button
              href="#featured"
              variant="primary"
              icon={<FolderOpen size={15} aria-hidden="true" />}
            >
              View featured work
            </Button>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-lg px-1 py-1 font-semibold text-sm text-muted/80 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in touch
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </MagneticButton>
        </motion.div>

        {/* ── Trust signals ──────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mt-14 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" aria-hidden="true" />
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-muted/40">
            Full stack · PHP · React · Next.js · MySQL
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" aria-hidden="true" />
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ─────────────────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted/40">
          Scroll
        </span>
        <svg
          width="14"
          height="22"
          viewBox="0 0 14 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce text-muted/30"
        >
          <path d="M7 3v10M2 11l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
