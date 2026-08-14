import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://skyshieldtechnology.com"),
  title: {
    default: "SkyShield Technology — Autonomous systems for air, sea, land and cyber",
    template: "%s — SkyShield Technology",
  },
  description: "Autonomous systems for air, sea, land and cyber. Built in Morocco.",
  // Preview deployments must not be indexed. Flipped to index at DNS cutover
  // via the INDEXABLE env var in the production build environment (D-013).
  robots: process.env.INDEXABLE === "true" ? undefined : { index: false, follow: false },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a
          href="#main-content"
          className="type-label fixed left-4 top-4 z-50 -translate-y-20 bg-void px-3 py-2 text-primary transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <LenisProvider>
          <SiteHeader />
          <main id="main-content" className="pt-14">
            {children}
          </main>
          <SiteFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
