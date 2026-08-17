import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "air")!;
const p = d.platforms.find((x) => x.slug === "long-endurance-surveillance")!;

export const metadata: Metadata = {
  title: "Long-Endurance Surveillance — Air",
  description: "Persistent watch over wide areas, borders and maritime approaches.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
