import { createClient } from "@/lib/supabase/server";

import type { Journey, JourneyStop, JourneyImage } from "@/types/journey";

const BUCKET = "safari-journey-images";

function attachPublicUrls(journey: Journey): Journey {
  const supabaseStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return {
    ...journey,

    cover_image_path: journey.cover_image_path,

    journey_stops: (journey.journey_stops ?? []).map((stop: JourneyStop) => ({
      ...stop,

      journey_images: (stop.journey_images ?? []).map(
        (image: JourneyImage) => ({
          ...image,
          public_url: image.storage_path
            ? `${supabaseStorageUrl}/storage/v1/object/public/${BUCKET}/${image.storage_path}`
            : undefined,
        }),
      ),
    })),
  };
}

export async function getAdminJourneys() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select(`
      *,
      journey_stops ( id )`)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getJourneyById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select(
      `
      *,
      journey_stops (
        *,
        journey_images (*)
      )
    `,
    )
    .eq("id", id)
    .order("display_order", {
      referencedTable: "journey_stops",
      ascending: true,
    })
    .order("display_order", {
      referencedTable: "journey_stops.journey_images",
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? attachPublicUrls(data as unknown as Journey) : null;
}

export async function getJourneyBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select(
      `
      *,
      journey_stops (
        *,
        journey_images (*)
      )
    `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .order("display_order", {
      referencedTable: "journey_stops",
      ascending: true,
    })
    .order("display_order", {
      referencedTable: "journey_stops.journey_images",
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? attachPublicUrls(data as unknown as Journey) : null;
}

export async function getPublishedJourneys() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select(
      `
      *,
      journey_stops (
        id,
        location,
        display_order
      )
    `,
    )
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Failed to fetch published journeys:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error("Unable to retrieve published safari journeys.");
  }

  return data ?? [];
}

export function getPublicImageUrl(path: string | null) {
  if (!path) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!baseUrl) return null;

  return `${baseUrl}/storage/v1/object/public/${BUCKET}/${path}`;
}
