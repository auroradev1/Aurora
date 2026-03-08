import { useState } from "react";

export type AccordionServiceCardProps = {
  title: string;
  subtitle: string;
  details: string;
  icon?: React.ReactNode;
  href?: string | undefined;
};

export function AccordionServiceCard({
  title,
  subtitle,
  details,
  icon,
  href,
}: AccordionServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left group focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-4 flex-1">
          {icon && (
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h4
              className="font-display text-[17px] font-semibold tracking-tight text-foreground"
              style={{ letterSpacing: "-0.01em" }}
            >
              {title}
            </h4>
            <p className="text-[13px] leading-[1.6] text-[var(--text-muted)] mt-1">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-4 transform transition-transform duration-200 group-hover:scale-110">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform duration-200 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          >
            <path
              d="M5 8l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <div
        id={`accordion-content-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded
            ? "max-h-[500px] opacity-100 pb-4 sm:pb-6"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pt-0">
          <p className="text-[14px] leading-[1.7] text-[var(--text-muted)]">
            {details}
          </p>
          {href && (
            <div className="mt-4">
              <a
                href={href}
                className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
              >
                Explore →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
