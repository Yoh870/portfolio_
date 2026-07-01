"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks viewport mouse position for the Spotlight effect.
 *
 * PERF FIX: throttled via requestAnimationFrame so it never queues
 * more than one state update per paint frame, regardless of how fast
 * the pointer moves. Without this, high-dpi mice can fire 200+
 * mousemove events per second, causing the Spotlight to re-render
 * at a rate the browser cannot actually paint.
 */
export function useMousePosition(): MousePosition | null {
  const [position, setPosition] = useState<MousePosition | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return position;
}
