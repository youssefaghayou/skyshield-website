// Scroll-through screenshot harness for design QA.
// Usage: node tools/qa/shoot.mjs <url> <outdir> [width] [height] [steps]
import puppeteer from "puppeteer-core";

const [url = "http://localhost:8077/", out = "/tmp/shots", w = "1440", h = "940", steps = "10"] =
  process.argv.slice(2);
const CHROME = "/home/ubuntu/.cache/skyshield-chrome/linux-152.0.7977.42/chrome-linux64/chrome";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h });
await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));

const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (let i = 0; i <= +steps; i++) {
  const y = Math.round((total * i) / +steps);
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, 850));
  await page.screenshot({ path: `${out}/s${String(i).padStart(2, "0")}.png` });
}
console.log(`captured ${+steps + 1} shots, scrollHeight total=${total}px`);
await browser.close();
