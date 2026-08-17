/** Insights registry — the index page and post headers read from here.
 *  Posts themselves are MDX: app/insights/<slug>/page.mdx (adding a post =
 *  one MDX file + one entry here). */

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  minutes: number;
};

export const posts: PostMeta[] = [
  {
    slug: "same-node-different-body",
    title: "Same node, different body",
    date: "2026-08-17",
    summary:
      "Platform-agnostic autonomy is not a porting exercise — it is an architectural decision you make before the first platform exists. What that decision looks like from inside.",
    minutes: 6,
  },
  {
    slug: "the-soc-was-the-simulator",
    title: "The SOC was the simulator",
    date: "2026-08-17",
    summary:
      "Everyone simulates their autonomy stack. We ran ours against live adversaries as a working security operation first. What a SOC teaches an architecture that a simulator cannot.",
    minutes: 5,
  },
];
