"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { canRun3D } from "@/lib/three/capabilities";
import { ApexThreads } from "./ThreadsSVG";

const ApexSceneImpl = dynamic(() => import("@/components/three/ApexSceneImpl"), { ssr: false });

/**
 * The hero's node + command threads. Capable desktops get the Tier-1
 * real-time version (D-014); everyone else keeps the DOM node and static SVG
 * threads — which are also the markup crawlers and no-JS visitors see.
 */
export function ApexHero() {
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (canRun3D()) setUse3D(true);
  }, []);

  return (
    <>
      {use3D && (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2 -z-10 h-[70vh] w-screen -translate-x-1/2 transition-opacity"
          style={{ opacity: ready ? 1 : 0, transitionDuration: "var(--dur-section)" }}
        >
          <ApexSceneImpl onReady={() => setReady(true)} />
        </div>
      )}
      {!(use3D && ready) && (
        <ApexThreads className="absolute left-1/2 top-2 -z-10 h-[80vh] w-screen -translate-x-1/2" />
      )}
      {/* The node itself is DOM in every tier — its glow is CSS, which no
          canvas blending mode can corrupt. The 3D layer renders threads only. */}
      <span
        aria-hidden="true"
        className="mb-10 block h-3 w-3 rounded-full bg-apex"
        style={{
          boxShadow: "0 0 24px 4px color-mix(in srgb, var(--atlas-white) 55%, transparent)",
        }}
      />
    </>
  );
}
