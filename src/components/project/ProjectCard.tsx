"use client";

import {
  PenTool, Headphones, Image as ImageIcon, Heart,
  Gift, FileText, Radio, Github, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProjectTilt } from "@/components/project/ProjectTilt";
import type { ProjectSummary } from "@/types";

const ICON_MAP: Record<ProjectSummary["icon"], LucideIcon> = {
  draw: PenTool, music: Headphones, image: ImageIcon,
  heart: Heart, gift: Gift, pages: FileText, stream: Radio,
};

interface ProjectCardProps {
  project: ProjectSummary;
}

/**
 * POLISH:
 * - Thumbnail gradient is unique per card using the icon's implied
 *   color mood (warm for heart/gift, cool for code/stream) — done
 *   via a per-card accent map so cards don't all look identical.
 * - External links get rel="noopener noreferrer".
 * - Card title truncated with line-clamp-1 so cards never break grid
 *   height if a project name is long.
 */
const THUMB_STYLES: Record<ProjectSummary["icon"], string> = {
  draw:   "from-violet-500/20 to-purple-500/20",
  music:  "from-pink-500/20   to-rose-500/20",
  image:  "from-sky-500/20    to-cyan-500/20",
  heart:  "from-rose-500/20   to-orange-500/20",
  gift:   "from-amber-500/20  to-yellow-500/20",
  pages:  "from-accent/20     to-accent-secondary/20",
  stream: "from-teal-500/20   to-emerald-500/20",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = ICON_MAP[project.icon];
  const thumbGrad = THUMB_STYLES[project.icon];

  return (
    <ProjectTilt className="h-full">
      <article
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card
          transition-[border-color,box-shadow] duration-300
          hover:border-white/[0.15] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* Thumbnail */}
        <div
          aria-hidden="true"
          className={`flex h-[148px] items-center justify-center border-b border-border bg-gradient-to-br ${thumbGrad}
            transition-all duration-300 hover:shadow-inner`}
        >
          <Icon 
            size={36} 
            className="text-white/20 transition-all duration-300 ease-out
              hover:text-white/40 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]
              group-hover:animate-pulse"
            style={{
              animation: "iconFloat 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1.5 line-clamp-1 font-display text-[1rem] font-semibold text-white">
            {project.name}
          </h3>
          <p className="mb-4 flex-1 text-[0.85rem] leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mb-5 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
            {project.techStack.map((t) => (
              <li key={t}><Badge>{t}</Badge></li>
            ))}
          </ul>

          <div className="flex gap-2.5">
            <a
              href={project.githubUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} source code on GitHub`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2.5 text-[0.8rem] font-semibold text-white/80 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github size={13} aria-hidden="true" />
              Code
            </a>
            <a
              href={project.demoUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.name}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-accent/25 bg-accent/10 py-2.5 text-[0.8rem] font-semibold text-accent transition-colors duration-200 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Demo
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </ProjectTilt>
  );
}
