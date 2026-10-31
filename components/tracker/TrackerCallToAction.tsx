import Link from "next/link";

export default function TrackerCallToAction() {
  return (
    <section className="section-padding bg-maroon-deep text-ivory">
      <div className="container mx-auto px-5 text-center md:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-safari-gold">
          Your adventure starts here
        </p>

        <h2 className="heading-display mx-auto max-w-3xl text-3xl md:text-5xl">
          Ready to Create Your Own Safari Story?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-ivory/75">
          Explore our safari experiences and let us help you plan an
          unforgettable journey through Africa.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/safaris"
            className="rounded-full bg-safari-gold px-7 py-3.5 text-sm font-semibold text-maroon-deep transition hover:bg-ivory"
          >
            View Safari Packages
          </Link>

          <Link
            href="/request-a-quote"
            className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold text-ivory transition hover:bg-ivory hover:text-maroon-deep"
          >
            Plan Your Safari
          </Link>
        </div>
      </div>
    </section>
  );
}
