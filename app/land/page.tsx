import type { Metadata } from "next";
import { DomainPage } from "@/components/domains/DomainPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "land")!;

export const metadata: Metadata = {
  title: "Land — Terrain, Endurance, Presence",
  description:
    "SkyShield's land domain: autonomous logistics, reconnaissance and mobile command — developed and proven in Morocco.",
};

export default function Page() {
  return <DomainPage d={d} />;
}
