"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { safaris } from "@/data/safaris";
import { excursions } from "@/data/excursions";
import { destinations } from "@/data/destinations";

type EnquiryType = "safari" | "excursion" | "destination" | "custom";

type FormStatus =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialStatus: FormStatus = {
  type: "idle",
  message: "",
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-maroon focus:ring-2 focus:ring-maroon/10";

const labelClass = "block text-sm font-semibold text-maroon-deep";

function getLabel(item: { title?: string; name?: string; slug: string }) {
  return item.title ?? item.name ?? item.slug;
}

export default function QuoteForm() {
  const searchParams = useSearchParams();

  const initialSafariSlug = searchParams.get("safari") ?? "";
  const initialExcursionSlug = searchParams.get("excursion") ?? "";
  const initialDestinationSlug = searchParams.get("destination") ?? "";

  const [enquiryType, setEnquiryType] = useState<EnquiryType>(
    initialSafariSlug
      ? "safari"
      : initialExcursionSlug
        ? "excursion"
        : initialDestinationSlug
          ? "destination"
          : "safari",
  );

  const [safariSlug, setSafariSlug] = useState(initialSafariSlug);
  const [excursionSlug, setExcursionSlug] = useState(initialExcursionSlug);
  const [destinationSlug, setDestinationSlug] = useState(
    initialDestinationSlug,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  useEffect(() => {
    if (initialSafariSlug) {
      setEnquiryType("safari");
      setSafariSlug(initialSafariSlug);
    } else if (initialExcursionSlug) {
      setEnquiryType("excursion");
      setExcursionSlug(initialExcursionSlug);
    } else if (initialDestinationSlug) {
      setEnquiryType("destination");
      setDestinationSlug(initialDestinationSlug);
    }
  }, [initialSafariSlug, initialExcursionSlug, initialDestinationSlug]);

  function handleTypeChange(value: EnquiryType) {
    setEnquiryType(value);
    setStatus(initialStatus);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      enquiryType,
      safariSlug: enquiryType === "safari" ? safariSlug : "",
      excursionSlug: enquiryType === "excursion" ? excursionSlug : "",
      destinationSlug: enquiryType === "destination" ? destinationSlug : "",
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim(),
      departureLocation: String(formData.get("departureLocation") ?? "").trim(),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      flexibleDates: formData.get("flexibleDates") === "on",
      adults: String(formData.get("adults") ?? ""),
      children: String(formData.get("children") ?? ""),
      accommodation: String(formData.get("accommodation") ?? ""),
      transport: String(formData.get("transport") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      customTrip: String(formData.get("customTrip") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
      consent: formData.get("consent") === "on",
    };

    setIsSubmitting(true);
    setStatus(initialStatus);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "We could not send your enquiry. Please try again.",
        );
      }

      form.reset();
      setSafariSlug("");
      setExcursionSlug("");
      setDestinationSlug("");

      setStatus({
        type: "success",
        message:
          "Thank you. Your enquiry has been submitted successfully. Our team can follow up to discuss your plans.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
          Start planning
        </p>

        <h2 className="heading-display mt-2 text-3xl text-maroon-deep">
          Tell us about your journey
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          Choose a listed package or excursion, enquire about a destination, or
          tell us what you have in mind. Your details help our team prepare a
          more relevant response.
        </p>
      </div>

      {/* Honeypot field for basic spam protection */}
      <div
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset>
        <legend className={labelClass}>What are you enquiring about?</legend>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ["safari", "Safari package"],
              ["excursion", "Day excursion"],
              ["destination", "Destination"],
              ["custom", "Custom trip"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition ${
                enquiryType === value
                  ? "border-maroon bg-ivory text-maroon-deep"
                  : "border-border text-ink hover:border-maroon/50"
              }`}
            >
              <input
                type="radio"
                name="enquiryType"
                value={value}
                checked={enquiryType === value}
                onChange={() => handleTypeChange(value)}
                className="accent-maroon"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {enquiryType === "safari" && (
        <div className="mt-6">
          <label htmlFor="safariSlug" className={labelClass}>
            Select a safari package *
          </label>

          <select
            id="safariSlug"
            name="safariSlug"
            required
            value={safariSlug}
            onChange={(event) => setSafariSlug(event.target.value)}
            className={fieldClass}
          >
            <option value="">Choose a safari package</option>
            {safaris.map((safari) => (
              <option key={safari.slug} value={safari.slug}>
                {safari.title} — {safari.durationDays} days
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs leading-5 text-muted">
            The list is populated from the safari data file.
          </p>
        </div>
      )}

      {enquiryType === "excursion" && (
        <div className="mt-6">
          <label htmlFor="excursionSlug" className={labelClass}>
            Select an excursion *
          </label>

          <select
            id="excursionSlug"
            name="excursionSlug"
            required
            value={excursionSlug}
            onChange={(event) => setExcursionSlug(event.target.value)}
            className={fieldClass}
          >
            <option value="">Choose an excursion</option>
            {excursions.map((excursion) => (
              <option key={excursion.slug} value={excursion.slug}>
                {getLabel(excursion)}
              </option>
            ))}
          </select>
        </div>
      )}

      {enquiryType === "destination" && (
        <div className="mt-6">
          <label htmlFor="destinationSlug" className={labelClass}>
            Which destination interests you? *
          </label>

          <select
            id="destinationSlug"
            name="destinationSlug"
            required
            value={destinationSlug}
            onChange={(event) => setDestinationSlug(event.target.value)}
            className={fieldClass}
          >
            <option value="">Choose a destination</option>
            {destinations.map((destination) => (
              <option key={destination.slug} value={destination.slug}>
                {destination.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {enquiryType === "custom" && (
        <div className="mt-6">
          <label htmlFor="customTrip" className={labelClass}>
            Describe the trip you have in mind *
          </label>
          <textarea
            id="customTrip"
            name="customTrip"
            required
            rows={3}
            maxLength={2000}
            placeholder="For example, a beach stay combined with a wildlife safari..."
            className={fieldClass}
          />
        </div>
      )}

      <div className="my-8 border-t border-border" />

      <h3 className="heading-display text-2xl text-maroon-deep">
        Your contact details
      </h3>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            maxLength={100}
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={150}
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
            className={fieldClass}
            placeholder="+254..."
          />
        </div>

        <div>
          <label htmlFor="country" className={labelClass}>
            Country of residence
          </label>
          <input
            id="country"
            name="country"
            maxLength={100}
            autoComplete="country-name"
            className={fieldClass}
            placeholder="Your country"
          />
        </div>
      </div>

      <div className="my-8 border-t border-border" />

      <h3 className="heading-display text-2xl text-maroon-deep">
        Travel preferences
      </h3>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className={labelClass}>
            Preferred arrival / start date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="endDate" className={labelClass}>
            Preferred end / return date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              name="flexibleDates"
              type="checkbox"
              className="mt-1 accent-maroon"
            />
            <span>
              My dates are flexible. Please suggest suitable dates or
              alternatives.
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="adults" className={labelClass}>
            Adults *
          </label>
          <select
            id="adults"
            name="adults"
            required
            defaultValue="2"
            className={fieldClass}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "adult" : "adults"}
                </option>
              ),
            )}
            <option value="12+">12+ adults</option>
          </select>
        </div>

        <div>
          <label htmlFor="children" className={labelClass}>
            Children
          </label>
          <select
            id="children"
            name="children"
            defaultValue="0"
            className={fieldClass}
          >
            {Array.from({ length: 11 }, (_, index) => index).map((count) => (
              <option key={count} value={count}>
                {count === 0
                  ? "No children"
                  : `${count} ${count === 1 ? "child" : "children"}`}
              </option>
            ))}
            <option value="11+">11+ children</option>
          </select>
        </div>

        <div>
          <label htmlFor="departureLocation" className={labelClass}>
            Where will you be departing from?
          </label>
          <select
            id="departureLocation"
            name="departureLocation"
            defaultValue=""
            className={fieldClass}
          >
            <option value="">Not decided yet</option>
            <option value="Diani / Ukunda">Diani / Ukunda</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Other location">Other location</option>
          </select>
        </div>

        <div>
          <label htmlFor="transport" className={labelClass}>
            Preferred transport
          </label>
          <select
            id="transport"
            name="transport"
            defaultValue=""
            className={fieldClass}
          >
            <option value="">Open to recommendations</option>
            <option value="Road transfer">Road transfer</option>
            <option value="Fly-in safari">Fly-in safari</option>
            <option value="Either road or air">Either road or air</option>
          </select>
        </div>

        <div>
          <label htmlFor="accommodation" className={labelClass}>
            Accommodation preference
          </label>
          <select
            id="accommodation"
            name="accommodation"
            defaultValue=""
            className={fieldClass}
          >
            <option value="">Open to recommendations</option>
            <option value="Budget">Budget</option>
            <option value="Mid-range">Mid-range</option>
            <option value="Luxury">Luxury</option>
            <option value="Not required">Accommodation not required</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Approximate budget per person
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={fieldClass}
          >
            <option value="">Prefer to discuss</option>
            <option value="Under USD 300">Under USD 300</option>
            <option value="USD 300–600">USD 300–600</option>
            <option value="USD 600–1000">USD 600–1,000</option>
            <option value="USD 1000–2000">USD 1,000–2,000</option>
            <option value="Over USD 2000">Over USD 2,000</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          Additional details or special requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={3000}
          className={fieldClass}
          placeholder="Tell us about your interests, preferred activities, accessibility needs, accommodation requirements or any questions."
        />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-6 text-muted">
          <input
            name="consent"
            type="checkbox"
            required
            className="mt-1 accent-maroon"
          />
          <span>
            I agree that Everest Africa Safari may use these details to respond
            to my enquiry. *
          </span>
        </label>
      </div>

      {status.type !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-6 rounded-xl p-4 text-sm leading-6 ${
            status.type === "success"
              ? "bg-forest/10 text-forest-deep"
              : "bg-red-50 text-red-800"
          }`}
        >
          {status.type === "success" && (
            <CheckCircle2 className="mr-2 inline-block" size={18} />
          )}
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-6 py-4 text-sm font-semibold text-white transition hover:bg-maroon-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending enquiry..." : "Send enquiry"}
        {!isSubmitting && <ArrowRight size={17} />}
      </button>

      <p className="mt-4 text-xs leading-5 text-muted">
        This is an enquiry, not a confirmed reservation. Availability,
        accommodation, itinerary details and final pricing will be confirmed by
        the team.
      </p>
    </form>
  );
}
