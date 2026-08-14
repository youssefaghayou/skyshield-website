import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "ATLAS — The Architecture" };

export default function Page() {
  return (
    <UnderConstruction
      route="/atlas"
      name="The Architecture"
      phase={3}
      source="OWNER-APPROVED COPY"
    />
  );
}
