import Link from "next/link";

export default function TrackerHero() {
  return (
    <section className="relative overflow-hidden bg-maroon-deep text-ivory">
      <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep via-maroon-deep/95 to-maroon/70" />

      <div className="container relative mx-auto px-5 py-24 md:px-8 md:py-32">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-safari-gold">
            Explore with Everest Africa Safari
          </p>

          <h1 className="heading-display text-4xl leading-tight md:text-6xl">
            Follow Our Safari Journeys
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-ivory/80 md:text-lg">
            Discover the places we explore, the landscapes we encounter, and the
            unforgettable experiences that make every safari unique.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#featured-journey"
              className="rounded-full bg-safari-gold px-7 py-3.5 text-sm font-semibold text-maroon-deep transition hover:bg-ivory"
            >
              Explore the journey
            </Link>

            <Link
              href="/safaris"
              className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold text-ivory transition hover:bg-ivory hover:text-maroon-deep"
            >
              Explore our safaris
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
