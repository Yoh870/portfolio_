import type { ProjectSummary } from "@/types";

/**
 * Secondary project list rendered as cards in the "Other Projects"
 * section. Each entry is the single source of truth for its card —
 * adding project #8 later is one object, not a JSX edit.
 */
export const PROJECTS: ProjectSummary[] = [
  {
    id: "drawpro-by-amari",
    name: "DrawPro by Amari",
    description:
      "A creative drawing application focused on a smooth, distraction-free canvas experience.",
    techStack: ["JavaScript", "Canvas API", "CSS"],
    icon: "draw",
    githubUrl: "https://github.com/Yoh870",
    demoUrl: "#",
  },
  {
    id: "dubstep-dj",
    name: "DUBSTEP_DJ",
    description:
      "An interactive web-based DJ deck for mixing and triggering sounds in the browser.",
    techStack: ["JavaScript", "Web Audio API"],
    icon: "music",
    githubUrl: "https://github.com/Yoh870",
    demoUrl: "#",
  },
  {
    id: "love-portrait",
    name: "Love Portrait",
    description:
      "A personalized digital portrait generator built as a creative gift project.",
    techStack: ["HTML", "CSS", "JavaScript"],
    icon: "image",
    githubUrl: "https://github.com/Yoh870",
    demoUrl: "#",
  },
  {
    id: "valed-all-in-one",
    name: "ValEd — All-in-One",
    description:
      "A personal all-in-one planning and organization app, built para kay misis.",
    techStack: ["PHP", "MySQL", "Tailwind CSS"],
    icon: "heart",
    githubUrl: "https://github.com/Yoh870",
    demoUrl: "#",
  },
  {
    id: "valentines-4u-mylove",
    name: "Valentines 4U, My Love",
    description:
      "An interactive Valentine's themed web experience with playful animations.",
    techStack: ["HTML", "CSS", "JavaScript"],
    icon: "gift",
    githubUrl: "https://github.com/Yoh870",
    demoUrl: "#",
  },
  {
    id: "paging-work",
    name: "Paging Work",
    description:
      "A lightweight pagination and content-paging utility for browsing structured data.",
    techStack: ["JavaScript", "PHP"],
    icon: "pages",
    githubUrl: "https://github.com/Yoh870",
    demoUrl: "#",
  },
  {
    id: "lets-stream-yoh",
    name: "Let's Stream, Yoh",
    description:
      "A personal streaming/media companion project for organizing and presenting content.",
    techStack: ["JavaScript", "HTML", "CSS"],
    icon: "stream",
    githubUrl: "https://github.com/Yoh870",
    demoUrl: "#",
  },
];
