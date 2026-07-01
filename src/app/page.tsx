import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";

/**
 * Sections below the fold are code-split with next/dynamic + loading
 * skeletons so they are never part of the initial JS bundle. The hero,
 * about, and skills are kept as static imports because they're visible
 * on or near first paint.
 *
 * ssr:false is safe for these sections — they contain client-only
 * effects (tilt, motion) and their content is not needed for SEO
 * metadata (that lives in layout.tsx and structured data).
 */
const FeaturedProject = dynamic(
  () => import("@/components/sections/FeaturedProject").then((m) => m.FeaturedProject),
  { loading: () => <SectionSkeleton height="h-[800px]" /> }
);
const Projects = dynamic(
  () => import("@/components/sections/Projects").then((m) => m.Projects),
  { loading: () => <SectionSkeleton height="h-[600px]" /> }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
  { loading: () => <SectionSkeleton height="h-[400px]" /> }
);

function SectionSkeleton({ height }: { height: string }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto max-w-[1180px] px-6 py-28 ${height} animate-pulse`}
    >
      <div className="mb-4 h-3 w-24 rounded-full bg-white/5" />
      <div className="mb-10 h-8 w-64 rounded-xl bg-white/5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <FeaturedProject />
      <Projects />
      <Contact />
    </main>
  );
}
