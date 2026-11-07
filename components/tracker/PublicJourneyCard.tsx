import Link from "next/link";
import type { Journey } from "@/types/journey";
import { getPublicImageUrl } from "@/lib/journeys";

function formatDate(date: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function PublicJourneyCard({ journey }: { journey: Journey }) {
  const coverImage = getPublicImageUrl(journey.cover_image_path);

  const start = formatDate(journey.start_date);
  const end = formatDate(journey.end_date);

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/safari-tracker/${journey.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {coverImage ? (
            <img
              src={coverImage}
              alt={journey.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Journey photograph unavailable
            </div>
          )}

          {journey.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
              Featured journey
            </span>
          )}
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 transition group-hover:text-gray-600">
              {journey.title}
            </h2>

            {journey.description && (
              <p className="mt-2 line-clamp-3 text-sm leading-7 text-gray-500">
                {journey.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
            {start && <span>{start}</span>}

            {end && (
              <>
                <span>–</span>
                <span>{end}</span>
              </>
            )}

            <span>{journey.journey_stops?.length ?? 0} destinations</span>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
            Explore journey
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
