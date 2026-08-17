// Generates public/_redirects (Cloudflare Pages format) from redirects.json.
// Each page entry emits both legacy URL forms: /page.html and /page.
// Run: node tools/redirects/generate.mjs
import { readFileSync, writeFileSync } from "fs";

const { redirects } = JSON.parse(readFileSync("redirects.json", "utf8"));

const lines = [
  "# GENERATED from redirects.json — edit that file, then run:",
  "#   node tools/redirects/generate.mjs",
  "# Legacy URL dispositions: content/legacy/URL-INVENTORY.md (owner-approved).",
  "",
];

for (const r of redirects) {
  if (r.from === r.to) {
    // same path in the new IA: only the .html form needs redirecting
    lines.push(`${r.from}.html ${r.to} 301`);
    continue;
  }
  if (r.from.includes(".")) {
    // non-page asset: single exact form
    lines.push(`${r.from} ${r.to} 301`);
    continue;
  }
  lines.push(`${r.from}.html ${r.to} 301`);
  lines.push(`${r.from} ${r.to} 301`);
}

writeFileSync("public/_redirects", lines.join("\n") + "\n");
console.log(`wrote ${lines.length - 4} rules to public/_redirects`);
