import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Defensive Operations" };

export default function Page() {
  return (
    <UnderConstruction
      route="/cyber/defensive"
      name="Defensive"
      phase={4}
      source="LEGACY SALVAGE"
    />
  );
}
