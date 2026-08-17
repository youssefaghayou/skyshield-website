import type { Metadata } from "next";
import { CyberSubpage } from "@/components/cyber/CyberSubpage";
import { areas } from "@/content/cyber";

export const metadata: Metadata = {
  title: "Cloud & Application Security",
  description:
    "CSPM, IAM audits, DevSecOps integration, third-party risk, GDPR/CNDP privacy, and ISO 27001/NIST compliance.",
};

export default function Page() {
  return <CyberSubpage area={areas.find((a) => a.slug === "cloud")!} />;
}
