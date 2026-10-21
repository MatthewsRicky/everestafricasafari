import { Suspense } from "react";
import { notFound } from "next/navigation";

import CTASection from "@/components/shared/CTASection";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { destinations } from "@/data/destinations";

type DestinationDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  return (
    <Suspense fallback={<DestinationDetailFallback />}>
      <DestinationContent params={params} />
    </Suspense>
  );
}

function DestinationDetailFallback() {
  return (
    <main className="min-h-screen bg-ivory py-16">
      <Container>
        <div
          className="min-h-[28rem] animate-pulse rounded-3xl bg-sand/60"
          aria-label="Loading destination details"
        />
      </Container>
    </main>
  );
}

async function DestinationContent({ params }: DestinationDetailPageProps) {
  const { slug } = await params;

  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  const isMaasaiMara = destination.slug === "maasai-mara";

  const overview = isMaasaiMara
    ? "Maasai Mara National Reserve is one of Africa's best-known safari destinations and an important part of Kenya's wildlife conservation landscape. Its sweeping grasslands, rich wildlife and connection to Tanzania's Serengeti make it a memorable destination for a classic African safari."
    : destination.blurb;

  const facts = isMaasaiMara
    ? [
        {
          label: "Location",
          value: "Southwestern Kenya, Narok County",
        },
        {
          label: "Approximate size",
          value: "1,510 km²",
        },
        {
          label: "Wider ecosystem",
          value:
            "Connected to the Serengeti ecosystem across the Tanzania–Kenya border",
        },
        {
          label: "Landscape",
          value: "Rolling grasslands, acacia woodlands and riverine habitats",
        },
      ]
    : [
        {
          label: "Destination",
          value: destination.title,
        },
        {
          label: "Region",
          value: destination.region,
        },
        {
          label: "Safari focus",
          value: destination.bestFor,
        },
      ];

  const experiences = isMaasaiMara
    ? [
        {
          number: "01",
          title: "The Great Migration",
          description:
            "The wider Mara–Serengeti ecosystem hosts the seasonal movement of wildebeest, zebras and gazelles. July to October is often associated with migration activity in the Mara, although timing varies annually. River crossings are unpredictable and cannot be guaranteed.",
        },
        {
          number: "02",
          title: "The Big Five and other predators",
          description:
            "The reserve is renowned for lions, elephants, buffalo, leopards and rhinos. Cheetahs, hyenas and jackals are also among the wildlife visitors may encounter. Sightings depend on conditions and are never guaranteed.",
        },
        {
          number: "03",
          title: "Classic African landscapes",
          description:
            "Rolling grasslands, scattered acacia woodlands and riverine forests shape the landscape. The Mara and Talek river systems provide important water and habitat for wildlife.",
        },
        {
          number: "04",
          title: "Maasai culture",
          description:
            "The wider region is home to Maasai communities with distinctive cultural traditions. Community visits may be available through participating camps and tour operators; arrangements and fees should be confirmed before booking.",
        },
      ]
    : destination.highlights.map((highlight, index) => ({
        number: String(index + 1).padStart(2, "0"),
        title: highlight,
        description: `${highlight} is one of the experiences associated with ${destination.title}. Confirm the specific activities available on your chosen safari itinerary.`,
      }));

  const practicalInfo = isMaasaiMara
    ? [
        {
          label: "Best time to visit",
          value:
            "June–October is commonly associated with the dry season and migration viewing. December–March can also be a good period to consider. Conditions vary from year to year.",
        },
        {
          label: "Getting there",
          value:
            "Road transfers from Nairobi commonly take around 5–7 hours, depending on the reserve entrance and road conditions. Scheduled and charter flights operate to airstrips serving the Mara; flight time depends on the route.",
        },
        {
          label: "Accommodation",
          value:
            "Options across the wider Mara region range from budget camps to luxury lodges. Availability and location depend on the selected itinerary.",
        },
        {
          label: "Entry fees",
          value:
            "Fees vary by visitor category, reserve zone, season and applicable rules. Confirm current rates directly with the relevant reserve authority before booking. Older estimates should not be treated as current prices.",
        },
      ]
    : [
        {
          label: "Best time to visit",
          value:
            "The ideal period depends on your wildlife interests, weather preferences and chosen itinerary. Confirm destination-specific seasonal guidance before travelling.",
        },
        {
          label: "Getting there",
          value:
            "Transport, departure points and journey times depend on the safari package. Confirm these details before booking.",
        },
        {
          label: "Accommodation",
          value:
            "Available options depend on the itinerary, selected accommodation category and availability.",
        },
        {
          label: "Entry fees",
          value:
            "Confirm current fees and visitor categories with the relevant park or reserve authority.",
        },
      ];

  const mapQuery = encodeURIComponent(`${destination.title}, Kenya`);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <>
      {/* Destination hero */}
      <section className="relative overflow-hidden bg-forest-deep text-white">
        {destination.image && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-75"
            style={{
              backgroundImage: `url("${destination.image}")`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,44,37,0.94),rgba(16,44,37,0.76),rgba(16,44,37,0.35))]" />

        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-safari-gold">
              {destination.region}
            </p>

            <h1 className="heading-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
              {destination.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              {destination.blurb}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/request-a-quote"
                className="inline-flex items-center justify-center rounded-full bg-safari-gold px-6 py-3 text-sm font-semibold text-forest-deep transition hover:bg-white"
              >
                Plan your safari
              </a>

              <a
                href="#destination-overview"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore destination
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview and highlights */}
      <section id="destination-overview" className="section-padding bg-ivory">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-border bg-white">
              {destination.image ? (
                <img
                  src={destination.image}
                  alt={`${destination.name} landscape`}
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div
                  className="aspect-[4/5] w-full bg-sand"
                  aria-label="No destination image added yet"
                />
              )}
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-safari-gold">
                Best for
              </p>
              <p className="mt-3 text-xl font-semibold text-forest-deep">
                {destination.bestFor}
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Discover the destination"
              title={`Welcome to ${destination.title}.`}
              description={overview}
            />

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-forest-deep">
                Destination overview
              </h2>

              <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-white px-5">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-1 py-4 sm:grid-cols-[0.75fr_1.25fr] sm:gap-5"
                  >
                    <dt className="text-sm font-semibold text-forest">
                      {fact.label}
                    </dt>
                    <dd className="text-sm leading-6 text-muted">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-forest-deep">
                Key highlights
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {destination.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-border bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-forest"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Experiences */}
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="What makes it special"
            title={
              isMaasaiMara
                ? "Wildlife, landscapes and unforgettable encounters."
                : `Experiences in ${destination.title}.`
            }
            description="Explore the signature features of this destination and use them to shape your safari itinerary."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {experiences.map((experience) => (
              <article
                key={experience.number}
                className="rounded-[1.5rem] border border-border bg-ivory p-6 sm:p-8"
              >
                <p className="text-sm font-bold tracking-[0.2em] text-safari-gold">
                  {experience.number}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-forest-deep">
                  {experience.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted">
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Practical information */}
      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Plan your visit"
            title="Practical information."
            description="Use these planning notes as a starting point. Confirm seasonal conditions, transport, accommodation and fees before finalising your trip."
          />

          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-border bg-white">
            {practicalInfo.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-border p-5 last:border-b-0 sm:grid-cols-[0.7fr_1.3fr] sm:gap-8 sm:p-6"
              >
                <h3 className="font-semibold text-forest-deep">{item.label}</h3>
                <p className="text-sm leading-7 text-muted">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-6 text-muted">
            Destination information is provided as a planning guide. Seasonal
            events, transport schedules, accommodation availability and park or
            reserve fees may change. Confirm details before booking.
          </p>
        </Container>
      </section>

      {/* Map */}
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Find your destination"
            title={`Where is ${destination.title}?`}
            description={`Explore the location of ${destination.title} in Kenya using the interactive map.`}
          />

          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-border bg-sand">
            <iframe
              title={`Map showing ${destination.title}, Kenya`}
              src={mapEmbedUrl}
              className="h-[22rem] w-full sm:h-[30rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-forest underline underline-offset-4"
          >
            Open in Google Maps
          </a>
        </Container>
      </section>

      {/* Existing destination CTA */}
      <CTASection
        title={`Want to plan your own journey through ${destination.title}?`}
        description="We’ll design a route that matches your interests, travel style and preferred pace."
      />
    </>
  );
}
