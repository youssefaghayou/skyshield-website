type Props = {
  /** Asset ID as logged in ASSETS-REQUIRED.md, e.g. "air-domain-hero". */
  id: string;
  /** Dimensions / intent note shown under the ID. */
  note?: string;
  /** Where the ID label sits — move it off-centre when content overlays the middle. */
  labelAt?: "center" | "bottom" | "top";
  className?: string;
};

/**
 * Labelled stand-in for a not-yet-delivered asset (see Asset Request Protocol).
 * Visibly displays its asset ID so reviews can trace it to ASSETS-REQUIRED.md.
 * Swapping in the real media is a one-component change.
 */
export function AssetPlaceholder({ id, note, labelAt = "center", className = "" }: Props) {
  const align =
    labelAt === "bottom"
      ? "items-end pb-24"
      : labelAt === "top"
        ? "items-start pt-24"
        : "items-center";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex select-none justify-center overflow-hidden ${align} ${className}`}
      style={{
        background: "var(--domain-deep, var(--surface-1))",
        backgroundImage:
          "repeating-linear-gradient(45deg, var(--hairline) 0 1px, transparent 1px 32px)",
      }}
    >
      <p className="type-label px-4 text-center leading-6 text-tertiary">
        [ASSET: {id}]
        {note ? <span className="block normal-case tracking-normal">{note}</span> : null}
      </p>
    </div>
  );
}
