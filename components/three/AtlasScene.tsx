"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { canRun3D } from "@/lib/three/capabilities";

const AtlasSceneImpl = dynamic(() => import("./AtlasSceneImpl"), { ssr: false });

/**
 * Tier gate for the /atlas diagram. The 2D poster is always rendered and is
 * the experience for mobile / reduced-motion / no-WebGL / no-JS; on capable
 * desktops the real-time scene lazy-loads on approach and fades in over it.
 * The canvas is aria-hidden — the poster and prose are the accessible record.
 */
export function AtlasScene({ poster }: { poster: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [want3D, setWant3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRun3D()) return;
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setWant3D(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="relative">
      <div
        className="transition-opacity"
        style={{ opacity: ready ? 0 : 1, transitionDuration: "var(--dur-section)" }}
      >
        {poster}
      </div>
      {want3D && (
        <div aria-hidden="true" className="absolute inset-0" style={{ cursor: "grab" }}>
          <AtlasSceneImpl onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
