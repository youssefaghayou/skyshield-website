import type { Metadata } from "next";
import { CyberSubpage } from "@/components/cyber/CyberSubpage";
import { areas } from "@/content/cyber";

export const metadata: Metadata = {
  title: "Offensive Security",
  description:
    "Vulnerability assessment, penetration testing, red and purple teaming, secure code review, and IoT/OT security.",
};

export default function Page() {
  return <CyberSubpage area={areas.find((a) => a.slug === "offensive")!} />;
}
