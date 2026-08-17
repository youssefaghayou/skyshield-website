import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { legalDocs } from "@/content/legal";

const doc = legalDocs.find((d) => d.slug === "responsible-disclosure")!;

export const metadata: Metadata = { title: "Responsible Disclosure" };

export default function Page() {
  return <LegalPage doc={doc} />;
}
