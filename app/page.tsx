import Link from "next/link";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { TelemetryStrip } from "@/components/primitives/TelemetryStrip";

/* Phase 1 skeleton homepage. Phase 2 replaces this with the seven-section
   vertical descent; until then this page states the thesis and routes onward. */

const DOMAINS = [
  { href: "/air", label: "AIR", position: "Persistence and reach", domain: "air" },
  { href: "/land", label: "LAND", position: "Terrain, endurance, presence", domain: "land" },
  { href: "/sea", label: "SEA", position: "The domain nobody watches", domain: "sea" },
  { href: "/cyber", label: "CYBER", position: "Where the architecture was born", domain: "cyber" },
] as const;

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
        <p className="type-label text-tertiary">[ SKYSHIELD TECHNOLOGY ]</p>
        <h1 className="type-display mt-6 max-w-4xl text-step-5 uppercase text-primary">
          One architecture. Four domains.
        </h1>
        <p className="measure mt-6 text-step-1 text-secondary">
          Autonomous systems for air, sea, land and cyber. Built in Morocco.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/atlas"
            className="type-label border border-gold px-5 py-3 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            The architecture
          </Link>
          <Link
            href="/contact"
            className="type-label border border-hairline px-5 py-3 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <RuleLabel label="domains" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map(({ href, label, position, domain }) => (
            <li key={href} data-domain={domain}>
              <Link href={href} className="group block">
                <CornerBrackets
                  className="h-full p-6 transition-colors duration-400"
                  color="var(--domain-primary)"
                >
                  <span
                    aria-hidden="true"
                    className="block h-2 w-2 rounded-full"
                    style={{ background: "var(--domain-primary)" }}
                  />
                  <h2 className="type-display mt-4 text-step-2 uppercase text-primary">{label}</h2>
                  <p className="mt-2 text-step--1 text-secondary">{position}</p>
                  <span className="type-label mt-4 block text-tertiary transition-colors duration-200 group-hover:text-primary">
                    Enter →
                  </span>
                </CornerBrackets>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-24">
        <TelemetryStrip
          className="mx-auto max-w-md"
          rows={[
            { label: "site status", value: "REBUILD — PHASE 1" },
            { label: "base", value: "AGADIR, MA" },
            { label: "position", value: "30.4278° N, 9.5981° W" },
          ]}
        />
      </section>
    </div>
  );
}
