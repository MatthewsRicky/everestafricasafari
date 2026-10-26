import DestinationCard from "@/components/destinations/DestinationCard";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { destinations } from "@/data/destinations";

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Where your dream safari begins."
        description="Explore the landscapes and wildlife stories that define a remarkable African journey, from iconic plains to hidden river systems."
        image="/packages/4-Days-Nairobi-Mara-Nakuru_1.jpg"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Explore Africa"
            title="Handpicked regions for unforgettable journeys."
            description="Each destination adds a different mood, pace and native wildlife story — helping you shape a safari that feels entirely your own."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
