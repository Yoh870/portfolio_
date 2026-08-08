import type { ProjectSummary } from "@/types";

/**
 * Secondary project list rendered as cards in the "Other Projects"
 * section. Each entry is the single source of truth for its card —
 * adding project #8 later is one object, not a JSX edit.
 */
export const PROJECTS: ProjectSummary[] = [
  {
    id: "doc-pirma",
    name: "Doc Pirma",
    description:
      "AI-powered doctor signature identifier for CIMC using Gemini vision analysis with 100% accuracy matching.",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Google Gemini AI"],
    icon: "docpirma.png",
    githubUrl: "https://github.com/Yoh870/doc-pirma",
    demoUrl: "https://doc-pirma.vercel.app",
  },
  {
    id: "drawpro-by-amari",
    name: "DrawPro by Amari",
    description:
      "A creative drawing application focused on a smooth, distraction-free canvas experience.",
    techStack: ["JavaScript", "Canvas API", "CSS"],
    icon: "raffledraw.png",
    githubUrl: "https://github.com/Yoh870/DrawPro-by-amari",
    demoUrl: "https://yoh870.github.io/DrawPro-by-amari/",
  },
  {
    id: "dubstep-dj",
    name: "DUBSTEP_DJ",
    description:
      "An interactive web-based DJ deck for mixing and triggering sounds in the browser.",
    techStack: ["JavaScript", "Web Audio API"],
    icon: "dubstep.png",
    githubUrl: "https://github.com/Yoh870/DUBSTEP_DJ",
    demoUrl: "https://yoh870.github.io/DUBSTEP_DJ/",
  },
  {
    id: "dubstep-app",
    name: "Dubstep App",
    description:
      "A dubstep music app with real-time audio visualization using the Web Audio API and Canvas 2D.",
    techStack: ["Next.js", "TypeScript", "Web Audio API", "Canvas 2D"],
    icon: "dubstep.png",
    githubUrl: "https://github.com/Yoh870/dubstep_app",
    demoUrl: "https://dubstep-app.vercel.app/",
  },
  {
    id: "love-portrait",
    name: "Love Portrait",
    description:
      "A personalized digital portrait generator built as a creative gift project.",
    techStack: ["HTML", "CSS", "JavaScript"],
    icon: "loveportrait.png",
    githubUrl: "https://github.com/Yoh870/love-portrait",
    demoUrl: "https://yoh870.github.io/love-portrait/",
  },
  {
    id: "valed-all-in-one",
    name: "ValEd — All-in-One",
    description:
      "A personal all-in-one planning and organization app, built para kay misis.",
    techStack: ["HTML", "CSS", "JavaScript"],
    icon: "valed_reviewer.png",
    githubUrl: "https://github.com/Yoh870/ValEd_all_in_one_para_kay_misis",
    demoUrl: "https://yoh870.github.io/ValEd_all_in_one_para_kay_misis/",
  },
  {
    id: "valentines-4u-mylove",
    name: "Valentines 4U, My Love",
    description:
      "An interactive Valentine's themed web experience with playful animations.",
    techStack: ["HTML", "CSS", "JavaScript"],
    icon: "personal_valentines.png",
    githubUrl: "https://github.com/Yoh870/Velentines_4u_myLove",
    demoUrl: "https://yoh870.github.io/Velentines_4u_myLove/",
  },
  {
    id: "paging-work",
    name: "Paging Work",
    description:
      "A lightweight pagination and content-paging utility for browsing structured data.",
    techStack: ["JavaScript", "PHP"],
    icon: "paging.png",
    githubUrl: "https://github.com/Yoh870/paging_work",
    demoUrl: "https://yoh870.github.io/paging_work/",
  },
  {
    id: "lets-stream-yoh",
    name: "Let's Stream, Yoh",
    description:
      "A personal streaming PWA for watching and organizing content — installable on any device.",
    techStack: ["JavaScript", "HTML", "CSS", "PWA"],
    icon: "flixora.png",
    githubUrl: "https://github.com/Yoh870/let-s_stream_yoh.mjg",
    demoUrl: "https://yoh870.github.io/let-s_stream_yoh.mjg/",
  },
  {
    id: "id-cimc",
    name: "CIMC ID Generator",
    description:
      "An HTML-based ID card generator for the City of Ilagan Medical Center with print layout and QR code support.",
    techStack: ["HTML", "CSS", "JavaScript"],
    icon: "cimcid.png",
    githubUrl: "https://github.com/Yoh870/id_cimc",
    demoUrl: "https://yoh870.github.io/id_cimc/",
  },
  {
    id: "yoh-assistant",
    name: "Yoh Assistant",
    description:
      "A custom-built, voice-controlled PC automation system for Android — turn on your PC, launch apps and games, or shut down, all by voice.",
    techStack: ["Kotlin", "Jetpack Compose", "Python", "Flask", "Wake-on-LAN"],
    icon: "yohassistant.png",
    githubUrl: "https://github.com/Yoh870/Yoh-Assistant",
    demoUrl: "https://github.com/Yoh870/Yoh-Assistant",
  },
  {
    id: "yoh-agent-hub",
    name: "Yoh Agent Hub",
    description:
      "A multi-model AI orchestrator that intelligently routes prompts to the best AI model for the task — Gemini for reasoning, Groq for speed, and a locally-hosted Hermes model (via Ollama) for privacy-sensitive queries. Includes automatic offline fallback and runs persistently in the background via Windows Task Scheduler.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Groq API", "Ollama"],
    icon: "yohagenthub.png",
    githubUrl: "https://github.com/Yoh870/yoh-agent-hub",
    demoUrl: "https://github.com/Yoh870/yoh-agent-hub",
  },
];
