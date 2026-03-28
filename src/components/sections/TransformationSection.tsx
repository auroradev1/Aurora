import { TextLink } from "@/components/ui/TextLink";
import { IconCard } from "@/components/ui/IconCard";
import { IconCarousel } from "@/components/ui/IconCarousel";

const ACCENT = "#1a9fb3";

const bulletItems: [string, string][] = [
  ["Custom Dashboards", "See what matters most and ROI in real time."],
  [
    "AI-Powered Insights",
    "Uncover actionable insights that drive smarter decisions.",
  ],
  [
    "Integrated CRMs",
    "Manage, scale, and work care from a single intelligent platform.",
  ],
];

const iconCardsData = [
  {
    title: "Human-Centered AI",
    description: "Designed to enhance, not replace, human intelligence.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <circle cx="17" cy="10" r="2" />
        <path d="M21 21v-1a3 3 0 00-3-3h-1" />
      </svg>
    ),
  },
  {
    title: "Scalable Innovation",
    description: "AI-powered tools designed to grow with your business.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description: "Clear insights into how AI decisions are made.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Efficiency",
    description: "Streamline operations and maximize productivity.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export function TransformationSection() {
  return (
    <section
      id="solutions"
      className="w-full border-y border-[var(--border)] py-[80px] px-8"
      aria-labelledby="transformation-heading"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h2
            id="transformation-title"
            className="font-display text-[clamp(36px,5vw,56px)] font-bold tracking-tight mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            Our Values
          </h2>
          <p className="text-[#9CA3AF] max-w-[600px] mx-auto leading-[1.6] text-[16px]">
            With real-time data dashboards, growth analytics, and custom CRM
            integration we&#39;s not just software — it&#39;s your company&#39;s
            AI nervous system. Data-Driven Intelligence at Every Step.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-[640px] rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] px-6 py-8 sm:px-9">
          <p className="text-[var(--text-muted)] text-[13px] uppercase tracking-wider mb-5">
            Track a brand product includes:
          </p>
          {bulletItems.map(([bold, rest]) => (
            <div key={bold} className="flex gap-3 mb-3.5 items-start">
              <span className="text-accent text-base leading-snug shrink-0">
                ◆
              </span>
              <p className="text-[14px] text-[var(--text-muted)] leading-[1.7]">
                <strong className="text-foreground">{bold}:</strong> {rest}
              </p>
            </div>
          ))}
          <TextLink
            label="See More"
            href="#contact"
            className="mt-2 inline-flex"
          />
        </div>

        <div className="rounded-2xl p-8">
          {/* Desktop: 4-column grid — hidden below lg */}
          <div className="hidden lg:grid grid-cols-4 gap-6 justify-items-center">
            {iconCardsData.map((card) => (
              <IconCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
          {/* Mobile/Tablet: Carousel — hidden on lg+ */}
          <div className="lg:hidden">
            <IconCarousel items={iconCardsData} />
          </div>
        </div>
      </div>
    </section>
  );
}
