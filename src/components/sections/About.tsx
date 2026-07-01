"use client";

import { FileText, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { TIMELINE } from "@/data/timeline";
import { cn } from "@/lib/utils";

/**
 * POLISH:
 * - Location tag added beneath the bio — grounding/professional detail
 *   that contextualizes the contact section for clients and recruiters.
 * - Timeline items get a subtle connecting-line glow on the current item.
 * - Section divider added between bio and timeline at narrow widths
 *   so the two columns feel visually separated on stacked mobile layout.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="About me"
            title="Who I am"
            headingId="about-heading"
            className="mb-14"
          />
        </ScrollReveal>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Bio column */}
          <ScrollReveal delay={0.05}>
            {/* Location chip */}
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-muted">
              <MapPin size={11} aria-hidden="true" className="text-accent" />
              Ilagan, Isabela, Philippines
            </span>

            <div className="space-y-5 text-[1.02rem] leading-[1.85] text-muted">
              <p>
                I build web applications and information systems that solve real-world
                problems. I enjoy creating intuitive user experiences, scalable backend
                systems, and continuously learning modern web technologies.
              </p>
              <p>
                My approach blends careful frontend craft with dependable backend
                architecture &mdash; I care as much about how a button feels to press
                as I do about how the database handles it.
              </p>
              <p>
                Currently deepening my React and Next.js practice while shipping
                production systems for real institutions and clients.
              </p>
            </div>

            <div className="mt-9">
              <MagneticButton>
                <Button
                  href="/resume.pdf"
                  variant="secondary"
                  icon={<FileText size={16} aria-hidden="true" />}
                >
                  Download résumé
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Timeline column */}
          <ScrollReveal delay={0.1}>
            <ol className="relative flex flex-col gap-9 border-l border-border pl-7">
              {TIMELINE.map((item) => (
                <li key={item.id} className="relative">
                  {/* Connector dot */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-[34.5px] top-[5px] h-2.5 w-2.5 rounded-full border-2 bg-background transition-shadow duration-300",
                      item.isCurrent
                        ? "border-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        : "border-accent"
                    )}
                  />
                  <p
                    className={cn(
                      "font-display text-[0.8rem] font-semibold uppercase tracking-widest",
                      item.isCurrent ? "text-success" : "text-accent"
                    )}
                  >
                    {item.period}
                  </p>
                  <h3 className="mt-1.5 text-[1.02rem] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
