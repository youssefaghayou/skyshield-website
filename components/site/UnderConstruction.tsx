import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { RuleLabel } from "@/components/primitives/RuleLabel";
import { TelemetryStrip } from "@/components/primitives/TelemetryStrip";

type Props = {
  /** Route path, e.g. "/atlas". */
  route: string;
  /** Page display name. */
  name: string;
  /** Build phase (from the project plan) in which this route receives content. */
  phase: number;
  /** Where the content will come from. */
  source: string;
};

/**
 * Honest placeholder: every route in the IA exists from Phase 1, and each
 * placeholder states what it is, when it fills, and from where. No fake copy.
 */
export function UnderConstruction({ route, name, phase, source }: Props) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <CornerBrackets className="w-full max-w-xl p-8 sm:p-12">
        <RuleLabel label={`route ${route}`} />
        <h1 className="type-display mt-6 text-step-3 uppercase text-primary">{name}</h1>
        <TelemetryStrip
          className="mt-8"
          rows={[
            { label: "status", value: "UNDER CONSTRUCTION" },
            { label: "content phase", value: `PHASE ${phase}` },
            { label: "content source", value: source },
          ]}
        />
      </CornerBrackets>
    </div>
  );
}
