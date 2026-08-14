// Derives display-ready logo variants from the owner-supplied raster.
// Source: brand-assets/SkyShield-Logo.png (2048x2048, black on transparent).
// The site is dark-only, so display variants are white-inverted.
// Run: node tools/brand/derive-logo.mjs
import sharp from "sharp";

const SRC = "brand-assets/SkyShield-Logo.png";

const white = sharp(SRC).trim().negate({ alpha: false }); // pure-black artwork -> pure-white, alpha preserved

for (const size of [1024, 320]) {
  await white
    .clone()
    .resize({ width: size, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`public/brand/logo-white-${size}.png`);
}
console.log("derived: public/brand/logo-white-{1024,320}.png");
