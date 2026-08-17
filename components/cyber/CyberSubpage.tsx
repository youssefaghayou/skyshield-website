import Link from "next/link";
import type { CyberArea } from "@/content/cyber";
import { areas, cyberCta } from "@/content/cyber";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";

/** Shared template for the four cyber service areas — one design, four datasets. */
export function CyberSubpage({ area }: { area: CyberArea }) {
  const siblings = areas.filter((a) => a.slug !== area.slug);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pb-6 pt-24 sm:pt-32">
        <RuleLabel label={`cyber — area ${area.index} / 04`} />
        <h1
          className="type-display mt-6 text-step-4 uppercase"
          style={{ color: "var(--domain-primary)" }}
        >
          {area.title}
        </h1>
        <p className="measure mt-5 text-step-1 text-secondary">{area.intro}</p>
      </header>

      <section aria-label="Services" className="py-10">
        <ul className="grid gap-x-10 lg:grid-cols-2">
          {area.services.map((s, i) => (
            <li key={s.name} className="flex gap-5 border-t border-hairline py-5">
              <span className="type-label pt-1 text-tertiary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-step-0 font-medium text-primary">{s.name}</h2>
                <p className="mt-1 text-step--1 text-secondary">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-hairline py-12">
        <p className="measure text-step-0 text-secondary">{cyberCta.note}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href={cyberCta.primary.href}
            className="type-label border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            {cyberCta.primary.label}
          </Link>
          <Link
            href="/cyber"
            className="type-label border border-hairline px-5 py-3.5 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            ← All cyber areas
          </Link>
        </div>
      </section>

      <section aria-label="Related areas" className="pb-20">
        <RuleLabel label="adjacent areas" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {siblings.map((a) => (
            <li key={a.slug}>
              <Link href={`/cyber/${a.slug}`} className="group block h-full">
                <CornerBrackets className="h-full p-4">
                  <span className="type-label text-tertiary">area {a.index}</span>
                  <span className="mt-2 block text-step--1 text-secondary transition-colors duration-200 group-hover:text-primary">
                    {a.title}
                  </span>
                </CornerBrackets>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
