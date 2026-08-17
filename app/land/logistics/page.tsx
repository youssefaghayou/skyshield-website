import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "land")!;
const p = d.platforms.find((x) => x.slug === "logistics")!;

export const metadata: Metadata = {
  title: "Logistics — Land",
  description: "Autonomous resupply and convoy operations across contested terrain.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
