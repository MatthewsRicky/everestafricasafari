import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { getJourneyBySlug, getPublicImageUrl } from "@/lib/journeys";

import PublicJourneyMap from "@/components/tracker/PublicJourneyMap";
import PublicJourneyTimeline from "@/components/tracker/PublicJourneyTimeline";
import PublicJourneyGallery from "@/components/tracker/PublicJourneyGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Safari Journey | Everest Africa Safari",
  description:
    "Follow our safari journeys across Kenya and East Africa. Explore destinations, itineraries and photographs from our adventures.",
};

function formatDate(date: string | null) {
  if (!date) return null;

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function PublicJourneyContent({ params }: Props) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);

  if (!journey) {
    notFound();
  }

  const coverImage = getPublicImageUrl(journey.cover_image_path);
  const start = formatDate(journey.start_date);
  const end = formatDate(journey.end_date);
  const stops = journey.journey_stops ?? [];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative isolate min-h-[65vh] overflow-hidden bg-gray-950">
        {coverImage && (
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url("${coverImage}")` }}
          />
        )}

        <div className="absolute inset-0 -z-10 bg-black/55" />

        <div className="mx-auto flex min-h-[65vh] max-w-7xl flex-col justify-end px-6 py-16 lg:px-10">
          <Link
            href="/safari-tracker"
            className="mb-10 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Safari Tracker
          </Link>

          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-safari-gold uppercase">
              Safari Journey
            </p>

            <h1 className="font-heading text-4xl leading-tight font-semibold text-white sm:text-5xl lg:text-7xl">
              {journey.title}
            </h1>

            {(start || end) && (
              <p className="mt-6 text-sm text-white/80 sm:text-base">
                {start}
                {start && end && start !== end ? ` — ${end}` : ""}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          {journey.description && (
            <div className="mb-10">
              <p className="text-sm font-semibold tracking-[0.18em] text-safari-gold uppercase">
                The Journey
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {journey.description}
              </p>
            </div>
          )}

          {stops.length > 0 && (
            <div className="flex items-start gap-3 border-t border-gray-200 pt-6">
              <MapPin size={20} className="mt-1 shrink-0 text-safari-gold" />

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Destinations visited
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {stops.map((stop) => stop.location).join(" · ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Journey Map */}
      {stops.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-safari-gold uppercase">
                The Route
              </p>

              <h2 className="mt-3 font-heading text-3xl font-semibold text-gray-900 sm:text-4xl">
                Follow the journey
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Explore the destinations and stops along this safari journey.
              </p>
            </div>

            <PublicJourneyMap stops={stops} />
          </div>
        </section>
      )}

      {/* Timeline */}
      {stops.length > 0 && (
        <section className="section-padding">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-safari-gold uppercase">
                Along the Way
              </p>

              <h2 className="mt-3 font-heading text-3xl font-semibold text-gray-900 sm:text-4xl">
                Journey highlights
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Discover the places, experiences and memorable moments that make
                up this adventure.
              </p>
            </div>

            <PublicJourneyTimeline stops={stops} />
          </div>
        </section>
      )}

      {/* Gallery */}
      {stops.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-safari-gold uppercase">
                Memories
              </p>

              <h2 className="mt-3 font-heading text-3xl font-semibold text-gray-900 sm:text-4xl">
                Moments from the journey
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                A collection of photographs from the destinations and
                experiences along the way.
              </p>
            </div>

            <PublicJourneyGallery stops={stops} />
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-padding bg-gray-950">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-[0.18em] text-safari-gold uppercase">
            Your Adventure Awaits
          </p>

          <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Ready to create your own safari story?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
            Let us help you plan an unforgettable journey through Kenya and East
            Africa.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center bg-safari-gold px-7 py-4 text-sm font-semibold text-gray-950 transition hover:bg-white"
          >
            Plan Your Safari
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function PublicJourneyPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <p className="text-sm text-gray-500">Loading safari journey...</p>
          </div>
        </main>
      }
    >
      <PublicJourneyContent params={params} />
    </Suspense>
  );
}
