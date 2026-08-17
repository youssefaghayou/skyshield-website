import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "air")!;
const p = d.platforms.find((x) => x.slug === "collaborative-aircraft")!;

export const metadata: Metadata = {
  title: "Collaborative Aircraft — Air",
  description:
    "Small airframes flown as one system: search and rescue, wide-area sensing and communications relay at scale.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
