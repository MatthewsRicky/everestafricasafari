import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/shared/Container";
import SafariCatalogue from "@/components/safaris/SafariCatalogue";
import PageHero from "@/components/shared/PageHero";

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
      <PageHero
        eyebrow="Safaris"
        title="Find the safari that fits your journey."
        description="Explore safari packages by destination, duration and travel style. Every journey can be discussed with our team before you commit."
        image="/packages/4-Days-Nairobi-Mara-Nakuru_1.jpg"
        video="https://raujheqxyvjsbzvprjei.supabase.co/storage/v1/object/public/hero_vids/Elephant.mp4"
      />

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
