"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which section is currently in view.
 *
 * PERF FIX: sectionIds is stringified into a stable ref so the effect
 * never re-runs due to a new array reference on every render (Navbar
 * was calling NAV_LINKS.map() inline, creating a new array each time).
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsRef = useRef(sectionIds);

  useEffect(() => {
    idsRef.current = sectionIds;
  });

  useEffect(() => {
    const elements = idsRef.current
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeId;
}
