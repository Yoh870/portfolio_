import type { Variants, Transition } from "framer-motion";

/**
 * Shared Framer Motion variants — single source of truth for all
 * motion across the portfolio.
 *
 * PERF: All objects are module-level constants. Framer Motion compares
 * variant references to decide whether to re-animate; if each component
 * created its own inline { opacity:0, y:28 } object, reference
 * inequality would trigger unnecessary animation recalculations.
 * Module constants are the same reference everywhere.
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

/**
 * Returns a stagger container variant.
 * NOTE: called at component definition time (const variants = staggerChildren(...))
 * not inside render, so the returned object is also stable.
 */
export function staggerChildren(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
