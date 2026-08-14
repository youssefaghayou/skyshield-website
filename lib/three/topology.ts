/**
 * ATLAS diagram topology — the single source of truth for both the real-time
 * scene (AtlasSceneImpl) and the 2D poster (AtlasDiagram2D). One apex, four
 * coordinators, four domain sectors of six edge nodes; a strict gold command
 * tree and a lateral peer mesh that never touches the apex.
 */

export type Vec3 = [number, number, number];

export type DomainKey = "air" | "land" | "sea" | "cyber";

export const SECTORS: { domain: DomainKey; angleDeg: number; colorVar: string }[] = [
  { domain: "air", angleDeg: 0, colorVar: "--air-primary" },
  { domain: "land", angleDeg: 90, colorVar: "--land-accent" },
  { domain: "sea", angleDeg: 180, colorVar: "--sea-primary" },
  { domain: "cyber", angleDeg: 270, colorVar: "--cyber-primary" },
];

export const EDGES_PER_SECTOR = 6;
const EDGE_RADIUS = 2.5;
const COORD_RADIUS = 1.35;
const EDGE_OFFSETS = [-35, -21, -7, 7, 21, 35];

const rad = (d: number) => (d * Math.PI) / 180;
const onCircle = (angleDeg: number, r: number, y: number): Vec3 => [
  r * Math.cos(rad(angleDeg)),
  y,
  r * Math.sin(rad(angleDeg)),
];

export const APEX: Vec3 = [0, 2.3, 0];

export const COORDINATORS: { pos: Vec3; sector: number }[] = SECTORS.map((s, i) => ({
  pos: onCircle(s.angleDeg, COORD_RADIUS, 1.15),
  sector: i,
}));

export const EDGE_NODES: { pos: Vec3; sector: number; angleDeg: number }[] = SECTORS.flatMap(
  (s, i) =>
    EDGE_OFFSETS.map((off) => ({
      pos: onCircle(s.angleDeg + off, EDGE_RADIUS, 0),
      sector: i,
      angleDeg: (((s.angleDeg + off) % 360) + 360) % 360,
    })),
);

/** Command plane: apex → each coordinator → its sector's edge nodes. */
export const COMMAND_LINKS: [Vec3, Vec3][] = [
  ...COORDINATORS.map((c) => [APEX, c.pos] as [Vec3, Vec3]),
  ...EDGE_NODES.map((e) => [COORDINATORS[e.sector]!.pos, e.pos] as [Vec3, Vec3]),
];

/** Data mesh: ring adjacency around all edge nodes (crossing sector borders —
 *  the mesh is domain-blind) plus a few short chords. Never routes via apex. */
export const MESH_LINKS: [Vec3, Vec3][] = (() => {
  const sorted = [...EDGE_NODES].sort((a, b) => a.angleDeg - b.angleDeg);
  const links: [Vec3, Vec3][] = sorted.map(
    (n, i) => [n.pos, sorted[(i + 1) % sorted.length]!.pos] as [Vec3, Vec3],
  );
  for (let i = 0; i < sorted.length; i += 4) {
    links.push([sorted[i]!.pos, sorted[(i + 2) % sorted.length]!.pos]);
  }
  return links;
})();
