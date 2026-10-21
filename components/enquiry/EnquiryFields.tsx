type EnquiryFieldsProps = {
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
};

const fieldClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-forest placeholder:text-muted focus:border-safari-gold focus:outline-none";

export default function EnquiryFields({
  values,
  onChange,
}: EnquiryFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-medium text-forest sm:col-span-1">
        <span className="mb-2 block">Full name</span>
        <input
          className={fieldClass}
          value={values.fullName ?? ""}
          onChange={(event) => onChange("fullName", event.target.value)}
          placeholder="Your name"
        />
      </label>

      <label className="block text-sm font-medium text-forest sm:col-span-1">
        <span className="mb-2 block">Email address</span>
        <input
          type="email"
          className={fieldClass}
          value={values.email ?? ""}
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <label className="block text-sm font-medium text-forest sm:col-span-1">
        <span className="mb-2 block">Phone number</span>
        <input
          className={fieldClass}
          value={values.phone ?? ""}
          onChange={(event) => onChange("phone", event.target.value)}
          placeholder="Your phone number"
        />
      </label>

      <label className="block text-sm font-medium text-forest sm:col-span-1">
        <span className="mb-2 block">Preferred destination</span>
        <input
          className={fieldClass}
          value={values.destination ?? ""}
          onChange={(event) => onChange("destination", event.target.value)}
          placeholder="Kenya, Botswana, Tanzania..."
        />
      </label>

      <label className="block text-sm font-medium text-forest sm:col-span-1">
        <span className="mb-2 block">Travel month</span>
        <input
          className={fieldClass}
          value={values.travelMonth ?? ""}
          onChange={(event) => onChange("travelMonth", event.target.value)}
          placeholder="June 2027"
        />
      </label>

      <label className="block text-sm font-medium text-forest sm:col-span-1">
        <span className="mb-2 block">Travellers</span>
        <input
          className={fieldClass}
          value={values.travellers ?? ""}
          onChange={(event) => onChange("travellers", event.target.value)}
          placeholder="2 adults + 1 child"
        />
      </label>

      <label className="block text-sm font-medium text-forest sm:col-span-2">
        <span className="mb-2 block">Tell us about your ideal journey</span>
        <textarea
          rows={5}
          className={fieldClass}
          value={values.notes ?? ""}
          onChange={(event) => onChange("notes", event.target.value)}
          placeholder="Share the experiences, pace, budget and places you dream of exploring."
        />
      </label>
    </div>
  );
}
