import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "sea")!;
const p = d.platforms.find((x) => x.slug === "subsurface-vessel")!;

export const metadata: Metadata = {
  title: "Subsurface Vessel — Sea",
  description: "Autonomous survey and monitoring where communication barely exists.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
