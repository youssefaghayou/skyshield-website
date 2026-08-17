/**
 * Visible marker for a fact only the owner can supply (project rule: never
 * invent product facts). Uses --warn: an incomplete-state signal, which is
 * exactly what this is. Every instance is logged in CONTENT-GAPS.md.
 */
export function NeedsInput({ label }: { label: string }) {
  return (
    <span className="type-label" style={{ color: "var(--warn)" }}>
      [NEEDS INPUT: {label}]
    </span>
  );
}
