import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, MapPin } from "lucide-react";

import CTASection from "@/components/shared/CTASection";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { excursions, getExcursionBySlug } from "@/data/excursions";

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
  const excursion = getExcursionBySlug(slug);

  if (!excursion) {
    return { title: "Excursion Not Found | Everest Africa Safari" };
  }

  return {
    title: `${excursion.title} | Everest Africa Safari`,
    description: excursion.description,
  };
}

export default async function ExcursionDetailPage({ params }: Props) {
  const { slug } = await params;
  const excursion = getExcursionBySlug(slug);

  if (!excursion) {
    notFound();
  }

  const enquiryUrl = `/request-a-quote?excursion=${encodeURIComponent(
    excursion.slug,
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-deep text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${excursion.image}")` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/95 via-forest-deep/80 to-forest-deep/35" />

        <Container className="py-20 sm:py-24 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-safari-gold">
            South Coast Experiences
          </p>

          <h1 className="heading-display mt-5 max-w-4xl text-5xl leading-tight sm:text-6xl lg:text-7xl">
            {excursion.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            {excursion.blurb}
          </p>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              <Clock3 size={17} className="text-safari-gold" />
              {excursion.duration}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={17} className="text-safari-gold" />
              {excursion.location}
            </span>
          </div>

          <Link
            href={enquiryUrl}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-safari-gold px-6 py-3.5 text-sm font-semibold text-forest-deep transition hover:brightness-105"
          >
            Enquire about this excursion
            <ArrowRight size={17} />
          </Link>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                eyebrow="About the experience"
                title="A closer look at the coast"
                description={excursion.description}
              />

              <div className="mt-9">
                <h2 className="heading-display text-2xl text-forest-deep">
                  Experience highlights
                </h2>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {excursion.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm leading-6 text-ink"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-forest"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-white p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                Plan your day
              </p>

              <h2 className="heading-display mt-3 text-3xl text-maroon-deep">
                {excursion.title}
              </h2>

              <div className="mt-6 space-y-4 border-y border-border py-5 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted">Duration</span>
                  <span className="text-right font-semibold text-ink">
                    {excursion.duration}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted">Departure area</span>
                  <span className="text-right font-semibold text-ink">
                    {excursion.location}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted">
                Ask our team to confirm availability, transport arrangements,
                current fees and what is included in your quotation.
              </p>

              <Link
                href={enquiryUrl}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-maroon-deep"
              >
                Request an enquiry
                <ArrowRight size={17} />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Your day, step by step"
            title="The itinerary"
            description="The schedule below follows the supplied itinerary. Exact timing and activities may change with weather, tides, operating conditions and your confirmed arrangements."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {excursion.itinerary.map((step, index) => (
              <article
                key={`${step.title}-${index}`}
                className="rounded-3xl border border-border bg-white p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-deep text-sm font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {step.optional && (
                    <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-forest-deep">
                      Optional
                    </span>
                  )}
                </div>

                {step.time && (
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                    {step.time}
                  </p>
                )}

                <h3 className="heading-display mt-2 text-2xl text-forest-deep">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-sand/40">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Before you go"
              title="Practical information"
              description="A few details to keep in mind while planning your excursion."
            />
          </div>

          <ul className="space-y-4">
            {excursion.practicalNotes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 text-sm leading-7 text-ink"
              >
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-forest" />
                {note}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Make this experience part of your trip."
        description="Tell us when you're travelling and where you're staying. Our team can discuss the arrangements and provide a tailored quotation."
      />
    </>
  );
}
