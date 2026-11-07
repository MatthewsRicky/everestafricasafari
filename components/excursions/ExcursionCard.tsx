import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import type { Excursion } from "@/types/excursion";
import { formatPrice } from "@/lib/format-price";

type ExcursionCardProps = {
  excursion: Excursion;
};

export default function ExcursionCard({ excursion }: ExcursionCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/excursions/${excursion.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-forest/10"
        aria-label={`Explore ${excursion.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={excursion.image}
          alt={excursion.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-forest shadow-sm">
          {excursion.durationDays}{" "}
          {excursion.durationDays === 1 ? "day" : "days"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/60">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} className="text-terracotta" />
            {excursion.durationDays}{" "}
            {excursion.durationDays === 1 ? "day" : "days"}
          </span>

          {excursion.departureLocation && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-terracotta" />
              {excursion.departureLocation}
            </span>
          )}
        </div>

        <h2 className="mt-4 font-serif text-xl leading-snug text-forest sm:text-2xl">
          <Link
            href={`/excursions/${excursion.slug}`}
            className="transition hover:text-terracotta"
          >
            {excursion.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-sm leading-7 text-ink/70">
          {excursion.description}
        </p>
        {excursion.prices && Object.keys(excursion.prices).length > 0 && (
          <div className="mt-5 border-t border-forest/10 pt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-ink/50">
              Indicative price per person
            </p>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {(
                [
                  ["USD", excursion.prices.USD],
                  ["EUR", excursion.prices.EUR],
                  ["KES", excursion.prices.KES],
                ] as const
              ).map(([currency, amount]) =>
                typeof amount === "number" ? (
                  <span
                    key={currency}
                    className="text-lg font-semibold text-forest"
                  >
                    {formatPrice(amount, currency)}
                  </span>
                ) : null,
              )}
            </div>
          </div>
        )}

        <Link
          href={`/excursions/${excursion.slug}`}
          className="mt-6 inline-flex items-center gap-2 border-t border-forest/10 pt-4 text-sm font-semibold text-forest transition hover:text-terracotta"
        >
          Explore experience
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
