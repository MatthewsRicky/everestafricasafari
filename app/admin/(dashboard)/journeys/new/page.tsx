import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import JourneyForm from "@/components/admin/JourneyForm";

export default function NewJourneyPage() {
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
          Create journey
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Add a new safari journey to the Everest Africa Safari tracker.
        </p>
      </div>

      <JourneyForm />
    </div>
  );
}
