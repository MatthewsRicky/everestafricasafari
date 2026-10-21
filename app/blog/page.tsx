import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const articles = [
  {
    slug: "planning-a-first-safari",
    title: "Planning a first safari: what really matters",
    category: "Travel tips",
    excerpt:
      "A practical guide to choosing the right destination, pace and travel style for your first African journey.",
  },
  {
    slug: "best-time-to-visit-botswana",
    title: "Best time to visit Botswana for wildlife and water",
    category: "Wildlife",
    excerpt:
      "When to travel for the richest sightings, cooler conditions and the most rewarding river experiences.",
  },
  {
    slug: "family-safari-checklist",
    title: "A family safari checklist for a smooth trip",
    category: "Families",
    excerpt:
      "The small things that make a big difference when travelling with children in the bush.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel journal"
        title="Stories, tips and inspiration from the African bush."
        description="Explore ideas and practical guidance for your next safari, from first-time travel planning to the best seasons for wildlife encounters."
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Latest articles"
            title="Ideas worth taking with you."
            description="A closer look at safari planning, hidden gems and the details that help travellers feel prepared and inspired."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_14px_32px_rgba(25,45,36,0.04)] transition duration-300 hover:-translate-y-1"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-safari-gold">
                  {article.category}
                </p>
                <h3 className="heading-display mt-4 text-3xl text-forest-deep">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {article.excerpt}
                </p>

                <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-forest">
                  Read article
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
