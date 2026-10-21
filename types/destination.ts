export type VerificationStatus = "listed" | "inferred" | "needs-verification";

export type DestinationFact = {
  label: string;
  value: string;
  verificationStatus: VerificationStatus;
};

export type DestinationExperience = {
  title: string;
  description: string;
  verificationStatus: VerificationStatus;
  imageSlot?: string;
};

export type DestinationImages = {
  hero: string;
  overview: string;
  wildlife: string;
  landscape: string;
  experiences: string;
  culture: string;
};

export type DestinationCoordinates = {
  latitude: number;
  longitude: number;
};

export type DestinationDetailContent = {
  overview: string;
  facts: DestinationFact[];
  experiences: DestinationExperience[];
  practicalInfo: DestinationFact[];
  mapEmbedUrl?: string;
  coordinates?: DestinationCoordinates;
};

export type Destination = {
  slug: string;
  name: string;
  title: string;
  region: string;
  description: string;
  blurb: string;
  image: string;
  images: DestinationImages;
  highlights: string[];
  bestFor: string;
  verificationStatus: VerificationStatus;
  relatedSafariSlugs: string[];
  details: DestinationDetailContent;
};
