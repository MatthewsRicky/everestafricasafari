import { Suspense } from "react";
import type { Metadata } from "next";

import { getPublishedJourneys } from "@/lib/journeys";
import type { Journey } from "@/types/journey";

import { connection } from "next/server";

import PublicJourneyCard from "@/components/tracker/PublicJourneyCard";

export const metadata: Metadata = {
  title: "Our Safari Journeys | Everest Africa Safari",
  description:
    "Follow our safari journeys across Kenya and East Africa. Explore destinations, itineraries and photographs from our adventures.",
};

async function SafariTrackerContent() {

  await connection()
  const journeys = (await getPublishedJourneys()) as Journey[];

  const featured = journeys.find((journey) => journey.featured);

  const remaining = journeys.filter((journey) => journey.id !== featured?.id);

  return (
    <section className="px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {journeys.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Our journeys are coming soon.
            </h2>

            <p className="mt-3 text-gray-500">
              Check back to discover our latest safari adventures.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-16">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Featured journey
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                    Discover our latest adventure
                  </h2>
                </div>

                <PublicJourneyCard journey={featured} />
              </div>
            )}

            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Explore our journeys
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Discover the destinations and experiences that make each
                  safari unique.
                </p>
              </div>

              {remaining.length > 0 ? (
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {remaining.map((journey) => (
                    <PublicJourneyCard key={journey.id} journey={journey} />
                  ))}
                </div>
              ) : (
                !featured && (
                  <p className="text-sm text-gray-500">
                    More journeys will be added soon.
                  </p>
                )
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function SafariTrackerPage() {
  return (
    <main>
      <section className="bg-[#f7f5f0] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Everest Africa Safari
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-gray-950 md:text-6xl">
            Every journey has a story.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600">
            Travel with us through the landscapes, wildlife and unforgettable
            experiences of East Africa. Explore our journeys and discover the
            stories behind each adventure.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="px-6 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm text-gray-500">
                Loading safari journeys...
              </p>
            </div>
          </section>
        }
      >
        <SafariTrackerContent />
      </Suspense>
    </main>
  );
}
