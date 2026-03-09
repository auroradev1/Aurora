"use client";

import { FeatureGridItem } from "@/components/ui/FeatureGridItem";
import { AccordionServiceCard } from "@/components/ui/AccordionServiceCard";
import type { FeatureGridItemProps } from "@/components/ui/FeatureGridItem";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useRef, useState, useEffect } from "react";

export const INTERLINK_FEATURES: FeatureGridItemProps[] = [
  {
    title: "Radiate",
    subtitle: "AI Agents That Amplify Growth",
    href: "#radiate",
  },
  { title: "Create", subtitle: "AI Agents That Produce Work", href: "#create" },
  {
    title: "Communicate",
    subtitle: "AI Call Center and Seamless Chatbots",
    href: "#communicate",
  },
  { title: "Generate", subtitle: "Custom Workflows", href: "#generate" },
  { title: "Conversate", subtitle: "Custom Chatbots", href: "#conversate" },
  { title: "Initiate", subtitle: "AI-Led Human Handoff", href: "#initiate" },
];

export function GridFeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { visibleItems } = useStaggeredReveal(
    containerRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.15,
      stagger: 120,
    },
  );

  const [showAllServices, setShowAllServices] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize, { passive: true });

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleToggleServices = () => {
    setShowAllServices(!showAllServices);
  };

  // For mobile expanded view, we need detailed descriptions
  const serviceDetails = {
    Radiate:
      "Deploy AI agents that amplify your business growth through intelligent automation and data-driven insights.",
    Create:
      "Leverage AI agents that produce high-quality work, from content creation to code generation and design.",
    Communicate:
      "Implement AI-powered call centers and seamless chatbots for 24/7 customer engagement.",
    Generate:
      "Build custom workflows tailored to your specific business processes and requirements.",
    Conversate:
      "Create intelligent chatbots that provide personalized, context-aware conversations.",
    Initiate:
      "Enable AI-led human handoff systems that seamlessly transfer complex issues to human agents.",
  };

  return (
    <section
      id="auroraverse"
      className="w-full px-8 py-[100px] max-w-[1100px] mx-auto"
      aria-labelledby="interlink-title"
    >
      <div className="text-center mb-16">
        <p className="text-accent text-xs uppercase tracking-[0.12em] mb-4">
          The Auroraverse
        </p>
        <h2
          id="interlink-title"
          className="font-display text-[clamp(36px,5vw,56px)] font-bold tracking-tight mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          InterLink
        </h2>
        <p className="text-[var(--text-muted)] text-[15px] max-w-[520px] mx-auto leading-[1.8]">
          Every system we build illuminates hidden potential, creating seamless
          alignment between people, processes, and technology.
        </p>
      </div>

      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {INTERLINK_FEATURES.map((item, index) => {
          // For large screens, show all cards
          if (isLargeScreen) {
            return (
              <div
                key={item.title}
                data-stagger-item
                className={`transition-all duration-300 ${
                  visibleItems.has(index)
                    ? "animate-fade-up opacity-100"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: visibleItems.has(index)
                    ? "translateY(0)"
                    : "translateY(24px)",
                }}
              >
                <FeatureGridItem
                  title={item.title}
                  subtitle={item.subtitle}
                  href={item.href}
                />
              </div>
            );
          }

          // For small screens
          const isInitiallyVisible = index < 2;
          const shouldShow = isInitiallyVisible || showAllServices;

          if (shouldShow) {
            return (
              <div
                key={item.title}
                data-stagger-item
                className={`transition-all duration-300 ${
                  visibleItems.has(index)
                    ? "animate-fade-up opacity-100"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: visibleItems.has(index)
                    ? "translateY(0)"
                    : "translateY(24px)",
                }}
              >
                <AccordionServiceCard
                  title={item.title}
                  subtitle={item.subtitle}
                  details={
                    serviceDetails[item.title as keyof typeof serviceDetails] ||
                    ""
                  }
                  href={item.href}
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  }
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Mobile "See All Services" CTA */}
      <div className="mt-8 flex justify-center lg:hidden">
        <button
          onClick={handleToggleServices}
          className="text-link min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-expanded={showAllServices ? "true" : "false"}
          aria-controls="mobile-services-grid"
        >
          {showAllServices ? "See Less Services ▲" : "See All Services ▼"}
        </button>
      </div>
    </section>
  );
}
