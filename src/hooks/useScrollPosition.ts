"use client";

import { useState, useEffect } from "react";

/**
 * Returns whether the window has been scrolled past a threshold.
 * Used to toggle Navbar background without layout jank (avoids inline style mutations).
 */
export function useScrollPosition(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
