/**
 * Static scanline overlay for media frames only — never over text.
 * Mount inside a `relative` media container.
 */
export function Scanlines() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--text-primary) 0, var(--text-primary) 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}
