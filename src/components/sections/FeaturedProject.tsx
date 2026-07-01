"use client";

import {
  AlertTriangle,
  Lightbulb,
  ListChecks,
  Network,
  Bug,
  GraduationCap,
  Church,
  ArrowUpRight,
  Github,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { FEATURED_PROJECT } from "@/data/featured-project";

/**
 * POLISH:
 * - Animated border glow uses `will-change: opacity` so the blur
 *   pulse is compositor-only.
 * - Info-block bullet dots are replaced with a checkmark for features,
 *   and a dash for architecture — small semantic signal.
 * - Section gets a thin top-border gradient divider from Skills above.
 * - "View source" button gets `target="_blank"` since it links to GitHub.
 */
export function FeaturedProject() {
  const fp = FEATURED_PROJECT;

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="relative px-6 py-28 sm:px-10 lg:px-16"
    >
      {/* Divider from Skills above */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />

      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Featured project"
            title={fp.title}
            headingId="featured-heading"
            description="The single largest, most complete system I've built — covering real stakeholders, a live deployment, and the constraints that came with both."
            className="mb-14"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="relative rounded-[28px] p-px">
            {/* Animated gradient glow border */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 animate-borderFlow rounded-[28px] bg-[length:300%_300%] opacity-55 blur-xl"
              style={{
                backgroundImage: "linear-gradient(120deg,#3B82F6,#8B5CF6,#10B981,#3B82F6)",
                willChange: "opacity",
              }}
            />

            <div className="overflow-hidden rounded-[28px] border border-border bg-card">
              {/* Media banner */}
              <div className="relative flex h-[260px] items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-accent/20 to-accent-secondary/20 sm:h-[320px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0 2px,transparent 2px 14px)",
                  }}
                />
                {/* Placeholder — replace with next/image once screenshot available */}
                <Church aria-hidden="true" size={80} className="relative z-10 text-white/15" />
              </div>

              <div className="p-7 sm:p-12">
                <p className="font-accent text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  {fp.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-[1.5rem] font-bold leading-tight text-white sm:text-[1.9rem]">
                  {fp.tagline}
                </h3>
                <p className="mt-4 max-w-3xl text-[1rem] leading-[1.8] text-muted">
                  {fp.summary}
                </p>

                {/* Problem / Solution */}
                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <InfoBlock icon={AlertTriangle} label="Problem">{fp.problem}</InfoBlock>
                  <InfoBlock icon={Lightbulb} label="Solution">{fp.solution}</InfoBlock>
                </div>

                {/* Features / Architecture */}
                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <InfoBlock icon={ListChecks} label="Key features">
                    <ul className="flex flex-col gap-2">
                      {fp.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-[5px] text-success">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </InfoBlock>
                  <InfoBlock icon={Network} label="Architecture">
                    <ul className="flex flex-col gap-2">
                      {fp.architecture.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-[3px] text-accent/60">—</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </InfoBlock>
                </div>

                {/* Challenges / Lessons */}
                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <InfoBlock icon={Bug} label="Challenges">{fp.challenges}</InfoBlock>
                  <InfoBlock icon={GraduationCap} label="Lessons learned">{fp.lessonsLearned}</InfoBlock>
                </div>

                {/* Stack */}
                <ul className="mt-10 flex flex-wrap gap-2" aria-label="Technologies used">
                  {fp.techStack.map((t) => (
                    <li key={t}><Badge>{t}</Badge></li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap gap-4">
                  <MagneticButton>
                    <Button
                      href={fp.liveUrl ?? "#"}
                      variant="primary"
                      icon={<ArrowUpRight size={16} aria-hidden="true" />}
                      iconPosition="right"
                    >
                      Live demo
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button
                      href={fp.githubUrl ?? "#"}
                      variant="secondary"
                      icon={<Github size={16} aria-hidden="true" />}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
