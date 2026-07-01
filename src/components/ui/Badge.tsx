import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small pill used for tags/tech labels across Skills, Projects, and
 * the Featured Project section — one definition so spacing and
 * styling never drift between sections.
 */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-md border border-border bg-white/[0.04] px-2.5 py-1 text-[0.74rem] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
