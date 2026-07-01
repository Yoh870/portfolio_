import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Base glass card primitive used across the codebase.
 * Previously an empty file — now filled with the shared card shape
 * so future sections (e.g. Experience, GitHub activity) don't need
 * to re-declare the same background/border/radius combination.
 */
export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card",
        hover &&
          "transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {children}
    </div>
  );
}
