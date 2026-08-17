// Verifies every legacy URL against a deployed base: each redirect must
// return 301 to the expected target, and the target must resolve 200.
// Run: node tools/qa/check-redirects.mjs https://skyshield-website.pages.dev
import { readFileSync } from "fs";

const base = process.argv[2] ?? "https://skyshield-website.pages.dev";
const { redirects } = JSON.parse(readFileSync("redirects.json", "utf8"));

const forms = [];
for (const r of redirects) {
  if (r.from === r.to) forms.push([`${r.from}.html`, r.to]);
  else if (r.from.includes(".")) forms.push([r.from, r.to]);
  else forms.push([`${r.from}.html`, r.to], [r.from, r.to]);
}

let fail = 0;
for (const [from, to] of forms) {
  const res = await fetch(base + from, { redirect: "manual" });
  const loc = res.headers.get("location") ?? "";
  const locPath = loc.replace(base, "").replace(/^https?:\/\/[^/]+/, "") || "/";
  const ok301 = res.status === 301 && locPath === to;
  let okTarget = false;
  if (ok301) okTarget = (await fetch(base + to)).status === 200;
  const ok = ok301 && okTarget;
  if (!ok) fail++;
  console.log(
    `${ok ? "OK  " : "FAIL"} ${from} → ${res.status} ${locPath}${ok301 && !okTarget ? " (target not 200)" : ""}`,
  );
}
console.log(fail === 0 ? `\nall ${forms.length} legacy URL forms verified` : `\n${fail} FAILURES`);
process.exit(fail === 0 ? 0 : 1);
