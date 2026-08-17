import Link from "next/link";
import type { DomainDef, PlatformDef } from "@/content/domains";
import { platformCta } from "@/content/domains";
import { AssetPlaceholder } from "@/components/primitives/AssetPlaceholder";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { TelemetryStrip } from "@/components/primitives/TelemetryStrip";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { NeedsInput } from "@/components/primitives/NeedsInput";

/** Platform page template (brief §6): designation header, Tier-2 media slot
 *  (placeholder until turntables exist), mission prose, spec block reserved
 *  as [NEEDS INPUT]. */
export function PlatformPage({ d, p }: { d: DomainDef; p: PlatformDef }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pb-8 pt-24 sm:pt-32">
        <RuleLabel label={`${d.id} — mission profile`} />
        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h1
            className="type-display text-step-4 uppercase"
            style={{ color: "var(--domain-primary)" }}
          >
            {p.profileName}
          </h1>
          <NeedsInput label="public designation" />
        </div>
        <p className="measure mt-4 text-step-1 text-secondary">{p.oneLiner}</p>
      </header>

      {/* Tier-2 slot: 36–72 frame turntable when platform media exists */}
      <section aria-label="Platform media" className="pb-12">
        <CornerBrackets className="p-2 sm:p-4">
          <AssetPlaceholder
            id={`${d.id}-${p.slug}-turntable`}
            note="Tier 2 turntable · 36–72 frames · pending platform media"
            className="aspect-[16/9] w-full"
          />
        </CornerBrackets>
      </section>

      <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr]">
        <section aria-label="Mission">
          <RuleLabel label="the mission" />
          {p.mission.map((para) => (
            <p key={para.slice(0, 24)} className="measure mt-5 text-step-0 text-secondary">
              {para}
            </p>
          ))}
          <p className="mt-6 border-l border-hairline pl-5 text-step--1 text-secondary">
            <span className="type-label block text-tertiary">atlas on this platform</span>
            <span className="mt-1 block">{p.atlasNote}</span>
          </p>
        </section>

        <aside>
          <RuleLabel label="roles" />
          <TelemetryStrip
            className="mt-5"
            rows={p.roles.map((r, i) => ({ label: `role 0${i + 1}`, value: r }))}
          />
          <CornerBrackets className="mt-8 p-5">
            <span className="type-label text-tertiary">public specifications</span>
            <p className="mt-2 text-step--1 text-secondary">
              Reserved for approved, releasable figures.{" "}
              <NeedsInput label="public-releasable specifications" />
            </p>
          </CornerBrackets>
        </aside>
      </div>

      <section className="border-t border-hairline py-14">
        <p className="measure text-step-0 text-secondary">{platformCta.note}</p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link
            href={platformCta.primary.href}
            className="type-label border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            {platformCta.primary.label}
          </Link>
          <Link
            href={`/${d.id}`}
            className="type-label border border-hairline px-5 py-3.5 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            ← {d.label} domain
          </Link>
        </div>
      </section>
    </div>
  );
}
