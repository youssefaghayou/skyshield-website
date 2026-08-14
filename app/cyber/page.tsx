import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Cyber" };

export default function Page() {
  return <UnderConstruction route="/cyber" name="Cyber" phase={4} source="LEGACY SALVAGE" />;
}
