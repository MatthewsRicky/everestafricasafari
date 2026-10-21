import { Compass, MapPinned, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

const benefits = [
  {
    icon: Compass,
    title: "A journey shaped around you",
    description:
      "Start with your interests, preferred destinations and travel plans to explore the right options.",
  },
  {
    icon: MapPinned,
    title: "Discover remarkable places",
    description:
      "Explore different landscapes, wildlife experiences and destinations across Kenya.",
  },
  {
    icon: MessageCircle,
    title: "Talk through your plans",
    description:
      "Ask questions, share your ideas and discuss the details before deciding on your safari.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-maroon-deep text-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Your journey matters"
            title="Feel confident about your next adventure."
            description="Planning a safari should be exciting, not overwhelming. Start with what matters to you and build from there."
            light
          />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <Reveal key={benefit.title} delay={index * 0.08}>
                <article className="border-t border-white/20 pt-6">
                  <div className="flex size-12 items-center justify-center rounded-full border border-white/20 text-[#efc985]">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <h3 className="heading-display mt-6 text-2xl sm:text-3xl">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {benefit.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
