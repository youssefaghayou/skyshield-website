import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { legalDocs } from "@/content/legal";

const doc = legalDocs.find((d) => d.slug === "privacy")!;

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return <LegalPage doc={doc} />;
}
