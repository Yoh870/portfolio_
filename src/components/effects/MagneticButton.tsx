"use client";

import { useRef, useCallback } from "react";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps any element with a subtle magnetic pull toward the cursor.
 *
 * PERF FIX: The reduced-motion check is now stable across renders
 * (computed once in a ref) instead of being re-evaluated on every
 * pointer move. Handlers are useCallback-memoized so they don't
 * re-register on every render of the parent component.
 */
export function MagneticButton({ children, strength = 0.3, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedRef.current || e.pointerType === "touch" || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * strength}px, ${y * (strength + 0.05)}px)`;
    },
    [strength]
  );

  const handlePointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{ willChange: "transform", transition: "transform 0.25s ease-out" }}
    >
      {children}
    </div>
  );
}
