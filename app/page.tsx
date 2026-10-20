import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import SectionHeading from "@/components/shared/SectionHeading";

const heroImage =
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=85";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-forest-deep sm:min-h-[740px] lg:min-h-[790px]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImage}")` }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/40 to-black/10"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/10"
          aria-hidden="true"
        />

        <Container className="py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-safari-gold sm:text-sm">
              <span className="h-px w-9 bg-safari-gold" />
              Discover the extraordinary
            </p>

            <h1 className="heading-display text-balance text-5xl leading-[1.04] text-white sm:text-6xl lg:text-8xl">
              Africa is waiting.
              <span className="mt-2 block text-white/75">Find your wild.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              From unforgettable wildlife encounters to remarkable landscapes,
              discover a safari shaped around the way you want to travel.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/request-a-quote" variant="light">
                Plan your safari
                <ArrowUpRight size={17} />
              </Button>

              <Button href="/safaris" variant="secondary">
                Explore safaris
              </Button>
            </div>

            <div className="mt-14 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-white/65">
              <ArrowDown size={15} />
              Begin your journey
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 right-0 hidden border-l border-t border-white/20 bg-black/15 px-8 py-5 text-xs uppercase tracking-widest text-white/75 backdrop-blur-sm md:block">
          Explore beyond the ordinary
        </div>
      </section>

      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Your journey, your way"
            title="More than a destination. An experience."
            description="Discover wildlife, remarkable places and memorable experiences. Your safari should feel as individual as the journey that brings you here."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Wildlife & wilderness",
                description:
                  "Experience the landscapes and wildlife that make Africa unforgettable.",
                href: "/destinations",
              },
              {
                number: "02",
                title: "Safaris for every journey",
                description:
                  "Find an itinerary that suits your schedule, interests and travel style.",
                href: "/safaris",
              },
              {
                number: "03",
                title: "Your own adventure",
                description:
                  "Start a conversation about the places and experiences you want to discover.",
                href: "/tailor-made-safari",
              },
            ].map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group flex min-h-64 flex-col border border-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg sm:p-9"
              >
                <span className="text-xs font-bold tracking-widest text-safari-gold">
                  {item.number}
                </span>

                <h3 className="heading-display mt-7 text-3xl text-forest-deep">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-muted">
                  {item.description}
                </p>

                <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-forest">
                  Discover more
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

      <section className="section-padding bg-sand/60">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Let's plan something remarkable"
                title="Your safari starts with a conversation."
                description="Tell us what you'd love to experience, when you want to travel and who is joining you. We can start exploring the possibilities together."
              />

              <div className="mt-8">
                <Button href="/request-a-quote">
                  Start planning
                  <ArrowUpRight size={17} />
                </Button>
              </div>
            </div>

            <div className="border-l-2 border-safari-gold py-4 pl-7 sm:pl-10">
              <p className="heading-display text-3xl leading-snug text-forest sm:text-4xl">
                The best journeys begin with the right questions.
              </p>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted">
                Share your ideas with us. Your preferred destinations, travel
                dates and experiences will help shape the next step.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
