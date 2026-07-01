import type { TimelineItem } from "@/types";

/**
 * About-section timeline, ordered most-recent-first. Kept as data
 * rather than JSX so updating Yoh's history later is a one-line edit,
 * not a component edit.
 */
export const TIMELINE: TimelineItem[] = [
  {
    id: "learning",
    period: "Currently learning",
    title: "Advanced Next.js & system design",
    description:
      "Deepening expertise in the App Router, server components, and scalable architecture patterns for production systems.",
    isCurrent: true,
  },
  {
    id: "freelance",
    period: "2024 — Present",
    title: "Independent & freelance development",
    description:
      "Designing and building full stack systems end-to-end — from database schema to polished UI — for real organizations.",
  },
  {
    id: "ojt",
    period: "On-the-Job Training",
    title: "OJT — Web Development",
    description:
      "Applied classroom knowledge to live projects, collaborating with stakeholders and shipping working software under real deadlines.",
  },
  {
    id: "education",
    period: "Education",
    title: "BS Information Technology",
    description:
      "Built a strong foundation in programming, databases, and software engineering principles, capped by a full capstone system.",
  },
];
