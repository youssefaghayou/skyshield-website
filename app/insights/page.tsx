import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/insights";
import { RuleLabel } from "@/components/primitives/RuleLabel";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Long-form technical writing from SkyShield Technology on autonomy architecture, security operations, and multi-domain systems.",
};

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pb-10 pt-24 sm:pt-32">
        <RuleLabel label="insights" />
        <h1 className="type-display mt-6 text-step-4 uppercase text-primary">Insights</h1>
        <p className="measure mt-5 text-step-1 text-secondary">
          Technical writing on autonomy architecture and security operations — the thinking behind
          the systems, published as it settles.
        </p>
      </header>

      <ul className="pb-20">
        {posts.map((p) => (
          <li key={p.slug} className="border-t border-hairline">
            <Link
              href={`/insights/${p.slug}`}
              className="group grid gap-3 py-8 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <div className="font-mono text-step--2 text-tertiary">
                <p>{p.date}</p>
                <p className="mt-1">{p.minutes} MIN</p>
              </div>
              <div>
                <h2 className="type-display text-step-2 text-primary transition-colors duration-200 group-hover:text-gold">
                  {p.title}
                </h2>
                <p className="measure mt-2 text-step--1 text-secondary">{p.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
