import { cyber } from "@/content/home";

/**
 * The ouroboros: a segmented ring that continuously repairs itself under a
 * crimson siege. Inline SVG, not a media asset — the self-healing must be
 * live (D-016). This is the only place --threat may appear on the site.
 * Static composition (no rotation) under prefers-reduced-motion via the
 * global animation clamp; the siege and ring remain visible.
 */
export function OuroborosRing({ size = 380 }: { size?: number }) {
  const c = size / 2;
  const r = size * 0.34;
  const siegeR = size * 0.44;
  const seg = (2 * Math.PI * r) / 48;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        aria-hidden="true"
        className="block"
      >
        {/* the ring — 48 segments, slow rotation */}
        <g className="ring-spin" style={{ transformOrigin: "50% 50%" }}>
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="var(--cyber-accent)"
            strokeWidth={2}
            strokeDasharray={`${seg * 0.55} ${seg * 0.45}`}
            opacity={0.9}
          />
          {/* the breach: one moving gap, and the regenerating segment behind it */}
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="var(--void)"
            strokeWidth={4}
            strokeDasharray={`${seg * 2} ${2 * Math.PI * r - seg * 2}`}
            className="ring-breach"
            style={{ transformOrigin: "50% 50%" }}
          />
        </g>
        {/* the siege — three crimson arcs pressing from outside, counter-rotating */}
        <g className="ring-siege" style={{ transformOrigin: "50% 50%" }}>
          {[0, 120, 240].map((deg) => (
            <circle
              key={deg}
              cx={c}
              cy={c}
              r={siegeR}
              fill="none"
              stroke="var(--threat)"
              strokeWidth={1.5}
              strokeDasharray={`${siegeR * 0.5} ${2 * Math.PI * siegeR - siegeR * 0.5}`}
              transform={`rotate(${deg} ${c} ${c})`}
              opacity={0.8}
            />
          ))}
        </g>
        {/* apex-consistent core */}
        <circle cx={c} cy={c} r={3} fill="var(--atlas-white)" />
      </svg>
      <p className="sr-only">{cyber.ringDescription}</p>
    </div>
  );
}
