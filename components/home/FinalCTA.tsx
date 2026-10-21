import { ArrowUpRight, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import Reveal from "@/components/animations/Reveal";

export default function FinalCTA() {
  return (
    <section className="section-padding">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-2xl bg-maroon px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 -z-10 size-80 rounded-full border border-white/10 sm:size-[440px]"
            />

            <div
              aria-hidden="true"
              className="absolute -right-8 -top-12 -z-10 size-56 rounded-full border border-white/10 sm:size-80"
            />

            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0ce94]">
                Your next chapter awaits
              </p>

              <h2 className="heading-display mt-5 text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Let's start planning your African adventure.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                Tell us what you'd love to experience and start exploring the
                possibilities for your trip.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/request-a-quote" variant="light">
                  Request a safari quote
                  <ArrowUpRight size={17} />
                </Button>

                <Button href="/contact" variant="secondary">
                  <MessageCircle size={17} />
                  Talk to our team
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
