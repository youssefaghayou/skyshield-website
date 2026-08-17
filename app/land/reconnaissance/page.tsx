import type { Metadata } from "next";
import { PlatformPage } from "@/components/domains/PlatformPage";
import { domainDefs } from "@/content/domains";

const d = domainDefs.find((x) => x.id === "land")!;
const p = d.platforms.find((x) => x.slug === "reconnaissance")!;

export const metadata: Metadata = {
  title: "Reconnaissance — Land",
  description: "Route assessment, forward observation and sensor picket without exposure.",
};

export default function Page() {
  return <PlatformPage d={d} p={p} />;
}
