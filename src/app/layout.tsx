import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * Fonts loaded with next/font/google:
 * - display:swap eliminates invisible text during load (FOIT → FOUT).
 * - subset:"latin" strips unused character ranges from the font file.
 * - preload:true (default) injects a <link rel="preload"> so the font
 *   bytes arrive before the browser needs to render text.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yoh — Full Stack Web Developer",
  description:
    "Full Stack Web Developer building web applications and information systems that solve real-world problems.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "PHP",
    "MySQL",
    "Tailwind CSS",
    "Ilagan Isabela",
    "Philippines",
  ],
  authors: [{ name: "Yoh", url: "https://github.com/Yoh870" }],
  creator: "Yoh",
  openGraph: {
    type: "website",
    title: "Yoh — Full Stack Web Developer",
    description:
      "Building web applications and information systems that solve real-world problems.",
    siteName: "yoh.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoh — Full Stack Web Developer",
    description:
      "Building web applications and information systems that solve real-world problems.",
  },
  robots: { index: true, follow: true },

  icons: {
  icon: "/favicon.svg",
},

};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-background font-sans text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

