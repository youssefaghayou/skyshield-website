import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Static export — no SSR, no route handlers. Hosting is Cloudflare Pages (D-007);
  // responsive images are generated at build time instead of via next/image (Phase 7).
  output: "export",
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  trailingSlash: false,
  reactStrictMode: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
