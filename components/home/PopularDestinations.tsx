import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import DestinationCard from "@/components/destinations/DestinationCard";
import { destinations } from "@/data/destinations";

export default function PopularDestinations() {
  return (
    <section className="section-padding bg-sand/50">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Places worth discovering"
              title="Explore Kenya's wild side."
              description="Every destination has its own landscapes, wildlife and character. Find the places that speak to you."
            />

            <Link
              href="/destinations"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-maroon transition hover:text-maroon-deep"
            >
              All destinations
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <Reveal key={destination.slug} delay={index * 0.08}>
              <DestinationCard destination={destination} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
