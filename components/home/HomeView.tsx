"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero, thesis, domains, cyber, stack } from "@/content/home";
import { AssetPlaceholder } from "@/components/primitives/AssetPlaceholder";
import { HeroMedia } from "@/components/primitives/HeroMedia";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { TelemetryStrip } from "@/components/primitives/TelemetryStrip";
import { Scanlines } from "@/components/primitives/Scanlines";
import { TimestampUTC } from "@/components/site/TimestampUTC";
import { OuroborosRing } from "./OuroborosRing";
import { ApexHero } from "./ApexHero";
import { ContinuingThreads } from "./ThreadsSVG";

/**
 * The homepage: a vertical descent through the stack. Base markup renders the
 * complete, legible end-state (no-JS and reduced-motion see exactly that);
 * GSAP layers pinning and scrub choreography on top for everyone else.
 * Domain colour switching runs for all users — colour is information here.
 */
export function HomeView() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    // -- domain temperature: always on -----------------------------------
    // Probes the viewport centre on every scroll update instead of using
    // per-section trigger positions: getBoundingClientRect stays truthful
    // under pin spacers, so colour switching cannot drift (pins shift static
    // trigger positions computed before they exist).
    const zones = gsap.utils.toArray<HTMLElement>("[data-zone]", root);
    const setZone = () => {
      const mid = window.innerHeight * 0.5;
      let z = "none";
      for (const el of zones) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          z = el.dataset.zone!;
          break;
        }
      }
      if (z === "none") delete root.dataset.domain;
      else root.dataset.domain = z;
    };
    // Deferred one frame: onUpdate fires before pin transforms settle for the
    // new scroll position, so probing synchronously reads stale rectangles.
    const deferredSetZone = () => requestAnimationFrame(setZone);
    const zoneProbe = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: deferredSetZone,
      onRefresh: deferredSetZone,
    });
    setZone();

    // -- choreography: only with motion consent --------------------------
    const mm = gsap.matchMedia(root);

    const addPanelScenes = (pin: boolean) => {
      // hero threads draw with the first scroll
      gsap.utils.toArray<SVGPathElement>(".thread-path", root).forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: "#apex", start: "top top", end: "bottom 25%", scrub: true },
          },
        );
      });

      // thesis: three statements on their own beats
      const lines = gsap.utils.toArray<HTMLElement>(".thesis-line", root);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#thesis",
          start: "top top",
          end: pin ? "+=220%" : "bottom 40%",
          pin,
          scrub: true,
        },
      });
      lines.forEach((l, i) => {
        tl.fromTo(
          l,
          { autoAlpha: i === 0 ? 1 : 0.08, y: i === 0 ? 0 : 24 },
          { autoAlpha: 1, y: 0, duration: 1 },
          i,
        );
        if (i < lines.length - 1) tl.to(l, { autoAlpha: 0.14, duration: 0.6 }, i + 0.95);
      });

      // domain panels: media resolves as the section pins
      zones
        .filter((el) => el.dataset.panel)
        .forEach((el) => {
          const media = el.querySelector(".asset-media");
          if (media) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: el,
                  start: pin ? "top top" : "top 80%",
                  end: pin ? "+=65%" : "center center",
                  pin,
                  scrub: true,
                },
              })
              .fromTo(
                media,
                { scale: 1.12, autoAlpha: 0.2 },
                { scale: 1, autoAlpha: 0.55, ease: "none" },
              );
          }
          const copy = el.querySelector(".panel-copy");
          if (copy) {
            gsap.from(copy, {
              y: 44,
              autoAlpha: 0,
              duration: 0.8,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 65%" },
            });
          }
        });

      // the stack recomposition
      gsap.from(".stack-inset", {
        y: 36,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: "#stack", start: "top 65%" },
      });
    };

    mm.add(
      { motionOK: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" },
      (ctx) => {
        const { motionOK, desktop } = ctx.conditions as { motionOK: boolean; desktop: boolean };
        if (!motionOK) return; // reduced motion: static end-states, colour zones only
        addPanelScenes(desktop); // pinning on desktop; lighter unpinned scrub on mobile
      },
    );

    return () => {
      mm.revert();
      zoneProbe.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip transition-colors"
      style={{ background: "var(--domain-deep)", transitionDuration: "var(--dur-component)" }}
    >
      {/* S1 — APEX ------------------------------------------------------ */}
      <section
        id="apex"
        data-zone="none"
        className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden"
      >
        <AssetPlaceholder
          id="hero-video"
          note="1920×1080 · ambient loop · no narrative"
          labelAt="bottom"
          className="absolute inset-0 opacity-40"
        />
        <Scanlines />
        {/* viewport-edge HUD */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-4 sm:inset-6">
          {(
            [
              ["top-0 left-0", "border-t border-l"],
              ["top-0 right-0", "border-t border-r"],
              ["bottom-0 left-0", "border-b border-l"],
              ["bottom-0 right-0", "border-b border-r"],
            ] as const
          ).map(([pos, borders]) => (
            <span key={pos} className={`absolute h-5 w-5 border-hairline ${pos} ${borders}`} />
          ))}
        </div>
        <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
          <TimestampUTC />
        </div>
        <p className="type-label absolute bottom-6 left-6 hidden text-tertiary sm:bottom-8 sm:left-8 sm:block">
          {hero.station}
        </p>

        {/* the apex node — threads descend from it, behind the headline.
            ApexHero upgrades to the Tier-1 real-time version on capable
            desktops (D-014); this markup is the universal fallback. */}
        <div className="isolate relative z-10 flex flex-col items-center px-4 text-center">
          <ApexHero />
          <h1 className="type-display max-w-5xl text-step-5 uppercase text-primary">
            {hero.headline}
          </h1>
          <p className="measure mt-6 text-step-1 text-secondary">{hero.sub}</p>
        </div>
        <p className="type-label absolute bottom-6 text-tertiary sm:bottom-8">{hero.cue}</p>
      </section>

      {/* S2 — THESIS ---------------------------------------------------- */}
      <section
        id="thesis"
        data-zone="none"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <ContinuingThreads className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 flex flex-col gap-12 px-4 py-24 text-center">
          {thesis.map((line) => (
            <p key={line} className="thesis-line type-display text-step-3 text-primary">
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* S3–S5 — AIR / LAND / SEA -------------------------------------- */}
      {domains.map((d) => (
        <section
          key={d.id}
          data-zone={d.id}
          data-panel={d.id}
          className="relative flex min-h-screen items-end overflow-hidden"
        >
          {d.delivered ? (
            <div className="asset-media absolute inset-0 opacity-55">
              <HeroMedia
                id={d.assetId}
                alt=""
                width={d.delivered.width}
                height={d.delivered.height}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <AssetPlaceholder
              id={d.assetId}
              note={d.assetNote}
              labelAt="top"
              className="asset-media absolute inset-0 opacity-55"
            />
          )}
          <Scanlines />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-4 pb-24 pt-40 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="panel-copy">
              <RuleLabel label={`domain ${d.index}`} />
              <h2
                className="type-display mt-6 text-step-4 uppercase"
                style={{ color: "var(--domain-primary)" }}
              >
                {d.label}
              </h2>
              <p className="mt-3 text-step-2 text-primary">{d.positioning}</p>
              <p className="measure mt-4 text-step-0 text-secondary">{d.body}</p>
              <Link
                href={d.href}
                className="type-label mt-8 inline-block border border-hairline px-5 py-3 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Enter the {d.id} domain →
              </Link>
            </div>
            <TelemetryStrip
              rows={d.profiles.map((p, i) => ({ label: `profile 0${i + 1}`, value: p }))}
            />
          </div>
        </section>
      ))}

      {/* S6 — CYBER: the structural break. No landscape, no horizon. ----- */}
      <section
        data-zone="cyber"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center">
          <RuleLabel label={`domain ${cyber.index}`} className="w-56" align="center" />
          <h2
            className="type-display mt-6 text-step-4 uppercase"
            style={{ color: "var(--domain-primary)" }}
          >
            {cyber.label}
          </h2>
          <p className="mt-3 text-step-2 text-primary">{cyber.positioning}</p>
          <div className="my-12">
            <OuroborosRing />
          </div>
          <p className="measure text-step-0 text-secondary">{cyber.body}</p>
          <TelemetryStrip
            className="mt-10 w-full max-w-sm"
            rows={cyber.profiles.map((p, i) => ({ label: `profile 0${i + 1}`, value: p }))}
          />
          <Link
            href={cyber.href}
            className="type-label mt-10 inline-block border border-hairline px-5 py-3 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            Enter the cyber domain →
          </Link>
        </div>
      </section>

      {/* S7 — THE STACK -------------------------------------------------- */}
      <section
        id="stack"
        data-zone="none"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-32"
      >
        <RuleLabel label="the stack" align="center" className="w-64" />

        {/* the cosmology, recomposed */}
        <div className="mt-12 flex items-stretch gap-8">
          <div className="flex flex-col items-center">
            {stack.layers.map((layer, i) => (
              <div
                key={layer.label}
                className="flex flex-col items-center"
                data-domain={layer.domain}
              >
                {i > 0 && (
                  <span aria-hidden="true" className="block h-10 w-px bg-gold opacity-60" />
                )}
                <span
                  aria-hidden="true"
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--domain-primary)" }}
                />
                <span className="type-label mt-1 text-secondary">{layer.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center" data-domain="cyber">
            <span
              aria-hidden="true"
              className="block w-px flex-1 opacity-70"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, var(--domain-primary) 0 4px, transparent 4px 8px)",
              }}
            />
            <span className="type-label mt-1 max-w-24 text-center text-tertiary">
              {stack.lattice}
            </span>
          </div>
        </div>

        {/* same node, three bodies */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stack.insets.map((inset) => (
            <div key={inset.caption} className="stack-inset" data-domain={inset.domain}>
              <CornerBrackets
                className="flex flex-col items-center px-10 py-8"
                color="var(--domain-primary)"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                  <circle
                    cx="20"
                    cy="20"
                    r="12"
                    fill="none"
                    stroke="var(--atlas-gold)"
                    strokeWidth="1.5"
                  />
                  <circle cx="20" cy="20" r="3" fill="var(--atlas-white)" />
                </svg>
                <span className="type-label mt-4 text-secondary">{inset.caption}</span>
              </CornerBrackets>
            </div>
          ))}
        </div>

        <h2 className="type-display mt-16 max-w-3xl text-center text-step-4 uppercase text-primary">
          {stack.headline}
        </h2>
        <p className="measure mt-4 text-center text-step-1 text-secondary">{stack.body}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={stack.ctaPrimary.href}
            className="type-label border border-gold px-6 py-3.5 text-gold transition-colors duration-200 hover:bg-gold hover:text-void"
          >
            {stack.ctaPrimary.label}
          </Link>
          <Link
            href={stack.ctaSecondary.href}
            className="type-label border border-hairline px-6 py-3.5 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            {stack.ctaSecondary.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
