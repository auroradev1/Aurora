import { TextLink } from "@/components/ui/TextLink";
import { FeatureCard } from "./TwoColumnFeatureSection";
import { HeroCanvas } from "./HeroCanvas";

const HERO_CARDS = [
  {
    title: "Acceleration Systems",
    body: "Boost revenue in weeks with modular AI tools and eliminate inefficiencies with our rapidly deployable AI systems",
    linkLabel: "Explore Products",
    linkHref: "#solutions",
  },
  {
    title: "Ascension Architectures",
    body: "Create bespoke ecosystems. Made for enterprise. Powered by AI.",
    linkLabel: "Book a Demo",
    linkHref: "#contact",
  },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-center px-6 pb-20 pt-[120px] w-full max-w-[1100px] mx-auto sm:px-8"
      aria-labelledby="hero-headline"
    >
      <HeroCanvas />

      {/* Enhanced background glow */}
      <div
        className="pointer-events-none absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full opacity-100"
        style={{
          background: `radial-gradient(circle, rgba(37, 99, 235, 0.07) 0%, transparent 70%)`,
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      <div
        className="animate-fade-up opacity-0"
        style={{ animationDelay: "0.1s" }}
      >
        <h1
          id="hero-headline"
          className="font-display text-[clamp(48px,8vw,88px)] font-bold leading-[1] tracking-tight text-foreground [-0.03em] mb-6"
          style={{ letterSpacing: "-0.03em" }}
        >
          Architecting Business
          <br />
          <span className="text-accent">Growth</span>
          <br />
          through Intelligence.
        </h1>
      </div>

      <div
        className="animate-fade-up opacity-0"
        style={{ animationDelay: "0.25s" }}
      >
        <TextLink
          label="Step Into The Light"
          href="#solutions"
          className="text-sm mb-[72px] inline-flex"
        />
      </div>

      <div
        className="animate-fade-up grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] opacity-0 md:grid-cols-2"
        style={{ animationDelay: "0.4s" }}
      >
        {HERO_CARDS.map((card) => (
          <FeatureCard
            key={card.title}
            title={card.title}
            body={card.body}
            linkLabel={card.linkLabel}
            linkHref={card.linkHref}
            variant="split"
          />
        ))}
      </div>
    </section>
  );
}
