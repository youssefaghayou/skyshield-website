import type { Metadata } from "next";
import { DomainPage } from "@/components/domains/DomainPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "air")!;

export const metadata: Metadata = {
  title: "Air — Persistence and Reach",
  description:
    "SkyShield's air domain: collaborative aircraft, airspace protection, and long-endurance surveillance — many airframes flown as one system under ATLAS.",
};

export default function Page() {
  return <DomainPage d={d} />;
}
