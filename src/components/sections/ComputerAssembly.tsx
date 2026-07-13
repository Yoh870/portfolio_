"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform, motionValue } from "framer-motion";

/**
 * Scroll-driven 3D computer assembly — inspired by Spur.us style.
 *
 * The computer SVG starts tilted in 3D perspective and assembles
 * as the user scrolls. Parts float in from different angles with
 * spring physics. Ambient particles drift around the scene.
 *
 * Scroll stages:
 * 0.00 – 0.15  →  Monitor appears, camera pull-back begins
 * 0.25 – 0.40  →  CPU Tower flies in from right
 * 0.45 – 0.60  →  Keyboard slides up from below
 * 0.65 – 0.75  →  Mouse drifts in
 * 0.85 – 1.00  →  Fully assembled, screen lights up, glow pulses
 */

const ACC = "#3B82F6";
const PUR = "#8B5CF6";
const GRN = "#10B981";
const CARD = "#111827";
const BDR = "rgba(255,255,255,0.08)";

interface Stage {
  threshold: number;
  label: string;
  sub: string;
}

const STAGES: Stage[] = [
  { threshold: 0.00, label: "I design interfaces.",       sub: "React · Next.js · Tailwind CSS · Framer Motion" },
  { threshold: 0.25, label: "I build systems.",           sub: "PHP · Node.js · MySQL · REST APIs" },
  { threshold: 0.45, label: "I write clean code.",        sub: "TypeScript · Git · Clean architecture" },
  { threshold: 0.65, label: "I ship real products.",      sub: "Deployed · Production-ready · Live users" },
  { threshold: 0.85, label: "Let's build something together.", sub: "Available for new opportunities" },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  drift: number;
  speed: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  const colors = [ACC, PUR, GRN, "rgba(255,255,255,0.4)"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 1.5 + Math.random() * 2.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    drift: (Math.random() - 0.5) * 60,
    speed: 4 + Math.random() * 6,
    delay: Math.random() * 4,
  }));
}

const PARTICLES = generateParticles(28);

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function vis(progress: number, start: number, duration = 0.12): number {
  return Math.max(0, Math.min(1, (progress - start) / duration));
}

export function ComputerAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [labelKey, setLabelKey] = useState(0);

  // Spring-smoothed progress for buttery 3D rotation
  const rawProgress = useRef(motionValue(0));
  const springProgress = useSpring(rawProgress.current, {
    stiffness: 40,
    damping: 18,
    mass: 0.6,
  });

  // 3D rotation from spring progress
  const rotateX = useTransform(springProgress, [0, 0.5, 1], [18, 6, 0]);
  const rotateY = useTransform(springProgress, [0, 0.3, 0.7, 1], [-22, -10, 4, 0]);
  const scale   = useTransform(springProgress, [0, 0.4, 1], [0.78, 0.92, 1]);
  const translateZ = useTransform(springProgress, [0, 1], [-80, 0]);

  const updateProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / total));
    setProgress(p);
    rawProgress.current.set(p);

    let idx = 0;
    STAGES.forEach((s, i) => { if (p >= s.threshold) idx = i; });
    setStageIndex(prev => {
      if (prev !== idx) setLabelKey(k => k + 1);
      return idx;
    });
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    const handle = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { rafId = null; updateProgress(); });
    };
    window.addEventListener("scroll", handle, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", handle);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateProgress]);

  const stage     = STAGES[stageIndex];
  const isDone    = progress >= STAGES[4].threshold;
  const monVis    = easeInOut(vis(progress, 0.00));
  const cpuVis    = easeInOut(vis(progress, 0.25));
  const kbVis     = easeInOut(vis(progress, 0.45));
  const mouseVis  = easeInOut(vis(progress, 0.65));
  const glowVis   = easeInOut(vis(progress, 0.85));
  const cableVis  = Math.max(0, Math.min(1, cpuVis + monVis - 1));

  // Part entrance offsets (fly-in from different directions)
  const monOffY   = (1 - monVis) * -60;
  const cpuOffX   = (1 - cpuVis) * 80;
  const kbOffY    = (1 - kbVis) * 80;
  const mouseOffX = (1 - mouseVis) * 60;

  return (
    <div
      ref={containerRef}
      style={{ height: "320vh", position: "relative" }}
      aria-label="Scroll-driven computer assembly animation"
    >
      {/* Sticky scene */}
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
          background: "transparent",
        }}
      >
        {/* Ambient glow — grows as assembly progresses */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 60% 50% at 50% 50%,
              rgba(59,130,246,${0.04 + progress * 0.08}),
              transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Floating particles */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.color,
                opacity: 0.4 + progress * 0.4,
              }}
              animate={{
                y: [0, p.drift, 0],
                x: [0, p.drift * 0.4, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: p.speed,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-manrope, sans-serif)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ACC,
            marginBottom: "1.5rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          What I do
        </motion.p>

        {/* 3D scene container */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale,
            z: translateZ,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            position: "relative",
            zIndex: 2,
            width: "min(560px, 92vw)",
            marginBottom: "2rem",
          }}
        >
          <svg
            viewBox="0 0 520 320"
            width="100%"
            aria-hidden="true"
            style={{ overflow: "visible", filter: isDone ? `drop-shadow(0 0 32px rgba(59,130,246,0.25))` : "none", transition: "filter 0.8s ease" }}
          >
            {/* ── Screen glow ── */}
            {glowVis > 0 && (
              <ellipse cx="202" cy="88" rx="95" ry="55"
                fill={ACC} fillOpacity={0.07 * glowVis}
                style={{ filter: "blur(24px)" }}
              />
            )}

            {/* ── Monitor (flies in from above) ── */}
            <g transform={`translate(0, ${monOffY})`} opacity={monVis}>
              {/* Stand base */}
              <rect x="178" y="180" width="48" height="7" rx="3.5"
                fill={CARD} stroke={BDR} strokeWidth="1" />
              {/* Stand neck */}
              <rect x="195" y="154" width="14" height="28" rx="2"
                fill={CARD} stroke={BDR} strokeWidth="1" />
              {/* Monitor body */}
              <rect x="88" y="18" width="230" height="138" rx="12"
                fill={CARD}
                stroke={isDone ? ACC : BDR}
                strokeWidth={isDone ? 1.5 : 1}
                style={{ transition: "stroke 0.8s ease" }}
              />
              {/* Screen */}
              <rect x="100" y="28" width="206" height="118" rx="7"
                fill="#060d1a" />
              {/* Screen content — active when done */}
              {glowVis > 0 && (
                <>
                  <rect x="114" y="42" width="178" height="4" rx="2" fill={ACC} fillOpacity={0.5 * glowVis} />
                  <rect x="114" y="52" width="110" height="3" rx="1.5" fill={BDR} fillOpacity={glowVis} />
                  <rect x="114" y="60" width="140" height="3" rx="1.5" fill={BDR} fillOpacity={glowVis * 0.7} />
                  <rect x="114" y="72" width="178" height="54" rx="5"
                    fill={ACC} fillOpacity={0.06 * glowVis} />
                  <text x="203" y="100" textAnchor="middle"
                    fontFamily="monospace" fontSize="11"
                    fill={ACC} fillOpacity={glowVis * 0.9}>
                    npm run dev
                  </text>
                  <text x="203" y="115" textAnchor="middle"
                    fontFamily="monospace" fontSize="9"
                    fill={GRN} fillOpacity={glowVis * 0.8}>
                    ✓ Ready on localhost:3000
                  </text>
                  <rect x="114" y="136" width="56" height="5" rx="2.5"
                    fill={GRN} fillOpacity={0.35 * glowVis} />
                </>
              )}
              {/* Brand dot */}
              <circle cx="203" cy="150" r="2.5" fill={BDR} />
            </g>

            {/* ── CPU (flies in from right) ── */}
            <g transform={`translate(${cpuOffX}, 0)`} opacity={cpuVis}>
              <rect x="346" y="28" width="106" height="166" rx="9"
                fill={CARD}
                stroke={isDone ? PUR : BDR}
                strokeWidth={isDone ? 1.5 : 1}
                style={{ transition: "stroke 0.8s ease" }}
              />
              {/* Drive bays */}
              <rect x="358" y="42" width="82" height="12" rx="3" fill="#060d1a" />
              <rect x="358" y="60" width="82" height="12" rx="3" fill="#060d1a" />
              {/* Power button */}
              <circle cx="369" cy="90" r="7"
                fill={isDone ? GRN : "#0d1526"}
                style={{ transition: "fill 0.8s ease" }}
              />
              <circle cx="369" cy="90" r="4"
                fill={isDone ? "rgba(16,185,129,0.4)" : "#060d1a"}
                style={{ transition: "fill 0.8s ease" }}
              />
              {/* Vents */}
              {[0,1,2,3,4,5].map(i => (
                <rect key={i} x="358" y={110 + i * 13} width="82" height="4" rx="2"
                  fill={BDR} fillOpacity={0.6} />
              ))}
            </g>

            {/* ── Cable ── */}
            {cableVis > 0 && (
              <path
                d="M 318 87 C 336 87 336 87 346 87"
                fill="none"
                stroke={BDR}
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity={cableVis}
              />
            )}

            {/* ── Keyboard (slides up from below) ── */}
            <g transform={`translate(0, ${kbOffY})`} opacity={kbVis}>
              <rect x="52" y="220" width="258" height="72" rx="9"
                fill={CARD}
                stroke={isDone ? GRN : BDR}
                strokeWidth={isDone ? 1.5 : 1}
                style={{ transition: "stroke 0.8s ease" }}
              />
              {/* Keys */}
              {[0,1,2,3].map(row =>
                Array.from({ length: row === 3 ? 5 : 11 }).map((_, col) => {
                  const kw = row === 3 ? 38 : 20;
                  const kx = 62 + col * (kw + 2.5);
                  const ky = 230 + row * 14;
                  if (kx + kw > 300) return null;
                  return (
                    <rect key={`${row}-${col}`}
                      x={kx} y={ky} width={kw} height={10} rx="2"
                      fill={isDone ? "rgba(59,130,246,0.06)" : "#060d1a"}
                      stroke={isDone ? "rgba(59,130,246,0.14)" : BDR}
                      strokeWidth="0.5"
                      style={{ transition: "fill 0.8s ease" }}
                    />
                  );
                })
              )}
            </g>

            {/* ── Mouse (drifts in from right) ── */}
            <g transform={`translate(${mouseOffX}, 0)`} opacity={mouseVis}>
              <rect x="344" y="220" width="52" height="72" rx="26"
                fill={CARD}
                stroke={isDone ? PUR : BDR}
                strokeWidth={isDone ? 1.5 : 1}
                style={{ transition: "stroke 0.8s ease" }}
              />
              <line x1="370" y1="220" x2="370" y2="264"
                stroke={BDR} strokeWidth="1" />
              <rect x="365" y="232" width="10" height="16" rx="5"
                fill="#060d1a" />
            </g>

            {/* Progress dots */}
            <g transform="translate(202, 308)">
              {STAGES.slice(0,4).map((s, i) => (
                <circle key={s.label} cx={(i-1.5)*18} cy="0" r="3.5"
                  fill={progress >= s.threshold ? ACC : BDR}
                  style={{ transition: "fill 0.4s ease" }}
                />
              ))}
            </g>
          </svg>
        </motion.div>

        {/* Label */}
        <div style={{ textAlign: "center", minHeight: "88px", position: "relative", zIndex: 2, padding: "0 1rem" }}>
          <motion.div
            key={labelKey}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{
              fontFamily: "var(--font-space-grotesk, sans-serif)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: isDone ? ACC : "#f4f4f5",
              marginBottom: "0.5rem",
              transition: "color 0.6s ease",
            }}>
              {stage.label}
            </h2>
            <p style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "0.88rem",
              color: "rgba(156,163,175,0.75)",
              letterSpacing: "0.04em",
            }}>
              {stage.sub}
            </p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "2px", background: BDR,
        }}>
          <div style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${ACC}, ${PUR})`,
            transition: "width 0.08s linear",
          }} />
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: progress > 0.05 ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
          style={{
            position: "absolute", bottom: "2.5rem",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "6px",
            pointerEvents: "none",
          }}
        >
          <span style={{
            fontSize: "0.6rem", letterSpacing: "0.28em",
            textTransform: "uppercase", color: "rgba(156,163,175,0.35)",
          }}>
            Scroll to assemble
          </span>
          <motion.svg
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            width="14" height="20" viewBox="0 0 14 20"
            fill="none" stroke="rgba(156,163,175,0.25)"
            strokeWidth="1.5" strokeLinecap="round"
          >
            <path d="M7 3v8M2 9l5 5 5-5" />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}
