import type { Metadata } from "next";
import { HomeView } from "@/components/home/HomeView";

export const metadata: Metadata = {
  description:
    "One architecture, four domains. Autonomous systems for air, sea, land and cyber — built in Morocco by SkyShield Technology.",
};

export default function Home() {
  return <HomeView />;
}
