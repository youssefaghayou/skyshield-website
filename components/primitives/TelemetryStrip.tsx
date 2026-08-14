export type TelemetryRow = { label: string; value: string };

type Props = {
  rows: TelemetryRow[];
  className?: string;
};

/**
 * A mono readout: labels left, values right-aligned in a fixed-width column.
 * Every value displayed must be a real value — never filler.
 */
export function TelemetryStrip({ rows, className = "" }: Props) {
  return (
    <dl className={`font-mono text-step--1 ${className}`}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-6 border-b border-hairline py-1.5 last:border-b-0"
        >
          <dt className="type-label text-tertiary">{row.label}</dt>
          <dd className="text-primary text-right tabular-nums">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
