import type { LegalDoc } from "@/content/legal";
import { RuleLabel } from "@/components/primitives/RuleLabel";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <header className="pb-8 pt-24 sm:pt-32">
        <RuleLabel label="legal" />
        <h1 className="type-display mt-6 text-step-3 text-primary">{doc.title}</h1>
        <p className="type-label mt-3 text-tertiary">{doc.version}</p>
      </header>
      {doc.sections.map((s) => (
        <section key={s.h} className="border-t border-hairline py-8">
          <h2 className="text-step-1 font-medium text-primary">{s.h}</h2>
          {s.p.map((para) => (
            <p key={para.slice(0, 24)} className="measure mt-4 text-step--1 text-secondary">
              {para}
            </p>
          ))}
        </section>
      ))}
      <div className="pb-20" />
    </div>
  );
}
