"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useShouldAnimate } from "./usePerformanceDetection";

type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  stagger?: number;
};

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const shouldAnimate = useShouldAnimate();

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If animations are disabled, immediately set to visible
    if (!shouldAnimate) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once, shouldAnimate]);

  return { ref, isVisible };
}

export function useStaggeredReveal(
  containerRef: React.RefObject<HTMLElement>,
  options: UseScrollRevealOptions = {},
) {
  const {
    threshold = 0.15,
    rootMargin = "0px",
    once = true,
    stagger = 100,
  } = options;
  const shouldAnimate = useShouldAnimate();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If animations are disabled, immediately set all items to visible
    if (!shouldAnimate) {
      const items = container.querySelectorAll("[data-stagger-item]");
      const allIndexes = new Set<number>();
      items.forEach((_, index) => allIndexes.add(index));
      setVisibleItems(allIndexes);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = container.querySelectorAll("[data-stagger-item]");
          items.forEach((item, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, index * stagger);
          });

          if (once) {
            observer.unobserve(container);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef, threshold, rootMargin, once, stagger, shouldAnimate]);

  return { visibleItems };
}
