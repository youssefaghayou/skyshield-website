import type { Metadata } from "next";
import { CONTACT_EMAIL, STATION } from "@/content/site";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { TelemetryStrip } from "@/components/primitives/TelemetryStrip";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SkyShield Technology — general enquiries, or the verified technical request path for specifications and integration detail. Agadir, Morocco. English, French, Arabic.",
};

/** Two deliberately different doors (brief §3): a general enquiry anyone can
 *  send, and a verified path that gates technical detail. Static site — both
 *  routes are structured email, not a form backend (D-023). */
export default function ContactPage() {
  const generalMail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("General enquiry — SkyShield")}`;
  const verifiedMail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Verified technical request — SkyShield")}`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pb-10 pt-24 sm:pt-32">
        <RuleLabel label="contact" />
        <h1 className="type-display mt-6 text-step-4 uppercase text-primary">Two doors.</h1>
        <p className="measure mt-5 text-step-1 text-secondary">
          A general enquiry gets a conversation. Technical detail — specifications, integration,
          evaluation — moves only through the verified path.
        </p>
      </header>

      <div className="grid gap-6 pb-14 lg:grid-cols-2">
        {/* door 1 — general */}
        <CornerBrackets className="flex h-full flex-col p-7">
          <span className="type-label text-tertiary">door 01</span>
          <h2 className="type-display mt-3 text-step-2 text-primary">General enquiry</h2>
          <p className="mt-3 text-step--1 text-secondary">
            Assessments, services, partnerships, media — anything that starts a conversation.
            Include:
          </p>
          <ul className="mt-4 space-y-2 text-step--1 text-secondary">
            <li className="border-l border-hairline pl-4">Who you are and your organization</li>
            <li className="border-l border-hairline pl-4">What you need, in a sentence or two</li>
            <li className="border-l border-hairline pl-4">Your timeline, if you have one</li>
          </ul>
          <a
            href={generalMail}
            className="type-label mt-auto inline-block self-start border border-hairline px-6 py-3.5 pt-3.5 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
            style={{ marginTop: "1.75rem" }}
          >
            Write to us
          </a>
        </CornerBrackets>

        {/* door 2 — verified */}
        <CornerBrackets className="flex h-full flex-col p-7" color="var(--atlas-gold)">
          <span className="type-label" style={{ color: "var(--atlas-gold)" }}>
            door 02 — verified
          </span>
          <h2 className="type-display mt-3 text-step-2 text-primary">Verified technical request</h2>
          <p className="mt-3 text-step--1 text-secondary">
            Public pages carry mission profiles and architecture only. For specifications,
            integration detail or evaluation, verification precedes any exchange. Send from an
            organizational address and include:
          </p>
          <ul className="mt-4 space-y-2 text-step--1 text-secondary">
            <li className="border-l border-hairline pl-4">
              Organization, your role, and a working official email
            </li>
            <li className="border-l border-hairline pl-4">
              The subject area (domain, platform profile, or capability)
            </li>
            <li className="border-l border-hairline pl-4">
              Intended use and the decision the material informs
            </li>
          </ul>
          <p className="mt-4 text-step--2 text-tertiary">
            Identity and organization are verified before any technical material moves. Requests
            from personal addresses are answered with this policy.
          </p>
          <a
            href={verifiedMail}
            className="type-label mt-auto inline-block self-start border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
            style={{ marginTop: "1.75rem" }}
          >
            Start verification
          </a>
        </CornerBrackets>
      </div>

      <section className="border-t border-hairline py-12">
        <TelemetryStrip
          className="max-w-md"
          rows={[
            { label: "email", value: CONTACT_EMAIL },
            { label: "base", value: STATION.base },
            { label: "languages", value: "EN · FR · AR" },
          ]}
        />
      </section>
    </div>
  );
}
