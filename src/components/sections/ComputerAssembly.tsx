"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Scroll-driven computer assembly section.
 * The SVG computer assembles part by part as the user scrolls.
 * Each part triggers a label change.
 *
 * Parts reveal order: Monitor → CPU → Keyboard → Mouse → fully assembled
 * Labels: "I design interfaces" → "I build systems" → "I write clean code" → "Let's build something together"
 *
 * The section is tall (300vh) so the user scrolls through the animation
 * while the content sticks in place (position: sticky).
 */

interface Part {
  id: string;
  threshold: number; // 0-1 scroll progress when this part appears
  label: string;
  sublabel: string;
}

const PARTS: Part[] = [
  { id: "monitor",  threshold: 0.05, label: "I design interfaces",        sublabel: "Frontend · UI/UX · React · Next.js" },
  { id: "cpu",      threshold: 0.28, label: "I build systems",            sublabel: "Backend · PHP · Node.js · MySQL" },
  { id: "keyboard", threshold: 0.52, label: "I write clean code",         sublabel: "TypeScript · Clean architecture · Git" },
  { id: "mouse",    threshold: 0.72, label: "I ship real products",       sublabel: "Deployed · Production-ready · Live users" },
  { id: "done",     threshold: 0.88, label: "Let's build something together.", sublabel: "Available for new opportunities" },
];

const ACC  = "#3B82F6";
const PUR  = "#8B5CF6";
const GRN  = "#10B981";
const CARD = "#111827";
const BDR  = "rgba(255,255,255,0.08)";

export function ComputerAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeLabel, setActiveLabel] = useState<Part>(PARTS[0]);
  const [prevLabel, setPrevLabel] = useState<Part>(PARTS[0]);
  const [labelKey, setLabelKey] = useState(0);

  // Drive scroll progress manually via IntersectionObserver + scroll listener
  // so we get smooth 0-1 values tied to section scroll depth.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);

      // Find active label
      let active = PARTS[0];
      for (const part of PARTS) {
        if (p >= part.threshold) active = part;
      }
      setActiveLabel(prev => {
        if (prev.id !== active.id) {
          setPrevLabel(prev);
          setLabelKey(k => k + 1);
        }
        return active;
      });
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth progress for SVG animations
  const smoothP = useRef(progress);
  useEffect(() => {
    smoothP.current = progress;
  }, [progress]);

  // Part visibility: 1 = fully visible, 0 = hidden
  const vis = (threshold: number, nextThreshold = 1) => {
    if (progress < threshold) return 0;
    return Math.min(1, (progress - threshold) / 0.08);
  };

  const monitorVis   = vis(PARTS[0].threshold);
  const cpuVis       = vis(PARTS[1].threshold);
  const keyboardVis  = vis(PARTS[2].threshold);
  const mouseVis     = vis(PARTS[3].threshold);
  const glowVis      = vis(PARTS[4].threshold);
  const isDone       = progress >= PARTS[4].threshold;

  // Cable visibility (connects CPU to monitor)
  const cableVis = Math.max(0, Math.min(1, (cpuVis + monitorVis - 1)));

  return (
    // Tall container — 300vh so there's room to scroll through
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }} aria-label="Computer assembly scroll animation">
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-manrope, sans-serif)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: ACC,
            marginBottom: "1.5rem",
          }}
        >
          What I do
        </motion.p>

        {/* SVG Computer */}
        <div style={{ position: "relative", width: "min(520px, 90vw)", marginBottom: "2.5rem" }}>
          <svg
            viewBox="0 0 520 320"
            width="100%"
            aria-hidden="true"
            style={{ overflow: "visible" }}
          >
            {/* Monitor glow — only when done */}
            {glowVis > 0 && (
              <ellipse
                cx="200" cy="75" rx="110" ry="50"
                fill={ACC}
                fillOpacity={0.06 * glowVis}
                style={{ filter: "blur(20px)" }}
              />
            )}

            {/* ── Monitor stand base ── */}
            <rect
              x="178" y="178" width="48" height="6" rx="3"
              fill={CARD} stroke={BDR} strokeWidth="1"
              opacity={monitorVis}
            />
            {/* Monitor stand neck */}
            <rect
              x="195" y="154" width="14" height="26" rx="2"
              fill={CARD} stroke={BDR} strokeWidth="1"
              opacity={monitorVis}
            />

            {/* ── Monitor body ── */}
            <rect
              x="90" y="20" width="224" height="136" rx="10"
              fill={CARD}
              stroke={isDone ? ACC : BDR}
              strokeWidth={isDone ? "1.5" : "1"}
              opacity={monitorVis}
              style={{ transition: "stroke 0.6s ease" }}
            />
            {/* Monitor screen bezel */}
            <rect
              x="102" y="30" width="200" height="116" rx="6"
              fill="#0a0f1a"
              opacity={monitorVis}
            />
            {/* Monitor screen content — appears when done */}
            {isDone && monitorVis > 0.5 && (
              <>
                <rect x="116" y="44" width="172" height="4" rx="2" fill={ACC} fillOpacity="0.4" opacity={glowVis} />
                <rect x="116" y="54" width="120" height="3" rx="1.5" fill={BDR} opacity={glowVis} />
                <rect x="116" y="62" width="148" height="3" rx="1.5" fill={BDR} opacity={glowVis} />
                <rect x="116" y="74" width="172" height="52" rx="4" fill={ACC} fillOpacity="0.06" opacity={glowVis} />
                <text x="202" y="100" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={ACC} fillOpacity={glowVis * 0.9}>
                  npm run dev
                </text>
                <rect x="116" y="134" width="60" height="6" rx="3" fill={GRN} fillOpacity={0.4 * glowVis} opacity={glowVis} />
              </>
            )}
            {/* Monitor brand dot */}
            <circle cx="202" cy="152" r="2.5" fill={BDR} opacity={monitorVis} />

            {/* ── CPU Tower ── */}
            <rect
              x="350" y="30" width="100" height="160" rx="8"
              fill={CARD}
              stroke={isDone ? PUR : BDR}
              strokeWidth={isDone ? "1.5" : "1"}
              opacity={cpuVis}
              style={{ transition: "stroke 0.6s ease" }}
            />
            {/* CPU drive slots */}
            <rect x="362" y="44" width="76" height="10" rx="3" fill="#0a0f1a" opacity={cpuVis} />
            <rect x="362" y="60" width="76" height="10" rx="3" fill="#0a0f1a" opacity={cpuVis} />
            {/* CPU power button */}
            <circle cx="373" cy="88" r="6" fill={isDone ? GRN : "#1e293b"} opacity={cpuVis} style={{ transition: "fill 0.6s ease" }} />
            {/* CPU vent lines */}
            {[0,1,2,3,4].map(i => (
              <rect key={i} x="362" y={106 + i * 12} width="76" height="3" rx="1.5" fill={BDR} opacity={cpuVis * 0.6} />
            ))}

            {/* ── Cable (monitor ↔ CPU) ── */}
            <path
              d={`M 314 75 C 340 75 340 75 350 75`}
              fill="none"
              stroke={BDR}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={cableVis}
            />

            {/* ── Keyboard ── */}
            <rect
              x="56" y="220" width="250" height="68" rx="8"
              fill={CARD}
              stroke={isDone ? GRN : BDR}
              strokeWidth={isDone ? "1.5" : "1"}
              opacity={keyboardVis}
              style={{ transition: "stroke 0.6s ease" }}
            />
            {/* Keyboard keys — 4 rows */}
            {[0,1,2,3].map(row => (
              Array.from({ length: row === 3 ? 5 : 10 }).map((_, col) => {
                const keyW = row === 3 ? 40 : 22;
                const keyX = 66 + col * (keyW + 3);
                const keyY = 230 + row * 14;
                if (keyX + keyW > 298) return null;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={keyX} y={keyY}
                    width={keyW} height={10}
                    rx="2"
                    fill={isDone ? `rgba(59,130,246,0.06)` : "#0a0f1a"}
                    stroke={isDone ? `rgba(59,130,246,0.15)` : BDR}
                    strokeWidth="0.5"
                    opacity={keyboardVis}
                    style={{ transition: "fill 0.6s ease, stroke 0.6s ease" }}
                  />
                );
              })
            ))}

            {/* ── Mouse ── */}
            <rect
              x="348" y="222" width="48" height="68" rx="24"
              fill={CARD}
              stroke={isDone ? PUR : BDR}
              strokeWidth={isDone ? "1.5" : "1"}
              opacity={mouseVis}
              style={{ transition: "stroke 0.6s ease" }}
            />
            {/* Mouse split line */}
            <line x1="372" y1="222" x2="372" y2="260" stroke={BDR} strokeWidth="1" opacity={mouseVis} />
            {/* Mouse scroll wheel */}
            <rect x="368" y="234" width="8" height="14" rx="4" fill="#0a0f1a" opacity={mouseVis} />

            {/* Progress indicator dots */}
            <g transform="translate(202, 305)">
              {PARTS.slice(0, 4).map((part, i) => (
                <circle
                  key={part.id}
                  cx={(i - 1.5) * 16}
                  cy="0"
                  r="3"
                  fill={progress >= part.threshold ? ACC : BDR}
                  style={{ transition: "fill 0.4s ease" }}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Label area — animates on change */}
        <div style={{ textAlign: "center", minHeight: "80px", position: "relative" }}>
          <motion.div
            key={labelKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk, sans-serif)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: isDone ? ACC : "#f4f4f5",
                marginBottom: "0.5rem",
                transition: "color 0.4s ease",
              }}
            >
              {activeLabel.label}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: "0.9rem",
                color: "rgba(156,163,175,0.8)",
                letterSpacing: "0.05em",
              }}
            >
              {activeLabel.sublabel}
            </p>
          </motion.div>
        </div>

        {/* Scroll progress bar */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: BDR,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${ACC}, ${PUR})`,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Scroll hint — fades out after first interaction */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: progress > 0.05 ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(156,163,175,0.4)" }}>
            Scroll to assemble
          </span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="rgba(156,163,175,0.3)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M7 3v8M2 9l5 5 5-5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
