export type ExcursionItineraryStep = {
  title: string;
  description: string;
  time?: string;
  optional?: boolean;
};

export type Excursion = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  image: string;
  blurb: string;
  description: string;
  highlights: string[];
  itinerary: ExcursionItineraryStep[];
  practicalNotes: string[];
  sourceStatus: "source-provided";
};

export const excursions: Excursion[] = [
  {
    slug: "funzi-island-dhow-trip",
    title: "Funzi Island Dhow Trip",
    location: "Diani, Ukunda & South Coast",
    duration: "Full day",
    image:
      "/excursions/1-days-funzi-island-768x300.jpg",
    blurb:
      "Explore mangrove channels, visit a traditional coastal village, and relax on a beautiful ocean sandbank.",
    description:
      "Escape to the unspoiled beauty of Funzi Island on a full-day dhow cruise through mangrove channels, sandbanks and coastal waters. This experience combines scenery, local culture and a relaxed island adventure south of Diani.",
    highlights: [
      "Cruise aboard a traditional Swahili dhow",
      "Explore the Ramisi River mangroves",
      "Visit a local fishing village on Funzi Island",
      "Relax on an ocean sandbank when tides permit",
      "Enjoy a Swahili-style lunch at a local restaurant",
    ],
    itinerary: [
      {
        time: "07:00–07:30 AM",
        title: "Hotel pick-up and transfer",
        description:
          "Pick-up from your hotel or residence in Diani, Ukunda or Msambweni, followed by an approximately 45–60-minute drive to Bodo village.",
      },
      {
        title: "Traditional dhow cruise",
        description:
          "Board a Swahili-style dhow with your guide and crew, then cruise through the calm coastal waters and mangrove channels.",
      },
      {
        title: "Ocean sandbank",
        description:
          "Stop at a scenic sandbank for swimming, sunbathing and photography, subject to tides and conditions.",
        optional: true,
      },
      {
        title: "Ramisi River mangroves",
        description:
          "Explore the Ramisi River estuary and its mangrove forests, with opportunities to observe birds and learn about the local ecosystem.",
      },
      {
        title: "Funzi Island village",
        description:
          "Take a short walk through the fishing village and learn about local Swahili coastal culture. Visits to homes or schools are optional.",
      },
      {
        title: "Swahili lunch",
        description:
          "Enjoy a freshly prepared meal at a local island restaurant. The source describes dishes such as coconut rice, grilled fish, chapati, vegetables and tropical fruit. Vegetarian options can be requested.",
      },
      {
        title: "Return cruise and hotel drop-off",
        description:
          "Cruise back to the mainland, transfer from Bodo village and return to your hotel.",
      },
    ],
    practicalNotes: [
      "Pick-up locations listed in the source are Diani, Ukunda and Msambweni.",
      "The sandbank stop depends on tides and conditions.",
      "Village visits to traditional homes or schools are optional.",
      "Vegetarian lunch options are available on request according to the source.",
    ],
    sourceStatus: "source-provided",
  },

  {
    slug: "shimba-hills",
    title: "Shimba Hills Day Trip",
    location: "Diani, Ukunda & South Coast",
    duration: "Full day",
    image: "/excursions/1_day_shimba-768x362.jpg",
    blurb:
      "Discover forest landscapes, wildlife and panoramic viewpoints on a day trip to Shimba Hills National Reserve.",
    description:
      "Escape the coastal crowds and explore Shimba Hills National Reserve, known for its tropical forest, rolling hills and distinctive wildlife. The day combines a guided game drive with scenic stops and the option to hike to Sheldrick Falls.",
    highlights: [
      "Guided game drive in Shimba Hills National Reserve",
      "Look for sable antelope and other wildlife",
      "Visit scenic viewpoints overlooking forest and coast",
      "Optional walk to Sheldrick Falls",
      "Explore a different route during the return game drive",
    ],
    itinerary: [
      {
        time: "07:00 AM",
        title: "Hotel pick-up and transfer",
        description:
          "Depart from Diani, Ukunda or a nearby coastal area for the approximately 45–60-minute drive to Shimba Hills National Reserve.",
      },
      {
        title: "Morning game drive",
        description:
          "Explore the reserve in search of wildlife including elephants, buffalo, bushbuck, giraffes and the rare sable antelope. Stop at scenic viewpoints such as Elephant Hill.",
      },
      {
        title: "Sheldrick Falls walk",
        description:
          "Take an optional hike to Sheldrick Falls. The source estimates approximately 30–40 minutes each way and describes a walk through shaded forest paths with a KWS ranger.",
        optional: true,
      },
      {
        title: "Lunch break",
        description:
          "Choose lunch at Shimba Hills Lodge, with meals paid directly, or bring a packed picnic to enjoy at a designated picnic site.",
        optional: true,
      },
      {
        title: "Final game drive and viewpoints",
        description:
          "Explore another route as you leave the reserve, with possible photo stops at Marere Dam or Ocean View Point.",
      },
      {
        title: "Return transfer",
        description:
          "Return to your hotel in Diani or the surrounding coastal area.",
      },
    ],
    practicalNotes: [
      "The source lists pick-ups from Diani, Ukunda and nearby coastal areas.",
      "The Sheldrick Falls hike is optional and involves walking.",
      "Lunch at Shimba Hills Lodge is described as payable directly; alternatively, bring a picnic.",
      "Wildlife sightings are not guaranteed.",
    ],
    sourceStatus: "source-provided",
  },

  {
    slug: "mombasa-city-tour",
    title: "Mombasa City Tour",
    location: "Mombasa, Nyali & Bamburi",
    duration: "Full day",
    image: "/excursions/mombasa_city-768x362.jpg",
    blurb:
      "Discover Mombasa's Swahili heritage, historic Old Town, Fort Jesus, spice markets and waterfront.",
    description:
      "Discover the history and coastal culture of Kenya's historic port city. Explore the streets of Old Town, learn about Fort Jesus, browse local markets and visit familiar landmarks, with optional stops depending on available time.",
    highlights: [
      "Walking tour of Mombasa Old Town",
      "Visit historic Fort Jesus Museum",
      "Explore spice and curio markets",
      "Photograph the iconic Mombasa Tusks",
      "Visit Mama Ngina Waterfront",
      "Optional cultural and nature attractions",
    ],
    itinerary: [
      {
        time: "08:00 AM",
        title: "Hotel pick-up",
        description:
          "Meet your English-speaking guide at your hotel or residence in Mombasa, Nyali, Bamburi or a surrounding area.",
      },
      {
        title: "Mombasa Old Town",
        description:
          "Walk through narrow streets shaped by Swahili, Arab and Portuguese influences. See carved wooden doors, balconies and historic architecture while learning about the city's trading history.",
      },
      {
        title: "Fort Jesus Museum",
        description:
          "Explore the historic Portuguese-built fort, its exhibits and views of the Old Harbor. Museum access arrangements and admission charges should be confirmed before travel.",
      },
      {
        title: "Spice market and curio shopping",
        description:
          "Discover traditional coastal spices and browse local crafts, souvenirs and carvings. Purchases are optional.",
      },
      {
        title: "Mombasa Tusks",
        description:
          "Stop at the landmark on Moi Avenue for photographs and a brief introduction to its history.",
      },
      {
        title: "Swahili lunch",
        description:
          "Take a break at a local Swahili restaurant or café. The source describes lunch as optional and at the guest's own expense unless otherwise agreed.",
        optional: true,
      },
      {
        title: "Mama Ngina Waterfront",
        description:
          "Enjoy ocean views and walking paths. A Likoni Ferry viewpoint may also be visited.",
      },
      {
        title: "Optional add-on attractions",
        description:
          "Depending on time, choose a visit to Haller Park, Bombolulu Cultural Centre or Nyali Beach. Extra admission fees may apply.",
        optional: true,
      },
      {
        title: "Hotel drop-off",
        description: "Return transfer to your hotel after the city tour.",
      },
    ],
    practicalNotes: [
      "The source lists pick-ups from Mombasa, Nyali, Bamburi and surrounding areas.",
      "Lunch and shopping purchases are not described as guaranteed inclusions.",
      "Optional attractions depend on time and may have separate admission charges.",
      "Confirm Fort Jesus admission arrangements and the final route before travel.",
    ],
    sourceStatus: "source-provided",
  },

  {
    slug: "wasini-island-dhow-trip",
    title: "Wasini Island Dhow Trip",
    location: "Diani, Ukunda & Shimoni",
    duration: "Full day",
    image: "/excursions/1-day-wasini-dhow-768x300.jpg",
    blurb:
      "Sail from Shimoni into the Kisite-Mpunguti marine area for a day of coastal scenery, snorkeling and island culture.",
    description:
      "Enjoy a full-day dhow excursion along Kenya's south coast. The itinerary combines a cruise through the Wasini Channel, opportunities to spot dolphins, a guided snorkeling session and a Swahili-style lunch on Wasini Island.",
    highlights: [
      "Traditional Swahili dhow cruise from Shimoni",
      "Dolphin spotting opportunities",
      "Guided snorkeling in the marine park",
      "Coral reefs and tropical fish",
      "Swahili seafood lunch on Wasini Island",
      "Optional guided cultural walk",
    ],
    itinerary: [
      {
        time: "06:00–07:00 AM",
        title: "Hotel pick-up and transfer",
        description:
          "Depart from Diani Beach, Ukunda or a surrounding area and travel south through coastal villages and coconut plantations to Shimoni.",
      },
      {
        title: "Dhow departure from Shimoni",
        description:
          "Board a traditional wooden dhow and receive a safety briefing from the crew. The source describes light refreshments such as tea or coffee and biscuits.",
      },
      {
        title: "Dolphin spotting and marine cruise",
        description:
          "Cruise through the Wasini Channel and look for dolphins before continuing toward the Kisite-Mpunguti Marine Park area. Dolphin sightings are not guaranteed.",
      },
      {
        title: "Guided snorkeling",
        description:
          "Spend approximately 1–1.5 hours snorkeling at designated locations. The source lists a mask, fins and life jacket as provided equipment; confirm conditions and availability before departure.",
      },
      {
        time: "12:30 PM",
        title: "Lunch on Wasini Island",
        description:
          "Enjoy a Swahili-style lunch at a local restaurant overlooking the ocean. Vegetarian options can be requested.",
      },
      {
        title: "Optional cultural walk",
        description:
          "Join an approximately 30–45-minute village walk to learn about local life, island history and the coral garden when tides allow. Alternatively, relax at the restaurant.",
        optional: true,
      },
      {
        title: "Return to Shimoni",
        description:
          "Board the dhow for the return sail to Shimoni jetty, then transfer by road toward Diani.",
      },
      {
        time: "04:00–05:00 PM",
        title: "Hotel drop-off",
        description:
          "Arrive back at your hotel or resort after the day's marine and cultural experiences.",
      },
    ],
    practicalNotes: [
      "The source lists pick-ups from Diani Beach, Ukunda and surrounding areas.",
      "Dolphin sightings are not guaranteed.",
      "Snorkeling is dependent on sea conditions and the operator's safety guidance.",
      "A cultural walk is optional, and the coral garden visit depends on tides.",
      "Confirm marine park fees, transport arrangements and all inclusions before booking.",
    ],
    sourceStatus: "source-provided",
  },
];

export function getExcursionBySlug(slug: string) {
  return excursions.find((excursion) => excursion.slug === slug);
}
