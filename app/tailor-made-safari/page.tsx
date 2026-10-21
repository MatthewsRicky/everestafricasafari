import CTASection from "@/components/shared/CTASection";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";

const benefits = [
  "Private, custom route planning",
  "Flexible trip pacing and style",
  "Luxury, family or adventure-friendly options",
  "Guidance on timing, flights and camp choices",
];

const steps = [
  {
    title: "Tell us what you dream about",
    text: "Share your preferred destinations, travel dates and the experiences you’d love to include.",
  },
  {
    title: "We shape the route",
    text: "We create a safari plan that balances wildlife moments, comfort and the rhythm you want from the journey.",
  },
  {
    title: "Travel with confidence",
    text: "Once approved, we handle the details and keep everything smooth from first transfer to final farewell.",
  },
];

export default function TailorMadeSafariPage() {
  return (
    <>
      <PageHero
        eyebrow="Tailor-made travel"
        title="Designed around your style, your pace and your dream itinerary."
        description="Whether you’re planning a romantic hideaway, a family safari or a once-in-a-lifetime wildlife journey, we’ll build a route that feels distinctly yours."
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section-padding bg-ivory">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Why custom planning works"
              title="A safari should flow with your travel style."
              description="Thoughtful planning gives you more time in the moments that matter, less friction in the details and a trip that feels more personal from start to finish."
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full border border-border bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_18px_60px_rgba(16,44,37,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80"
              alt="Safari travelers at sunset"
              className="h-[380px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-sand/70">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Simple, personal and guided at every step."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_14px_32px_rgba(25,45,36,0.04)]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-safari-gold">
                  0{index + 1}
                </span>
                <h3 className="heading-display mt-5 text-3xl text-forest-deep">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Start planning your own custom safari."
        description="Share your ideas and we’ll begin shaping an itinerary that fits the way you want to travel."
      />
    </>
  );
}
