"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wires Lenis smoothing into GSAP ScrollTrigger for the whole app.
 * Under prefers-reduced-motion, Lenis is not instantiated at all — native
 * scroll, no smoothing, and ScrollTrigger still works for static reveals.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // No smoothing for reduced-motion users, and none for automation
    // (crawlers, Lighthouse, QA harnesses) — native scroll behaves better there.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.webdriver)
      return;

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
