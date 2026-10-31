export type SafariTrip = {
  slug: string;
  title: string;
  destination: string;
  description: string;
  image?: string;
  embedUrl?: string;
  featured?: boolean;
  period?: string;
};

export const safariTrips: SafariTrip[] = [
  {
    slug: "featured-safari",
    title: "Our Featured Safari Journey",
    destination: "Kenya",
    description:
      "Follow this featured journey and discover the landscapes and experiences along the way.",
    image: "/images/hero/safari-tracker.jpg",
    embedUrl: process.env.POLARSTEPS_EMBED_URL,
    featured: true,
  },

  // Add additional journeys here when their Polarsteps embed URLs
  // are available. Example:
  //
  // {
  //   slug: "amboseli-safari",
  //   title: "Amboseli Safari",
  //   destination: "Amboseli National Park, Kenya",
  //   description: "Explore a journey through the landscapes of Amboseli.",
  //   image: "/images/safaris/amboseli.jpg",
  //   embedUrl: process.env.POLARSTEPS_AMBOSELI_URL,
  //   period: "October 2026",
  // },
];
