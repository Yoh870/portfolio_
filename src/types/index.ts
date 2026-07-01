export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
  /** Marks the item as ongoing (e.g. "currently learning") for distinct styling. */
  isCurrent?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** Lucide icon name, resolved to a component in the Skills section's icon map. */
  icon: "frontend" | "backend" | "database" | "tools" | "languages" | "architecture" | "uiux" | "practices";
  tags: string[];
}

export interface FeaturedProjectContent {
  eyebrow: string;
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string[];
  challenges: string;
  lessonsLearned: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  /** Lucide icon name used as a placeholder thumbnail until a real screenshot is added. */
  icon: "draw" | "music" | "image" | "heart" | "gift" | "pages" | "stream";
  githubUrl?: string;
  demoUrl?: string;
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  icon: "email" | "github" | "facebook" | "linkedin" | "phone";
  /** Marks a link as not yet live (e.g. LinkedIn profile in progress). */
  comingSoon?: boolean;
}
