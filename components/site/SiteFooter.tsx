/** Minimal Phase 1 footer. The dense sitemap footer with the live UTC clock
 *  and language switcher lands in Phase 6. */
export function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-4 py-6 sm:px-6">
        <p className="font-mono text-step--2 text-tertiary">
          © 2026 SKYSHIELD TECHNOLOGY — AGADIR, MOROCCO
        </p>
        <p className="font-mono text-step--2 text-tertiary tabular-nums">30.4278° N, 9.5981° W</p>
      </div>
    </footer>
  );
}
