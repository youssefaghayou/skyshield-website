import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "sea")!;
const p = d.platforms.find((x) => x.slug === "surface-vessel")!;

export const metadata: Metadata = {
  title: "Surface Vessel — Sea",
  description:
    "Persistent maritime awareness: coastal patrol, EEZ presence and the surface picture.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
