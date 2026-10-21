import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import CTASection from "@/components/shared/CTASection";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { excursions } from "@/data/excursions";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return excursions.map((excursion) => ({
    slug: excursion.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const excursion = excursions.find((item) => item.slug === slug);

  if (!excursion) {
    return { title: "Excursion Not Found" };
  }

  return {
    title: excursion.title,
    description: excursion.description,
  };
}

function ExcursionLoadingFallback() {
  return (
    <section className="min-h-[60vh] bg-ivory py-24">
      <Container>
        <div className="animate-pulse">
          <div className="h-5 w-36 rounded bg-forest/10" />
          <div className="mt-8 h-12 max-w-xl rounded bg-forest/10" />
          <div className="mt-5 h-5 max-w-2xl rounded bg-forest/10" />
          <div className="mt-3 h-5 max-w-lg rounded bg-forest/10" />
        </div>
      </Container>
    </section>
  );
}

export default function ExcursionDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<ExcursionLoadingFallback />}>
      <ExcursionDetailContent params={params} />
    </Suspense>
  );
}

async function ExcursionDetailContent({ params }: Props) {
  const { slug } = await params;
  const excursion = excursions.find((item) => item.slug === slug);

  if (!excursion) {
    notFound();
  }

  const enquiryUrl = `/request-a-quote?excursion=${encodeURIComponent(
    excursion.slug,
  )}`;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest">
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={excursion.image}
            alt={excursion.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/30" />
        </div>

        <Container>
          <div className="py-24 text-white sm:py-32 lg:py-40">
            <Link
              href="/excursions"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              All excursions
            </Link>

            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sand">
                Signature experience
              </p>

              <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {excursion.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                {excursion.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={17} className="text-sand" />
                  {excursion.durationDays}{" "}
                  {excursion.durationDays === 1 ? "day" : "days"}
                </span>

                {excursion.departureLocation && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={17} className="text-sand" />
                    {excursion.departureLocation}
                  </span>
                )}
              </div>

              <Link
                href={enquiryUrl}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-sand px-6 py-3.5 text-sm font-semibold text-forest transition hover:bg-white"
              >
                Enquire about this excursion
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience details */}
      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="The experience"
                title="Discover something different."
                description={excursion.description}
                align="left"
              />

              {/* Highlights */}
              <div className="mt-12">
                <h2 className="font-serif text-2xl text-forest sm:text-3xl">
                  Experience highlights
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {excursion.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white p-5"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-forest"
                      />
                      <p className="text-sm leading-7 text-ink/80">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification status */}
              {excursion.verificationStatus !== "listed" && (
                <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <h2 className="font-semibold text-amber-950">
                    Details to confirm
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-amber-900">
                    Some details of this excursion still require confirmation.
                    Please enquire for the latest itinerary, inclusions,
                    availability and pricing before making arrangements.
                  </p>
                </div>
              )}

              {/* Verification notes */}
              {excursion.verificationNotes.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-serif text-2xl text-forest">
                    Information notes
                  </h2>

                  <div className="mt-5 space-y-4">
                    {excursion.verificationNotes.map((note) => (
                      <div
                        key={`${note.field}-${note.status}`}
                        className="border-l-2 border-sand pl-4"
                      >
                        <p className="font-semibold text-forest">
                          {note.field}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-ink/70">
                          {note.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enquiry sidebar */}
            <aside className="h-fit rounded-3xl border border-forest/10 bg-white p-7 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Plan your experience
              </p>

              <h2 className="mt-3 font-serif text-2xl text-forest">
                {excursion.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-ink/70">
                Interested in adding this experience to your trip? Contact us to
                discuss arrangements and confirm the details.
              </p>

              <div className="mt-6 space-y-4 border-y border-forest/10 py-5">
                <div className="flex items-start gap-3">
                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-terracotta"
                  />
                  <div>
                    <p className="text-xs text-ink/50">Duration</p>
                    <p className="mt-1 text-sm font-medium text-forest">
                      {excursion.durationDays}{" "}
                      {excursion.durationDays === 1 ? "day" : "days"}
                    </p>
                  </div>
                </div>

                {excursion.departureLocation && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-terracotta"
                    />
                    <div>
                      <p className="text-xs text-ink/50">Departure location</p>
                      <p className="mt-1 text-sm font-medium text-forest">
                        {excursion.departureLocation}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={enquiryUrl}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-forest/90"
              >
                Request an enquiry
                <ArrowRight size={17} />
              </Link>

              <p className="mt-4 text-center text-xs leading-6 text-ink/50">
                Itinerary details, availability and costs can be confirmed
                during your enquiry.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related excursions */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
                Keep exploring
              </p>
              <h2 className="mt-3 font-serif text-3xl text-forest sm:text-4xl">
                More coastal experiences.
              </h2>
            </div>

            <Link
              href="/excursions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-terracotta"
            >
              View all excursions
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {excursions
              .filter((item) => item.slug !== excursion.slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/excursions/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-forest/10 bg-ivory transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-forest/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-ink/55">
                      {item.durationDays}{" "}
                      {item.durationDays === 1 ? "day" : "days"}
                      {item.departureLocation
                        ? ` · ${item.departureLocation}`
                        : ""}
                    </p>

                    <h3 className="mt-2 font-serif text-xl text-forest">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/70">
                      {item.description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                      Explore excursion
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to plan your coastal experience?"
        description="Tell us what you have in mind, and we’ll help you explore the options for your trip."
      />
    </>
  );
}
