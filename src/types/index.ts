export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
  isCurrent?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
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
  /** PNG filename for project icon (e.g., 'docpirma.png') */
  icon: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  icon: "email" | "github" | "facebook" | "linkedin" | "phone";
  comingSoon?: boolean;
}