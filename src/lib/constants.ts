export interface NavLink {
  label: string;
  href: string;
}

/**
 * Single source of truth for in-page navigation. Both the desktop
 * nav and the mobile menu render from this list, so adding/removing
 * a section never requires touching two components.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Project", href: "#featured" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SITE_NAME = "yoh.dev";
