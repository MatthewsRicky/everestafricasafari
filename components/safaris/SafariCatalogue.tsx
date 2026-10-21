"use client";

import { useSearchParams } from "next/navigation";
import SafariFilters from "@/components/safaris/SafariFilters";
import SafariGrid from "@/components/safaris/SafariGrid";
import { safaris } from "@/data/safaris";

export default function SafariCatalogue() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination") ?? "";
  const duration = searchParams.get("duration") ?? "";
  const style = searchParams.get("style") ?? "";

  const destinations = [
    ...new Set(safaris.flatMap((safari) => safari.destinations)),
  ].sort();

  const filteredSafaris = safaris.filter((safari) => {
    const matchesDestination =
      !destination || safari.destinations.includes(destination);

    const matchesDuration =
      !duration ||
      (duration === "short" && safari.durationDays <= 3) ||
      (duration === "week" &&
        safari.durationDays >= 4 &&
        safari.durationDays <= 7) ||
      (duration === "extended" && safari.durationDays >= 8);

    const matchesStyle =
      !style ||
      safari.category === style ||
      safari.styles.includes(style as (typeof safari.styles)[number]);

    return matchesDestination && matchesDuration && matchesStyle;
  });

  return (
    <>
      <SafariFilters
        destinations={destinations}
        selectedDestination={destination}
        selectedDuration={duration}
        selectedStyle={style}
      />

      <div className="mb-7 mt-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Browse the collection</p>
          <h2 className="heading-display mt-1 text-3xl text-maroon-deep">
            Safari packages
          </h2>
        </div>

        <p className="text-sm text-muted">
          {filteredSafaris.length}{" "}
          {filteredSafaris.length === 1 ? "package" : "packages"} found
        </p>
      </div>

      <SafariGrid safaris={filteredSafaris} />

      <p className="mt-8 text-xs leading-5 text-muted">
        Package details are being reviewed. Confirm the itinerary,
        accommodation, inclusions and current price with Everest Africa Safari
        before booking.
      </p>
    </>
  );
}
