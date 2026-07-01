/**
 * Ambient backdrop for the hero.
 *
 * PERF: Pure CSS animations only — no JS, no state, no re-renders.
 * `will-change: transform` on the blobs tells the compositor to hoist
 * them to GPU layers before the animation starts, so movement happens
 * on the compositor thread and never blocks the main thread.
 *
 * aria-hidden — purely decorative, never announced.
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Radial gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 45%)," +
            "radial-gradient(circle at 80% 70%, rgba(139,92,246,0.18), transparent 45%)",
        }}
      />

      {/* Faint grid, masked toward the bottom */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      {/* Drifting blobs — will-change promotes to GPU compositor layer */}
      <div
        className="absolute -left-32 -top-32 h-[420px] w-[420px] animate-blob1 rounded-full bg-accent opacity-30 blur-[100px]"
        style={{ willChange: "transform" }}
      />
      <div
        className="absolute -right-24 bottom-[-10%] h-[380px] w-[380px] animate-blob2 rounded-full bg-accent-secondary opacity-30 blur-[100px]"
        style={{ willChange: "transform" }}
      />
      <div
        className="absolute left-[55%] top-[35%] h-[260px] w-[260px] animate-blob1 rounded-full bg-success opacity-10 blur-[100px] [animation-direction:reverse]"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
