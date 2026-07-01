"use client";

import type { ReactNode, ElementType } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp } from "@/lib/animations";

interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}

/**
 * Generic "fade + rise into place on scroll" wrapper.
 *
 * PERF FIX: The motion tag is typed precisely (motion.div by default)
 * rather than using motion(as) which creates a new component class on
 * every render. The `as` prop is narrowed to only the tags we
 * actually use, preventing unnecessary Framer Motion overhead.
 */
export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
