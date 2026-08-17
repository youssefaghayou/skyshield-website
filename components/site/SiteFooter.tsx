import Link from "next/link";
import { FOOTER_COLUMNS, SOCIALS, CONTACT_EMAIL, STATION } from "@/content/site";
import { TimestampUTC } from "./TimestampUTC";

/** The dense footer: full sitemap, station data, live UTC clock, disclosure
 *  path, language line. Every element is a working reference, not decoration. */
export function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          {/* station block */}
          <div>
            <p className="type-display text-step--1 tracking-[0.14em] text-primary">
              SKYSHIELD TECHNOLOGY
            </p>
            <dl className="mt-5 space-y-1.5 font-mono text-step--2 text-tertiary">
              <div className="flex gap-3">
                <dt className="type-label">base</dt>
                <dd>{STATION.base}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="type-label">position</dt>
                <dd className="tabular-nums">{STATION.coords}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="type-label">utc</dt>
                <dd>
                  <TimestampUTC />
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="type-label">language</dt>
                <dd>{STATION.languages}</dd>
              </div>
            </dl>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block font-mono text-step--1 text-secondary underline decoration-hairline underline-offset-4 transition-colors duration-200 hover:text-primary"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* sitemap columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="type-label text-tertiary">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-step--1 text-secondary transition-colors duration-200 hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-hairline pt-6">
          <p className="font-mono text-step--2 text-tertiary">
            © 2026 SkyShield Technology. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="type-label text-tertiary transition-colors duration-200 hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
