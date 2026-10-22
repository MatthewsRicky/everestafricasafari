import CTASection from "@/components/shared/CTASection";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const stats = [
  { value: "Guided", label: "Travel guidance" },
  { value: "Tailored", label: "Safari planning" },
  { value: "Personal", label: "Travel experiences" },
];

const values = [
  {
    title: "Thoughtful travel design",
    text: "We build journeys around the experiences that matter most — wildlife, pace, comfort and the feeling of being fully present in the moment.",
  },
  {
    title: "Local expertise",
    text: "Our knowledge of the regions we work in helps shape routes, timing and lodge choices that feel seamless and authentic.",
  },
  {
    title: "Service that feels personal",
    text: "From your first enquiry to the final transfer, we keep each traveller supported, informed and inspired throughout the trip.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We believe the best safaris feel personal from the very first conversation."
        description="Everest Africa Safari creates journeys that balance iconic wildlife, refined comfort and the freedom to travel in your own way."
        image="/packages/4-Days-Nairobi-Mara-Nakuru_1.jpg"
        ctaHref="/request-a-quote"
        ctaLabel="Plan your safari"
        secondaryHref="/safaris"
        secondaryLabel="Browse journeys"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title="The right safari is not one-size-fits-all."
            description="We specialise in travel that feels considered, immersive and quietly luxurious — shaped around your interests, your family, your pace and the stories you want to take home."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_14px_32px_rgba(25,45,36,0.04)]"
              >
                <h3 className="heading-display text-3xl text-forest-deep">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-sand/70">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-border bg-white p-6 text-center shadow-[0_14px_32px_rgba(25,45,36,0.04)]"
              >
                <div className="heading-display text-4xl text-forest-deep">
                  {item.value}
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to begin your own Kenyan story?"
        description="Tell us where you want to go, what you want to feel and what kind of time you want to have. We’ll shape the next step with you."
      />
    </>
  );
}
