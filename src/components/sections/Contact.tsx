"use client";

import { Mail, Github, Facebook, Linkedin, Phone, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { CONTACT_LINKS, CONTACT_EMAIL } from "@/data/contact-links";
import type { ContactLink } from "@/types";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<ContactLink["icon"], LucideIcon> = {
  email: Mail,
  github: Github,
  facebook: Facebook,
  linkedin: Linkedin,
  phone: Phone,
};

/**
 * POLISH:
 * - Section gets a top-border gradient divider — a subtle visual signal
 *   that this is the page's closing area, separating it from Projects.
 * - Contact cards get a hover glow in addition to the lift, matching
 *   the language the skill cards introduced.
 * - The primary email CTA is now displayed without the raw address as
 *   its label — friendlier on mobile where long email addresses wrap.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative px-6 py-28 sm:px-10 lg:px-16"
    >
      {/* Top gradient divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Get in touch"
            title="Let's build something together."
            headingId="contact-heading"
            description="Open to freelance work, collaborations, and full-time opportunities. The fastest way to reach me is email."
            align="center"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <MagneticButton>
              <Button
                href={`mailto:${CONTACT_EMAIL}`}
                variant="primary"
                icon={<Mail size={16} aria-hidden="true" />}
              >
                Send me an email
              </Button>
            </MagneticButton>
            <span className="text-xs text-muted/70">{CONTACT_EMAIL}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <ul className="mt-14 flex flex-wrap justify-center gap-4">
            {CONTACT_LINKS.map((link) => {
              const Icon = ICON_MAP[link.icon];
              return (
                <li key={link.id}>
                  <a
                    href={link.comingSoon ? undefined : link.href}
                    aria-disabled={link.comingSoon || undefined}
                    aria-label={link.comingSoon ? `${link.label} — coming soon` : link.label}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    className={cn(
                      "group flex w-[150px] flex-col items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-6",
                      "transition-[transform,border-color,box-shadow] duration-300",
                      link.comingSoon
                        ? "cursor-default opacity-50"
                        : "hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_8px_24px_-8px_rgba(59,130,246,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    )}
                  >
                    <Icon
                      size={20}
                      aria-hidden="true"
                      className="text-muted transition-colors duration-200 group-hover:text-accent"
                    />
                    <span className="text-[0.82rem] text-muted">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
