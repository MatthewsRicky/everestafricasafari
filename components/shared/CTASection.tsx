import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/Container";

export default function CTASection({
  title,
  description,
  href = "/request-a-quote",
  label = "Start planning",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="section-padding bg-forest-deep text-white">
      <Container>
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-safari-gold">
              Let’s plan yours
            </p>
            <h2 className="heading-display mt-4 text-4xl leading-tight text-white sm:text-5xl">
              {title}
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-5 lg:items-end">
            <p className="max-w-md text-base leading-7 text-white/75">
              {description}
            </p>

            <Link
              href={href}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ivory px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white"
            >
              {label}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
