/**
 * The four gold command threads. In the hero they descend from the apex node
 * and exit the bottom of frame; the thesis section continues them as vertical
 * lines at the same x-positions. Thread x-anchors: 20 / 40 / 60 / 80 %.
 * Strokes use non-scaling 1px hairlines — threads are information, they must
 * read at every viewport.
 */

export function ApexThreads({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      {[20, 40, 60, 80].map((x) => (
        <path
          key={x}
          className="thread-path"
          d={`M 50 0 C 50 38, ${x} 58, ${x} 100`}
          fill="none"
          stroke="var(--atlas-gold)"
          strokeWidth="1"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function ContinuingThreads({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      {[20, 40, 60, 80].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="100"
          stroke="var(--atlas-gold)"
          strokeWidth="1"
          opacity="0.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
