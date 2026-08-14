import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Offensive Security" };

export default function Page() {
  return (
    <UnderConstruction
      route="/cyber/offensive"
      name="Offensive"
      phase={4}
      source="LEGACY SALVAGE"
    />
  );
}
