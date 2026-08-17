import Link from "next/link";
import type { DomainDef } from "@/content/domains";
import { platformCta } from "@/content/domains";
import { HeroMedia } from "@/components/primitives/HeroMedia";
import { Scanlines } from "@/components/primitives/Scanlines";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { NeedsInput } from "@/components/primitives/NeedsInput";
import { MissionSequence } from "./MissionSequence";

/** One template, three skins — the domain overview (brief §6). */
export function DomainPage({ d }: { d: DomainDef }) {
  return (
    <div>
      {/* 1 — domain header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <HeroMedia
            id={d.heroId}
            alt=""
            width={1672}
            height={941}
            eager
            className="h-full w-full object-cover"
          />
        </div>
        <Scanlines />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
          <RuleLabel label={`domain ${d.index} — ${d.id}`} />
          <h1
            className="type-display mt-6 text-step-5 uppercase"
            style={{ color: "var(--domain-primary)" }}
          >
            {d.label}
          </h1>
          <p className="mt-3 text-step-2 text-primary">{d.positioning}</p>
          <p className="measure mt-6 text-step-0 text-secondary">{d.lede}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* 2 — the operating problem */}
        <section className="border-t border-hairline py-14">
          <RuleLabel label="the operating problem" />
          <h2 className="type-display mt-5 max-w-2xl text-step-3 text-primary">
            {d.problem.title}
          </h2>
          {d.problem.body.map((p) => (
            <p key={p.slice(0, 24)} className="measure mt-5 text-step-0 text-secondary">
              {p}
            </p>
          ))}
        </section>

        {/* 3 — platform grid */}
        <section aria-label="Platforms" className="border-t border-hairline py-14">
          <RuleLabel label="platforms — by mission profile" />
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {d.platforms.map((p) => (
              <li key={p.slug}>
                <Link href={`/${d.id}/${p.slug}`} className="group block h-full">
                  <CornerBrackets
                    className="flex h-full flex-col p-6"
                    color="var(--domain-primary)"
                  >
                    <NeedsInput label="designation" />
                    <h3 className="type-display mt-3 text-step-2 text-primary">{p.profileName}</h3>
                    <p className="mt-2 text-step--1 text-secondary">{p.oneLiner}</p>
                    <span className="type-label mt-auto pt-5 text-tertiary transition-colors duration-200 group-hover:text-primary">
                      Mission profile →
                    </span>
                  </CornerBrackets>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 4 — ATLAS in this domain */}
        <section className="border-t border-hairline py-14">
          <RuleLabel label="atlas in this domain" />
          <h2 className="type-display mt-5 max-w-2xl text-step-3 text-primary">{d.atlas.title}</h2>
          <p className="measure mt-5 text-step-0 text-secondary">{d.atlas.body}</p>
          <Link
            href="/atlas"
            className="type-label mt-7 inline-block border border-gold px-5 py-3 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            The architecture
          </Link>
        </section>

        {/* 5 — mission profiles as sequences */}
        <section className="border-t border-hairline py-14">
          <RuleLabel label="mission profiles — representative sequences" />
          <div className="mt-6">
            {d.sequences.map((seq) => (
              <MissionSequence key={seq.name} seq={seq} />
            ))}
          </div>
        </section>

        {/* 6 — verified technical request */}
        <section className="border-t border-hairline py-16">
          <p className="measure text-step-0 text-secondary">{platformCta.note}</p>
          <Link
            href={platformCta.primary.href}
            className="type-label mt-7 inline-block border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            {platformCta.primary.label}
          </Link>
        </section>
      </div>
    </div>
  );
}
