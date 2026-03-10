import { TextLink } from "@/components/ui/TextLink";

export type FeatureCardProps = {
  title: string;
  body: string;
  linkLabel: string;
  linkHref: string;
  variant?: "default" | "split";
};

export function FeatureCard({
  title,
  body,
  linkLabel,
  linkHref,
  variant = "default",
}: FeatureCardProps) {
  const isSplit = variant === "split";
  return (
    <article
      className={
        isSplit
          ? "flex flex-col gap-3 bg-[var(--surface)] px-9 py-10"
          : "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-transform hover:-translate-y-0.5 sm:p-8"
      }
    >
      <h3
        className="font-display text-[22px] font-semibold tracking-tight text-foreground"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-[1.7] text-[var(--text-muted)] flex-1">
        {body}
      </p>
      <p className="mt-4">
        <TextLink label={linkLabel} href={linkHref} />
      </p>
    </article>
  );
}

export function TwoColumnFeatureSection() {
  return (
    <section
      className="px-6 py-16 sm:py-24"
      aria-labelledby="two-col-section-title"
    >
      <h2 id="two-col-section-title" className="sr-only">
        Features
      </h2>
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-2">
        <FeatureCard
          title="Acceleration Systems"
          body="Systems designed to accelerate your workflows and outcomes with precision and scale."
          linkLabel="Explore Products"
          linkHref="/products/acceleration"
        />
        <FeatureCard
          title="Ascension Architectures"
          body="Architectures that elevate your infrastructure and enable continuous ascension."
          linkLabel="Book a Demo"
          linkHref="/demo"
        />
      </div>
    </section>
  );
}
