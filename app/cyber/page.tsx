import type { Metadata } from "next";
import Link from "next/link";
import {
  cyberHeader,
  operatingProblem,
  areas,
  atlasInCyber,
  engagementFlow,
  cyberCta,
} from "@/content/cyber";
import { HeroMedia } from "@/components/primitives/HeroMedia";
import { Scanlines } from "@/components/primitives/Scanlines";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { TelemetryStrip } from "@/components/primitives/TelemetryStrip";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";

export const metadata: Metadata = {
  title: "Cyber — Offensive, Defensive, Cloud, Incident Response",
  description:
    "SkyShield's cyber domain: offensive security, defensive operations, cloud & application security, and incident response & forensics. AI-assisted 24/7, human-in-the-loop, global reach.",
};

export default function CyberPage() {
  return (
    <div>
      {/* domain header — full-bleed, the delivered cyber still behind */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <HeroMedia
            id="cyber-domain-hero"
            alt=""
            width={1672}
            height={941}
            eager
            className="h-full w-full object-cover"
          />
        </div>
        <Scanlines />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
          <RuleLabel label={cyberHeader.kicker} />
          <h1
            className="type-display mt-6 text-step-5 uppercase"
            style={{ color: "var(--domain-primary)" }}
          >
            {cyberHeader.title}
          </h1>
          <p className="mt-3 text-step-2 text-primary">{cyberHeader.positioning}</p>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <p className="measure text-step-0 text-secondary">{cyberHeader.lede}</p>
            <TelemetryStrip rows={cyberHeader.facts} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* the operating problem */}
        <section className="border-t border-hairline py-14">
          <RuleLabel label={operatingProblem.kicker} />
          <h2 className="type-display mt-5 max-w-2xl text-step-3 text-primary">
            {operatingProblem.title}
          </h2>
          {operatingProblem.body.map((p) => (
            <p key={p.slice(0, 24)} className="measure mt-5 text-step-0 text-secondary">
              {p}
            </p>
          ))}
        </section>

        {/* four service areas */}
        <section aria-label="Service areas" className="border-t border-hairline py-14">
          <RuleLabel label="service areas" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/cyber/${a.slug}`} className="group block h-full">
                  <CornerBrackets
                    className="flex h-full flex-col p-6"
                    color="var(--domain-primary)"
                  >
                    <span className="type-label text-tertiary">area {a.index}</span>
                    <h3 className="type-display mt-3 text-step-2 text-primary">{a.title}</h3>
                    <p className="mt-2 text-step--1 text-secondary">{a.summary}</p>
                    <span className="type-label mt-auto pt-5 text-tertiary transition-colors duration-200 group-hover:text-primary">
                      {a.services.length} services →
                    </span>
                  </CornerBrackets>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ATLAS in this domain */}
        <section className="border-t border-hairline py-14">
          <RuleLabel label={atlasInCyber.kicker} />
          <h2 className="type-display mt-5 max-w-2xl text-step-3 text-primary">
            {atlasInCyber.title}
          </h2>
          <p className="measure mt-5 text-step-0 text-secondary">{atlasInCyber.body}</p>
          <Link
            href={atlasInCyber.link.href}
            className="type-label mt-7 inline-block border border-gold px-5 py-3 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            {atlasInCyber.link.label}
          </Link>
        </section>

        {/* engagement flow */}
        <section className="border-t border-hairline py-14">
          <RuleLabel label={engagementFlow.kicker} />
          <ol className="mt-8 grid gap-4 lg:grid-cols-4">
            {engagementFlow.steps.map((s) => (
              <li key={s.step} className="border-l border-hairline pl-5">
                <span className="type-label text-tertiary">step {s.step}</span>
                <h3 className="mt-2 text-step-0 font-medium text-primary">{s.name}</h3>
                <p className="mt-1 text-step--1 text-secondary">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="border-t border-hairline py-16">
          <p className="measure text-step-0 text-secondary">{cyberCta.note}</p>
          <Link
            href={cyberCta.primary.href}
            className="type-label mt-7 inline-block border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            {cyberCta.primary.label}
          </Link>
        </section>
      </div>
    </div>
  );
}
