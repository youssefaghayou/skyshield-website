"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/atlas", label: "ATLAS" },
  { href: "/air", label: "AIR" },
  { href: "/sea", label: "SEA" },
  { href: "/land", label: "LAND" },
  { href: "/cyber", label: "CYBER" },
  { href: "/company", label: "COMPANY" },
  { href: "/contact", label: "CONTACT" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-void/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="type-display text-step--1 tracking-[0.14em] text-primary">
          SKYSHIELD
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 overflow-x-auto">
          {NAV.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`type-label px-2.5 py-2 transition-colors duration-200 ${
                  active ? "text-gold" : "text-secondary hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
