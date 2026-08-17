/**
 * /company copy — externalized (D-015). Facts owner-verified (D-021):
 * founded 2026, Agadir; founder title confirmed 2026-08-17; sponsor
 * displayable. Trajectory framing from the owner's brief; mission/vision
 * adapted from the salvaged About page to the four-domain reality.
 */

export const companyHeader = {
  kicker: "the company",
  title: "SkyShield Technology",
  lede: "An autonomous systems company, founded in Agadir, Morocco in 2026. Not a cybersecurity company, and not a drone company — both are deployments of the real product: ATLAS, one agent architecture that runs across air, sea, land and cyber.",
};

export const trajectory = {
  kicker: "trajectory",
  title: "Each stage did not replace the last. It subsumed it.",
  stages: [
    {
      n: "01",
      name: "Cloud security",
      text: "The company's first ground: securing cloud estates for organizations that had outgrown their defences.",
    },
    {
      n: "02",
      name: "Infrastructure",
      text: "Cloud and on-premise infrastructure — building and running the systems, not just guarding them.",
    },
    {
      n: "03",
      name: "Full-spectrum security",
      text: "Offensive, defensive, threat intelligence and SOC operations — agents running against live adversaries, humans in the loop.",
    },
    {
      n: "04",
      name: "Four domains",
      text: "The same stack, given bodies: aircraft, vessels, ground vehicles. Cyber remains one of four domains — the one where the architecture was proven.",
    },
  ],
};

export const morocco = {
  kicker: "built in morocco",
  title: "Sovereign capability, from Agadir.",
  body: [
    "SkyShield is developed in Agadir — not offshored, not rebadged. Sovereign autonomous capability built in Morocco is the point, not a footnote: the talent, the terrain it is proven on, and the ownership of the stack are all local.",
    "The company works in English, French and Arabic, and serves clients globally.",
  ],
};

export const leadership = {
  kicker: "leadership",
  people: [
    {
      name: "Youssef Aghayou",
      title: "Founder & Chief Cybersecurity Engineer",
      note: "Founded SkyShield to close a gap he kept meeting in practice: security and autonomy built as separate worlds, when they are one discipline — systems that keep making correct decisions under adversarial pressure.",
    },
  ],
};

export const sponsors = {
  kicker: "programs & partners",
  body: "SkyShield collaborates with incubator programs, cloud ecosystem partners and cybersecurity communities to accelerate deployment and local talent development.",
  named: [{ name: "1000 Fikra – Afriquia", role: "Entrepreneurship program" }],
};

export const missionVision = {
  mission: {
    label: "mission",
    text: "Reduce dependency on manual-only operations — in security and beyond it — and build resilient, always-on capability that keeps working when conditions degrade.",
  },
  vision: {
    label: "vision",
    text: "Build a leading autonomous-systems company from Morocco, and export trusted technology internationally.",
  },
};

export const companyCta = {
  primary: { label: "Contact", href: "/contact" },
  secondary: { label: "The architecture", href: "/atlas" },
};
