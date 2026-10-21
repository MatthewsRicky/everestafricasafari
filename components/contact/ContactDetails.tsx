import { Compass, Sparkles, Trees } from "lucide-react";

const details = [
  {
    icon: Compass,
    title: "Start with a destination",
    text: "Tell us where you would love to explore across Africa.",
  },
  {
    icon: Trees,
    title: "Share your travel style",
    text: "Let us know how you want your safari to feel, from relaxed to immersive.",
  },
  {
    icon: Sparkles,
    title: "Build the next step",
    text: "We’ll guide you through the journey and help shape what comes next.",
  },
];

export default function ContactDetails() {
  return (
    <div className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_18px_60px_rgba(16,44,37,0.06)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-safari-gold">
        Get in touch
      </p>
      <h3 className="heading-display mt-3 text-4xl text-forest-deep">
        Let’s start planning.
      </h3>

      <div className="mt-8 space-y-6">
        {details.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex gap-4 rounded-[1.25rem] border border-border bg-sand/30 p-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                {title}
              </p>
              <p className="mt-2 text-base leading-7 text-forest">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
