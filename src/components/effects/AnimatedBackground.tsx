"use client";

import { useParallax } from "@/hooks/useParallax";

const AMBIENT_PARTICLES = [
  { left: 9, top: 14, size: 2, color: "#3B82F6", depth: 0.55 },
  { left: 18, top: 7, size: 2, color: "#8B5CF6", depth: 0.3 },
  { left: 31, top: 27, size: 1.5, color: "#10B981", depth: 0.7 },
  { left: 46, top: 12, size: 1.5, color: "#3B82F6", depth: 0.4 },
  { left: 66, top: 21, size: 2, color: "#8B5CF6", depth: 0.6 },
  { left: 84, top: 10, size: 1.5, color: "#10B981", depth: 0.35 },
  { left: 93, top: 31, size: 2, color: "#3B82F6", depth: 0.75 },
  { left: 14, top: 57, size: 1.5, color: "#8B5CF6", depth: 0.45 },
  { left: 38, top: 66, size: 2, color: "#3B82F6", depth: 0.65 },
  { left: 57, top: 52, size: 1.5, color: "#10B981", depth: 0.3 },
  { left: 73, top: 75, size: 2, color: "#8B5CF6", depth: 0.55 },
  { left: 91, top: 63, size: 1.5, color: "#3B82F6", depth: 0.4 },
  { left: 7, top: 88, size: 1.5, color: "#10B981", depth: 0.6 },
  { left: 26, top: 93, size: 2, color: "#8B5CF6", depth: 0.35 },
  { left: 52, top: 86, size: 1.5, color: "#3B82F6", depth: 0.7 },
  { left: 82, top: 92, size: 2, color: "#10B981", depth: 0.45 },
] as const;

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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Radial gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 45%)," +
            "radial-gradient(circle at 80% 70%, rgba(139,92,246,0.18), transparent 45%)," +
            "linear-gradient(135deg, rgba(7,15,31,0.86), rgba(9,9,11,0.94) 56%, rgba(28,18,53,0.8))",
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

      <div className="absolute inset-0">
        {AMBIENT_PARTICLES.map((particle, index) => {
          const x = mouseX * 28 * particle.depth;
          const y = mouseY * 20 * particle.depth - scrollY * 0.018 * particle.depth;

          return (
            <span
              key={index}
              className="absolute rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
                opacity: 0.42,
                transform: `translate3d(${x}px, ${y}px, 0)`,
                transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          );
        })}
      </div>

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
