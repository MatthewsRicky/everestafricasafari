import { notFound } from "next/navigation";

import CTASection from "@/components/shared/CTASection";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const articles: Record<
  string,
  { title: string; category: string; content: string[]; image: string }
> = {
  "planning-a-first-safari": {
    title: "Planning a first safari: what really matters",
    category: "Travel tips",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    content: [
      "The best first safari is usually one that balances iconic wildlife experiences with rest, comfort and the right pace. It’s worth thinking carefully about season, route and the kind of accommodation style that suits your trip.",
      "A smaller, slower itinerary can feel far more rewarding than a hectic schedule. When you’re deciding on a first safari, pick regions that offer clear wildlife viewing and flexible sightseeing, and leave space for downtime.",
      "The right plan can make your trip feel beautifully simple, and that often means a tailored route instead of a generic package.",
    ],
  },
  "best-time-to-visit-botswana": {
    title: "Best time to visit Botswana for wildlife and water",
    category: "Wildlife",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=80",
    content: [
      "Botswana is magical for wildlife lovers, especially when you want a blend of dry-season game viewing and the lush, water-rich atmosphere of the delta.",
      "During the drier months, wildlife concentrates around water sources, making game drives highly rewarding. The watery season brings a completely different texture to the landscape, with mokoro safaris and birdlife in abundance.",
      "For travellers hoping to mix classic safari with water-based experiences, Botswana offers a compelling case for a careful seasonal plan.",
    ],
  },
  "family-safari-checklist": {
    title: "A family safari checklist for a smooth trip",
    category: "Families",
    image:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1800&q=80",
    content: [
      "Family safaris can be some of the most rewarding trips in the world, especially when the pace is thoughtful and the experiences built around everyone’s comfort.",
      "Consider the age of your children, the amount of travel time between destinations, and the types of accommodation that will help everyone rest well. Flexible game drives and private transfers often make a noticeable difference.",
      "The best family safari is one that feels exciting without being exhausting — a balance of adventure, downtime and practical ease.",
    ],
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-forest-deep text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75"
          style={{ backgroundImage: `url("${article.image}")` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,44,37,0.9),rgba(16,44,37,0.74),rgba(16,44,37,0.3))]" />

        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-safari-gold">
              {article.category}
            </p>
            <h1 className="heading-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
              {article.title}
            </h1>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Article" title={article.title} />

          <div className="mt-10 space-y-6 rounded-[2rem] border border-border bg-white p-6 shadow-[0_14px_32px_rgba(25,45,36,0.04)] sm:p-8">
            {article.content.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Planning a safari of your own?"
        description="Let’s talk through the details and create a route that suits your travel style and dream experiences."
      />
    </>
  );
}
