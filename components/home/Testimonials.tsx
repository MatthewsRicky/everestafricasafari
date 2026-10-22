import { ExternalLink, Star } from "lucide-react";

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
            eyebrow="Verified guest reviews"
            title="Experiences worth remembering."
            description="Read what travellers have shared about their experiences with Everest Africa Safari."
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex h-full flex-col rounded-xl border border-border bg-white p-6 sm:p-8"
            >
              <div
                className="flex items-center gap-1 text-amber-500"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <h3 className="mt-4 font-semibold leading-6 text-forest-deep">
                {testimonial.title}
              </h3>

              <blockquote className="mt-3 flex-1 text-sm leading-7 text-ink">
                “{testimonial.quote}”
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

                <p className="mt-2 text-xs text-muted">
                  Published {testimonial.date} · Tripadvisor
                </p>

                <a
                  href={testimonial.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-deep transition hover:text-maroon"
                >
                  Read on Tripadvisor
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
