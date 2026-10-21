import { ArrowRight, MapPin, Clock3, Compass } from "lucide-react";
import Container from "@/components/shared/Container";

const fieldClass =
  "mt-2 w-full appearance-none rounded-lg border border-border bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-maroon";

export default function SafariFinder() {
  return (
    <section id="discover" className="relative z-10 -mt-8">
      <Container>
        <form
          action="/safaris"
          method="GET"
          className="grid gap-5 rounded-2xl border border-border/70 bg-white p-5 shadow-xl shadow-black/5 sm:p-7 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-6"
        >
          <div>
            <label
              htmlFor="destination"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted"
            >
              <MapPin size={15} className="text-maroon" />
              Destination
            </label>

            <select
              id="destination"
              name="destination"
              defaultValue=""
              className={fieldClass}
            >
              <option value="">Anywhere in Kenya</option>
              <option value="maasai-mara">Maasai Mara</option>
              <option value="amboseli">Amboseli</option>
              <option value="tsavo">Tsavo</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="duration"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted"
            >
              <Clock3 size={15} className="text-maroon" />
              Trip length
            </label>

            <select
              id="duration"
              name="duration"
              defaultValue=""
              className={fieldClass}
            >
              <option value="">Any duration</option>
              <option value="short">Short getaway</option>
              <option value="week">Around a week</option>
              <option value="extended">Extended adventure</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="style"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted"
            >
              <Compass size={15} className="text-maroon" />
              Travel style
            </label>

            <select
              id="style"
              name="style"
              defaultValue=""
              className={fieldClass}
            >
              <option value="">Show me everything</option>
              <option value="wildlife">Wildlife</option>
              <option value="adventure">Adventure</option>
              <option value="family">Family</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition hover:bg-maroon-deep focus-visible:outline-offset-4"
          >
            Find my safari
            <ArrowRight size={17} />
          </button>
        </form>
      </Container>
    </section>
  );
}
