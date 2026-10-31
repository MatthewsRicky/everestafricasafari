type PolarstepsEmbedProps = {
  embedUrl?: string;
};

function getValidEmbedUrl(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);

    const isPolarsteps =
      url.protocol === "https:" &&
      (url.hostname === "polarsteps.com" ||
        url.hostname === "www.polarsteps.com");

    return isPolarsteps ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function PolarstepsEmbed({ embedUrl }: PolarstepsEmbedProps) {
  const validEmbedUrl = getValidEmbedUrl(embedUrl);

  return (
    <section id="featured-journey" className="section-padding bg-ivory">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-forest">
            The journey
          </p>

          <h2 className="heading-display text-4xl leading-tight text-forest-deep sm:text-5xl">
            Follow Our Safari Adventures
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600">
            Discover the landscapes, destinations and experiences that make
            every journey through Africa unforgettable.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
          {validEmbedUrl ? (
            <iframe
              src={validEmbedUrl}
              title="Everest Africa Safari journey map"
              className="h-[450px] w-full md:h-[600px]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="flex min-h-[450px] flex-col items-center justify-center bg-[#eae9df] px-6 py-16 text-center">
              <h3 className="heading-display text-3xl text-forest-deep">
                Our next adventure awaits
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600">
                Our safari journey map will appear here once a valid Polarsteps
                embed link has been connected.
              </p>
            </div>
          )}
        </div>

        {validEmbedUrl && (
          <div className="mt-5 text-center">
            <a
              href={validEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-forest underline underline-offset-4 transition hover:text-safari-gold"
            >
              View the journey on Polarsteps
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
