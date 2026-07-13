import type { FeaturedProjectContent } from "@/types";

/**
 * Content for the flagship case study. Kept as data so copy can be
 * edited (or the project swapped entirely) without touching the
 * section's layout component.
 */
export const FEATURED_PROJECT: FeaturedProjectContent = {
  eyebrow: "Featured project · Capstone",
  title: "PBMCI Integrated Church Management System",
  tagline: "Records, certificates, and requests — unified.",
  summary:
    "A full stack information system built for the Philippine Bible Methodist Church, Inc. — Jabez Conference, Ilagan, Isabela. It digitizes how the conference manages baptismal records and certificates, replacing manual, paper-based processes with a structured, auditable web system for administrators and a self-service portal for congregation members.",
  problem:
    "Baptismal records were tracked manually across paper logs, making certificate requests slow, error-prone, and hard to audit across the conference's churches.",
  solution:
    "A centralized web system where administrators manage records digitally, members submit and track requests online, and certificates are generated consistently and instantly.",
  features: [
    "Baptismal record management for administrators",
    "Print-ready baptismal certificate generation",
    "Public multi-step baptismal request form",
    "Live certificate preview while filling the form",
    "Unique tracking ID generated for every request",
    "Real-time status tracking for congregation members",
  ],
  architecture: [
    "Server-rendered PHP with a relational MySQL schema",
    "Role-based access separating admins from public requesters",
    "Tailwind CSS-based responsive front end",
    "Deployed on InfinityFree shared hosting",
  ],
  challenges:
    "Working within InfinityFree's hosting constraints required removing reliance on persistent session_start() behavior and carefully matching SQL INSERT columns to the live schema to resolve silent submission failures.",
  lessonsLearned:
    "Shipping on constrained shared hosting taught me to debug methodically against real environment limits, and to design data flows — like tracking IDs — that stay reliable without depending on server-side state.",
  techStack: ["PHP", "MySQL", "Tailwind CSS", "JavaScript", "InfinityFree"],
  liveUrl: "#",
  githubUrl: "https://pbmci.infinityfreeapp.com/landing.php?i=1",
};
