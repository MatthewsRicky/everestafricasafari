type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-bold uppercase tracking-[0.22em] ${
            light ? "text-safari-gold" : "text-forest"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`heading-display text-balance text-4xl leading-[1.1] sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-forest-deep"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-7 sm:text-lg ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/75" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
