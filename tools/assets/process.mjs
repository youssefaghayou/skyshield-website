// Processes incoming-assets/ originals into shippable responsive derivatives.
// Output: public/media/<id>-<w>.{avif,webp} — never ships originals as-is.
// Run: node tools/assets/process.mjs
import sharp from "sharp";
import { readdirSync } from "fs";

const WIDTHS = [828, 1280, 1672];
const files = readdirSync("incoming-assets").filter((f) => f.endsWith(".png"));

for (const f of files) {
  const id = f.replace(/\.png$/, "");
  const src = sharp(`incoming-assets/${f}`);
  for (const w of WIDTHS) {
    const base = src.clone().resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 52 }).toFile(`public/media/${id}-${w}.avif`);
    await base.clone().webp({ quality: 74 }).toFile(`public/media/${id}-${w}.webp`);
  }
  console.log(`processed ${id}`);
}
