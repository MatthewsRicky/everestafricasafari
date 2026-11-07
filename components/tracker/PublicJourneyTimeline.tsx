import type { JourneyStop } from "@/types/journey";

function formatDate(date: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function PublicJourneyTimeline({
  stops,
}: {
  stops: JourneyStop[];
}) {
  return (
    <div className="relative space-y-12">
      {stops.map((stop, index) => (
        <article
          key={stop.id}
          className="relative grid gap-5 md:grid-cols-[64px_1fr]"
        >
          <div className="relative flex flex-col items-center">
            <span className="z-10 flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-900">
              {index + 1}
            </span>

            {index !== stops.length - 1 && (
              <span className="absolute top-10 h-full w-px bg-gray-200" />
            )}
          </div>

          <div className="space-y-4 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Stop {index + 1}
              </p>

              <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                {stop.location}
              </h3>

              {(stop.arrival_date || stop.departure_date) && (
                <p className="mt-2 text-sm text-gray-500">
                  {formatDate(stop.arrival_date)}
                  {stop.departure_date && (
                    <> – {formatDate(stop.departure_date)}</>
                  )}
                </p>
              )}
            </div>

            {stop.description && (
              <p className="max-w-3xl whitespace-pre-line text-sm leading-8 text-gray-600">
                {stop.description}
              </p>
            )}

            {stop.activities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {stop.activities.map((activity, i) => (
                  <span
                    key={`${activity}-${i}`}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
