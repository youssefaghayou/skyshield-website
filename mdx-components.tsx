import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** House typography for MDX prose (insights posts). */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (p) => <h1 className="type-display mt-12 text-step-3 text-primary" {...p} />,
    h2: (p) => <h2 className="type-display mt-12 text-step-2 text-primary" {...p} />,
    h3: (p) => <h3 className="mt-8 text-step-1 font-medium text-primary" {...p} />,
    p: (p) => <p className="measure mt-5 text-step-0 leading-relaxed text-secondary" {...p} />,
    ul: (p) => <ul className="measure mt-5 space-y-2 text-step-0 text-secondary" {...p} />,
    ol: (p) => (
      <ol className="measure mt-5 list-decimal space-y-2 pl-5 text-step-0 text-secondary" {...p} />
    ),
    li: (p) => <li className="border-l border-hairline pl-4" {...p} />,
    blockquote: (p) => (
      <blockquote
        className="measure mt-6 border-l-2 pl-5 text-step-1 text-primary"
        style={{ borderColor: "var(--atlas-gold)" }}
        {...p}
      />
    ),
    code: (p) => (
      <code className="rounded-sm bg-surface-2 px-1.5 py-0.5 font-mono text-step--1" {...p} />
    ),
    hr: () => <hr className="mt-10 border-hairline" />,
    a: ({ href = "", ...p }) =>
      href.startsWith("/") ? (
        <Link
          href={href}
          className="text-gold underline decoration-hairline underline-offset-4 hover:decoration-gold"
          {...p}
        />
      ) : (
        <a
          href={href}
          className="text-gold underline decoration-hairline underline-offset-4 hover:decoration-gold"
          {...p}
        />
      ),
    ...components,
  };
}
