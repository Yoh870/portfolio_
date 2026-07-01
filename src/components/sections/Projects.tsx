"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { staggerChildren, fadeUp } from "@/lib/animations";

/**
 * Secondary project grid. Sits below the Featured Project section,
 * deliberately smaller and quieter — these are breadth, the PBMCI
 * system is depth.
 */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Other projects"
            headingId="projects-heading"
            description="Smaller builds and experiments — covering creative tools, media projects, and personal apps."
            className="mb-14"
          />
        </ScrollReveal>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren(0.08)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <motion.li key={project.id} variants={fadeUp} className="list-none">
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
