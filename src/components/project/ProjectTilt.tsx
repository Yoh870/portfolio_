"use client";

import { useRef, useCallback } from "react";
import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/utils";

interface ProjectTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * 3D tilt on hover.
 *
 * PERF FIX: handlers memoized with useCallback so a re-render of
 * the parent Projects list doesn't re-register new function references
 * on every card. The reduced-motion check is captured once in a ref.
 */
export function ProjectTilt({ children, className, maxTilt = 8 }: ProjectTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reducedRef.current || e.pointerType === "touch" || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateY(-4px)`;
    },
    [maxTilt]
  );

  const handlePointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "transition-transform duration-300 ease-out [transform-style:preserve-3d]",
        className
      )}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
