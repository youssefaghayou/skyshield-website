import type { Metadata } from "next";
import { DomainPage } from "@/components/domains/DomainPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "sea")!;

export const metadata: Metadata = {
  title: "Sea — The Domain Nobody Watches",
  description:
    "SkyShield's sea domain: persistent surface vessels and autonomous subsurface platforms for maritime awareness.",
};

export default function Page() {
  return <DomainPage d={d} />;
}
