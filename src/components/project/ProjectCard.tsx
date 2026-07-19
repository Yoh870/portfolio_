"use client";

import { Badge } from "@/components/ui/Badge";
import { ProjectTilt } from "@/components/project/ProjectTilt";
import { Github, ArrowUpRight } from "lucide-react";
import type { ProjectSummary } from "@/types";

interface ProjectCardProps {
  project: ProjectSummary;
}

const THUMB_STYLES: Record<string, string> = {
  "docpirma.png": "from-sky-500/20 to-cyan-500/20",
  "raffledraw.png": "from-violet-500/20 to-purple-500/20",
  "dubstep.png": "from-pink-500/20 to-rose-500/20",
  "loveportrait.png": "from-sky-500/20 to-cyan-500/20",
  "valed_reviewer.png": "from-rose-500/20 to-orange-500/20",
  "personal_valentines.png": "from-amber-500/20 to-yellow-500/20",
  "paging.png": "from-accent/20 to-accent-secondary/20",
  "flixora.png": "from-teal-500/20 to-emerald-500/20",
  "cimcid.png": "from-blue-500/20 to-indigo-500/20",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const thumbGrad = THUMB_STYLES[project.icon] || "from-gray-500/20 to-slate-500/20";

  return (
    <ProjectTilt className="h-full">
      <article
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card
          transition-[border-color,box-shadow] duration-300
          hover:border-white/[0.15] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* Thumbnail with Image Icon */}
        <div
          aria-hidden="true"
          className={`flex h-[148px] items-center justify-center border-b border-border bg-gradient-to-br ${thumbGrad}
            transition-all duration-300 hover:shadow-inner`}
        >
          <img
            src={`/icons/${project.icon}`}
            alt={project.name}
            className="h-20 w-20 object-contain transition-all duration-300 ease-out
              hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
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
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>

          <div className="flex gap-2.5">
            
              href={project.githubUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} source code on GitHub`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2.5 text-[0.8rem] font-semibold text-white/80 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github size={13} aria-hidden="true" />
              Code
            </a>
            
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