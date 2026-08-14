import puppeteer from "puppeteer-core";
const CHROME = "/home/ubuntu/.cache/skyshield-chrome/linux-152.0.7977.42/chrome-linux64/chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 940 });
page.on("console", (m) => console.log("PAGE:", m.text()));
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
await page.goto("http://localhost:8077/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));
for (const y of [0, 3000, 5000, 7274, 9000]) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, 900));
  const info = await page.evaluate(() => {
    const root = document.querySelector("main > div");
    const h2s = [...document.querySelectorAll("section h2")]
      .map((h) => {
        const r = h.getBoundingClientRect();
        return r.top < innerHeight && r.bottom > 0
          ? `${h.textContent}=${getComputedStyle(h).color}`
          : null;
      })
      .filter(Boolean);
    const zones = [...document.querySelectorAll("[data-zone]")].map((el) => {
      const r = el.getBoundingClientRect();
      return `${el.dataset.zone}:[${Math.round(r.top)},${Math.round(r.bottom)}]`;
    });
    return {
      domain: root?.getAttribute("data-domain") ?? "(none)",
      visible: h2s,
      zones: zones.join(" "),
    };
  });
  console.log(y, JSON.stringify(info, null, 1));
}
await browser.close();
