import Link from "next/link";
import { CalendarDays, ExternalLink, Plus } from "lucide-react";

import type { Journey } from "@/types/journey";

import JourneyStatusBadge from "./JourneyStatusBadge";

function formatDate(date: string | null) {
  if (!date) return "Not specified";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function JourneyTable({ journeys }: { journeys: Journey[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">All journeys</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your published and draft journeys.
          </p>
        </div>

        <Link
          href="/admin/journeys/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          <Plus size={17} />
          Create journey
        </Link>
      </div>

      {journeys.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <CalendarDays size={32} className="mx-auto text-gray-300" />

          <h3 className="mt-4 font-semibold text-gray-900">No journeys yet</h3>

          <p className="mt-2 text-sm text-gray-500">
            Create your first journey to get started.
          </p>

          <Link
            href="/admin/journeys/new"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-900 underline underline-offset-4"
          >
            Create your first journey
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4">Journey</th>
                <th className="px-5 py-4">Dates</th>
                <th className="px-5 py-4">Stops</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {journeys.map((journey) => (
                <tr key={journey.id} className="hover:bg-gray-50">
                  <td className="min-w-56 px-5 py-4">
                    <p className="font-medium text-gray-900">{journey.title}</p>

                    <p className="mt-1 text-xs text-gray-400">
                      /{journey.slug}
                    </p>

                    {journey.featured && (
                      <span className="mt-2 inline-block text-xs font-medium text-amber-700">
                        Featured
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                    {formatDate(journey.start_date)}
                    <span className="mx-1">–</span>
                    {formatDate(journey.end_date)}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {journey.journey_stops?.length ?? 0}
                  </td>

                  <td className="px-5 py-4">
                    <JourneyStatusBadge status={journey.status} />
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                    {formatDate(journey.updated_at.slice(0, 10))}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/journeys/${journey.id}`}
                        className="font-medium text-gray-900 underline underline-offset-4"
                      >
                        Edit
                      </Link>

                      {journey.status === "published" && (
                        <Link
                          href={`/safari-tracker/${journey.slug}`}
                          target="_blank"
                          aria-label={`Preview ${journey.title}`}
                          className="text-gray-400 hover:text-gray-900"
                        >
                          <ExternalLink size={16} />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
