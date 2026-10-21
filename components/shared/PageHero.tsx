import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  ctaHref = "/request-a-quote",
  ctaLabel = "Start planning",
  secondaryHref,
  secondaryLabel,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,44,37,0.9),rgba(16,44,37,0.72),rgba(16,44,37,0.25))]" />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-safari-gold">
            <span className="h-px w-10 bg-safari-gold" />
            {eyebrow}
          </p>

          <h1 className="heading-display text-balance text-5xl leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={ctaHref} variant="light">
              {ctaLabel}
              <ArrowUpRight size={17} />
            </Button>

            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-forest"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
