import type { Metadata } from "next";
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

function formatDate(date: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const journey = await getJourneyBySlug(slug);

  if (!journey) {
    return {
      title: "Journey Not Found | Everest Africa Safari",
    };
  }

  return {
    title: `${journey.title} | Everest Africa Safari`,
    description:
      journey.description ?? `Follow our ${journey.title} safari journey.`,
    openGraph: {
      title: journey.title,
      description: journey.description ?? undefined,
      images: journey.cover_image_path
        ? [getPublicImageUrl(journey.cover_image_path)!]
        : [],
    },
  };
}

export default async function PublicJourneyPage({ params }: Props) {
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
    <main>
      {/* HERO */}
      <section className="relative isolate min-h-[480px] overflow-hidden bg-gray-900">
        {coverImage && (
          <img
            src={coverImage}
            alt={journey.title}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        <div className="mx-auto flex min-h-[480px] max-w-7xl flex-col justify-end px-6 py-16 lg:py-24">
          <Link
            href="/safari-tracker"
            className="mb-12 inline-flex w-fit items-center gap-2 text-sm text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            All journeys
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Everest Africa Safari · Journey Tracker
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {journey.title}
          </h1>

          {journey.description && (
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
              {journey.description}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-5 text-sm text-white/80">
            {start && (
              <span>
                {start}
                {end && ` – ${end}`}
              </span>
            )}

            <span>{stops.length} destinations</span>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              The adventure
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              Following the journey
            </h2>

            <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600">
              {journey.description ||
                "Explore the destinations and experiences from this safari adventure."}
            </p>
          </div>
        </div>
      </section>

      {/* MAP */}
      {stops.length > 0 && (
        <section className="bg-[#f7f5f0] px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                The route
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-gray-900">
                Explore our route
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Discover the places visited throughout this journey.
              </p>
            </div>

            <PublicJourneyMap stops={stops} />
          </div>
        </section>
      )}

      {/* TIMELINE */}
      {stops.length > 0 && (
        <section className="px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                The itinerary
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-gray-900">
                The journey, step by step
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Explore the destinations, experiences and activities that make
                up this adventure.
              </p>
            </div>

            <PublicJourneyTimeline stops={stops} />
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section className="bg-[#f7f5f0] px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <PublicJourneyGallery stops={stops} />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <MapPin size={28} className="mx-auto text-gray-400" />

          <h2 className="mt-5 text-3xl font-semibold text-gray-900">
            Ready to experience your own adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
            Let Everest Africa Safari help you plan a journey through the
            extraordinary landscapes of East Africa.
          </p>

          <Link
            href="/request-a-quote"
            className="mt-8 inline-flex rounded-lg bg-gray-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Plan your safari
          </Link>
        </div>
      </section>
    </main>
  );
}
