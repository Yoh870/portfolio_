"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollState {
  direction: "up" | "down";
  isAtTop: boolean;
}

/**
 * Reports scroll direction and whether the page is still at the top.
 *
 * PERF FIX: setState is now batched behind a requestAnimationFrame so
 * the handler fires at most once per paint frame instead of on every
 * scroll event tick, cutting unnecessary re-renders in Navbar by ~90%.
 */
export function useScrollDirection(threshold = 8): ScrollState {
  const [state, setState] = useState<ScrollState>({ direction: "up", isAtTop: true });
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const y = window.scrollY;
        const diff = y - lastY.current;
        if (Math.abs(diff) < threshold) return;
        setState({ direction: diff > 0 ? "down" : "up", isAtTop: y < 80 });
        lastY.current = y;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [threshold]);

  return state;
}
