import type { MetadataRoute } from "next";

/**
 * Auto-generated sitemap consumed by search engines.
 * Extend this array when new routes are added (e.g. /projects/[slug]).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yoh.dev";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}
