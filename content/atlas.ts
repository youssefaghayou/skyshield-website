/**
 * /atlas copy — externalized (D-015). Engineering register, public-safe:
 * architecture and mission profiles only, no specifications or figures.
 */

export const atlasHeader = {
  kicker: "the architecture",
  title: "ATLAS",
  lede: "A hierarchical agent architecture, platform-agnostic by construction. The same stack flies an aircraft, sails a vessel, drives a ground vehicle — or runs as pure software against a network.",
};

export const diagram = {
  caption:
    "The two planes of ATLAS. Command descends a tree; awareness spreads through a mesh. The shapes are deliberately different.",
  description:
    "Diagram: a single apex node at the top issues intent to a tier of coordinator nodes, which delegate to many edge nodes grouped into four domain sectors — air, land, sea, cyber. Gold lines form the strict command hierarchy. Fainter lateral lines interconnect the edge nodes into a peer-to-peer data mesh that does not pass through the apex.",
  legend: [
    { label: "APEX — INTENT IN", kind: "apex" },
    { label: "COORDINATION TIER", kind: "coordinator" },
    { label: "EDGE NODES — FOUR DOMAINS", kind: "edge" },
    { label: "COMMAND PLANE — HIERARCHY", kind: "command" },
    { label: "DATA MESH — PEER TO PEER", kind: "mesh" },
  ],
};

export const sections = [
  {
    id: "command-plane",
    kicker: "01 — the command plane",
    title: "Intent flows down. Reports compress up.",
    body: [
      "Command is a hierarchy. Intent enters at the apex as objectives and constraints — never as joystick commands — and decomposes downward: each node receives what to achieve and the bounds to achieve it within, decides how, and delegates narrower intent to the nodes below it.",
      "Reports travel the other way, compressed at every boundary. The top of the tree states outcomes. The edge owns execution.",
    ],
  },
  {
    id: "data-mesh",
    kicker: "02 — the data mesh",
    title: "Awareness is not a hierarchy.",
    body: [
      "What a node senses is shared laterally, peer to peer. The operating picture lives in the mesh, not in any single machine — it survives the loss of any node, including the apex.",
      "Command descends a tree; awareness spreads through a mesh. Keeping the two planes different shapes is a design decision, not an accident: hierarchy gives accountability, the mesh gives resilience, and neither has to compromise for the other.",
    ],
  },
  {
    id: "degraded-operation",
    kicker: "03 — degraded operation",
    title: "Autonomy is what remains when everything else is denied.",
    body: [
      "Links thin, jam and fail. A node that loses contact keeps deciding inside the last intent it was given: it continues its mission within its bounds, coordinates with the peers it can still reach, and reconciles its picture when contact returns.",
      "The architecture treats disconnection as a normal operating state, not an emergency. That is the difference between a system that tolerates the real world and one that merely demonstrates well.",
    ],
  },
  {
    id: "platform-agnostic",
    kicker: "04 — same node, different body",
    title: "Domains are deployment targets.",
    body: [
      "No node hardcodes its body. What a platform can do is declared to the stack, and the stack plans within it — which is why porting ATLAS to a new airframe, hull or chassis is an integration task, not a rewrite.",
      "The four domains are not four products. They are four bodies for one system.",
    ],
  },
  {
    id: "born-in-cyber",
    kicker: "05 — born in cyber",
    title: "Hardened against live adversaries first.",
    body: [
      "ATLAS ran as a security operation before it ever touched hardware — offensive testing, defensive operations, continuous monitoring against real, adaptive opponents. Software was the proving ground.",
      "The drones, vessels and vehicles are the same system with a body. That order — architecture first, adversaries second, hardware last — is the company's trajectory in one line.",
    ],
  },
] as const;

export const atlasCta = {
  note: "Public pages describe mission profiles and architecture. Specifications, integration detail and evaluation move through a verified contact path.",
  primary: { label: "Verified technical request", href: "/contact" },
  secondary: { label: "See the domains", href: "/#apex" },
};

export const domainLinks = [
  { href: "/air", label: "AIR", domain: "air" },
  { href: "/land", label: "LAND", domain: "land" },
  { href: "/sea", label: "SEA", domain: "sea" },
  { href: "/cyber", label: "CYBER", domain: "cyber" },
] as const;
