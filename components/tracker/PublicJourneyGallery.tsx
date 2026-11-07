import type { JourneyStop } from "@/types/journey";

export default function PublicJourneyGallery({
  stops,
}: {
  stops: JourneyStop[];
}) {
  const images = stops.flatMap((stop) =>
    stop.journey_images.map((image) => ({
      ...image,
      location: stop.location,
    })),
  );

  if (!images.length) return null;

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          The memories
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-gray-900">
          Moments from the journey
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image) => (
          <figure
            key={image.id}
            className="group overflow-hidden rounded-lg bg-gray-100"
          >
            <img
              src={
                image.public_url ??
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/safari-journey-images/${image.storage_path}`
              }
              alt={image.caption || image.location}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <figcaption className="bg-white px-3 py-3">
              {image.caption && (
                <p className="text-sm text-gray-700">{image.caption}</p>
              )}

              <p className="mt-1 text-xs text-gray-400">{image.location}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
