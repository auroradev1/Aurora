"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureGridItem } from "@/components/ui/FeatureGridItem";
import type { FeatureGridItemProps } from "@/components/ui/FeatureGridItem";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useRef } from "react";

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
        {INTERLINK_FEATURES.map((item, index) => (
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
        ))}
      </div>
    </section>
  );
}
