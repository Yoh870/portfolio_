import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicts
 * (e.g. "px-2" vs "px-4") the way the last one wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
