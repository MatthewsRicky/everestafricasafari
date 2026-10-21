import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import SafariCard from "@/components/safaris/SafariCard";
import { featuredSafaris } from "@/data/safaris";

export default function FeaturedSafaris() {
  return (
    <section className="section-padding">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Find your experience"
              title="A world of adventure awaits."
              description="Explore some of Kenya's remarkable safari destinations and start imagining your next journey."
            />

            <Link
              href="/safaris"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-maroon transition hover:text-maroon-deep"
            >
              Explore all safaris
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredSafaris.map((safari, index) => (
            <Reveal key={safari.slug} delay={index * 0.08}>
              <SafariCard safari={safari} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
