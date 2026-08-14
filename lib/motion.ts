/* Motion constants — mirrors styles/tokens.css, which is canonical.
   These exist because GSAP needs JS values; change them only in step with tokens.css. */

export const EASE_ENTER = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_EXIT = "cubic-bezier(0.7, 0, 0.84, 0)";

/** GSAP-native equivalents of the CSS easings. */
export const GSAP_EASE_ENTER = "expo.out";
export const GSAP_EASE_EXIT = "power4.in";

export const DUR = {
  micro: 0.2,
  component: 0.4,
  section: 0.8,
  scene: 1.2,
} as const;

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
