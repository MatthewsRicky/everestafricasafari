import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getJourneyById } from "@/lib/journeys";
import JourneyForm from "@/components/admin/JourneyForm";

export default async function EditJourneyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const journey = await getJourneyById(id);

  if (!journey) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <Link
        href="/admin/journeys"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to journeys
      </Link>

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
          Edit journey
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Update journey details, itinerary and photographs.
        </p>
      </div>

      <JourneyForm initialJourney={journey} />
    </div>
  );
}
