import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Air" };

export default function Page() {
  return <UnderConstruction route="/air" name="Air" phase={5} source="OWNER INPUT" />;
}
