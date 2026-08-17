import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "air")!;
const p = d.platforms.find((x) => x.slug === "interceptor")!;

export const metadata: Metadata = {
  title: "Interceptor — Air",
  description:
    "Airspace protection against unauthorized uncrewed aircraft, with response authority always held by a named human operator.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
