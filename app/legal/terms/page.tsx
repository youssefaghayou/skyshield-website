import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <UnderConstruction
      route="/legal/terms"
      name="Terms"
      phase={6}
      source="DRAFT FOR OWNER REVIEW"
    />
  );
}
