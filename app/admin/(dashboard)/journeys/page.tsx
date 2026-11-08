import { Suspense } from "react";
import { CalendarDays, CheckCircle2, FileEdit } from "lucide-react";

import { getAdminJourneys } from "@/lib/journeys";
import type { Journey } from "@/types/journey";

import JourneyTable from "@/components/admin/JourneyTable";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof CalendarDays;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <Icon size={19} className="text-gray-400" />
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  );
}

async function JourneysContent() {
  const journeys = (await getAdminJourneys()) as Journey[];

  const published = journeys.filter(
    (journey) => journey.status === "published",
  ).length;

  const drafts = journeys.filter(
    (journey) => journey.status === "draft",
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-500">Journey management</p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage Everest Africa Safari&apos;s published journeys and travel
          stories.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total journeys"
          value={journeys.length}
          icon={CalendarDays}
        />

        <StatCard label="Published" value={published} icon={CheckCircle2} />

        <StatCard label="Drafts" value={drafts} icon={FileEdit} />
      </div>

      <JourneyTable journeys={journeys} />
    </div>
  );
}

export default function JourneysPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Loading journeys...</p>
        </div>
      }
    >
      <JourneysContent />
    </Suspense>
  );
}
