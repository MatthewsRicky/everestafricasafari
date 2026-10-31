"use client";

import { useState } from "react";
import type { SafariTrip } from "@/data/safari-trips";

type TripCollectionProps = {
  trips: SafariTrip[];
};

function getValidEmbedUrl(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);

    const isPolarsteps =
      url.protocol === "https:" &&
      (url.hostname === "polarsteps.com" ||
        url.hostname === "www.polarsteps.com");

    return isPolarsteps ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function TripCollection({ trips }: TripCollectionProps) {
  const availableTrips = trips.filter((trip) =>
    getValidEmbedUrl(trip.embedUrl),
  );

  const initialTrip =
    availableTrips.find((trip) => trip.featured) ?? availableTrips[0];

  const [selectedSlug, setSelectedSlug] = useState(initialTrip?.slug ?? "");

  const selectedTrip =
    availableTrips.find((trip) => trip.slug === selectedSlug) ?? initialTrip;

  const selectedEmbedUrl = getValidEmbedUrl(selectedTrip?.embedUrl);

  return (
    <section id="featured-journey" className="section-padding bg-ivory">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-forest">
            The journey
          </p>

          <h2 className="heading-display text-4xl leading-tight text-forest-deep sm:text-5xl">
            Follow Our Safari Adventures
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600">
            Explore our journeys, discover remarkable destinations and
            experience the beauty of Africa along the way.
          </p>
        </div>

        {selectedTrip && selectedEmbedUrl ? (
          <>
            {/* Selected trip information */}
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                  {selectedTrip.featured
                    ? "Featured journey"
                    : "Selected journey"}
                </p>

                <h3 className="heading-display mt-2 text-3xl text-forest-deep sm:text-4xl">
                  {selectedTrip.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {selectedTrip.destination}
                  {selectedTrip.period ? ` · ${selectedTrip.period}` : ""}
                </p>
              </div>

              <a
                href={selectedEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-forest underline underline-offset-4 transition hover:text-safari-gold"
              >
                View on Polarsteps
              </a>
            </div>

            {/* Polarsteps map */}
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
              <iframe
                key={selectedTrip.slug}
                src={selectedEmbedUrl}
                title={`${selectedTrip.title} - Polarsteps journey map`}
                className="h-[450px] w-full md:h-[600px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {selectedTrip.description && (
              <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-600">
                {selectedTrip.description}
              </p>
            )}

            {/* Other connected journeys */}
            {availableTrips.length > 1 && (
              <div className="mt-20">
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">
                    Explore more
                  </p>

                  <h3 className="heading-display mt-3 text-3xl text-forest-deep sm:text-4xl">
                    More Safari Journeys
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                    Select another journey to explore its route and discover
                    more of Africa.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {availableTrips
                    .filter((trip) => trip.slug !== selectedTrip.slug)
                    .map((trip) => {
                      const isFeatured = trip.featured;

                      return (
                        <button
                          key={trip.slug}
                          type="button"
                          onClick={() => setSelectedSlug(trip.slug)}
                          aria-pressed={selectedTrip.slug === trip.slug}
                          className="group overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition hover:-translate-y-1 hover:border-forest/30 hover:shadow-xl"
                        >
                          <div
                            className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-forest-deep via-forest to-[#a38a59]"
                            style={
                              trip.image
                                ? {
                                    backgroundImage: `linear-gradient(0deg, rgba(16,44,37,0.45), rgba(16,44,37,0.05)), url("${trip.image}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }
                                : undefined
                            }
                          >
                            <div className="absolute inset-0 flex items-end p-5">
                              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                                {isFeatured
                                  ? "Featured journey"
                                  : "Explore journey"}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h4 className="heading-display text-2xl text-forest-deep transition group-hover:text-forest">
                              {trip.title}
                            </h4>

                            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-forest">
                              {trip.destination}
                            </p>

                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
                              {trip.description}
                            </p>

                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                              View journey
                              <span
                                aria-hidden="true"
                                className="transition-transform group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </span>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-black/10 bg-[#eae9df] px-6 py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">
              Safari tracker
            </p>

            <h3 className="heading-display mt-4 text-3xl text-forest-deep">
              Our next adventure awaits
            </h3>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600">
              Our safari journeys will appear here once they have been
              connected.
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs leading-6 text-gray-500">
          Journey maps powered by Polarsteps.
        </p>
      </div>
    </section>
  );
}
