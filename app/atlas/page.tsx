import type { Metadata } from "next";
import Link from "next/link";
import { atlasHeader, diagram, sections, atlasCta, domainLinks } from "@/content/atlas";
import { AtlasScene } from "@/components/three/AtlasScene";
import { AtlasDiagram2D } from "@/components/atlas/AtlasDiagram2D";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { RuleLabel } from "@/components/primitives/RuleLabel";

export const metadata: Metadata = {
  title: "ATLAS — The Architecture",
  description:
    "ATLAS is a hierarchical agent architecture, platform-agnostic by construction: a strict command plane, a peer-to-peer data mesh, and autonomy designed for degraded environments.",
};

export default function AtlasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* header */}
      <header className="pb-10 pt-24 sm:pt-32">
        <RuleLabel label={atlasHeader.kicker} />
        <h1 className="type-display mt-6 text-step-5 uppercase text-primary">
          {atlasHeader.title}
        </h1>
        <p className="measure mt-6 text-step-1 text-secondary">{atlasHeader.lede}</p>
      </header>

      {/* the diagram — the page's centrepiece */}
      <section aria-label="The ATLAS architecture diagram" className="pb-20">
        <CornerBrackets className="p-2 sm:p-4">
          <div className="aspect-[800/470] w-full">
            <AtlasScene poster={<AtlasDiagram2D />} />
          </div>
        </CornerBrackets>
        <p className="sr-only">{diagram.description}</p>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="measure text-step--1 text-tertiary">{diagram.caption}</p>
          <p className="type-label hidden text-tertiary lg:block">drag to orbit</p>
        </div>
      </section>

      {/* the argument */}
      <div className="mx-auto max-w-3xl">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="border-t border-hairline py-14">
            <RuleLabel label={s.kicker} />
            <h2 className="type-display mt-5 max-w-xl text-step-3 text-primary">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 24)} className="measure mt-5 text-step-0 text-secondary">
                {p}
              </p>
            ))}
            {s.id === "platform-agnostic" && (
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {domainLinks.map((d) => (
                  <li key={d.href} data-domain={d.domain}>
                    <Link href={d.href} className="group block">
                      <CornerBrackets
                        className="flex flex-col items-start p-4"
                        color="var(--domain-primary)"
                      >
                        <span
                          aria-hidden="true"
                          className="block h-1.5 w-1.5 rounded-full"
                          style={{ background: "var(--domain-primary)" }}
                        />
                        <span className="type-label mt-3 text-secondary transition-colors duration-200 group-hover:text-primary">
                          {d.label}
                        </span>
                      </CornerBrackets>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* verified path */}
        <section className="border-t border-hairline py-16">
          <p className="measure text-step-0 text-secondary">{atlasCta.note}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={atlasCta.primary.href}
              className="type-label border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
            >
              {atlasCta.primary.label}
            </Link>
            <Link
              href={atlasCta.secondary.href}
              className="type-label border border-hairline px-6 py-3.5 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              {atlasCta.secondary.label}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
