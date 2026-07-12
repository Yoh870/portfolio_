"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxState {
  scrollY: number;
  mouseX: number;
  mouseY: number;
}

/**
 * Single hook that tracks both scroll position and mouse position,
 * both throttled via rAF so they never fire more than once per frame.
 * Returns normalized mouse values (-0.5 to 0.5) centered at viewport
 * midpoint — easier to use for parallax offsets than raw px values.
 */
export function useParallax(): ParallaxState {
  const [state, setState] = useState<ParallaxState>({
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const rafId = useRef<number | null>(null);
  const latest = useRef({ scrollY: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const flush = () => {
      rafId.current = null;
      setState({ ...latest.current });
    };

    const schedule = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(flush);
    };

    const handleScroll = () => {
      latest.current.scrollY = window.scrollY;
      schedule();
    };

    const handleMouse = (e: MouseEvent) => {
      // Normalize: -0.5 (left/top) to +0.5 (right/bottom)
      latest.current.mouseX = e.clientX / window.innerWidth - 0.5;
      latest.current.mouseY = e.clientY / window.innerHeight - 0.5;
      schedule();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return state;
}
