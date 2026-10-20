import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { navigation } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 md:py-20">
          <div className="max-w-lg">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-safari-gold">
              Discover Africa with confidence
            </p>

            <h2 className="heading-display text-4xl leading-tight sm:text-5xl">
              Your next great adventure starts here.
            </h2>

            <Link
              href="/request-a-quote"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-safari-gold px-6 py-3.5 text-sm font-bold text-forest-deep transition hover:bg-white"
            >
              Start planning
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:justify-self-end sm:gap-16">
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/50">
                Explore
              </h3>

              <ul className="space-y-4 text-sm text-white/80">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition hover:text-safari-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/50">
                Get in touch
              </h3>

              <ul className="space-y-4 text-sm text-white/80">
                <li>
                  <Link
                    href="/contact"
                    className="transition hover:text-safari-gold"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/request-a-quote"
                    className="transition hover:text-safari-gold"
                  >
                    Request a quote
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Everest Africa Safari. All rights reserved.</p>
          <p>Made for travellers who want to discover more.</p>
        </div>
      </Container>
    </footer>
  );
}
