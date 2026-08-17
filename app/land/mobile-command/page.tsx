import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "land")!;
const p = d.platforms.find((x) => x.slug === "mobile-command")!;

export const metadata: Metadata = {
  title: "Mobile Command — Land",
  description:
    "The coordination tier on the move: launch, recovery and fleet coordination from a displacing command element.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
