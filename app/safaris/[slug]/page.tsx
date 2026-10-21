
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  MapPin,
  Compass,
  Info,
} from "lucide-react";

import Container from "@/components/shared/Container";
import { getSafariBySlug, safaris } from "@/data/safaris";
import { destinations } from "@/data/destinations";
import type { Destination } from "@/types/destination";

type SafariDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return safaris.map((safari) => ({
    slug: safari.slug,
  }));
}

export async function generateMetadata({
  params,
}: SafariDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const safari = getSafariBySlug(slug);

  if (!safari) {
    return {
      title: "Safari Not Found | Everest Africa Safari",
    };
  }

  return {
    title: `${safari.title} | Everest Africa Safari`,
    description: safari.description,
  };
}

/**
 * Maps the destination labels used by safari packages to
 * the destination profiles maintained in destinations.ts.
 */
function getDestinationForLabel(label: string): Destination | undefined {
  const normalized = label
    .toLowerCase()
    .replace(/\b(national park|national reserve|national game reserve)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  // Several safari labels refer to one destination profile.
  const aliases: Record<string, string> = {
    "tsavo east": "tsavo",
    "tsavo west": "tsavo",
    "aberdares": "aberdares",
    "lake nakuru": "lake-nakuru",
  };

  const aliasSlug = aliases[normalized];

  if (aliasSlug) {
    return destinations.find((destination) => destination.slug === aliasSlug);
  }

  return destinations.find((destination) => {
    const values = [
      destination.slug,
      destination.name,
      destination.title,
    ].map((value) =>
      value
        .toLowerCase()
        .replace(/\b(national park|national reserve|national game reserve)\b/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim(),
    );

    return values.includes(normalized);
  });
}

function getSafariDestinations(labels: string[]): Destination[] {
  const matched = labels
    .map(getDestinationForLabel)
    .filter((destination): destination is Destination => Boolean(destination));

  // A package naming Tsavo East and Tsavo West should display
  // the combined Tsavo profile only once.
  return matched.filter(
    (destination, index, all) =>
      all.findIndex((item) => item.slug === destination.slug) === index,
  );
}

function SafariCatalogueFallback() {
  return (
    <div
      className="min-h-96 animate-pulse rounded-3xl bg-sand/50"
      aria-label="Loading safari details"
    />
  );
}

export default function SafariDetailPage({
  params,
}: SafariDetailPageProps) {
  return (
    <Suspense fallback={<SafariCatalogueFallback />}>
      <SafariDetailContent params={params} />
    </Suspense>
  );
}

async function SafariDetailContent({ params }: SafariDetailPageProps) {
  const { slug } = await params;
  const safari = getSafariBySlug(slug);

  if (!safari) {
    notFound();
  }

  const safariDestinations = getSafariDestinations(safari.destinations);

  const relatedSafaris = safaris
    .filter((item) => item.slug !== safari.slug)
    .filter((item) =>
      item.destinations.some((label) =>
        safariDestinations.some(
          (destination) =>
            getDestinationForLabel(label)?.slug === destination.slug,
        ),
      ),
    )
    .slice(0, 3);

  const quoteUrl = `/request-a-quote?safari=${encodeURIComponent(safari.slug)}`;

  return (
    <>
      {/* Safari hero */}
      <section className="bg-maroon-deep py-12 text-white sm:py-16 lg:py-20">
        <Container>
          <Link
            href="/safaris"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            All safaris
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-safari-gold">
                {safari.category} safari
              </p>

              <h1 className="heading-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {safari.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
                {safari.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-safari-gold" />
                  {safari.destination}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} className="text-safari-gold" />
                  {safari.durationDays}{" "}
                  {safari.durationDays === 1 ? "day" : "days"}
                </span>
              </div>

              <Link
                href={quoteUrl}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3.5 text-sm font-semibold text-maroon-deep transition hover:bg-white"
              >
                Request a quote
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-2">
              <img
                src={safari.image}
                alt={`Landscape for ${safari.title}`}
                className="h-72 w-full rounded-2xl object-cover sm:h-96"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Package overview and quote sidebar */}
      <section className="section-padding">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
            <div className="space-y-10">
              <section>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                  Your journey
                </p>

                <h2 className="heading-display mt-2 text-3xl text-maroon-deep sm:text-4xl">
                  About this safari
                </h2>

                <p className="mt-4 leading-7 text-muted">
                  {safari.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {safari.destinations.map((destination) => (
                    <span
                      key={destination}
                      className="rounded-full border border-border bg-white px-3 py-2 text-sm text-ink"
                    >
                      {destination}
                    </span>
                  ))}
                </div>

                {safariDestinations.length === 0 && (
                  <p className="mt-4 text-sm leading-6 text-muted">
                    Destination profiles for this route are still being
                    prepared. Contact our team to discuss the locations
                    included in this package.
                  </p>
                )}
              </section>

              {/* Destination profiles drawn from destinations.ts */}
              {safariDestinations.length > 0 && (
                <section>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                    Discover the places
                  </p>

                  <h2 className="heading-display mt-2 text-3xl text-maroon-deep sm:text-4xl">
                    Destinations along your journey
                  </h2>

                  <p className="mt-4 max-w-3xl leading-7 text-muted">
                    Explore the landscapes, wildlife and experiences associated
                    with the destinations named in this safari package.
                    Specific stops and activities depend on the confirmed
                    itinerary.
                  </p>

                  <div className="mt-7 space-y-8">
                    {safariDestinations.map((destination) => {
                      const destinationImage =
                        destination.images.overview ||
                        destination.images.landscape ||
                        destination.image;

                      return (
                        <article
                          key={destination.slug}
                          className="overflow-hidden rounded-3xl border border-border bg-white"
                        >
                          <div className="grid md:grid-cols-[0.85fr_1.15fr]">
                            <div className="min-h-56 bg-sand/40">
                              <img
                                src={destinationImage}
                                alt={destination.title}
                                className="h-full min-h-56 w-full object-cover"
                                loading="lazy"
                              />
                            </div>

                            <div className="p-6 sm:p-7">
                              <p className="text-xs font-bold uppercase tracking-[0.18em] text-maroon">
                                {destination.region}
                              </p>

                              <h3 className="heading-display mt-2 text-2xl text-maroon-deep">
                                {destination.title}
                              </h3>

                              <p className="mt-3 leading-7 text-muted">
                                {destination.details.overview ||
                                  destination.description}
                              </p>

                              {destination.highlights.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                  {destination.highlights.map((highlight) => (
                                    <span
                                      key={highlight}
                                      className="rounded-full bg-ivory px-3 py-1.5 text-xs font-medium text-forest-deep"
                                    >
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <Link
                                href={`/destinations/${destination.slug}`}
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-maroon transition hover:text-maroon-deep"
                              >
                                Explore destination
                                <ArrowUpRight size={16} />
                              </Link>
                            </div>
                          </div>

                          {/* Destination facts */}
                          {destination.details.facts.length > 0 && (
                            <div className="border-t border-border bg-ivory/50 p-6 sm:p-7">
                              <h4 className="font-semibold text-maroon-deep">
                                Destination at a glance
                              </h4>

                              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                                {destination.details.facts
                                  .slice(0, 4)
                                  .map((fact) => (
                                    <div key={fact.label}>
                                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                                        {fact.label}
                                      </dt>
                                      <dd className="mt-1 text-sm leading-6 text-ink">
                                        {fact.value}
                                      </dd>
                                    </div>
                                  ))}
                              </dl>
                            </div>
                          )}

                          {/* Destination experiences */}
                          {destination.details.experiences.length > 0 && (
                            <div className="border-t border-border p-6 sm:p-7">
                              <h4 className="font-semibold text-maroon-deep">
                                Experiences to discover
                              </h4>

                              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                                {destination.details.experiences
                                  .slice(0, 4)
                                  .map((experience) => (
                                    <div key={experience.title}>
                                      <h5 className="font-semibold text-ink">
                                        {experience.title}
                                      </h5>
                                      <p className="mt-2 text-sm leading-6 text-muted">
                                        {experience.description}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* Destination practical information */}
                          {destination.details.practicalInfo.length > 0 && (
                            <div className="border-t border-border bg-sand/20 p-6 sm:p-7">
                              <div className="flex items-center gap-2">
                                <Info
                                  size={17}
                                  className="text-maroon"
                                />
                                <h4 className="font-semibold text-maroon-deep">
                                  Practical information
                                </h4>
                              </div>

                              <dl className="mt-4 space-y-4">
                                {destination.details.practicalInfo
                                  .slice(0, 4)
                                  .map((fact) => (
                                    <div
                                      key={fact.label}
                                      className="grid gap-1 sm:grid-cols-[150px_1fr]"
                                    >
                                      <dt className="text-sm font-semibold text-ink">
                                        {fact.label}
                                      </dt>
                                      <dd className="text-sm leading-6 text-muted">
                                        {fact.value}
                                      </dd>
                                    </div>
                                  ))}
                              </dl>

                              <p className="mt-4 text-xs leading-5 text-muted">
                                General destination guidance only. Confirm
                                current park fees, access arrangements,
                                operating conditions and activities before
                                travelling.
                              </p>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Package itinerary */}
              {safari.itinerary.length > 0 && (
                <section>
                  <h2 className="heading-display text-3xl text-maroon-deep">
                    Your itinerary
                  </h2>

                  <div className="mt-6 space-y-6">
                    {safari.itinerary.map((day) => (
                      <article
                        key={day.day}
                        className="border-l-2 border-safari-gold pl-5"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-maroon">
                          Day {day.day}
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-maroon-deep">
                          {day.title}
                        </h3>

                        <p className="mt-2 leading-7 text-muted">
                          {day.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Package inclusions */}
              {safari.inclusions.length > 0 && (
                <section>
                  <h2 className="heading-display text-3xl text-maroon-deep">
                    What&apos;s included
                  </h2>

                  <ul className="mt-4 list-inside list-disc space-y-2 text-muted">
                    {safari.inclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Package exclusions */}
              {safari.exclusions.length > 0 && (
                <section>
                  <h2 className="heading-display text-3xl text-maroon-deep">
                    What&apos;s not included
                  </h2>

                  <ul className="mt-4 list-inside list-disc space-y-2 text-muted">
                    {safari.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Related packages */}
              {relatedSafaris.length > 0 && (
                <section>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                    More ways to explore
                  </p>

                  <h2 className="heading-display mt-2 text-3xl text-maroon-deep">
                    You may also like
                  </h2>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {relatedSafaris.map((relatedSafari) => (
                      <article
                        key={relatedSafari.slug}
                        className="overflow-hidden rounded-2xl border border-border bg-white"
                      >
                        <img
                          src={relatedSafari.image}
                          alt=""
                          className="h-44 w-full object-cover"
                          loading="lazy"
                        />

                        <div className="p-5">
                          <p className="text-sm text-muted">
                            {relatedSafari.durationDays} days ·{" "}
                            {relatedSafari.category}
                          </p>

                          <h3 className="mt-2 text-lg font-semibold text-maroon-deep">
                            {relatedSafari.title}
                          </h3>

                          <Link
                            href={`/safaris/${relatedSafari.slug}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-maroon hover:text-maroon-deep"
                          >
                            View safari
                            <ArrowUpRight size={16} />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Quote sidebar */}
            <aside className="rounded-3xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-maroon">
                Plan your journey
              </p>

              <h2 className="heading-display mt-3 text-2xl text-maroon-deep">
                Interested in this safari?
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                Tell us your preferred travel dates, group size and
                requirements so the team can discuss a suitable itinerary and
                current pricing with you.
              </p>

              <div className="mt-5 space-y-3 border-y border-border py-5 text-sm text-muted">
                <p className="flex items-start gap-3">
                  <Clock3
                    size={17}
                    className="mt-0.5 shrink-0 text-maroon"
                  />
                  {safari.durationDays}{" "}
                  {safari.durationDays === 1 ? "day" : "days"} advertised
                </p>

                <p className="flex items-start gap-3">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-maroon"
                  />
                  {safari.destinations.join(", ")}
                </p>

                <p className="flex items-start gap-3">
                  <Compass
                    size={17}
                    className="mt-0.5 shrink-0 text-maroon"
                  />
                  Routing and overnight stops to be confirmed
                </p>
              </div>

              <Link
                href={quoteUrl}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-maroon-deep"
              >
                Request a quote
                <ArrowUpRight size={17} />
              </Link>

              <p className="mt-4 text-xs leading-5 text-muted">
                Duration, routing, accommodation, inclusions and price must
                be confirmed with the operator. Destination information is
                provided for general planning and does not guarantee that
                every listed experience forms part of this package.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
