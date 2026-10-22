export type Testimonial = {
  id: string;
  name: string;
  location?: string;
  title: string;
  quote: string;
  date: string;
  rating: 5;
  source: "Tripadvisor";
  sourceUrl: string;
};

const tripadvisorUrl =
  "https://www.tripadvisor.ie/Attraction_Review-g775870-d33304978-Reviews-Everest_Africa_Safari-Diani_Beach_Ukunda_Coast_Province.html";

export const testimonials: Testimonial[] = [
  {
    id: "warrenp",
    name: "WarrenP",
    location: "Barnsley, United Kingdom",
    title: "Incredible & unforgettable experience highly recommended",
    quote:
      "Our Tsavo East safari was a once in a lifetime experience for my wife and I. We chose Patrick at Everest Africa Safari through a recommendation. We could not have wished for a better guide. Patrick has extensive knowledge of the wildlife of Africa plus a very high standard of customer service and hospitality. He went above and beyond to make our safari experience so special. He recommended a stay at Ngutuni Lodge which was truly breathtaking. We were blessed to see so many wild animals and beautiful scenery it was truly magical. We cannot recommend Patrick enough and we are already planning a trip back to Kenya. Many thanks Patrick at Everest Africa safari. ⭐⭐⭐⭐⭐",
    date: "17 January 2026",
    rating: 5,
    source: "Tripadvisor",
    sourceUrl: tripadvisorUrl,
  },
  {
    id: "anna-h",
    name: "Anna H",
    title: "Save Game drive with a lot of humor",
    quote:
      "A unique experience! Patrick is an excellent guide and such a lovely person! With his great sense of humor, he gave us three unique Game drive days in Tsavo East, Tsavo West and Amboseli. These are experiences we will cherish for a long time! If you want a safari where the guide feels like a friend, Patrick is the right choice!",
    date: "20 September 2025",
    rating: 5,
    source: "Tripadvisor",
    sourceUrl: tripadvisorUrl,
  },
  {
    id: "peter-b",
    name: "Peter B",
    title: "Highly recommended",
    quote:
      "Hello, we were traveling with Patrick for three days. It was great. It was even better than planned. Patrick is punctual and reliable. Identify the corners in the parks where you can see the best animals. We can highly recommend a safari with him.",
    date: "5 February 2026",
    rating: 5,
    source: "Tripadvisor",
    sourceUrl: tripadvisorUrl,
  },
  {
    id: "bart",
    name: "Bart",
    location: "De Lier, The Netherlands",
    title: "True care taking on our trip to Kenya",
    quote:
      "What a great experience. Patrick drove us all week through our charity projects and then took us to some very special safaris. The whole experience and the care-taking was really special. Thanks so much. We will book you again next time.",
    date: "18 July 2025",
    rating: 5,
    source: "Tripadvisor",
    sourceUrl: tripadvisorUrl,
  },
  {
    id: "marlene-b",
    name: "Marlene B",
    title: "Five star experience",
    quote:
      "I would highly recommend the safari experience with Patrick it was a most professional and friendly service with the best tour guide in my opinion. I wouldn’t recommend anyone else if you are looking for a 1st class service everything was perfect ⭐️ ⭐️⭐️⭐️⭐️",
    date: "6 September 2025",
    rating: 5,
    source: "Tripadvisor",
    sourceUrl: tripadvisorUrl,
  },
  {
    id: "f-makau",
    name: "F-Makau",
    location: "Ukunda, Kenya",
    title: "EXCELLENT SAFARI",
    quote:
      "Had a wondering experience with Everest Africa Safaris. I highly recommend this tour company. Gitonga is a dedicated tour guide and highly knowledgeable.",
    date: "15 August 2025",
    rating: 5,
    source: "Tripadvisor",
    sourceUrl: tripadvisorUrl,
  },
];
