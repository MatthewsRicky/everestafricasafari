import ExcursionCard from "@/components/excursions/ExcursionCard";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { excursions } from "@/data/excursions";

export default function ExcursionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Excursions"
        title="Add a little more wonder to the journey."
        description="Enhance your safari with immersive experiences that bring you closer to the rhythm of the landscape and the wildlife that inhabits it."
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Signature experiences"
            title="A safari that feels complete."
            description="From sunrise flights to slow, memorable evenings on the water, these experiences add atmosphere and depth to your trip."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {excursions.map((excursion) => (
              <ExcursionCard key={excursion.slug} excursion={excursion} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
