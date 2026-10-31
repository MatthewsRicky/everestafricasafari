import type { Metadata } from "next";

import PageHero from "@/components/shared/PageHero";
import TrackerIntroduction from "@/components/tracker/TrackerIntroduction";
import TripCollection from "@/components/tracker/TripCollection";
import TrackerCallToAction from "@/components/tracker/TrackerCallToAction";

import { safariTrips } from "@/data/safari-trips";

export const metadata: Metadata = {
  title: "Safari Tracker | Everest Africa Safari",
  description:
    "Follow Everest Africa Safari journeys and discover the landscapes, destinations and experiences along the way.",
};

export default function SafariTrackerPage() {
  return (
    <main>
      <PageHero
        eyebrow="Follow the adventure"
        title="Every Journey Tells a Story"
        description="Explore our safari journeys, discover remarkable destinations and experience the beauty of Africa along the way."
        image="/images/hero/safari-tracker.jpg"
        ctaHref="#featured-journey"
        ctaLabel="Follow our journey"
        secondaryHref="/safaris"
        secondaryLabel="Explore safaris"
      />

      <TrackerIntroduction />

      <TripCollection trips={safariTrips} />

      <TrackerCallToAction />
    </main>
  );
}
