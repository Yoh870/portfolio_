"use client";

import { useParallax } from "@/hooks/useParallax";

/**
 * Full-page ambient backdrop.
 * 
 * Moved from Hero section to layout.tsx so the parallax effect
 * persists across ALL sections as the user scrolls down the page.
 *
 * PARALLAX:
 * - Blobs drift at different speeds on scroll creating depth
 * - Mouse movement pushes blobs in opposite directions
 * - Grid subtly shifts on scroll for added depth
 *
 * position:fixed so it stays behind everything on the page.
 * z-index:-10 so all content sits above it.
 * aria-hidden — purely decorative.
 */
export function AnimatedBackground() {
  const { scrollY, mouseX, mouseY } = useParallax();

  // Blob 1 — blue, top-left, follows cursor
  const blob1X = mouseX * 40;
  const blob1Y = mouseY * 30 - scrollY * 0.12;

  // Blob 2 — purple, bottom-right, moves away from cursor
  const blob2X = -mouseX * 35;
  const blob2Y = -mouseY * 25 - scrollY * 0.06;

  // Blob 3 — green, center-right, subtle drift
  const blob3X = mouseX * 20;
  const blob3Y = mouseY * 15 - scrollY * 0.09;

  // Grid shifts slightly on scroll for depth
  const gridY = scrollY * 0.04;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Radial gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.16), transparent 45%)," +
            "radial-gradient(circle at 80% 70%, rgba(139,92,246,0.16), transparent 45%)",
        }}
      />

      {/* Faint grid — shifts on scroll */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: `translateY(${gridY}px)`,
          maskImage:
            "radial-gradient(ellipse 100% 100% at 50% 0%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 100% at 50% 0%, #000 30%, transparent 100%)",
        }}
      />

      {/* Blob 1 — blue, top-left */}
      <div
        className="absolute -left-32 -top-32 h-[500px] w-[500px] animate-blob1 rounded-full bg-accent opacity-25 blur-[120px]"
        style={{
          willChange: "transform",
          transform: `translate(${blob1X}px, ${blob1Y}px)`,
          transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Blob 2 — purple, bottom-right */}
      <div
        className="absolute -right-24 bottom-[-15%] h-[450px] w-[450px] animate-blob2 rounded-full bg-accent-secondary opacity-25 blur-[120px]"
        style={{
          willChange: "transform",
          transform: `translate(${blob2X}px, ${blob2Y}px)`,
          transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Blob 3 — green, center */}
      <div
        className="absolute left-[50%] top-[40%] h-[320px] w-[320px] animate-blob1 rounded-full bg-success opacity-08 blur-[130px] [animation-direction:reverse]"
        style={{
          willChange: "transform",
          transform: `translate(${blob3X}px, ${blob3Y}px)`,
          transition: "transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: 0.08,
        }}
      />
    </div>
  );
}
