/**
 * Gate for real-time 3D (brief §7.2, non-negotiable): no 3D below 768px, on
 * low-memory devices, or under prefers-reduced-motion — those get the Tier 3
 * poster. WebGL support is verified before any chunk loads.
 */
export function canRun3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 768) return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if ((nav.deviceMemory ?? 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}
