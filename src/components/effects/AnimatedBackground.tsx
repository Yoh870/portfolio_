"use client";

import { useEffect, useRef } from "react";
import { useParallax } from "@/hooks/useParallax";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}
function lerpColor(c1: number[], c2: number[], t: number): string {
  const r = Math.round(lerp(c1[0], c2[0], t));
  const g = Math.round(lerp(c1[1], c2[1], t));
  const b = Math.round(lerp(c1[2], c2[2], t));
  return `rgb(${r},${g},${b})`;
}

const COLORS = {
  bgTop:       [9,   9,   11],
  bgMid:       [8,   20,  40],
  bgBottom:    [4,   28,  48],
  blob1Top:    [59,  130, 246],
  blob1Bottom: [6,   182, 212],
  blob2Top:    [139, 92,  246],
  blob2Bottom: [20,  184, 166],
  blob3Top:    [16,  185, 129],
  blob3Bottom: [8,   145, 178],
};

export function AnimatedBackground() {
  const { scrollY, mouseX, mouseY } = useParallax();
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);
  const bgRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const update = () => {
      rafId = null;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const t = Math.min(1, Math.max(0, scrollY / maxScroll));
      const tMid    = Math.min(1, t * 2);
      const tBottom = Math.max(0, t * 2 - 1);
      const bgColor = t < 0.5
        ? lerpColor(COLORS.bgTop, COLORS.bgMid, tMid)
        : lerpColor(COLORS.bgMid, COLORS.bgBottom, tBottom);
      if (bgRef.current)    bgRef.current.style.background    = bgColor;
      if (blob1Ref.current) { blob1Ref.current.style.transform = `translate(${mouseX*120}px,${mouseY*100-scrollY*0.12}px)`; blob1Ref.current.style.background = lerpColor(COLORS.blob1Top, COLORS.blob1Bottom, t); }
      if (blob2Ref.current) { blob2Ref.current.style.transform = `translate(${-mouseX*100}px,${-mouseY*80-scrollY*0.06}px)`; blob2Ref.current.style.background = lerpColor(COLORS.blob2Top, COLORS.blob2Bottom, t); }
      if (blob3Ref.current) { blob3Ref.current.style.transform = `translate(${mouseX*60}px,${mouseY*50-scrollY*0.09}px)`; blob3Ref.current.style.background = lerpColor(COLORS.blob3Top, COLORS.blob3Bottom, t); }
      if (gridRef.current)  gridRef.current.style.transform   = `translateY(${scrollY*0.04}px)`;
    };
    const schedule = () => { if (rafId) return; rafId = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("mousemove", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("mousemove", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollY, mouseX, mouseY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={bgRef} className="absolute inset-0" style={{ background: "rgb(9,9,11)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 20%,rgba(59,130,246,0.14),transparent 45%),radial-gradient(circle at 80% 70%,rgba(139,92,246,0.14),transparent 45%)" }} />
      <div ref={gridRef} className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%,#000 30%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 0%,#000 30%,transparent 100%)" }} />
      <div ref={blob1Ref} className="absolute -left-32 -top-32 h-[500px] w-[500px] animate-blob1 rounded-full opacity-25 blur-[120px]" style={{ willChange:"transform,background", background:"rgb(59,130,246)" }} />
      <div ref={blob2Ref} className="absolute -right-24 bottom-[-15%] h-[450px] w-[450px] animate-blob2 rounded-full opacity-25 blur-[120px]" style={{ willChange:"transform,background", background:"rgb(139,92,246)" }} />
      <div ref={blob3Ref} className="absolute left-[50%] top-[40%] h-[320px] w-[320px] animate-blob1 rounded-full blur-[130px] [animation-direction:reverse]" style={{ willChange:"transform,background", background:"rgb(16,185,129)", opacity:0.1 }} />
    </div>
  );
}
