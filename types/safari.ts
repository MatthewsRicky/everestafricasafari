export type SafariCategory =
  | "Wildlife"
  | "Adventure"
  | "Family"
  | "Luxury"
  | "Group"
  | "Budget";

export type VerificationStatus = "listed" | "inferred" | "needs-verification";

export type VerificationField = {
  field: string;
  status: VerificationStatus;
  note: string;
};

export type SafariItineraryDay = {
  day: number;
  title: string;
  description: string;
  status: VerificationStatus;
};

export type Safari = {
  slug: string;
  title: string;

  // Retained for compatibility with existing homepage cards.
  destination: string;
  description: string;
  image: string;
  category: SafariCategory;
  featured: boolean;

  // Structured fields for catalogue filters and detail pages.
  durationDays: number;
  durationNights?: number;
  destinations: string[];
  styles: SafariCategory[];

  // Source and editorial verification.
  sourceTitle: string;
  sourceUrl: string;
  verificationStatus: VerificationStatus;
  verificationNotes: VerificationField[];

  // Populate these only when the source information is verified.
  itinerary: SafariItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  priceFrom?: number;
  currency?: "KES" | "USD" | "EUR";

  // Placeholder images must be replaced with approved client imagery.
  imageStatus: "placeholder" | "source-unverified" | "approved";
};

export type SafariDestination = {
  slug: string;
  name: string;
  description: string;
  image: string;
  verificationStatus: VerificationStatus;
};

export type SafariDuration = "short" | "week" | "extended";
