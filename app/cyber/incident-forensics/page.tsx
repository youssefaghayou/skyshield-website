import type { Metadata } from "next";
import { CyberSubpage } from "@/components/cyber/CyberSubpage";
import { areas } from "@/content/cyber";

export const metadata: Metadata = {
  title: "Incident Response & Forensics",
  description:
    "Incident response, digital forensics, remote triage, malware analysis, and ransomware recovery planning.",
};

export default function Page() {
  return <CyberSubpage area={areas.find((a) => a.slug === "incident-forensics")!} />;
}
