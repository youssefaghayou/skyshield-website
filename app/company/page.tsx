import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  companyHeader,
  trajectory,
  morocco,
  leadership,
  sponsors,
  missionVision,
  companyCta,
} from "@/content/company";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";

export const metadata: Metadata = {
  title: "Company",
  description:
    "SkyShield Technology: an autonomous systems company founded in Agadir, Morocco in 2026. One architecture — ATLAS — deployed across air, sea, land and cyber.",
};

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pb-10 pt-24 sm:pt-32">
        <RuleLabel label={companyHeader.kicker} />
        <h1 className="type-display mt-6 max-w-4xl text-step-4 uppercase text-primary">
          {companyHeader.title}
        </h1>
        <p className="measure mt-6 text-step-1 text-secondary">{companyHeader.lede}</p>
      </header>

      {/* trajectory */}
      <section className="border-t border-hairline py-14">
        <RuleLabel label={trajectory.kicker} />
        <h2 className="type-display mt-5 max-w-2xl text-step-3 text-primary">{trajectory.title}</h2>
        <ol className="mt-10 grid gap-4 lg:grid-cols-4">
          {trajectory.stages.map((s) => (
            <li key={s.n} className="border-l border-hairline pl-5">
              <span className="type-label" style={{ color: "var(--atlas-gold)" }}>
                stage {s.n}
              </span>
              <h3 className="mt-2 text-step-0 font-medium text-primary">{s.name}</h3>
              <p className="mt-1 text-step--1 text-secondary">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* morocco */}
      <section className="border-t border-hairline py-14">
        <RuleLabel label={morocco.kicker} />
        <h2 className="type-display mt-5 max-w-2xl text-step-3 text-primary">{morocco.title}</h2>
        {morocco.body.map((p) => (
          <p key={p.slice(0, 24)} className="measure mt-5 text-step-0 text-secondary">
            {p}
          </p>
        ))}
      </section>

      {/* leadership + mark */}
      <section className="border-t border-hairline py-14">
        <RuleLabel label={leadership.kicker} />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
          {leadership.people.map((person) => (
            <CornerBrackets key={person.name} className="p-6">
              <h3 className="type-display text-step-2 text-primary">{person.name}</h3>
              <p className="type-label mt-2" style={{ color: "var(--atlas-gold)" }}>
                {person.title}
              </p>
              <p className="measure mt-4 text-step--1 text-secondary">{person.note}</p>
            </CornerBrackets>
          ))}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/brand/logo-white-320.png"
              alt="SkyShield Technology logo"
              width={220}
              height={220}
              className="opacity-90"
            />
          </div>
        </div>
      </section>

      {/* sponsors */}
      <section className="border-t border-hairline py-14">
        <RuleLabel label={sponsors.kicker} />
        <p className="measure mt-5 text-step-0 text-secondary">{sponsors.body}</p>
        <ul className="mt-6">
          {sponsors.named.map((s) => (
            <li key={s.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-step-1 text-primary">{s.name}</span>
              <span className="type-label text-tertiary">{s.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* mission / vision */}
      <section className="border-t border-hairline py-14">
        <div className="grid gap-8 sm:grid-cols-2">
          {[missionVision.mission, missionVision.vision].map((m) => (
            <div key={m.label}>
              <RuleLabel label={m.label} />
              <p className="measure mt-4 text-step-0 text-secondary">{m.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href={companyCta.primary.href}
            className="type-label border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            {companyCta.primary.label}
          </Link>
          <Link
            href={companyCta.secondary.href}
            className="type-label border border-hairline px-6 py-3.5 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            {companyCta.secondary.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
