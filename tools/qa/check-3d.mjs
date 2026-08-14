// Verifies the /atlas real-time scene engages (or reports why not).
import puppeteer from "puppeteer-core";
const CHROME = "/home/ubuntu/.cache/skyshield-chrome/linux-152.0.7977.42/chrome-linux64/chrome";
const url = process.argv[2] ?? "http://localhost:8077/atlas";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 940 });
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message.slice(0, 200)));
await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 3500));
const info = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  const test = document.createElement("canvas");
  const webgl = Boolean(test.getContext("webgl2") ?? test.getContext("webgl"));
  return {
    webglAvailable: webgl,
    canvasMounted: Boolean(c),
    canvasSize: c ? `${c.width}x${c.height}` : null,
    posterHidden: (() => {
      const p = document.querySelector("svg[role=img]");
      return p ? getComputedStyle(p.parentElement).opacity : "n/a";
    })(),
  };
});
console.log(JSON.stringify(info));
await page.screenshot({ path: process.argv[3] ?? "/tmp/atlas.png" });
await browser.close();
