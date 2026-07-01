import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold " +
  "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-accent to-accent-secondary text-white shadow-[0_0_0_0_rgba(59,130,246,0)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(59,130,246,0.55)]",
  secondary:
    "border border-border bg-white/[0.04] text-white hover:-translate-y-0.5 hover:bg-white/[0.08] hover:border-white/20",
};

/**
 * Reusable CTA button. Renders as <a> when `href` is provided, otherwise
 * as a native <button> — so the same visual component works for in-page
 * anchors, external links, and form actions without duplicating styles.
 */
export const Button = forwardRef<HTMLAnchorElement & HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", icon, iconPosition = "left", className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], className);
    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span aria-hidden="true" className="text-base">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span
            aria-hidden="true"
            className="text-base transition-transform duration-300 group-hover:translate-x-0.5"
          >
            {icon}
          </span>
        )}
      </>
    );

    if ("href" in props && props.href) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <a ref={ref} href={href} className={classes} {...rest}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...(props as ButtonAsButton)}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
