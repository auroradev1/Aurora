"use client";

import { useState, useEffect } from "react";

/**
 * Tracks scroll direction and position to hide/show navbar.
 */
export function useScrollDirection(threshold = 50) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > threshold) {
        if (currentScrollY > lastScrollY) {
          setShow(false);
        } else {
          setShow(true);
        }
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, threshold]);

  return show;
}
