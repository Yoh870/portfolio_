import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface InfoBlockProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

/**
 * Labeled content block (icon + heading + body) used throughout the
 * Featured Project case study — Problem, Solution, Challenges, etc.
 * all share this shape, so the section reads as a consistent report
 * rather than ad hoc paragraphs.
 */
export function InfoBlock({ icon: Icon, label, children }: InfoBlockProps) {
  return (
    <div>
      <h3 className="mb-2.5 flex items-center gap-2 font-display text-[0.92rem] font-semibold text-accent">
        <Icon size={15} aria-hidden="true" />
        {label}
      </h3>
      <div className="text-[0.92rem] leading-[1.7] text-muted">{children}</div>
    </div>
  );
}
