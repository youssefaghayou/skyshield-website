/**
 * Legal pages v1.0 (2026-08-17) — drafted for owner review; factual to the
 * site as built: no cookies, no trackers, no accounts, no form backend.
 * Owner/legal counsel review is logged in CONTENT-GAPS.md.
 */

export type LegalDoc = {
  slug: string;
  title: string;
  version: string;
  sections: { h: string; p: string[] }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    version: "v1.0 — 2026-08-17",
    sections: [
      {
        h: "What this site collects",
        p: [
          "skyshieldtechnology.com is a static website. It sets no cookies, runs no analytics or tracking scripts, offers no accounts, and hosts no forms. Browsing this site does not create a profile of you.",
          "Our hosting provider (Cloudflare) processes standard technical request data — IP address, user agent, requested URL — to serve and protect the site. That processing is governed by Cloudflare's own policies; we do not receive or retain browsing profiles from it.",
        ],
      },
      {
        h: "Email correspondence",
        p: [
          "If you write to us, we receive what you send — your address, name, and the content of your message — and use it to respond and to conduct the relationship you initiate. We do not sell correspondence data or use it for advertising.",
          "Verified technical requests additionally involve confirming your identity and organization; the information you provide for verification is used for that purpose.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You may request access to, correction of, or deletion of personal data we hold from correspondence by writing to contact@skyshieldtechnology.com. Applicable law — including Morocco's Law 09-08 (CNDP) and, where it applies, the GDPR — governs these rights.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    version: "v1.0 — 2026-08-17",
    sections: [
      {
        h: "Content",
        p: [
          "This site presents SkyShield Technology's mission profiles and architecture at a public level. It is informational: nothing here is an offer, a specification, or a commitment to capability, availability or performance.",
          "Content, design and imagery are © SkyShield Technology unless noted. You may reference and link to this site; you may not present its content as your own or imply endorsement.",
        ],
      },
      {
        h: "Acceptable use",
        p: [
          "Do not attempt to disrupt the site or misuse its contact paths. Security testing of this site is welcome only within the Responsible Disclosure policy.",
        ],
      },
      {
        h: "No warranty",
        p: [
          "The site is provided as is, without warranty of any kind. SkyShield Technology is not liable for decisions taken on the basis of public informational content.",
        ],
      },
    ],
  },
  {
    slug: "responsible-disclosure",
    title: "Responsible Disclosure",
    version: "v1.0 — 2026-08-17",
    sections: [
      {
        h: "We take reports seriously",
        p: [
          "SkyShield runs security operations for a living; we respect the people who do the same. If you believe you have found a vulnerability in skyshieldtechnology.com or in a SkyShield-operated public service, we want to hear about it.",
        ],
      },
      {
        h: "How to report",
        p: [
          'Email contact@skyshieldtechnology.com with the subject line "[SECURITY]". Include what you found, where, reproduction steps, and how to reach you. We acknowledge reports and keep you informed of remediation.',
        ],
      },
      {
        h: "Ground rules",
        p: [
          "Act in good faith: do not access, modify or exfiltrate data that is not yours, do not degrade service, and give us reasonable time to remediate before public disclosure. We will not pursue good-faith research conducted within these rules.",
          "This policy grants no authorization to test systems SkyShield operates for clients, or any system beyond our public web presence.",
        ],
      },
    ],
  },
];
