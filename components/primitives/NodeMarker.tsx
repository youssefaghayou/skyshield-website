type Props = {
  label: string;
  /** Stem length in px. */
  stem?: number;
  /** Stem direction from the node. */
  direction?: "up" | "down";
  className?: string;
};

/**
 * A small circle with a hairline stem and mono label — annotates 3D scenes
 * and diagrams. Position via the wrapper (absolute/grid); this renders the
 * marker itself.
 */
export function NodeMarker({ label, stem = 24, direction = "down", className = "" }: Props) {
  const flip = direction === "up" ? "flex-col-reverse" : "flex-col";
  return (
    <div className={`inline-flex ${flip} items-start ${className}`}>
      <span
        aria-hidden="true"
        className="block h-2 w-2 rounded-full border border-domain bg-transparent"
      />
      <span
        aria-hidden="true"
        className="ml-[3.5px] block w-px bg-hairline"
        style={{ height: `${stem}px` }}
      />
      <span className="type-label text-secondary mt-1">{label}</span>
    </div>
  );
}
