"use client";

import { useEffect, useState } from "react";

/** Live UTC readout for the viewport HUD. Renders a placeholder until mount
 *  so the static export never carries a stale build-time value. */
export function TimestampUTC({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date().toISOString().slice(0, 19) + "Z");
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={`font-mono text-step--2 tabular-nums text-tertiary ${className}`}>
      {now ?? "––––-––-––T––:––:––Z"}
    </span>
  );
}
