"use client";

import { useEffect, useState } from "react";

type PerformanceTier = "high" | "medium" | "low";

interface PerformanceMetrics {
  tier: PerformanceTier;
  isHighPerformance: boolean;
  deviceMemory: number | undefined;
  hardwareConcurrency?: number;
  screenWidth: number;
  screenHeight: number;
  isReducedMotion: boolean;
}

export function usePerformanceDetection() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    tier: "medium",
    isHighPerformance: false,
    deviceMemory: 0,
    hardwareConcurrency: 0,
    screenWidth: 0,
    screenHeight: 0,
    isReducedMotion: false,
  });

  useEffect(() => {
    const detectPerformance = () => {
      // Get screen dimensions
      const screenWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const screenHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check for reduced motion preference
      const isReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Get device capabilities (may be undefined on some browsers)
      let deviceMemory: number | undefined;
      let hardwareConcurrency: number | undefined;

      try {
        // Check if deviceMemory is available
        if ("deviceMemory" in navigator) {
          deviceMemory = (navigator as Navigator & { deviceMemory?: number })
            .deviceMemory;
        } else {
          deviceMemory = 4; // Conservative estimate
        }

        // Check if hardwareConcurrency is available
        if ("hardwareConcurrency" in navigator) {
          hardwareConcurrency = navigator.hardwareConcurrency;
        } else {
          hardwareConcurrency = 4; // Conservative estimate
        }
      } catch {
        // Fallback values for browsers that don't support these APIs
        deviceMemory = 4; // Conservative estimate
        hardwareConcurrency = 4; // Conservative estimate
      }

      // Determine performance tier based on multiple factors
      let tier: PerformanceTier = "medium";
      let isHighPerformance = false;

      // Desktop detection (screen width > 1024px)
      const isDesktop = screenWidth > 1024;

      // Performance scoring logic
      let score = 0;

      // Device memory scoring (in GB)
      if (deviceMemory) {
        if (deviceMemory >= 8) score += 3;
        else if (deviceMemory >= 4) score += 2;
        else if (deviceMemory >= 2) score += 1;
      }

      // Hardware concurrency scoring (CPU cores)
      if (hardwareConcurrency) {
        if (hardwareConcurrency >= 8) score += 3;
        else if (hardwareConcurrency >= 4) score += 2;
        else if (hardwareConcurrency >= 2) score += 1;
      }

      // Screen size bonus for desktop
      if (isDesktop) score += 2;

      // Determine tier based on score
      if (score >= 7) {
        tier = "high";
        isHighPerformance = true;
      } else if (score >= 4) {
        tier = "medium";
        isHighPerformance = isDesktop; // Desktop gets animations even if medium
      } else {
        tier = "low";
        isHighPerformance = false;
      }

      // Override if user prefers reduced motion
      if (isReducedMotion) {
        isHighPerformance = false;
        tier = "low";
      }

      setMetrics({
        tier,
        isHighPerformance,
        deviceMemory,
        hardwareConcurrency,
        screenWidth,
        screenHeight,
        isReducedMotion,
      });
    };

    // Run detection immediately
    detectPerformance();

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotionChange = () => detectPerformance();
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    // Also listen for resize to detect desktop/mobile switches
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(window.__resizeTimer);
      window.__resizeTimer = setTimeout(detectPerformance, 250);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener("resize", handleResize);
      clearTimeout(window.__resizeTimer);
    };
  }, []);

  return metrics;
}

// Convenience hook for checking if animations should run
export function useShouldAnimate() {
  const { isHighPerformance, isReducedMotion } = usePerformanceDetection();

  // Always respect reduced motion preference
  if (isReducedMotion) {
    return false;
  }

  return isHighPerformance;
}
