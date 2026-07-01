/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  // Enables next/image's optimizer (resize, AVIF/WebP, lazy loading by
  // default) once real screenshots are dropped into public/images.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
  },
  experimental: {
    // Tree-shakes the icon set so a `import { X } from "lucide-react"`
    // doesn't pull the entire library into the client bundle.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
