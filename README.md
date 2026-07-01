# yoh.dev — Portfolio

A production-quality dark portfolio built with Next.js 14, Tailwind CSS, Framer Motion, and TypeScript.

## Tech stack

- **Framework** — Next.js 14 (App Router)
- **Styling** — Tailwind CSS v3
- **Animation** — Framer Motion v11
- **Icons** — Lucide React
- **Language** — TypeScript
- **Fonts** — Inter, Manrope, Space Grotesk (via next/font/google)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/           # Next.js App Router pages and layout
├── components/
│   ├── effects/   # AnimatedBackground, Spotlight, Particles, etc.
│   ├── layout/    # Navbar, Footer, MobileMenu
│   ├── project/   # ProjectCard, ProjectTilt
│   ├── sections/  # Hero, About, Skills, FeaturedProject, Projects, Contact
│   └── ui/        # Button, Badge, Card, SectionHeading, InfoBlock
├── data/          # All content as typed objects (projects, skills, etc.)
├── hooks/         # useMousePosition, useScrollDirection, useScrollReveal, useActiveSection
├── lib/           # utils.ts, constants.ts, animations.ts
└── types/         # Shared TypeScript interfaces
```

## Personalizing content

| What to change | File |
|---|---|
| Contact info / social links | `src/data/contact-links.ts` |
| Project cards | `src/data/projects.ts` |
| PBMCI showcase copy | `src/data/featured-project.ts` |
| Timeline / career history | `src/data/timeline.ts` |
| Skills and tags | `src/data/skills.ts` |
| Nav links | `src/lib/constants.ts` |
| SEO metadata | `src/app/layout.tsx` |
| Project screenshots | `public/images/projects/` and `public/images/featured/` |

## Adding a real screenshot

Replace the icon placeholders in `ProjectCard.tsx` and `FeaturedProject.tsx`
with `next/image`:

```tsx
import Image from "next/image";
// Inside the thumbnail div:
<Image
  src="/images/projects/drawpro-by-amari.png"
  alt="DrawPro by Amari screenshot"
  fill
  className="object-cover"
/>
```

## Deployment

Deploy to [Vercel](https://vercel.com) with zero config — push to GitHub and import.

```bash
npm run build   # verifies the production build locally
npm run start   # previews the production build
```
