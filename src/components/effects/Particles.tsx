"use client";

import { useMemo, useEffect, useState } from "react";

interface ParticleData {
  id: number;
  left: number;
  duration: number;
  delay: number;
}

interface ParticlesProps {
  count?: number;
}

/**
 * Slow-rising ambient particles.
 *
 * PERF FIX 1: Deferred mount — particles are only added to the DOM
 * after the first paint (via useEffect) so they never block LCP.
 * The hero headline, lead paragraph, and CTAs all paint first;
 * particles appear a frame later.
 *
 * PERF FIX 2: Values are still memoized once, not recomputed on
 * re-renders.
 *
 * PERF FIX 3: will-change:transform tells the compositor to promote
 * each particle to its own layer before the animation starts,
 * eliminating per-frame paint work during the floatUp animation.
 */
export function Particles({ count = 24 }: ParticlesProps) {
  const [mounted, setMounted] = useState(false);

  const particles = useMemo<ParticleData[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 12 + Math.random() * 14,
        delay: Math.random() * 14,
      })),
    [count]
  );

  useEffect(() => {
    // Defer one frame so particles never compete with LCP content
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-10px] h-[3px] w-[3px] animate-floatUp rounded-full bg-accent opacity-50"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
