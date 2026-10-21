import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import type { Excursion } from "@/types/excursion";

type ExcursionCardProps = {
  excursion: Excursion;
};

export default function ExcursionCard({ excursion }: ExcursionCardProps) {
  return (
    <Link
      href={`/excursions/${excursion.slug}`}
      className="group overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_14px_32px_rgba(25,45,36,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(25,45,36,0.08)]"
    >
      <div className="overflow-hidden">
        <img
          src={excursion.image}
          alt={excursion.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-safari-gold">
            {excursion.departureLocation ?? "Kenya"}
          </span>

          <span className="text-xs font-semibold text-forest">
            {excursion.verificationStatus.replaceAll("-", " ")}
          </span>
        </div>

        <h3 className="heading-display mt-5 text-3xl text-forest-deep">
          {excursion.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <Clock3 size={14} />
          {excursion.durationDays}{" "}
          {excursion.durationDays === 1 ? "day" : "days"}
        </div>

        <p className="mt-4 text-sm leading-7 text-muted">
          {excursion.description}
        </p>

        <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-forest">
          Explore details
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      </div>
    </Link>
  );
}
