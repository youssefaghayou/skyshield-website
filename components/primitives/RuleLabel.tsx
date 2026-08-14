type Props = {
  label: string;
  /** Where the label breaks the rule. */
  align?: "start" | "center";
  className?: string;
};

/** A hairline with a mono label breaking it — the standard section marker. */
export function RuleLabel({ label, align = "start", className = "" }: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`} role="presentation">
      {align === "center" && <span aria-hidden="true" className="h-px flex-1 bg-hairline" />}
      {align === "start" && <span aria-hidden="true" className="h-px w-8 bg-hairline" />}
      <span className="type-label text-tertiary whitespace-nowrap">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
    </div>
  );
}
