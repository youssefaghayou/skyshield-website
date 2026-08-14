import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Cloud & Application Security" };

export default function Page() {
  return (
    <UnderConstruction
      route="/cyber/cloud"
      name="Cloud Security"
      phase={4}
      source="LEGACY SALVAGE"
    />
  );
}
