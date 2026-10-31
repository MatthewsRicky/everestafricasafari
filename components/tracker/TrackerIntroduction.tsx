import Container from "@/components/shared/Container";

const highlights = [
  {
    number: "01",
    title: "Discover New Places",
    description:
      "Explore the landscapes, national parks and destinations along our safari routes.",
  },
  {
    number: "02",
    title: "Experience the Journey",
    description:
      "Get a closer look at the wildlife encounters and experiences that make every safari special.",
  },
  {
    number: "03",
    title: "Find Your Inspiration",
    description:
      "Use our journeys as inspiration for planning your own African adventure.",
  },
];

export default function TrackerIntroduction() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Introduction */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-forest">
              Beyond the destination
            </p>

            <h2 className="heading-display max-w-xl text-4xl leading-tight text-forest-deep sm:text-5xl">
              Every Safari Has a Story Worth Following
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-600">
              A safari is more than the places you visit. It is the landscapes
              along the way, the wildlife encounters and the moments that make
              each journey memorable.
            </p>
          </div>

          {/* Highlights */}
          <div className="divide-y divide-black/10">
            {highlights.map((item) => (
              <div
                key={item.number}
                className="grid gap-4 py-7 first:pt-0 sm:grid-cols-[64px_1fr]"
              >
                <span className="text-sm font-semibold tracking-wider text-safari-gold">
                  {item.number}
                </span>

                <div>
                  <h3 className="heading-display text-2xl text-forest-deep">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
