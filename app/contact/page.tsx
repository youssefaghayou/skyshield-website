import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <UnderConstruction
      route="/contact"
      name="Contact"
      phase={6}
      source="LEGACY SALVAGE + OWNER INPUT"
    />
  );
}
