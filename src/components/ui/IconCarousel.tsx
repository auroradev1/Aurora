"use client";

import { useRef, useState, useEffect, useCallback } from "react";

type IconCarouselItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type IconCarouselProps = {
  items: IconCarouselItem[];
};

export function IconCarousel({ items }: IconCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 640 ? 2 : 1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView, { passive: true });
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalDots = Math.ceil(items.length / itemsPerView);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.scrollWidth / items.length;
    const newIndex = Math.round(scrollLeft / itemWidth / itemsPerView);
    setActiveIndex(Math.min(newIndex, totalDots - 1));
  }, [items.length, itemsPerView, totalDots]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = container.scrollWidth / items.length;
    container.scrollTo({
      left: index * itemsPerView * itemWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(totalDots - 1, activeIndex + 1));
  };

  return (
    <div className="relative" role="region" aria-label="Icon carousel">
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="flex-shrink-0 snap-center"
            style={{
              width: itemsPerView === 1 ? "100%" : "calc(50% - 12px)",
              scrollSnapAlign: "center",
            }}
          >
            <div className="icon-card">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[14px] border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.08)]">
                {item.icon}
              </div>
              <h4
                className="font-display text-[15px] font-semibold tracking-tight text-foreground mb-2"
                style={{ letterSpacing: "-0.01em" }}
              >
                {item.title}
              </h4>
              <p className="text-[13px] leading-[1.7] text-[var(--text-muted)]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div
          className="flex gap-2"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {Array.from({ length: totalDots }).map((_, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  isSelected
                    ? "w-6 bg-accent"
                    : "w-2 bg-[var(--border)] hover:bg-[var(--text-dim)]"
                }`}
                role="tab"
                aria-selected={isSelected ? "true" : "false"}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={activeIndex === totalDots - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
