import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Sea" };

export default function Page() {
  return <UnderConstruction route="/sea" name="Sea" phase={5} source="OWNER INPUT" />;
}
