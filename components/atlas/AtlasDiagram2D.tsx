import { SECTORS, EDGES_PER_SECTOR } from "@/lib/three/topology";
import { diagram } from "@/content/atlas";

/**
 * Tier 3 rendering of the ATLAS diagram — the designed static end-state served
 * to mobile, reduced-motion, no-JS and no-WebGL, and the poster under the
 * real-time scene while it loads. Same topology as the 3D scene, projected to
 * an elevation view. Real text labels; fully legible without motion.
 */
export function AtlasDiagram2D() {
  const W = 800;
  const APEX = { x: 400, y: 56 };
  const COORD_Y = 168;
  const EDGE_Y = 296;
  const coordXs = [170, 323, 476, 629];
  const clusters = coordXs.map((cx, s) => ({
    cx,
    sector: SECTORS[s]!,
    xs: Array.from({ length: EDGES_PER_SECTOR }, (_, i) => cx - 57 + i * 22.8),
  }));
  const allEdgeXs = clusters.flatMap((c) => c.xs);

  const label = {
    fontSize: 10.5,
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.14em",
  } as const;

  return (
    <svg
      viewBox={`0 0 ${W} 470`}
      role="img"
      aria-label={diagram.description}
      className="block h-auto w-full"
    >
      {/* command plane — the tree */}
      {coordXs.map((cx) => (
        <line
          key={`ac${cx}`}
          x1={APEX.x}
          y1={APEX.y}
          x2={cx}
          y2={COORD_Y}
          stroke="var(--atlas-gold)"
          strokeWidth="1"
          opacity="0.55"
        />
      ))}
      {clusters.map((c) =>
        c.xs.map((x) => (
          <line
            key={`ce${x}`}
            x1={c.cx}
            y1={COORD_Y}
            x2={x}
            y2={EDGE_Y}
            stroke="var(--atlas-gold)"
            strokeWidth="1"
            opacity="0.4"
          />
        )),
      )}

      {/* data mesh — lateral arcs below the edge tier, sector-blind */}
      {allEdgeXs.slice(0, -1).map((x, i) => {
        const x2 = allEdgeXs[i + 1]!;
        const crossSector = (i + 1) % EDGES_PER_SECTOR === 0;
        const dip = crossSector ? 42 : 20;
        return (
          <path
            key={`m${x}`}
            d={`M ${x} ${EDGE_Y} Q ${(x + x2) / 2} ${EDGE_Y + dip}, ${x2} ${EDGE_Y}`}
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1"
            opacity="0.32"
          />
        );
      })}
      <path
        d={`M ${allEdgeXs[0]} ${EDGE_Y} Q ${APEX.x} ${EDGE_Y + 96}, ${allEdgeXs[allEdgeXs.length - 1]} ${EDGE_Y}`}
        fill="none"
        stroke="var(--text-secondary)"
        strokeWidth="1"
        opacity="0.32"
      />

      {/* nodes */}
      <circle cx={APEX.x} cy={APEX.y} r="10" fill="var(--atlas-white)" opacity="0.16" />
      <circle cx={APEX.x} cy={APEX.y} r="5" fill="var(--atlas-white)" />
      {coordXs.map((cx) => (
        <circle key={`c${cx}`} cx={cx} cy={COORD_Y} r="4" fill="var(--atlas-gold)" />
      ))}
      {clusters.map((c) =>
        c.xs.map((x) => (
          <circle key={`e${x}`} cx={x} cy={EDGE_Y} r="3" fill={`var(${c.sector.colorVar})`} />
        )),
      )}

      {/* annotations */}
      <text x={APEX.x + 20} y={APEX.y + 4} style={label} fill="var(--text-secondary)">
        APEX — INTENT IN
      </text>
      <text x={coordXs[3]! + 18} y={COORD_Y + 4} style={label} fill="var(--text-secondary)">
        COORDINATION TIER
      </text>
      {clusters.map((c) => (
        <text
          key={`l${c.cx}`}
          x={c.cx}
          y={EDGE_Y + 74}
          textAnchor="middle"
          style={label}
          fill={`var(${c.sector.colorVar})`}
        >
          {c.sector.domain.toUpperCase()}
        </text>
      ))}
      <text x={APEX.x} y={442} textAnchor="middle" style={label} fill="var(--text-secondary)">
        DATA MESH — PEER TO PEER
      </text>
      <text
        x={APEX.x - 148}
        y={(APEX.y + COORD_Y) / 2}
        textAnchor="end"
        style={label}
        fill="var(--atlas-gold)"
        opacity="0.85"
      >
        COMMAND PLANE
      </text>
      <line
        x1={APEX.x - 140}
        y1={(APEX.y + COORD_Y) / 2 - 4}
        x2={APEX.x - 62}
        y2={(APEX.y + COORD_Y) / 2 + 8}
        stroke="var(--hairline)"
        strokeWidth="1"
      />
    </svg>
  );
}
