export type JourneyStatus = "draft" | "published";

export type JourneyImage = {
  id: string;
  stop_id: string;
  storage_path: string;
  caption: string | null;
  display_order: number;
  created_at: string;
  public_url?: string;
};

export type JourneyStop = {
  id: string;
  journey_id: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  arrival_date: string | null;
  departure_date: string | null;
  description: string | null;
  activities: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
  journey_images: JourneyImage[];
};

export type Journey = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image_path: string | null;
  start_date: string | null;
  end_date: string | null;
  featured: boolean;
  status: JourneyStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  journey_stops: JourneyStop[];
};

export type JourneyFormValues = {
  title: string;
  slug: string;
  description: string;
  start_date: string;
  end_date: string;
  featured: boolean;
  status: JourneyStatus;
};
