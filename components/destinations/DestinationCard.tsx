import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SafariDestination } from "@/types/safari";

type DestinationCardProps = {
  destination: SafariDestination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative isolate flex min-h-[340px] items-end overflow-hidden rounded-xl bg-maroon-deep sm:min-h-[400px]"
    >
      <div
        role="img"
        aria-label={`${destination.name} landscape`}
        className="absolute inset-0 -z-20 bg-cover bg-center transition duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url("${destination.image}")`,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
      />

      <div className="w-full p-6 text-white sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="heading-display text-3xl sm:text-4xl">
              {destination.name}
            </h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
              {destination.description}
            </p>
          </div>

          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/50 transition group-hover:border-maroon group-hover:bg-maroon">
            <ArrowUpRight size={19} />
          </span>
        </div>
      </div>
    </Link>
  );
}
