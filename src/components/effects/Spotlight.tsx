"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * Soft radial glow that follows the cursor within its containing
 * section. Scoped to a single section (rather than the whole page)
 * so it reads as an intentional accent, not a global gimmick.
 * Hidden from assistive tech and ignored entirely on touch-only
 * devices, since there's no cursor to track.
 */
export function Spotlight() {
  const position = useMousePosition();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      style={{
        background: position
          ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.08), transparent 60%)`
          : undefined,
      }}
    />
  );
}
