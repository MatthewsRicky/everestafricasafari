import type {
  Destination,
  DestinationFact,
  DestinationExperience,
  VerificationStatus,
} from "@/types/destination";

const listed: VerificationStatus = "listed";
const inferred: VerificationStatus = "inferred";
const needsVerification: VerificationStatus = "needs-verification";

function fact(
  label: string,
  value: string,
  verificationStatus: VerificationStatus = needsVerification,
): DestinationFact {
  return { label, value, verificationStatus };
}

function experience(
  title: string,
  description: string,
  verificationStatus: VerificationStatus = inferred,
  imageSlot?: string,
): DestinationExperience {
  return { title, description, verificationStatus, imageSlot };
}

function destinationImages(): Destination["images"] {
  return {
    hero: "",
    overview: "",
    wildlife: "",
    landscape: "",
    experiences: "",
    culture: "",
  };
}

function mapUrl(latitude: number, longitude: number) {
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=9&output=embed`;
}

export const destinations: Destination[] = [
  {
    slug: "maasai-mara",
    name: "Maasai Mara",
    title: "Maasai Mara National Reserve",
    region: "Southwestern Kenya · Narok County",
    description:
      "One of Africa's best-known safari destinations, celebrated for its wildlife, sweeping savannah and the seasonal Great Migration.",
    blurb:
      "Discover vast grasslands, remarkable wildlife and the wider Mara–Serengeti ecosystem on a classic Kenyan safari.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    images: destinationImages(),
    highlights: [
      "Great Migration",
      "Big Five",
      "Predators",
      "Open savannah",
      "Maasai culture",
    ],
    bestFor:
      "Wildlife viewing, photography, migration-season safaris and classic African game drives",
    verificationStatus: listed,
    relatedSafariSlugs: [
      "2-days-maasai-mara",
      "3-days-maasai-mara",
      "8-days-tsavo-amboseli-nakuru-mara",
    ],
    details: {
      overview:
        "Maasai Mara National Reserve is one of Kenya's most famous wildlife destinations. Located in southwestern Kenya, it forms part of the greater Mara–Serengeti ecosystem and is known for its grasslands, predators, large herbivores and seasonal wildlife movements. The reserve's published visitor information and exact operating rules should be confirmed before travel.",
      facts: [
        fact("Location", "Southwestern Kenya, Narok County", listed),
        fact("Approximate area", "About 1,510 km²", listed),
        fact(
          "Wider ecosystem",
          "The Mara–Serengeti ecosystem, spanning Kenya and Tanzania",
          listed,
        ),
        fact("Main rivers", "Mara River and Talek River", listed),
        fact(
          "Signature event",
          "The seasonal Great Wildebeest Migration",
          listed,
        ),
      ],
      experiences: [
        experience(
          "The Great Migration",
          "Wildebeest, zebras and other grazing animals move through the wider Mara–Serengeti ecosystem during seasonal migrations. July to October is often associated with activity in the Mara, but timing and river crossings vary from year to year.",
          listed,
          "experiences",
        ),
        experience(
          "The Big Five and predators",
          "The wider reserve is renowned for lions, elephants, buffalo, leopards and rhinos. Cheetahs, hyenas and jackals are also among the wildlife visitors may encounter. Sightings are never guaranteed.",
          listed,
          "wildlife",
        ),
        experience(
          "Savannah and river landscapes",
          "Rolling grasslands, acacia woodland and riverine habitats create varied scenery for game drives and wildlife photography.",
          listed,
          "landscape",
        ),
        experience(
          "Maasai cultural experiences",
          "Community visits may offer opportunities to learn about local traditions and contemporary Maasai life. Confirm the host community, arrangements and additional charges before booking.",
          inferred,
          "culture",
        ),
      ],
      practicalInfo: [
        fact(
          "Suggested visiting period",
          "June–October is commonly associated with the dry season and migration viewing. December–March is another period visitors may consider; conditions vary.",
          listed,
        ),
        fact(
          "Getting there",
          "The supplied notes estimate 6–7 hours by road from Nairobi and around 45 minutes by air for some routes. Actual travel times depend on the departure point, destination airstrip and schedule.",
          listed,
        ),
        fact(
          "Accommodation",
          "Options range from budget camps to luxury lodges. Confirm specific properties and availability for each itinerary.",
          listed,
        ),
        fact(
          "Entry fees",
          "Rates vary by visitor category, reserve zone and applicable rules. Confirm current rates with the relevant reserve authority before quoting a price.",
          needsVerification,
        ),
      ],
      coordinates: {
        latitude: -1.4061,
        longitude: 35.1127,
      },
      mapEmbedUrl: mapUrl(-1.4061, 35.1127),
    },
  },

  {
    slug: "amboseli",
    name: "Amboseli",
    title: "Amboseli National Park",
    region: "Southern Kenya · Near the Tanzania border",
    description:
      "A celebrated elephant destination with open plains, wetlands and views towards Mount Kilimanjaro.",
    blurb:
      "Experience elephant-rich landscapes and dramatic mountain scenery in one of southern Kenya's signature safari destinations.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    images: destinationImages(),
    highlights: [
      "Elephants",
      "Mount Kilimanjaro",
      "Open plains",
      "Wetlands",
      "Birdlife",
    ],
    bestFor:
      "Elephant viewing, landscape photography and multi-park southern Kenya safaris",
    verificationStatus: listed,
    relatedSafariSlugs: [
      "5-days-tsavo-amboseli",
      "6-days-amboseli-tsavo",
      "8-days-tsavo-amboseli-nakuru-mara",
    ],
    details: {
      overview:
        "Amboseli National Park is in southern Kenya near the Tanzania border. It is widely associated with large elephant herds, open plains, wetlands and views towards Mount Kilimanjaro. The park appears in several of the supplied safari itineraries, including combinations with Tsavo and other Kenyan destinations.",
      facts: [
        fact("Location", "Southern Kenya, near the Tanzania border", listed),
        fact("Approximate area", "About 392 km²", listed),
        fact(
          "Signature scenery",
          "Views towards Mount Kilimanjaro, open plains and wetlands",
          listed,
        ),
        fact("Wildlife focus", "Elephants and other savannah wildlife", listed),
      ],
      experiences: [
        experience(
          "Elephant encounters",
          "Game drives may offer opportunities to observe elephant herds moving across the park and around its wetland habitats.",
          listed,
          "wildlife",
        ),
        experience(
          "Mount Kilimanjaro views",
          "The mountain provides a distinctive backdrop when skies are clear, particularly in the early morning and late afternoon.",
          listed,
          "landscape",
        ),
        experience(
          "Wetlands and birdlife",
          "Wetland habitats and seasonal water bodies support a variety of birds and other wildlife.",
          inferred,
          "experiences",
        ),
        experience(
          "Multi-park safari routes",
          "Amboseli can be combined with Tsavo East and Tsavo West on longer southern Kenya itineraries.",
          listed,
          "overview",
        ),
      ],
      practicalInfo: [
        fact(
          "Suggested visiting period",
          "June–October and January–February are commonly suggested for relatively dry conditions. Weather and wildlife viewing vary.",
          listed,
        ),
        fact(
          "Getting there",
          "The supplied notes estimate around 4–5 hours by road from Nairobi. Flights may be available to the local airstrip; confirm schedules.",
          listed,
        ),
        fact(
          "Accommodation",
          "Options may include safari camps and lodges in and around the park. Confirm the property included in each package.",
          listed,
        ),
        fact(
          "Entry fees",
          "Confirm current park fees, visitor categories and payment requirements before publishing prices.",
          needsVerification,
        ),
      ],
      coordinates: {
        latitude: -2.6527,
        longitude: 37.2606,
      },
      mapEmbedUrl: mapUrl(-2.6527, 37.2606),
    },
  },

  {
    slug: "tsavo",
    name: "Tsavo",
    title: "Tsavo East & Tsavo West National Parks",
    region: "Southeastern Kenya",
    description:
      "A vast wilderness of open plains, volcanic features, diverse habitats and the famous red-dusted elephants of Tsavo.",
    blurb:
      "Explore two contrasting parks through expansive landscapes, wildlife drives and memorable stops along Kenya's southern safari circuit.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
    images: destinationImages(),
    highlights: [
      "Tsavo East",
      "Tsavo West",
      "Red-dusted elephants",
      "Mzima Springs",
      "Shetani Lava Flow",
    ],
    bestFor:
      "Coastal safari departures, multi-day game drives and varied wilderness landscapes",
    verificationStatus: listed,
    relatedSafariSlugs: [
      "2-days-tsavo-east-west",
      "3-days-tsavo-east-west",
      "4-days-tsavo-east-west",
      "5-days-tsavo-amboseli",
    ],
    details: {
      overview:
        "Tsavo East and Tsavo West are two large national parks in southeastern Kenya. They feature in several of the supplied itineraries, including short trips from the coast and longer routes combining Tsavo with Amboseli and other destinations.",
      facts: [
        fact("Location", "Southeastern Kenya", listed),
        fact(
          "Parks",
          "Tsavo East National Park and Tsavo West National Park",
          listed,
        ),
        fact("Notable feature", "Mzima Springs in Tsavo West", listed),
        fact(
          "Landscape",
          "Open plains, volcanic terrain and varied wildlife habitats",
          listed,
        ),
      ],
      experiences: [
        experience(
          "Tsavo East game drives",
          "Explore open landscapes where visitors may encounter elephants, lions, buffalo, giraffes, zebras and other wildlife.",
          listed,
          "wildlife",
        ),
        experience(
          "Mzima Springs",
          "This natural spring system is a well-known feature of Tsavo West and is associated with clear water, hippos and aquatic life.",
          listed,
          "experiences",
        ),
        experience(
          "Shetani Lava Flow",
          "Volcanic terrain provides a striking contrast to the surrounding landscapes on routes through Tsavo West.",
          listed,
          "landscape",
        ),
        experience(
          "Combined Tsavo safari",
          "Many listed itineraries combine the two parks, sometimes continuing to Amboseli or other destinations.",
          listed,
          "overview",
        ),
      ],
      practicalInfo: [
        fact(
          "Suggested visiting period",
          "Conditions vary across the parks and seasons. Confirm current weather and road conditions for your travel dates.",
          needsVerification,
        ),
        fact(
          "Getting there",
          "Coastal departures feature in the supplied itineraries. Confirm the pickup location, entrance gate and journey time for each package.",
          listed,
        ),
        fact(
          "Accommodation",
          "The supplied itineraries mention several lodges and camps. Confirm current availability and the exact property included.",
          listed,
        ),
        fact(
          "Entry fees",
          "Confirm current fees and rules for each park separately.",
          needsVerification,
        ),
      ],
      coordinates: {
        latitude: -2.8,
        longitude: 38.5,
      },
      mapEmbedUrl: mapUrl(-2.8, 38.5),
    },
  },

  {
    slug: "lake-nakuru",
    name: "Lake Nakuru",
    title: "Lake Nakuru National Park",
    region: "Rift Valley · Central-western Kenya",
    description:
      "A lake-centred wildlife destination known for birdlife, rhino conservation and varied landscapes.",
    blurb:
      "Add Lake Nakuru to a wider Kenya safari for a different landscape and a chance to explore another of the country's established wildlife destinations.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
    images: destinationImages(),
    highlights: [
      "Lake landscapes",
      "Birdlife",
      "Rhinos",
      "Wildlife drives",
      "Multi-park safaris",
    ],
    bestFor:
      "Wildlife viewing, birdwatching and safari itineraries combining several parks",
    verificationStatus: listed,
    relatedSafariSlugs: [
      "2-days-lake-nakuru",
      "6-days-samburu-nakuru-mara",
      "8-days-tsavo-amboseli-nakuru-mara",
    ],
    details: {
      overview:
        "Lake Nakuru National Park appears in several of the supplied multi-day safari itineraries, particularly routes combining the Rift Valley with Maasai Mara, Samburu and southern Kenya. Destination-specific operating information and visitor arrangements should be confirmed before travel.",
      facts: [
        fact("Country", "Kenya", listed),
        fact(
          "Setting",
          "Lake and surrounding national park within the Rift Valley",
          listed,
        ),
        fact("Wildlife interests", "Birdlife and rhino conservation", inferred),
        fact(
          "Itinerary role",
          "A stop on several multi-park Kenya safari circuits",
          listed,
        ),
      ],
      experiences: [
        experience(
          "Wildlife viewing",
          "Game drives offer opportunities to explore the park's varied habitats and observe wildlife.",
          inferred,
          "wildlife",
        ),
        experience(
          "Birdlife around the lake",
          "The lake is an important feature for birdwatching. Species and abundance vary with water conditions and season.",
          inferred,
          "experiences",
        ),
        experience(
          "Rhino conservation",
          "The park is associated with rhino conservation. Specific sightings depend on conditions and should not be guaranteed.",
          inferred,
          "wildlife",
        ),
        experience(
          "Rift Valley scenery",
          "The lake and surrounding landscapes provide a contrast to the open grasslands of other safari destinations.",
          inferred,
          "landscape",
        ),
      ],
      practicalInfo: [
        fact(
          "Suggested visiting period",
          "Confirm seasonal conditions for the travel dates. Birdlife and lake conditions can change throughout the year.",
          needsVerification,
        ),
        fact(
          "Getting there",
          "The park appears in itineraries connecting Nairobi, Maasai Mara and northern Kenya. Confirm actual routes and transfer times.",
          listed,
        ),
        fact(
          "Accommodation",
          "Confirm lodge or camp options and the property included in each itinerary.",
          needsVerification,
        ),
        fact(
          "Entry fees",
          "Confirm current fees and visitor categories with the relevant park authority.",
          needsVerification,
        ),
      ],
      coordinates: {
        latitude: -0.3676,
        longitude: 36.087,
      },
      mapEmbedUrl: mapUrl(-0.3676, 36.087),
    },
  },

  {
    slug: "samburu",
    name: "Samburu",
    title: "Samburu National Reserve",
    region: "Northern Kenya",
    description:
      "A distinctive northern Kenya safari destination featured in longer routes through diverse landscapes and wildlife habitats.",
    blurb:
      "Travel north for a different safari setting and combine Samburu with other major wildlife destinations on a longer Kenyan itinerary.",
    image:
      "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=1200&q=80",
    images: destinationImages(),
    highlights: [
      "Northern Kenya",
      "Wildlife viewing",
      "Distinctive landscapes",
      "Birdlife",
      "Extended safaris",
    ],
    bestFor:
      "Extended safari circuits, wildlife enthusiasts and travellers exploring northern Kenya",
    verificationStatus: listed,
    relatedSafariSlugs: [
      "2-days-samburu",
      "6-days-samburu-nakuru-mara",
      "7-days-mara-nakuru-samburu",
      "8-days-amboseli-samburu-mara",
    ],
    details: {
      overview:
        "Samburu appears in several of the supplied multi-day safari packages, including itineraries that combine it with Lake Nakuru, Maasai Mara, Aberdares and other destinations. The specific experiences and accommodation offered depend on the itinerary selected.",
      facts: [
        fact("Country", "Kenya", listed),
        fact("Region", "Northern Kenya", inferred),
        fact(
          "Itinerary role",
          "A destination on several extended Kenya safari circuits",
          listed,
        ),
      ],
      experiences: [
        experience(
          "Wildlife drives",
          "Game drives provide opportunities to explore the reserve's wildlife and varied habitats. Specific sightings depend on season and conditions.",
          inferred,
          "wildlife",
        ),
        experience(
          "Northern landscapes",
          "The scenery provides a contrast to the southern savannah destinations included in many Kenyan safari itineraries.",
          inferred,
          "landscape",
        ),
        experience(
          "Extended safari routes",
          "The supplied listings combine Samburu with Maasai Mara, Lake Nakuru and other destinations.",
          listed,
          "overview",
        ),
      ],
      practicalInfo: [
        fact(
          "Suggested visiting period",
          "Confirm seasonal conditions and wildlife guidance for the intended travel dates.",
          needsVerification,
        ),
        fact(
          "Getting there",
          "Confirm the departure point, route, transfer duration or flight arrangements for each package.",
          needsVerification,
        ),
        fact(
          "Accommodation",
          "Confirm the specific camp or lodge offered and whether alternatives are available.",
          needsVerification,
        ),
        fact(
          "Entry fees",
          "Confirm current reserve fees and applicable visitor categories.",
          needsVerification,
        ),
      ],
      coordinates: {
        latitude: 0.5667,
        longitude: 37.5333,
      },
      mapEmbedUrl: mapUrl(0.5667, 37.5333),
    },
  },

  {
    slug: "aberdares",
    name: "Aberdares",
    title: "Aberdare National Park",
    region: "Central Kenya · Aberdare Mountain Range",
    description:
      "A highland wilderness of misty forests, waterfalls, moorlands and diverse mountain wildlife.",
    blurb:
      "Discover a cooler, greener side of Kenya through forest scenery, mountain habitats and wildlife experiences beyond the classic savannah.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    images: destinationImages(),
    highlights: [
      "Mountain forests",
      "Waterfalls",
      "Moorlands",
      "Birdwatching",
      "Forest wildlife",
    ],
    bestFor:
      "Nature lovers, forest landscapes, birdwatching and varied multi-park itineraries",
    verificationStatus: listed,
    relatedSafariSlugs: [
      "5-days-aberdare-mara-nakuru",
      "7-days-samburu-aberdare-nakuru-mara",
      "10-days-kenya-safari-circuit",
    ],
    details: {
      overview:
        "Aberdare National Park protects a mountainous ecosystem in central Kenya. The supplied destination notes describe forest, moorland, waterfalls and diverse wildlife. The initial safari-package inventory also includes itineraries combining the Aberdares with Maasai Mara, Lake Nakuru and Samburu.",
      facts: [
        fact(
          "Location",
          "Central Kenya, within the Aberdare Mountain Range",
          listed,
        ),
        fact("Approximate area", "About 767 km²", listed),
        fact("Altitude", "Approximately 2,000–4,000 metres", listed),
        fact("Established", "1950", listed),
      ],
      experiences: [
        experience(
          "Mountain forests and moorlands",
          "Explore forested slopes, bamboo vegetation and high-altitude moorland habitats.",
          listed,
          "landscape",
        ),
        experience(
          "Waterfalls",
          "Karuru, Chania and Gura waterfalls are among the features described in the supplied notes. Access and viewing conditions depend on the location and weather.",
          listed,
          "experiences",
        ),
        experience(
          "Forest wildlife",
          "Wildlife associated with the ecosystem includes elephants, buffalo, leopards, bushbucks and colobus monkeys. Sightings are not guaranteed.",
          listed,
          "wildlife",
        ),
        experience(
          "Birdwatching",
          "The highland forest habitats provide opportunities for birdwatching. Confirm current species information before publishing a detailed checklist.",
          inferred,
          "culture",
        ),
      ],
      practicalInfo: [
        fact(
          "Suggested visiting period",
          "The supplied notes suggest January–February and June–September as relatively drier periods. Mountain weather can change quickly.",
          listed,
        ),
        fact(
          "Getting there",
          "The supplied notes estimate approximately 3–4 hours by road from Nairobi, depending on the access point and conditions.",
          listed,
        ),
        fact(
          "Accommodation",
          "The supplied notes mention forest lodges, campsites and accommodation outside the park. Confirm current operating status and availability.",
          listed,
        ),
        fact(
          "Entry fees",
          "Confirm current fees, applicable visitor categories and access rules with the park authority.",
          needsVerification,
        ),
      ],
      coordinates: {
        latitude: -0.4,
        longitude: 36.7,
      },
      mapEmbedUrl: mapUrl(-0.4, 36.7),
    },
  },
];
