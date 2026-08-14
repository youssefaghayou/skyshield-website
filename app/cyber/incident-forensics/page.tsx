import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Incident Response & Forensics" };

export default function Page() {
  return (
    <UnderConstruction
      route="/cyber/incident-forensics"
      name="Incident Response & Forensics"
      phase={4}
      source="LEGACY SALVAGE"
    />
  );
}
