import type { Metadata } from "next";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const metadata: Metadata = { title: "Insights" };

export default function Page() {
  return <UnderConstruction route="/insights" name="Insights" phase={6} source="SEED POSTS" />;
}
