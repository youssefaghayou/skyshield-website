// Derives display-ready logo variants from the owner-supplied raster.
// Source: brand-assets/SkyShield-Logo.png — black artwork on a BAKED-IN
// fake-transparency checkerboard (alpha channel is opaque everywhere).
// The site is dark-only, so we output white artwork on REAL transparency:
// alpha is rebuilt from inverted luminance (art≈black → opaque, checker
// whites/greys → transparent), with a linear curve that zeroes the checker
// (inverted values ≤ ~37) while keeping edge antialiasing.
// Run: node tools/brand/derive-logo.mjs
import sharp from "sharp";

const SRC = "brand-assets/SkyShield-Logo.png";

const meta = await sharp(SRC).metadata();
const alpha = await sharp(SRC).greyscale().negate().linear(1.5, -80).toBuffer();

const whiteOnAlpha = await sharp({
  create: {
    width: meta.width,
    height: meta.height,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .joinChannel(alpha)
  .png()
  .toBuffer();

const trimmed = sharp(whiteOnAlpha).trim();

for (const size of [1024, 320]) {
  await trimmed
    .clone()
    .resize({ width: size, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`public/brand/logo-white-${size}.png`);
}
console.log("derived: public/brand/logo-white-{1024,320}.png (true alpha)");
