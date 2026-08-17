/** Site-wide chrome data: navigation, footer, contact endpoints, socials.
 *  Social profiles and email are salvage-verified (legacy JSON-LD sameAs). */

export const NAV = [
  { href: "/atlas", label: "ATLAS" },
  { href: "/air", label: "AIR" },
  { href: "/sea", label: "SEA" },
  { href: "/land", label: "LAND" },
  { href: "/cyber", label: "CYBER" },
  { href: "/company", label: "COMPANY" },
  { href: "/insights", label: "INSIGHTS" },
  { href: "/contact", label: "CONTACT" },
] as const;

export const CONTACT_EMAIL = "contact@skyshieldtechnology.com";

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/skyshield-technologies" },
  { label: "X", href: "https://x.com/SkyShieldTech" },
  { label: "Instagram", href: "https://www.instagram.com/skyshield_technology" },
  { label: "TikTok", href: "https://www.tiktok.com/@skyshield_technology" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100068892067191" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Domains",
    links: [
      { href: "/air", label: "Air" },
      { href: "/sea", label: "Sea" },
      { href: "/land", label: "Land" },
      { href: "/cyber", label: "Cyber" },
    ],
  },
  {
    title: "System",
    links: [
      { href: "/atlas", label: "The architecture" },
      { href: "/insights", label: "Insights" },
      { href: "/company", label: "Company" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/responsible-disclosure", label: "Responsible disclosure" },
    ],
  },
] as const;

export const STATION = {
  base: "AGADIR, MOROCCO",
  coords: "30.4278° N, 9.5981° W",
  languages: "EN — FR / AR PLANNED",
};
