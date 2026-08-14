import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <UnderConstruction
      route="/legal/privacy"
      name="Privacy Policy"
      phase={6}
      source="DRAFT FOR OWNER REVIEW"
    />
  );
}
