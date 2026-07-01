"use client";

import {
  Monitor,
  Server,
  Database,
  Wrench,
  Code2,
  Layers,
  Wand2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SKILLS } from "@/data/skills";
import { staggerChildren, fadeUp } from "@/lib/animations";
import type { SkillCategory } from "@/types";

const ICON_MAP: Record<SkillCategory["icon"], LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Wrench,
  languages: Code2,
  architecture: Layers,
  uiux: Wand2,
  practices: Rocket,
};

/**
 * Skills section: a grid of category cards, each with an icon, a
 * title, and its tags. Entrance is one staggered reveal driven by
 * the section's own visibility (not per-card observers) so the grid
 * animates in as a single coherent moment rather than a chaotic
 * cascade of independently-triggered cards.
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Skills & tools"
            headingId="skills-heading"
            description="A toolkit built for shipping complete products — from pixel-level interface details to the systems running underneath."
            className="mb-14"
          />
        </ScrollReveal>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerChildren(0.07)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SKILLS.map((category) => {
            const Icon = ICON_MAP[category.icon];
            return (
              <motion.li key={category.id} variants={fadeUp} className="group list-none">
                <SkillCard title={category.title} tags={category.tags} icon={Icon} />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

interface SkillCardProps {
  title: string;
  tags: string[];
  icon: LucideIcon;
}

function SkillCard({ title, tags, icon: Icon }: SkillCardProps) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6
        transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)]"
    >
      {/* Gradient ring revealed on hover — single accent moment, kept subtle */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: 1,
          background: "linear-gradient(135deg, #3B82F6, transparent 45%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div
        aria-hidden="true"
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15"
      >
        <Icon size={18} strokeWidth={2} />
      </div>

      <h3 className="mb-3 font-display text-[1rem] font-semibold text-white">{title}</h3>

      <ul className="flex flex-wrap gap-1.5" aria-label={`${title} technologies`}>
        {tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
