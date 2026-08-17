"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on navigation; lock body scroll while the overlay is up.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    // backdrop-blur lives on the inner bar, NOT the fixed header: a filter on
    // the header would create a containing block and trap the fixed mobile
    // overlay inside the 56px bar.
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="border-b border-hairline bg-void/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="type-display text-step--1 tracking-[0.14em] text-primary">
            SKYSHIELD
          </Link>

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`type-label px-2.5 py-2 transition-colors duration-200 ${
                  isActive(href) ? "text-gold" : "text-secondary hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="type-label border border-hairline px-3 py-2 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary md:hidden"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* mobile overlay */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-y-auto border-t border-hairline bg-void px-6 py-8 md:hidden"
        >
          {NAV.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`flex items-baseline justify-between border-b border-hairline py-4 ${
                isActive(href) ? "text-gold" : "text-primary"
              }`}
            >
              <span className="type-display text-step-2 uppercase">{label}</span>
              <span className="type-label text-tertiary">0{i + 1}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
