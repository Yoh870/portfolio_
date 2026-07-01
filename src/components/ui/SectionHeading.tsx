import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Applied to the <h2> so a parent <section> can reference it via aria-labelledby. */
  headingId?: string;
}

/**
 * Standard "eyebrow / title / description" header used at the top of
 * every content section, so heading hierarchy and spacing stay
 * consistent across About, Skills, Projects, etc. without each
 * section redefining its own heading markup.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  headingId,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="font-accent text-xs font-bold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="mt-2.5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight text-white"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
