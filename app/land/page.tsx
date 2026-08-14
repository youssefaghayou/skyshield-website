import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Land" };

export default function Page() {
  return <UnderConstruction route="/land" name="Land" phase={5} source="OWNER INPUT" />;
}
