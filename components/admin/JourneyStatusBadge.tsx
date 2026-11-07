import type { JourneyStatus } from "@/types/journey";

export default function JourneyStatusBadge({
  status,
}: {
  status: JourneyStatus;
}) {
  const published = status === "published";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        published ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
