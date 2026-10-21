import Link from "next/link";

import Container from "@/components/shared/Container";

export default function NotFound() {
  return (
    <section className="section-padding bg-ivory">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-white p-8 text-center shadow-[0_18px_60px_rgba(16,44,37,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-safari-gold">
            404
          </p>
          <h1 className="heading-display mt-4 text-5xl text-forest-deep">
            This page has wandered off.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">
            The route you were looking for might have moved. Let’s get you back
            to the safari journeys and inspiring destinations.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-deep"
          >
            Return home
          </Link>
        </div>
      </Container>
    </section>
  );
}
