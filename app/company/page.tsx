import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Company" };

export default function Page() {
  return (
    <UnderConstruction
      route="/company"
      name="Company"
      phase={6}
      source="LEGACY SALVAGE + OWNER INPUT"
    />
  );
}
