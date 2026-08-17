import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { legalDocs } from "@/content/legal";

const doc = legalDocs.find((d) => d.slug === "terms")!;

export const metadata: Metadata = { title: "Terms of Use" };

export default function Page() {
  return <LegalPage doc={doc} />;
}
