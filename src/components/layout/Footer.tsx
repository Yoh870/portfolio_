import { Github, Mail, Facebook } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { CONTACT_EMAIL, CONTACT_LINKS } from "@/data/contact-links";

/**
 * POLISH:
 * - Three inline social icon links added so the footer itself is
 *   self-contained — someone who scrolls past Contact still has a
 *   direct route to GitHub, email, and Facebook without scrolling back up.
 * - Back-to-top link gets a subtle hover animation.
 * - "Built with" line now names the actual stack — an authentic signal
 *   rather than boilerplate.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const github = CONTACT_LINKS.find((l) => l.id === "github");
  const facebook = CONTACT_LINKS.find((l) => l.id === "facebook");

  return (
    <footer className="relative border-t border-border px-6 py-12 sm:px-10">
      {/* Top gradient accent line, mirroring the Contact section divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
      />

      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-5">
        {/* Logo / back-to-top */}
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-sm font-bold transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-[3px] bg-gradient-to-br from-accent to-accent-secondary transition-transform duration-300 group-hover:rotate-90"
          />
          {SITE_NAME}
        </a>

        {/* Inline social row */}
        <nav aria-label="Social links" className="flex items-center gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email Yoh"
            className="text-muted/60 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Mail size={16} aria-hidden="true" />
          </a>
          {github && (
            <a
              href={github.href}
              aria-label="Yoh on GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted/60 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github size={16} aria-hidden="true" />
            </a>
          )}
          {facebook && (
            <a
              href={facebook.href}
              aria-label="Yoh on Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted/60 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Facebook size={16} aria-hidden="true" />
            </a>
          )}
        </nav>

        <p className="text-center text-xs text-muted/50">
          Designed &amp; built by Yoh &mdash; Next.js, Tailwind CSS, Framer Motion, TypeScript.
        </p>
        <p className="text-xs text-muted/40">&copy; {year} Yoh. All rights reserved.</p>
      </div>
    </footer>
  );
}
