import type { MissionSequenceDef } from "@/content/domains";

/** A mission profile told as a timestamped sequence — the manga-page energy
 *  translated to type: numbered beats, mono timestamps, no images required. */
export function MissionSequence({ seq }: { seq: MissionSequenceDef }) {
  return (
    <div className="border-t border-hairline py-6">
      <h3 className="text-step-0 font-medium text-primary">{seq.name}</h3>
      <ol className="mt-4 space-y-3">
        {seq.steps.map((s) => (
          <li key={s.t} className="flex gap-5">
            <span
              className="type-label shrink-0 pt-0.5 tabular-nums"
              style={{ color: "var(--domain-primary)" }}
            >
              {s.t}
            </span>
            <p className="text-step--1 text-secondary">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
