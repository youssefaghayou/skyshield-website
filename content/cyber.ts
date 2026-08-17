/**
 * /cyber copy — externalized (D-015). Sourced from the Phase 0 salvage
 * (content/legacy/pages/cybersecurity*.mdx), curated per owner delegation
 * 2026-08-17 (D-021): most important services kept, legacy oddities dropped.
 * Facts verified by owner: 24/7 AI monitoring, global reach, human-in-the-loop.
 */

export const cyberHeader = {
  kicker: "domain 04 — cyber",
  title: "Cyber",
  positioning: "Where the architecture was born.",
  lede: "SkyShield began as a security company. The same agent stack that now flies aircraft ran here first — against live networks, live adversaries, live consequences. Cyber is not a sideline to the autonomy work; it is its proving ground, and it never stopped operating.",
  facts: [
    { label: "monitoring", value: "24/7 — AI-ASSISTED" },
    { label: "oversight", value: "HUMAN-IN-THE-LOOP" },
    { label: "reach", value: "GLOBAL" },
  ],
};

export const operatingProblem = {
  kicker: "the operating problem",
  title: "Adversaries automate. Most defences don't.",
  body: [
    "Security operations drown in exactly the thing they exist to process: signal. Alert volume grows faster than any human team, triage backlogs become the attacker's head start, and the tools meant to help become another console to watch.",
    "SkyShield's answer is the one the whole company is built on: agents that watch, correlate and triage continuously, with humans validating what matters and deciding what happens next. Analysis is AI-assisted around the clock; accountability stays with named people. That division of labour was proven here before it ever touched an airframe.",
  ],
};

export type CyberService = { name: string; desc: string };

export type CyberArea = {
  slug: string;
  index: string;
  label: string;
  title: string;
  summary: string;
  intro: string;
  services: CyberService[];
};

export const areas: CyberArea[] = [
  {
    slug: "offensive",
    index: "01",
    label: "Offensive",
    title: "Offensive Security",
    summary: "Attack simulation and validation: web, API, mobile, network, embedded.",
    intro:
      "Validated exposure, not theoretical risk. Controlled attack simulation across the surfaces that matter, ending in findings a team can actually fix — an exploitability map, not a scanner dump.",
    services: [
      {
        name: "Vulnerability Assessment",
        desc: "Baseline vulnerability discovery across infrastructure and applications.",
      },
      {
        name: "Web Application Penetration Testing",
        desc: "Manual and automated testing of the web application attack surface.",
      },
      {
        name: "API Security Testing",
        desc: "Authentication, authorization, data exposure and logic-abuse checks.",
      },
      {
        name: "Mobile Application Penetration Testing",
        desc: "Static and dynamic analysis plus backend and API interaction testing.",
      },
      {
        name: "Network Penetration Testing",
        desc: "Internal, external and wireless validation, including segmentation.",
      },
      { name: "Red Teaming", desc: "Adversary emulation against high-value business paths." },
      {
        name: "Purple Teaming",
        desc: "Coordinated red/blue exercises that measurably improve detection.",
      },
      {
        name: "Secure Code Review — SAST/DAST",
        desc: "Code-level and runtime application security validation.",
      },
      {
        name: "IoT, OT & Embedded Systems Security",
        desc: "Device, firmware and industrial control environment assessment.",
      },
    ],
  },
  {
    slug: "defensive",
    index: "02",
    label: "Defensive",
    title: "Defensive Operations",
    summary: "Continuous detection, monitoring, intelligence and resilience.",
    intro:
      "Detection and response as an operation, not a product: continuous monitoring with AI-assisted triage, tuned by incident outcomes, with clear escalation paths and named human accountability.",
    services: [
      {
        name: "SOC / Blue Team Operations",
        desc: "Continuous monitoring and defence operations, built or run.",
      },
      {
        name: "Managed Detection & Response",
        desc: "Managed triage and response workflows for active threats.",
      },
      {
        name: "Threat Intelligence",
        desc: "Indicator feeds, context enrichment and threat reporting.",
      },
      {
        name: "Threat Hunting",
        desc: "Hypothesis-driven proactive investigation across telemetry.",
      },
      {
        name: "Phishing Simulation & Security Awareness",
        desc: "User-focused resilience campaigns, including targeted spear-phishing defence.",
      },
      {
        name: "Ransomware Readiness",
        desc: "Preparedness, recovery posture and control validation before it happens.",
      },
      {
        name: "Dark Web & Data Leak Monitoring",
        desc: "Leaked credentials and exposure indicators, watched continuously.",
      },
      {
        name: "Domain & Brand Protection",
        desc: "Typosquatting, impersonation and domain-abuse monitoring.",
      },
    ],
  },
  {
    slug: "cloud",
    index: "03",
    label: "Cloud",
    title: "Cloud & Application Security",
    summary: "Posture, identity, pipelines and compliance for cloud operations.",
    intro:
      "Posture, identity and pipeline security for cloud-native operations — aligned to the frameworks your auditors, insurers and customers actually ask about.",
    services: [
      {
        name: "Cloud Security Posture Management",
        desc: "Continuous misconfiguration and exposure checks across providers.",
      },
      { name: "IAM Security Audits", desc: "Role design, privilege drift and access hardening." },
      {
        name: "DevSecOps Integration",
        desc: "Security testing and policy gates built into CI/CD.",
      },
      {
        name: "Supply-Chain & Third-Party Risk",
        desc: "Vendor and dependency risk assessment and governance.",
      },
      {
        name: "Data Privacy — GDPR / CNDP",
        desc: "Data mapping and privacy controls aligned to European and Moroccan law.",
      },
      {
        name: "GRC & Compliance — ISO 27001 / NIST",
        desc: "Framework alignment and audit-readiness implementation.",
      },
    ],
  },
  {
    slug: "incident-forensics",
    index: "04",
    label: "Incident Response",
    title: "Incident Response & Forensics",
    summary: "Containment, evidence, analysis and recovery under pressure.",
    intro:
      "For when it goes wrong: containment, eradication and recovery, with evidence handled properly and a forensic narrative that holds up in front of both engineers and leadership.",
    services: [
      {
        name: "Incident Response",
        desc: "Containment, eradication, recovery and communication support.",
      },
      {
        name: "Digital Forensics — DFIR",
        desc: "Evidence collection, timeline reconstruction and analysis.",
      },
      { name: "Forensics-as-a-Service", desc: "Remote evidence triage and investigation support." },
      {
        name: "Malware Analysis & Reverse Engineering",
        desc: "Sample behaviour analysis and indicator extraction.",
      },
      {
        name: "Ransomware Recovery Planning",
        desc: "Scenario preparation and restoration strategy validation.",
      },
    ],
  },
];

export const atlasInCyber = {
  kicker: "atlas in this domain",
  title: "The proving ground.",
  body: "Every pattern the architecture depends on — continuous sensing, agent triage, human authority over consequential decisions, operation under active interference — ran here first as a working security operation. When we say the stack was hardened against live adversaries, this page is what we mean.",
  link: { label: "The architecture", href: "/atlas" },
};

export const engagementFlow = {
  kicker: "how an engagement runs",
  steps: [
    {
      step: "01",
      name: "Discovery & scope",
      desc: "A call to define objectives, constraints and rules of engagement.",
    },
    {
      step: "02",
      name: "Assessment & threat mapping",
      desc: "Technical baseline and prioritized attack-surface picture.",
    },
    {
      step: "03",
      name: "Execution",
      desc: "The engagement itself, with weekly reporting — no silence.",
    },
    {
      step: "04",
      name: "Outcomes & retest",
      desc: "Executive summary, remediation roadmap, and a retest plan that closes the loop.",
    },
  ],
};

export const cyberCta = {
  note: "Engagements are scoped to your context — start with one objective and scale. Detailed methodology and references move through the verified contact path.",
  primary: { label: "Request an assessment", href: "/contact" },
};
