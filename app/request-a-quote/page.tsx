import type { Metadata } from "next";
import { Suspense } from "react";

import Container from "@/components/shared/Container";
import QuoteForm from "@/components/enquiry/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Safari Quote | Everest Africa Safari",
  description:
    "Enquire about Kenya safari packages, coastal excursions and custom journeys with Everest Africa Safari.",
};

export default function RequestAQuotePage() {
  return (
    <>
      <section className="bg-maroon-deep py-16 text-white sm:py-20">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-safari-gold">
            Your journey starts here
          </p>

          <h1 className="heading-display mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Let&apos;s plan your Kenya experience.
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-white/75">
            Whether you have selected a safari package, want a coastal excursion
            or need a tailor-made itinerary, tell us what you need and
            we&apos;ll discuss the next steps with you.
          </p>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Suspense
              fallback={
                <div
                  className="min-h-96 animate-pulse rounded-3xl bg-sand/50"
                  aria-label="Loading enquiry form"
                />
              }
            >
              <QuoteForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
