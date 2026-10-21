import type { Excursion } from "@/types/excursion";

export const excursions: Excursion[] = [
  {
    slug: "funzi-island-dhow-trip",
    title: "Funzi Island Dhow Trip",
    sourceTitle: "Funzi Island Dhow Trip",
    description:
      "Escape to the unspoiled beauty of Funzi Island on a full-day dhow cruise through mangrove channels, sandbanks and coastal waters. This experience combines scenery, local culture and a relaxed island adventure south of Diani.",
    durationDays: 1,
    departureLocation: "Diani, Ukunda & South Coast",
    image: "/excursions/1-days-funzi-island-768x300.jpg",
    sourceUrl: "",
    verificationStatus: "needs-verification",
    verificationNotes: [
      {
        field: "itinerary",
        status: "needs-verification",
        note: "Confirm timings, activities, transport arrangements and inclusions with the original source or operator.",
      },
      {
        field: "image",
        status: "needs-verification",
        note: "Confirm image source and usage approval before publication.",
      },
    ],
    highlights: [
      "Cruise aboard a traditional Swahili dhow",
      "Explore the Ramisi River mangroves",
      "Visit a local fishing village on Funzi Island",
      "Relax on an ocean sandbank when tides permit",
      "Enjoy a Swahili-style lunch at a local restaurant",
    ],
    imageStatus: "source-unverified",
  },
  {
    slug: "shimba-hills",
    title: "Shimba Hills Day Trip",
    sourceTitle: "Shimba Hills Day Trip",
    description:
      "Escape the coastal crowds and explore Shimba Hills National Reserve, known for its tropical forest, rolling hills and distinctive wildlife. The day combines a guided game drive with scenic stops and the option to hike to Sheldrick Falls.",
    durationDays: 1,
    departureLocation: "Diani, Ukunda & South Coast",
    image: "/excursions/1_day_shimba-768x362.jpg",
    sourceUrl: "",
    verificationStatus: "needs-verification",
    verificationNotes: [
      {
        field: "itinerary",
        status: "needs-verification",
        note: "Confirm timings, wildlife activities, Sheldrick Falls access and lunch arrangements with the operator.",
      },
      {
        field: "image",
        status: "needs-verification",
        note: "Confirm image source and usage approval before publication.",
      },
    ],
    highlights: [
      "Guided game drive in Shimba Hills National Reserve",
      "Look for sable antelope and other wildlife",
      "Visit scenic viewpoints overlooking forest and coast",
      "Optional walk to Sheldrick Falls",
      "Explore a different route during the return game drive",
    ],
    imageStatus: "source-unverified",
  },
  {
    slug: "mombasa-city-tour",
    title: "Mombasa City Tour",
    sourceTitle: "Mombasa City Tour",
    description:
      "Discover the history and coastal culture of Kenya's historic port city. Explore the streets of Old Town, learn about Fort Jesus, browse local markets and visit familiar landmarks, with optional stops depending on available time.",
    durationDays: 1,
    departureLocation: "Mombasa, Nyali & Bamburi",
    image: "/excursions/mombasa_city-768x362.jpg",
    sourceUrl: "",
    verificationStatus: "needs-verification",
    verificationNotes: [
      {
        field: "itinerary",
        status: "needs-verification",
        note: "Confirm the final route, attraction admission arrangements, transport and optional activities.",
      },
      {
        field: "image",
        status: "needs-verification",
        note: "Confirm image source and usage approval before publication.",
      },
    ],
    highlights: [
      "Walking tour of Mombasa Old Town",
      "Visit historic Fort Jesus Museum",
      "Explore spice and curio markets",
      "Photograph the iconic Mombasa Tusks",
      "Visit Mama Ngina Waterfront",
      "Optional cultural and nature attractions",
    ],
    imageStatus: "source-unverified",
  },
  {
    slug: "wasini-island-dhow-trip",
    title: "Wasini Island Dhow Trip",
    sourceTitle: "Wasini Island Dhow Trip",
    description:
      "Enjoy a full-day dhow excursion along Kenya's south coast. The itinerary combines a cruise through the Wasini Channel, opportunities to spot dolphins, a guided snorkeling session and a Swahili-style lunch on Wasini Island.",
    durationDays: 1,
    departureLocation: "Diani, Ukunda & Shimoni",
    image: "/excursions/1-day-wasini-dhow-768x300.jpg",
    sourceUrl: "",
    verificationStatus: "needs-verification",
    verificationNotes: [
      {
        field: "itinerary",
        status: "needs-verification",
        note: "Confirm marine park fees, snorkeling equipment, sea conditions, transport and meal inclusions with the operator.",
      },
      {
        field: "image",
        status: "needs-verification",
        note: "Confirm image source and usage approval before publication.",
      },
    ],
    highlights: [
      "Traditional Swahili dhow cruise from Shimoni",
      "Dolphin spotting opportunities",
      "Guided snorkeling in the marine park",
      "Coral reefs and tropical fish",
      "Swahili seafood lunch on Wasini Island",
      "Optional guided cultural walk",
    ],
    imageStatus: "source-unverified",
  },
];

export function getExcursionBySlug(slug: string) {
  return excursions.find((excursion) => excursion.slug === slug);
}
