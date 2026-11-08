import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getJourneyById } from "@/lib/journeys";
import JourneyForm from "@/components/admin/JourneyForm";

type Props = {
  params: Promise<{ id: string }>;
};

async function EditJourneyContent({ params }: Props) {
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

export default function EditJourneyPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Loading journey details...</p>
        </div>
      }
    >
      <EditJourneyContent params={params} />
    </Suspense>
  );
}
