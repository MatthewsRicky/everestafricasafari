import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/shared/Container";
import SafariCatalogue from "@/components/safaris/SafariCatalogue";

export const metadata: Metadata = {
  title: "Kenya Safari Packages | Everest Africa Safari",
  description:
    "Explore Kenya safari packages and compare destinations, durations and travel styles. Request a quote for a safari tailored to your plans.",
};

function SafariCatalogueFallback() {
  return (
    <div
      className="min-h-96 animate-pulse rounded-3xl bg-sand/50"
      aria-label="Loading safari packages"
    />
  );
}

export default function SafarisPage() {
  return (
    <>
      <section className="bg-maroon-deep py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-safari-gold">
            Explore Kenya
          </p>

          <h1 className="heading-display max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Find the safari that fits your journey.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Explore safari packages by destination, duration and travel style.
            Every journey can be discussed with our team before you commit.
          </p>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Suspense fallback={<SafariCatalogueFallback />}>
            <SafariCatalogue />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
