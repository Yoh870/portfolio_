import type { ContactLink } from "@/types";

/**
 * Contact/social links, shared by the Contact section and the
 * footer so both render from the same list instead of two
 * hand-maintained sets of the same links.
 */
export const CONTACT_LINKS: ContactLink[] = [
  { id: "email", label: "Email", href: "https://mail.google.com/mail/?view=cm&to=mariojimenezgangan@gmail.com", icon: "email" },
  { id: "phone", label: "Call / SMS", href: "tel:+639562352439", icon: "phone" },
  { id: "github", label: "GitHub", href: "https://github.com/Yoh870", icon: "github" },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/ameerio0728/",
    icon: "facebook",
  },
  { id: "linkedin", label: "LinkedIn (soon)", href: "#", icon: "linkedin", comingSoon: true },
];

export const CONTACT_EMAIL = "mariojimenezgangan@gmail.com";
export const CONTACT_PHONE_DISPLAY = "0956 235 2439";
