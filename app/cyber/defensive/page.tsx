import type { Metadata } from "next";
import { CyberSubpage } from "@/components/cyber/CyberSubpage";
import { areas } from "@/content/cyber";

export const metadata: Metadata = {
  title: "Defensive Operations",
  description:
    "SOC and MDR operations, threat intelligence and hunting, phishing resilience, ransomware readiness, and exposure monitoring.",
};

export default function Page() {
  return <CyberSubpage area={areas.find((a) => a.slug === "defensive")!} />;
}
