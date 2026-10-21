import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Words from our travellers"
            title="Experiences worth remembering."
            description="Read about the journeys our guests have shared."
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-xl border border-border bg-white p-6 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="heading-display text-5xl text-maroon"
              >
                “
              </span>

              <blockquote className="mt-2 text-sm leading-7 text-ink">
                {testimonial.quote}
              </blockquote>

              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-bold text-forest-deep">
                  {testimonial.name}
                </p>

                {testimonial.location && (
                  <p className="mt-1 text-xs text-muted">
                    {testimonial.location}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
