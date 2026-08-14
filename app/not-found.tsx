import Link from "next/link";
import { CornerBrackets } from "@/components/primitives/CornerBrackets";
import { RuleLabel } from "@/components/primitives/RuleLabel";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <CornerBrackets className="w-full max-w-xl p-8 sm:p-12">
        <RuleLabel label="signal lost" />
        <h1 className="type-display mt-6 text-step-4 uppercase text-primary">404</h1>
        <p className="mt-4 text-step-0 text-secondary">This route does not exist.</p>
        <Link
          href="/"
          className="type-label mt-8 inline-block border border-hairline px-5 py-3 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          Return to apex
        </Link>
      </CornerBrackets>
    </div>
  );
}
