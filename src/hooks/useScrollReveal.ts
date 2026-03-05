"use client";

import { useEffect, useRef, useState } from "react";

type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  stagger?: number;
};

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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
  }, [threshold, rootMargin, once]);

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
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
  }, [containerRef, threshold, rootMargin, once, stagger]);

  return { visibleItems };
}
