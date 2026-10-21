import Link from "next/link";
import { ArrowUpRight, Trees } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

const safariJourneys = [
  {
    title: "Luxury Bush Escapes",
    description:
      "Private conservancies, upgraded lodges and evenings under the stars.",
    destination: "Kenya & Tanzania",
    href: "/safaris",
  },
  {
    title: "Big Five Adventures",
    description:
      "Wildlife-rich itineraries designed around unforgettable sightings.",
    destination: "Explore safari destinations",
    href: "/destinations",
  },
  {
    title: "Family Safari Moments",
    description:
      "Balanced, easygoing journeys designed with every age in mind.",
    destination: "Tailor-made experiences",
    href: "/tailor-made-safari",
  },
];

export default function JourneyCards() {
  return (
    <section className="section-padding bg-ivory">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Your journey, your way"
            title="Designed for extraordinary African escapes."
            description="From first-time safari travellers to seasoned explorers, every itinerary is shaped around your interests, pace and sense of adventure."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {safariJourneys.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <Link
                href={item.href}
                className="group flex min-h-[340px] flex-col rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_14px_32px_rgba(25,45,36,0.04)] transition duration-300 hover:-translate-y-1 hover:border-maroon/20 hover:shadow-[0_20px_40px_rgba(25,45,36,0.08)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-sand text-maroon">
                    <Trees size={18} />
                  </span>

                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-safari-gold">
                    Signature
                  </span>
                </div>

                <h3 className="heading-display mt-8 text-3xl text-maroon-deep">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted">
                  {item.description}
                </p>

                <div className="mt-6 rounded-2xl border border-border bg-sand/40 px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-maroon/80">
                  {item.destination}
                </div>

                <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-maroon">
                  Discover more
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
