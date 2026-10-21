type SafariFiltersProps = {
  destinations: string[];
  selectedDestination?: string;
  selectedDuration?: string;
  selectedStyle?: string;
};

const durationOptions = [
  { value: "short", label: "1–3 days" },
  { value: "week", label: "4–7 days" },
  { value: "extended", label: "8+ days" },
];

const styleOptions = [
  "Wildlife",
  "Adventure",
  "Family",
  "Luxury",
  "Group",
  "Budget",
];

export default function SafariFilters({
  destinations,
  selectedDestination = "",
  selectedDuration = "",
  selectedStyle = "",
}: SafariFiltersProps) {
  return (
    <form
      action="/safaris"
      method="GET"
      className="rounded-3xl border border-border bg-white p-5 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="destination"
            className="mb-2 block text-sm font-semibold text-maroon-deep"
          >
            Destination
          </label>

          <select
            id="destination"
            name="destination"
            defaultValue={selectedDestination}
            className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm text-ink outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10"
          >
            <option value="">All destinations</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-semibold text-maroon-deep"
          >
            Duration
          </label>

          <select
            id="duration"
            name="duration"
            defaultValue={selectedDuration}
            className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm text-ink outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10"
          >
            <option value="">Any duration</option>
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="style"
            className="mb-2 block text-sm font-semibold text-maroon-deep"
          >
            Safari style
          </label>

          <select
            id="style"
            name="style"
            defaultValue={selectedStyle}
            className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm text-ink outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10"
          >
            <option value="">All styles</option>
            {styleOptions.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-3">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-maroon px-5 py-3 text-sm font-semibold text-white transition hover:bg-maroon-deep"
          >
            Apply filters
          </button>

          <a
            href="/safaris"
            className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-maroon-deep transition hover:bg-ivory"
          >
            Reset
          </a>
        </div>
      </div>
    </form>
  );
}
