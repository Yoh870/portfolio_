"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * POLISH: sectionIds memoized so useActiveSection receives a stable
 * array reference across renders — prevents the observer from
 * reconnecting unnecessarily.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { direction, isAtTop } = useScrollDirection();
  const sectionIds = useMemo(
    () => NAV_LINKS.map((l) => l.href.replace("#", "")),
    []
  );
  const activeId = useActiveSection(sectionIds);
  const activeHref = activeId ? `#${activeId}` : null;
  const hidden = direction === "down" && !isAtTop && !menuOpen;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          isAtTop
            ? "border-transparent bg-transparent"
            : "border-border bg-background/75 backdrop-blur-xl"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 sm:px-8"
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2 font-display text-base font-bold transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-accent to-accent-secondary transition-transform duration-300 group-hover:rotate-90"
            />
            {SITE_NAME}
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 text-sm text-muted sm:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative py-1 transition-colors duration-200 hover:text-white",
                      "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:rounded-full after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded",
                      isActive && "text-white after:w-full"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden sm:block">
            <MagneticButton>
              <Button href="#contact" variant="secondary" className="px-5 py-2.5 text-[0.85rem]">
                Let&rsquo;s talk
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:hidden"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </motion.header>

      <MobileMenu
        id="mobile-menu"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        activeHref={activeHref}
      />
    </>
  );
}
