import type { Safari, SafariCategory, VerificationField } from "@/types/safari";

const holidayListing = "https://www.everestafricasafari.com/holiday-tour/";

const adventureListing = "https://www.everestafricasafari.com/adventure-tour/";

const mombasaListing =
  "https://www.everestafricasafari.com/mombasa-safaris-explore-wildlife-coastal-adventures/";

const placeholderImages = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
];

type SafariSeed = {
  slug: string;
  title: string;
  sourceTitle: string;
  destination: string;
  destinations: string[];
  durationDays: number;
  category: SafariCategory;
  sourceUrl?: string;
  description: string;
  verificationNotes?: VerificationField[];
  featured?: boolean;
};

const commonVerification: VerificationField[] = [
  {
    field: "durationNights",
    status: "needs-verification",
    note: "Confirm the overnight count against the final itinerary.",
  },
  {
    field: "departurePoint",
    status: "needs-verification",
    note: "Confirm whether departure is from Diani, Mombasa, Nairobi, or another location.",
  },
  {
    field: "accommodation",
    status: "needs-verification",
    note: "Confirm properties, accommodation level, and availability.",
  },
  {
    field: "pricing",
    status: "needs-verification",
    note: "No price has been entered; request current rates from the operator.",
  },
  {
    field: "itinerary",
    status: "needs-verification",
    note: "Verify daily routing, activities, and included services before publication.",
  },
];

function createSafari(seed: SafariSeed, index: number): Safari {
  const sourceUrl =
    seed.sourceUrl ??
    (seed.durationDays === 1 ? mombasaListing : holidayListing);

  return {
    ...seed,
    sourceUrl,
    image: placeholderImages[index % placeholderImages.length],
    imageStatus: "placeholder",
    featured: seed.featured ?? false,
    styles: [seed.category],
    verificationStatus: "needs-verification",
    verificationNotes: [
      {
        field: "sourceListing",
        status: "listed",
        note: `Title recorded from the existing listing: "${seed.sourceTitle}".`,
      },
      {
        field: "durationDays",
        status: "listed",
        note: `The source title advertises ${seed.durationDays} day(s). Confirm the final itinerary.`,
      },
      {
        field: "description",
        status: "needs-verification",
        note: "Draft catalogue copy. Compare with the full package page before publishing.",
      },
      ...commonVerification,
      ...(seed.verificationNotes ?? []),
    ],
    itinerary: [],
    inclusions: [],
    exclusions: [],
  };
}

const safariSeeds: SafariSeed[] = [
  {
    slug: "maasai-mara-2-day",
    title: "2-Day Maasai Mara Safari",
    sourceTitle: "2 Days Masaai Mara National reserve",
    destination: "Maasai Mara",
    destinations: ["Maasai Mara"],
    durationDays: 2,
    category: "Wildlife",
    description:
      "A short safari centred on the Maasai Mara National Reserve. Confirm the full itinerary, departure point, accommodation and inclusions.",
    featured: true,
  },
  {
    slug: "maasai-mara-3-day",
    title: "3-Day Maasai Mara Safari",
    sourceTitle: "3 Days Masai Mara National Park",
    destination: "Maasai Mara",
    destinations: ["Maasai Mara"],
    durationDays: 3,
    category: "Wildlife",
    sourceUrl: adventureListing,
    description:
      "A multi-day safari to the Maasai Mara. Verify the route, accommodation and daily game-drive schedule.",
    featured: true,
  },
  {
    slug: "tsavo-east-west-2-day",
    title: "2-Day Tsavo East & West Safari",
    sourceTitle: "2 Days Tsavo East West National Park",
    destination: "Tsavo East & West",
    destinations: ["Tsavo East", "Tsavo West"],
    durationDays: 2,
    category: "Adventure",
    sourceUrl: mombasaListing,
    description:
      "A short safari listing covering Tsavo East and Tsavo West. Confirm the park sequence and departure arrangements.",
  },
  {
    slug: "tsavo-east-west-3-day",
    title: "3-Day Tsavo East & West Safari",
    sourceTitle: "3 Days Tsavo East West National Park",
    destination: "Tsavo East & West",
    destinations: ["Tsavo East", "Tsavo West"],
    durationDays: 3,
    category: "Wildlife",
    description:
      "Explore two major Tsavo parks on a multi-day safari. The final route and accommodation remain to be confirmed.",
    featured: true,
  },
  {
    slug: "tsavo-east-west-4-day",
    title: "4-Day Tsavo East & West Safari",
    sourceTitle: "4 Days Tsavo East West National Park",
    destination: "Tsavo East & West",
    destinations: ["Tsavo East", "Tsavo West"],
    durationDays: 4,
    category: "Wildlife",
    description:
      "An extended Tsavo safari listing. Confirm the daily itinerary and the parks visited on each day.",
  },
  {
    slug: "tsavo-amboseli-5-day",
    title: "5-Day Tsavo & Amboseli Safari",
    sourceTitle: "5 Days Tsavo East West Amboseli National Park",
    destination: "Tsavo & Amboseli",
    destinations: ["Tsavo East", "Tsavo West", "Amboseli"],
    durationDays: 5,
    category: "Adventure",
    description:
      "A multi-park safari combining Tsavo and Amboseli. Confirm the order of travel and overnight stops.",
  },
  {
    slug: "tsavo-amboseli-6-day",
    title: "6-Day Tsavo & Amboseli Safari",
    sourceTitle: "6 Days To Tsavo Amboseli – Tsavo West East.",
    destination: "Tsavo & Amboseli",
    destinations: ["Tsavo East", "Tsavo West", "Amboseli"],
    durationDays: 6,
    category: "Adventure",
    sourceUrl: adventureListing,
    description:
      "A six-day itinerary advertised around Tsavo and Amboseli. The source title is inconsistent; verify the exact route.",
    verificationNotes: [
      {
        field: "destinations",
        status: "needs-verification",
        note: "Confirm whether the itinerary includes both Tsavo parks and Amboseli, and in what order.",
      },
    ],
  },
  {
    slug: "tsavo-amboseli-nakuru-mara-8-day",
    title: "8-Day Tsavo, Amboseli, Nakuru & Maasai Mara Safari",
    sourceTitle:
      "8 Days Tsavo East West Amboseli L. Nakuru – Masaai Mara National Park",
    destination: "Multi-park Kenya safari",
    destinations: [
      "Tsavo East",
      "Tsavo West",
      "Amboseli",
      "Lake Nakuru",
      "Maasai Mara",
    ],
    durationDays: 8,
    category: "Wildlife",
    description:
      "A multi-park Kenya safari advertised across five major wildlife destinations. Verify the park sequence and travel times.",
  },
  {
    slug: "amboseli-samburu-mara-8-day",
    title: "8-Day Amboseli, Samburu & Maasai Mara Safari",
    sourceTitle: "8 Days Safari To Amboseli, Samburu, Maasai Mara",
    destination: "Amboseli, Samburu & Maasai Mara",
    destinations: ["Amboseli", "Samburu", "Maasai Mara"],
    durationDays: 8,
    category: "Wildlife",
    sourceUrl: adventureListing,
    description:
      "A multi-region safari linking Amboseli, Samburu and the Maasai Mara. Confirm the itinerary and transfers.",
  },
  {
    slug: "samburu-nakuru-mara-6-day",
    title: "6-Day Samburu, Lake Nakuru & Maasai Mara Safari",
    sourceTitle: "6 Days, Samburu, Nakuru, Mara National Park",
    destination: "Samburu, Nakuru & Maasai Mara",
    destinations: ["Samburu", "Lake Nakuru", "Maasai Mara"],
    durationDays: 6,
    category: "Wildlife",
    sourceUrl: adventureListing,
    description:
      "A six-day safari advertised across Samburu, Lake Nakuru and the Maasai Mara. Confirm the order of travel.",
  },
  {
    slug: "mara-nakuru-samburu-7-day",
    title: "7-Day Maasai Mara, Lake Nakuru & Samburu Safari",
    sourceTitle: "7 Days Maasai Mara, Lake Nakuru, Samburu.",
    destination: "Maasai Mara, Nakuru & Samburu",
    destinations: ["Maasai Mara", "Lake Nakuru", "Samburu"],
    durationDays: 7,
    category: "Wildlife",
    sourceUrl: adventureListing,
    description:
      "A seven-day safari across three wildlife regions. Verify the route and compare it with the six-day package.",
  },
  {
    slug: "samburu-aberdares-nakuru-mara-7-day",
    title: "7-Day Samburu, Aberdares, Nakuru & Maasai Mara Safari",
    sourceTitle: "7 Days Safari Samburu, Aberdares, Lake Nakuru & Masai Mara",
    destination: "Samburu, Aberdares, Nakuru & Maasai Mara",
    destinations: ["Samburu", "Aberdares", "Lake Nakuru", "Maasai Mara"],
    durationDays: 7,
    category: "Adventure",
    sourceUrl: adventureListing,
    description:
      "A seven-day route advertised across northern Kenya, the Aberdares, Lake Nakuru and the Maasai Mara.",
  },
  {
    slug: "nairobi-mara-nakuru-4-day",
    title: "4-Day Nairobi, Maasai Mara & Lake Nakuru Safari",
    sourceTitle: "4 Days Nairobi Mara Nakuru National park",
    destination: "Nairobi, Maasai Mara & Nakuru",
    destinations: ["Nairobi", "Maasai Mara", "Lake Nakuru"],
    durationDays: 4,
    category: "Wildlife",
    sourceUrl: adventureListing,
    description:
      "A four-day safari listing naming Nairobi, the Maasai Mara and Lake Nakuru. Confirm whether Nairobi is a stop or departure point.",
  },
  {
    slug: "aberdares-mara-nakuru-5-day",
    title: "5-Day Aberdares, Maasai Mara & Lake Nakuru Safari",
    sourceTitle: "5 Days, Aberdares, Mara, Nakuru",
    destination: "Aberdares, Maasai Mara & Nakuru",
    destinations: ["Aberdares", "Maasai Mara", "Lake Nakuru"],
    durationDays: 5,
    category: "Adventure",
    description:
      "A five-day safari advertised across the Aberdares, Maasai Mara and Lake Nakuru. Confirm the daily itinerary.",
  },
  {
    slug: "kenya-circuit-10-day",
    title: "10-Day Kenya Safari Circuit",
    sourceTitle:
      "10 Days Tsavo East West – Amboseli, Samburu, Sweet waters, Nakuru Amboseli, Nairobi",
    destination: "Multi-park Kenya safari",
    destinations: [
      "Tsavo East",
      "Tsavo West",
      "Amboseli",
      "Samburu",
      "Sweetwaters",
      "Lake Nakuru",
      "Nairobi",
    ],
    durationDays: 10,
    category: "Adventure",
    description:
      "A ten-day multi-park package with conflicting destination details across the source title and description. Do not publish until reconciled.",
    verificationNotes: [
      {
        field: "destinations",
        status: "needs-verification",
        note: "The source title and its description do not agree on all destinations. Confirm the definitive route with the operator.",
      },
    ],
  },
  {
    slug: "lake-nakuru-2-day",
    title: "2-Day Lake Nakuru Safari",
    sourceTitle: "2 Days Lake Nakuru National Park",
    destination: "Lake Nakuru",
    destinations: ["Lake Nakuru"],
    durationDays: 2,
    category: "Wildlife",
    sourceUrl: adventureListing,
    description:
      "A two-day safari to Lake Nakuru National Park. Confirm the departure point, itinerary and accommodation.",
  },
  {
    slug: "samburu-2-day",
    title: "2-Day Samburu Safari",
    sourceTitle: "2 Days Samburu National Reserve",
    destination: "Samburu",
    destinations: ["Samburu"],
    durationDays: 2,
    category: "Wildlife",
    sourceUrl: adventureListing,
    description:
      "A short safari to Samburu National Reserve. Confirm the route, transport arrangements and overnight details.",
  },
];

export const safaris: Safari[] = safariSeeds.map(createSafari);

export const featuredSafaris = safaris.filter((safari) => safari.featured);

export const getSafariBySlug = (slug: string) =>
  safaris.find((safari) => safari.slug === slug);
