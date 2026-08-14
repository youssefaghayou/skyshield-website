import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Responsible Disclosure" };

export default function Page() {
  return (
    <UnderConstruction
      route="/legal/responsible-disclosure"
      name="Responsible Disclosure"
      phase={6}
      source="DRAFT FOR OWNER REVIEW"
    />
  );
}
