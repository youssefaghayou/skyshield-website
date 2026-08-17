import Link from "next/link";
import { posts } from "@/content/insights";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { TelemetryStrip } from "@/components/primitives/TelemetryStrip";

/** Header + footer chrome for an insights post; the MDX body renders between. */
export function PostHeader({ slug }: { slug: string }) {
  const post = posts.find((p) => p.slug === slug)!;
  return (
    <header className="pb-2 pt-24 sm:pt-32">
      <RuleLabel label="insights" />
      <h1 className="type-display mt-6 max-w-3xl text-step-3 text-primary">{post.title}</h1>
      <TelemetryStrip
        className="mt-6 max-w-xs"
        rows={[
          { label: "date", value: post.date },
          { label: "reading", value: `${post.minutes} MIN` },
          { label: "author", value: "SKYSHIELD TECHNOLOGY" },
        ]}
      />
    </header>
  );
}

export function PostFooter() {
  return (
    <footer className="mt-14 border-t border-hairline py-10">
      <Link
        href="/insights"
        className="type-label border border-hairline px-5 py-3 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
      >
        ← All insights
      </Link>
    </footer>
  );
}
