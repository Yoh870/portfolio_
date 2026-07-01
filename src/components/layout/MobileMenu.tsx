"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { NavLink } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  activeHref: string | null;
}

/**
 * POLISH:
 * - Slide-in from right instead of flat fade — gives the panel a
 *   stronger sense of "arriving from off-screen", consistent with
 *   mobile OS navigation conventions.
 * - Trap focus inside the panel (cycles through all focusable children
 *   on Tab/Shift+Tab) so keyboard users can never accidentally leave.
 * - `id` prop forwarded so Navbar's aria-controls links it.
 * - aria-current="page" (not "true") — correct ARIA value for nav.
 */
export function MobileMenu({ id, isOpen, onClose, links, activeHref }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and move focus into panel on open
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard: Escape closes; Tab cycles within the panel
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm sm:hidden"
            onClick={onClose}
          />

          {/* Panel — slides in from the right */}
          <motion.div
            id={id}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-xs flex-col bg-card/95 shadow-2xl backdrop-blur-xl sm:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="font-display text-base font-bold">yoh.dev</span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close navigation menu"
                className="rounded-lg p-2 text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-6">
              {links.map((link, i) => {
                const isActive = activeHref === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + 0.05 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "rounded-xl px-4 py-3.5 font-display text-xl font-semibold transition-colors duration-200",
                      "hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive ? "text-accent" : "text-white/80"
                    )}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* Footer CTA */}
            <div className="border-t border-border px-6 py-6">
              <Button href="#contact" variant="primary" onClick={onClose} className="w-full justify-center">
                Let&rsquo;s talk
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
