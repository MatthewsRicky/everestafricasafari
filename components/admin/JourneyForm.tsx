"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import type { Journey, JourneyImage, JourneyStatus } from "@/types/journey";

const BUCKET = "safari-journey-images";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

type ImageDraft = {
  id?: string;
  storage_path?: string;
  public_url?: string;
  caption: string;
  file?: File;
};

type StopDraft = {
  id?: string;
  location: string;
  latitude: string;
  longitude: string;
  arrival_date: string;
  departure_date: string;
  description: string;
  activities: string;
  images: ImageDraft[];
};

function createEmptyStop(): StopDraft {
  return {
    location: "",
    latitude: "",
    longitude: "",
    arrival_date: "",
    departure_date: "",
    description: "",
    activities: "",
    images: [],
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (
    !extension ||
    !["jpg", "jpeg", "png", "webp", "avif"].includes(extension)
  ) {
    throw new Error("Unsupported image extension.");
  }

  return extension;
}

function validateFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPEG, PNG, WebP and AVIF images are supported.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Images must not exceed 10 MB.");
  }
}

async function uploadImage(
  supabase: ReturnType<typeof createClient>,
  file: File,
  path: string,
) {
  validateFile(file);

  const extension = getExtension(file);

  const storagePath = `${path}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  return storagePath;
}

export default function JourneyForm({
  initialJourney,
}: {
  initialJourney?: Journey | null;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(initialJourney?.title ?? "");
  const [slug, setSlug] = useState(initialJourney?.slug ?? "");
  const [description, setDescription] = useState(
    initialJourney?.description ?? "",
  );

  const [startDate, setStartDate] = useState(initialJourney?.start_date ?? "");

  const [endDate, setEndDate] = useState(initialJourney?.end_date ?? "");

  const [featured, setFeatured] = useState(initialJourney?.featured ?? false);

  const [status, setStatus] = useState<JourneyStatus>(
    initialJourney?.status ?? "draft",
  );

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialJourney?.cover_image_path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${initialJourney.cover_image_path}`
      : null,
  );

  const [stops, setStops] = useState<StopDraft[]>(
    () =>
      initialJourney?.journey_stops?.map((stop) => ({
        id: stop.id,
        location: stop.location,
        latitude: stop.latitude?.toString() ?? "",
        longitude: stop.longitude?.toString() ?? "",
        arrival_date: stop.arrival_date ?? "",
        departure_date: stop.departure_date ?? "",
        description: stop.description ?? "",
        activities: stop.activities?.join(", ") ?? "",
        images: stop.journey_images.map((image) => ({
          id: image.id,
          storage_path: image.storage_path,
          public_url: image.public_url,
          caption: image.caption ?? "",
        })),
      })) ?? [createEmptyStop()],
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateStop(index: number, changes: Partial<StopDraft>) {
    setStops((current) =>
      current.map((stop, i) => (i === index ? { ...stop, ...changes } : stop)),
    );
  }

  function addImages(index: number, files: FileList | null) {
    if (!files) return;

    const selected = Array.from(files);

    for (const file of selected) {
      validateFile(file);
    }

    setStops((current) =>
      current.map((stop, i) =>
        i === index
          ? {
              ...stop,
              images: [
                ...stop.images,
                ...selected.map((file) => ({
                  file,
                  caption: "",
                  public_url: URL.createObjectURL(file),
                })),
              ],
            }
          : stop,
      ),
    );
  }

  function updateImageCaption(
    stopIndex: number,
    imageIndex: number,
    caption: string,
  ) {
    setStops((current) =>
      current.map((stop, i) =>
        i === stopIndex
          ? {
              ...stop,
              images: stop.images.map((image, j) =>
                j === imageIndex ? { ...image, caption } : image,
              ),
            }
          : stop,
      ),
    );
  }

  function removeImage(stopIndex: number, imageIndex: number) {
    setStops((current) =>
      current.map((stop, i) =>
        i === stopIndex
          ? {
              ...stop,
              images: stop.images.filter((_, j) => j !== imageIndex),
            }
          : stop,
      ),
    );
  }

  function moveStop(index: number, direction: -1 | 1) {
    const destination = index + direction;

    if (destination < 0 || destination >= stops.length) return;

    setStops((current) => {
      const updated = [...current];

      [updated[index], updated[destination]] = [
        updated[destination],
        updated[index],
      ];

      return updated;
    });
  }

  function handleCoverChange(file: File | null) {
    if (!file) return;

    validateFile(file);

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  
async function handleDelete() {
  if (!initialJourney) return;

  const confirmed = window.confirm(
    `Permanently delete "${initialJourney.title}" and all its stops and photographs? This cannot be undone.`
  );

  if (!confirmed) return;

  setLoading(true);
  setError("");

  const supabase = createClient();

  try {
    const paths = [
      initialJourney.cover_image_path,
      ...initialJourney.journey_stops.flatMap((stop) =>
        stop.journey_images.map((image) => image.storage_path)
      ),
    ].filter((path): path is string => Boolean(path));

    const { error } = await supabase
      .from("journeys")
      .delete()
      .eq("id", initialJourney.id);

    if (error) throw error;

    if (paths.length) {
      const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .remove(paths);

      if (storageError) {
        console.error("Storage cleanup failed:", storageError);
      }
    }

    router.replace("/admin/journeys");
    router.refresh();
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Unable to delete journey."
    );
  } finally {
    setLoading(false);
  }
}


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    try {
      if (!title.trim() || !slug.trim()) {
        throw new Error("Journey title and slug are required.");
      }

      if (startDate && endDate && endDate < startDate) {
        throw new Error("Journey end date cannot precede its start date.");
      }

      if (!stops.length) {
        throw new Error("Add at least one journey stop.");
      }

      for (const stop of stops) {
        if (!stop.location.trim()) {
          throw new Error("Every journey stop needs a location.");
        }

        if (Boolean(stop.latitude) !== Boolean(stop.longitude)) {
          throw new Error(
            `Provide both coordinates for ${stop.location}, or leave both empty.`,
          );
        }

        const lat = Number(stop.latitude);
        const lng = Number(stop.longitude);

        if (stop.latitude && (!Number.isFinite(lat) || lat < -90 || lat > 90)) {
          throw new Error(`Invalid latitude for ${stop.location}.`);
        }

        if (
          stop.longitude &&
          (!Number.isFinite(lng) || lng < -180 || lng > 180)
        ) {
          throw new Error(`Invalid longitude for ${stop.location}.`);
        }

        if (
          stop.arrival_date &&
          stop.departure_date &&
          stop.departure_date < stop.arrival_date
        ) {
          throw new Error(
            `Departure cannot precede arrival at ${stop.location}.`,
          );
        }

        for (const image of stop.images) {
          if (image.file) validateFile(image.file);
        }
      }

      if (coverFile) validateFile(coverFile);

      let journeyId = initialJourney?.id ?? null;

      // Ensure only one published journey is featured.
      if (featured && status === "published") {
        let unfeatureQuery = supabase
          .from("journeys")
          .update({ featured: false })
          .eq("featured", true)
          .eq("status", "published");

        if (journeyId) {
          unfeatureQuery = unfeatureQuery.neq("id", journeyId);
        }

        const { error: unfeatureError } = await unfeatureQuery;

        if (unfeatureError) throw unfeatureError;
      }

      const payload = {
        title: title.trim(),
        slug: slugify(slug),
        description: description.trim() || null,
        start_date: startDate || null,
        end_date: endDate || null,
        featured,
        status,
      };

      // Create or update the journey.
      if (journeyId) {
        const { error: updateError } = await supabase
          .from("journeys")
          .update(payload)
          .eq("id", journeyId);

        if (updateError) throw updateError;
      } else {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        const { data, error: insertError } = await supabase
          .from("journeys")
          .insert({
            ...payload,
            created_by: user?.id ?? null,
          })
          .select("id")
          .single();

        if (insertError) throw insertError;

        journeyId = data.id;
      }

      // Upload a replacement cover image if selected.
      if (coverFile && journeyId) {
        const newCoverPath = await uploadImage(
          supabase,
          coverFile,
          `journeys/${journeyId}/cover`,
        );

        const { error: coverError } = await supabase
          .from("journeys")
          .update({ cover_image_path: newCoverPath })
          .eq("id", journeyId);

        if (coverError) throw coverError;

        if (initialJourney?.cover_image_path) {
          await supabase.storage
            .from(BUCKET)
            .remove([initialJourney.cover_image_path]);
        }
      }

      if (!journeyId) {
        throw new Error("Could not establish journey ID.");
      }

      // Remove stops deleted from the form.
      const retainedIds = stops
        .map((stop) => stop.id)
        .filter((id): id is string => Boolean(id));

      const removedStops =
        initialJourney?.journey_stops.filter(
          (stop) => !retainedIds.includes(stop.id),
        ) ?? [];

      for (const removedStop of removedStops) {
        const paths = removedStop.journey_images.map(
          (image) => image.storage_path,
        );

        if (paths.length) {
          const { error } = await supabase.storage.from(BUCKET).remove(paths);

          if (error) throw error;
        }

        const { error } = await supabase
          .from("journey_stops")
          .delete()
          .eq("id", removedStop.id)
          .eq("journey_id", journeyId);

        if (error) throw error;
      }

      // Save stops and their images.
      for (const [index, stop] of stops.entries()) {
        const stopPayload = {
          journey_id: journeyId,
          location: stop.location.trim(),
          latitude: stop.latitude ? Number(stop.latitude) : null,
          longitude: stop.longitude ? Number(stop.longitude) : null,
          arrival_date: stop.arrival_date || null,
          departure_date: stop.departure_date || null,
          description: stop.description.trim() || null,
          activities: stop.activities
            .split(/[,\\n]/)
            .map((activity) => activity.trim())
            .filter(Boolean),
          display_order: index,
        };

        let stopId = stop.id ?? null;

        if (stopId) {
          const { error } = await supabase
            .from("journey_stops")
            .update(stopPayload)
            .eq("id", stopId)
            .eq("journey_id", journeyId);

          if (error) throw error;
        } else {
          const { data, error } = await supabase
            .from("journey_stops")
            .insert(stopPayload)
            .select("id")
            .single();

          if (error) throw error;

          stopId = data.id;
        }

        if (!stopId) continue;

        // Delete removed images.
        const originalStop = initialJourney?.journey_stops.find(
          (item) => item.id === stopId,
        );

        const retainedImageIds = stop.images
          .map((image) => image.id)
          .filter((id): id is string => Boolean(id));

        const removedImages =
          originalStop?.journey_images.filter(
            (image: JourneyImage) => !retainedImageIds.includes(image.id),
          ) ?? [];

        for (const image of removedImages) {
          const { error } = await supabase.storage
            .from(BUCKET)
            .remove([image.storage_path]);

          if (error) throw error;

          const { error: deleteError } = await supabase
            .from("journey_images")
            .delete()
            .eq("id", image.id);

          if (deleteError) throw deleteError;
        }

        // Upload and register new images.
        for (const [imageIndex, image] of stop.images.entries()) {
          if (!image.file) {
            if (image.id) {
              const { error } = await supabase
                .from("journey_images")
                .update({
                  caption: image.caption.trim() || null,
                  display_order: imageIndex,
                })
                .eq("id", image.id);

              if (error) throw error;
            }

            continue;
          }

          const storagePath = await uploadImage(
            supabase,
            image.file,
            `journeys/${journeyId}/stops/${stopId}`,
          );

          const { error } = await supabase.from("journey_images").insert({
            stop_id: stopId,
            storage_path: storagePath,
            caption: image.caption.trim() || null,
            display_order: imageIndex,
          });

          if (error) throw error;
        }
      }

      setSuccess("Journey saved successfully.");

      router.push("/admin/journeys");
      router.refresh();
    } catch (err) {
      console.error("Journey save failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving the journey.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* BASIC INFORMATION */}
      <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Journey information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Introduce this safari journey.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Journey title *
            </label>

            <input
              required
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);

                if (!initialJourney) {
                  setSlug(slugify(event.target.value));
                }
              }}
              placeholder="e.g. Our Maasai Mara Adventure"
              className="admin-input"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">URL slug *</label>

            <input
              required
              value={slug}
              onChange={(event) => setSlug(slugify(event.target.value))}
              placeholder="maasai-mara-adventure"
              className="admin-input"
            />

            <p className="mt-1 text-xs text-gray-400">
              /safari-tracker/{slugify(slug)}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tell visitors about this journey..."
              className="admin-input resize-y"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Start date</label>

            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">End date</label>

            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => setEndDate(event.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h2 className="font-semibold text-gray-900">Cover photograph</h2>

          <p className="mt-1 text-sm text-gray-500">
            Main image displayed on the public journey card and detail page.
          </p>
        </div>

        {coverPreview && (
          <div className="relative max-w-lg overflow-hidden rounded-lg">
            <img
              src={coverPreview}
              alt="Journey cover preview"
              className="h-64 w-full object-cover"
            />

            <button
              type="button"
              onClick={() => {
                setCoverFile(null);
                setCoverPreview(
                  initialJourney?.cover_image_path
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${initialJourney.cover_image_path}`
                    : null,
                );
              }}
              className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"
              aria-label="Cancel cover image replacement"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center transition hover:border-gray-400">
          <Upload size={24} className="text-gray-400" />

          <span className="mt-3 text-sm font-medium">
            {coverPreview ? "Replace cover image" : "Upload cover image"}
          </span>

          <span className="mt-1 text-xs text-gray-400">
            JPEG, PNG, WebP or AVIF · Maximum 10 MB
          </span>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(event) => {
              try {
                handleCoverChange(event.target.files?.[0] ?? null);
                event.target.value = "";
              } catch (err) {
                setError(err instanceof Error ? err.message : "Invalid image.");
              }
            }}
          />
        </label>
      </section>

      {/* JOURNEY STOPS */}
      <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Journey itinerary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add destinations in the order visitors should experience them.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setStops((current) => [...current, createEmptyStop()])
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Plus size={16} />
            Add stop
          </button>
        </div>

        {stops.map((stop, index) => (
          <div
            key={stop.id ?? `new-${index}`}
            className="space-y-5 rounded-lg border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Stop {index + 1}</h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveStop(index, -1)}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                  aria-label="Move stop up"
                >
                  <ArrowUp size={17} />
                </button>

                <button
                  type="button"
                  disabled={index === stops.length - 1}
                  onClick={() => moveStop(index, 1)}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                  aria-label="Move stop down"
                >
                  <ArrowDown size={17} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStops((current) => current.filter((_, i) => i !== index))
                  }
                  className="rounded-md p-2 text-red-500 hover:bg-red-50"
                  aria-label="Remove stop"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Location *
                </label>

                <input
                  required
                  value={stop.location}
                  onChange={(event) =>
                    updateStop(index, { location: event.target.value })
                  }
                  placeholder="e.g. Maasai Mara National Reserve"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Latitude
                </label>

                <input
                  type="number"
                  step="any"
                  min="-90"
                  max="90"
                  value={stop.latitude}
                  onChange={(event) =>
                    updateStop(index, { latitude: event.target.value })
                  }
                  placeholder="-1.4061"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Longitude
                </label>

                <input
                  type="number"
                  step="any"
                  min="-180"
                  max="180"
                  value={stop.longitude}
                  onChange={(event) =>
                    updateStop(index, { longitude: event.target.value })
                  }
                  placeholder="35.0084"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Arrival date
                </label>

                <input
                  type="date"
                  value={stop.arrival_date}
                  onChange={(event) =>
                    updateStop(index, {
                      arrival_date: event.target.value,
                    })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Departure date
                </label>

                <input
                  type="date"
                  min={stop.arrival_date || undefined}
                  value={stop.departure_date}
                  onChange={(event) =>
                    updateStop(index, {
                      departure_date: event.target.value,
                    })
                  }
                  className="admin-input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={stop.description}
                  onChange={(event) =>
                    updateStop(index, {
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe this part of the journey..."
                  className="admin-input resize-y"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Activities
                </label>

                <input
                  value={stop.activities}
                  onChange={(event) =>
                    updateStop(index, {
                      activities: event.target.value,
                    })
                  }
                  placeholder="Game drives, Photography, Bird watching"
                  className="admin-input"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate activities with commas.
                </p>
              </div>
            </div>

            {/* STOP IMAGES */}
            <div className="space-y-4 border-t border-gray-100 pt-5">
              <div>
                <h4 className="font-medium text-gray-900">Photographs</h4>

                <p className="mt-1 text-xs text-gray-500">
                  Upload multiple photographs and add individual captions.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stop.images.map((image, imageIndex) => (
                  <div
                    key={image.id ?? image.public_url ?? imageIndex}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    {image.public_url && (
                      <img
                        src={image.public_url}
                        alt={image.caption || stop.location}
                        className="h-40 w-full object-cover"
                      />
                    )}

                    <div className="space-y-2 p-3">
                      <input
                        value={image.caption}
                        onChange={(event) =>
                          updateImageCaption(
                            index,
                            imageIndex,
                            event.target.value,
                          )
                        }
                        placeholder="Image caption..."
                        className="admin-input text-sm"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index, imageIndex)}
                        className="flex items-center gap-2 text-xs text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                        Remove image
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-4 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <ImagePlus size={18} />
                Add photographs
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  onChange={(event) => {
                    try {
                      addImages(index, event.target.files);
                      event.target.value = "";
                    } catch (err) {
                      setError(
                        err instanceof Error ? err.message : "Invalid image.",
                      );
                    }
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </section>

      {/* PUBLICATION SETTINGS */}
      <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h2 className="font-semibold text-gray-900">Publication settings</h2>

          <p className="mt-1 text-sm text-gray-500">
            Control how this journey appears on the public tracker.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as JourneyStatus)}
            className="admin-input"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) => setFeatured(event.target.checked)}
            className="mt-1 size-4 accent-gray-900"
          />

          <span>
            <span className="block text-sm font-medium text-gray-900">
              Featured journey
            </span>

            <span className="mt-1 block text-xs text-gray-500">
              Highlight this journey on the public tracker. Only one published
              journey can be featured.
            </span>
          </span>
        </label>
      </section>

      {/* FEEDBACK AND ACTIONS */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/admin/journeys")}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving journey..."
            : initialJourney
              ? "Save changes"
              : status === "published"
                ? "Publish journey"
                : "Save as draft"}
        </button>

        {initialJourney && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="mr-auto rounded-lg border border-red-200 px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Delete journey
          </button>
        )}
      </div>
    </form>
  );
}
