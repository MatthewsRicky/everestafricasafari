import Link from "next/link";
import type { Safari } from "@/types/safari";
import SafariCard from "@/components/safaris/SafariCard";

type SafariGridProps = {
  safaris: Safari[];
};

export default function SafariGrid({ safaris }: SafariGridProps) {
  if (safaris.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-white px-6 py-14 text-center">
        <h2 className="heading-display text-2xl text-maroon-deep">
          No safaris match those filters
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          Try another destination, duration or safari style to explore the
          available listings.
        </p>

        <Link
          href="/safaris"
          className="mt-6 inline-flex rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition hover:bg-maroon-deep"
        >
          View all safaris
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {safaris.map((safari) => (
        <SafariCard key={safari.slug} safari={safari} />
      ))}
    </div>
  );
}
