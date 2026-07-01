import type { SkillCategory } from "@/types";

/**
 * Skill categories rendered as cards in the Skills section.
 * Kept as data so reordering, adding, or retiring a category
 * (e.g. once a new stack is learned) never touches the component.
 */
export const SKILLS: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "frontend",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "backend",
    tags: ["PHP", "Node.js", "REST APIs", "Authentication"],
  },
  {
    id: "database",
    title: "Database",
    icon: "database",
    tags: ["MySQL", "phpMyAdmin", "Schema design"],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "tools",
    tags: ["Git / GitHub", "VS Code", "Figma", "InfinityFree"],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "languages",
    tags: ["JavaScript", "TypeScript", "PHP", "SQL", "HTML/CSS"],
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: "architecture",
    tags: ["MVC patterns", "Reusable components", "Clean code"],
  },
  {
    id: "uiux",
    title: "UI/UX",
    icon: "uiux",
    tags: ["Design systems", "Micro-interactions", "Accessibility"],
  },
  {
    id: "practices",
    title: "Practices",
    icon: "practices",
    tags: ["Agile workflow", "Code review", "Performance tuning"],
  },
];
