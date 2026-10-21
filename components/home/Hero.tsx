import { ArrowUpRight, Trees } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

const heroImage =
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=80";



export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-maroon-deep/40 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(49,20,29,0.64),rgba(49,20,29,0.48),rgba(49,20,29,0.15))]"
      />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-safari-gold sm:text-sm">
              <span className="h-px w-10 bg-safari-gold" />
              Discover the extraordinary
            </p>

            <h1 className="heading-display text-balance text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl xl:text-[6rem]">
              Unforgettable Kenyan Safaris: Explore the wild in style
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Great for mid to high-end travel visitors; emphasizes
              memory-making and comfort.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/request-a-quote"
                variant="light"
                className="shadow-[0_18px_42px_rgba(0,0,0,0.2)]"
              >
                Plan your safari
                <ArrowUpRight size={17} />
              </Button>

              <Button href="/safaris" variant="secondary">
                Explore safaris
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] border border-white/10"
            />

            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-sm">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-sand/20">
                <img
                  src="\parks\maasai-mara-national-reserve-kenya.jpg"
                  alt="Safari vehicle exploring the African savannah"
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[440px]"
                />
              </div>

              <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-safari-gold/15 text-safari-gold">
                    <Trees size={19} />
                  </span>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Your next adventure
                    </p>

                    <p className="mt-1 text-base font-semibold leading-snug text-white sm:text-lg">
                      Shaped around the way you want to travel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
