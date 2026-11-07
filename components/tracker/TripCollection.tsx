import Container from "@/components/shared/Container";
import type { SafariTrip } from "@/data/safari-trips";

type TripCollectionProps = {
  trips: SafariTrip[];
};

export default function TripCollection({ trips }: TripCollectionProps) {
  const featuredTrip = trips.find((trip) => trip.featured) ?? trips[0];

  if (!featuredTrip) {
    return (
      <section className="section-padding bg-ivory">
        <Container>
          <p className="text-center text-gray-600">
            Our next safari adventure will be featured here soon.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section id="featured-journey" className="section-padding bg-ivory">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-forest">
            The journey
          </p>

          <h2 className="heading-display text-4xl leading-tight text-forest-deep sm:text-5xl">
            Follow Our Safari Adventures
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600">
            Explore our journeys, discover remarkable destinations and
            experience the beauty of Africa along the way.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Polarsteps journey */}
          {featuredTrip.embedUrl ? (
            <div className="relative w-full bg-gray-100">
              <iframe
                src={featuredTrip.embedUrl}
                title={`Follow ${featuredTrip.title} on Polarsteps`}
                className="block h-[450px] w-full border-0 sm:h-[550px] lg:h-[650px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <div
              className="min-h-[320px] bg-cover bg-center lg:min-h-[450px]"
              style={
                featuredTrip.image
                  ? {
                      backgroundImage: `url("${featuredTrip.image}")`,
                    }
                  : undefined
              }
            />
          )}

          {/* Journey information */}
          <div className="p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
              Featured journey
            </p>

            <h3 className="heading-display mt-4 text-3xl text-forest-deep sm:text-4xl">
              {featuredTrip.title}
            </h3>

            <p className="mt-3 text-sm font-semibold text-forest">
              {featuredTrip.destination}
              {featuredTrip.period && ` · ${featuredTrip.period}`}
            </p>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-gray-600">
              {featuredTrip.description}
            </p>

            {featuredTrip.embedUrl && (
              <a
                href={featuredTrip.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-forest-deep px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-forest"
              >
                View journey on Polarsteps
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Journey information and maps powered by Polarsteps.
        </p>
      </Container>
    </section>
  );
}
