/**
 * Homepage copy — externalized so localization (FR/AR) is a content task,
 * not a rebuild. Wording sourced from the owner's brief; no invented facts.
 */

export const hero = {
  headline: "One architecture. Four domains.",
  sub: "Autonomous systems for air, sea, land and cyber. Built in Morocco.",
  cue: "[ SCROLL — DESCEND ]",
  station: "AGADIR, MA — 30.4278° N, 9.5981° W",
};

export const thesis = [
  "The architecture came first.",
  "It was hardened against live adversaries.",
  "Then we gave it a body.",
];

export type DomainPanelContent = {
  id: "air" | "land" | "sea";
  index: string;
  label: string;
  positioning: string;
  body: string;
  href: string;
  profiles: string[];
  assetId: string;
  assetNote: string;
};

export const domains: DomainPanelContent[] = [
  {
    id: "air",
    index: "01",
    label: "Air",
    positioning: "Persistence and reach.",
    body: "Collaborative aircraft, interceptors and long-endurance surveillance platforms — many airframes, flown as one system.",
    href: "/air",
    profiles: ["COLLABORATIVE AIRCRAFT", "INTERCEPTORS", "LONG-ENDURANCE SURVEILLANCE"],
    assetId: "air-domain-hero",
    assetNote: "2560×1440 · storm layer, formation resolving",
  },
  {
    id: "land",
    index: "02",
    label: "Land",
    positioning: "Terrain, endurance, presence.",
    body: "Ground vehicles for logistics, reconnaissance and mobile command. Developed and proven in Morocco.",
    href: "/land",
    profiles: ["LOGISTICS", "RECONNAISSANCE", "MOBILE COMMAND"],
    assetId: "land-domain-hero",
    assetNote: "2560×1440 · ridgelines, convoy scan fans",
  },
  {
    id: "sea",
    index: "03",
    label: "Sea",
    positioning: "The domain nobody watches.",
    body: "Surface and subsurface autonomous vessels for persistent maritime awareness.",
    href: "/sea",
    profiles: ["SURFACE VESSELS", "SUBSURFACE", "MARITIME AWARENESS"],
    assetId: "sea-domain-hero",
    assetNote: "2560×1440 · below the waterline",
  },
];

export const cyber = {
  index: "04",
  label: "Cyber",
  positioning: "Where the architecture was born.",
  body: "SkyShield began as a security company — offensive, defensive, SOC, cloud, compliance. The autonomy stack was hardened against live adversaries in software long before it was given a body.",
  href: "/cyber",
  profiles: ["OFFENSIVE", "DEFENSIVE", "SOC", "CLOUD", "COMPLIANCE"],
  ringDescription:
    "Diagram: a segmented ring that continuously repairs itself while under external pressure — a representation of self-healing defensive systems under live attack.",
};

export const stack = {
  headline: "Same node. Different body.",
  body: "Domains are deployment targets. The architecture is the company.",
  insets: [
    { caption: "AIRFRAME", domain: "air" },
    { caption: "HULL", domain: "sea" },
    { caption: "CHASSIS", domain: "land" },
  ],
  layers: [
    { label: "AIR", domain: "air" },
    { label: "LAND", domain: "land" },
    { label: "SEA", domain: "sea" },
  ],
  lattice: "CYBER — THROUGH ALL LAYERS",
  ctaPrimary: { label: "The architecture", href: "/atlas" },
  ctaSecondary: { label: "Contact", href: "/contact" },
};
