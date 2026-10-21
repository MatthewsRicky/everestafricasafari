import Link from "next/link";
import { ArrowUpRight, MapPin, Clock3 } from "lucide-react";
import type { Safari } from "@/types/safari";

type SafariCardProps = {
  safari: Safari;
};

export default function SafariCard({ safari }: SafariCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/safaris/${safari.slug}`}
        aria-label={`View ${safari.title}`}
        className="block"
      >
        <div className="relative h-60 overflow-hidden bg-sand">
          <img
            src={safari.image}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-maroon-deep shadow-sm">
            {safari.category}
          </span>

          <span className="absolute bottom-4 right-4 rounded-full bg-maroon-deep/90 px-3 py-1.5 text-xs font-medium text-white">
            {safari.durationDays} {safari.durationDays === 1 ? "day" : "days"}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={15} className="shrink-0 text-maroon" />
            <span>{safari.destination}</span>
          </div>

          <h2 className="heading-display mt-3 text-2xl leading-tight text-maroon-deep transition group-hover:text-maroon">
            {safari.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
            {safari.description}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="flex items-center gap-2 text-xs text-muted">
              <Clock3 size={15} />
              {safari.durationDays}-day safari
            </span>

            <span className="inline-flex items-center gap-1 text-sm font-semibold text-maroon-deep">
              Explore safari
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
