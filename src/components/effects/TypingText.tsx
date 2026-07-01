"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}

/**
 * Cycles through a list of phrases with a typewriter effect.
 * Falls back to simply showing the first phrase (no animation) when
 * the user prefers reduced motion, so the content is never lost,
 * only the motion is.
 */
export function TypingText({
  phrases,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseMs = 1400,
  className,
}: TypingTextProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(phrases[0] ?? "");
      return;
    }

    const current = phrases[phraseIndex];
    const speed = deleting ? deletingSpeed : typingSpeed;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), pauseMs);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setPhraseIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs, reducedMotion]);

  return (
    <span className={className}>
      {/* Screen readers get the full, static list — not the animated fragments */}
      <span className="sr-only">{phrases.join(". ")}</span>
      <span aria-hidden="true">
        {text}
        {!reducedMotion && (
          <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-middle">
            &nbsp;
          </span>
        )}
      </span>
    </span>
  );
}
