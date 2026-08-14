import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Bracket arm length in px. */
  size?: number;
  /** Bracket colour; defaults to the hairline. Pass "var(--domain-primary)" to skin. */
  color?: string;
};

/**
 * Four L-shaped hairlines marking a bounded region — used on cards, media
 * frames, and viewport-edge HUD. A bracket marks a real boundary; do not
 * apply it decoratively.
 */
export function CornerBrackets({
  children,
  className = "",
  size = 14,
  color = "var(--hairline)",
}: Props) {
  const arm = `${size}px`;
  const corners: Array<[string, string]> = [
    ["top-0 left-0", "border-t border-l"],
    ["top-0 right-0", "border-t border-r"],
    ["bottom-0 left-0", "border-b border-l"],
    ["bottom-0 right-0", "border-b border-r"],
  ];
  return (
    <div className={`relative ${className}`}>
      {corners.map(([pos, borders]) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} ${borders}`}
          style={{ width: arm, height: arm, borderColor: color }}
        />
      ))}
      {children}
    </div>
  );
}
