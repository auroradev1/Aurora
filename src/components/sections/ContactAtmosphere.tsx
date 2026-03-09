"use client";

import { useEffect, useRef, useState } from "react";
import { useShouldAnimate } from "@/hooks/usePerformanceDetection";

export function ContactAtmosphere() {
  const shouldAnimate = useShouldAnimate();
  const glowRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Only run complex animations if performance allows and not on mobile
    if (!shouldAnimate || isMobile) return;

    const glow = glowRef.current;
    const beam = beamRef.current;

    if (!glow || !beam) return;

    // Light beam animation
    const animateBeam = () => {
      const startX = -200;
      const endX = window.innerWidth + 200;
      const speed = 200; // pixels per second
      const duration = (endX - startX) / speed;

      beam.style.transition = `left ${duration}s linear`;
      beam.style.left = `${endX}px`;

      setTimeout(() => {
        beam.style.transition = "none";
        beam.style.left = `${startX}px`;
        setTimeout(animateBeam, 100);
      }, duration * 1000);
    };

    animateBeam();

    // Contact glow intensity on focus
    const handleFocus = () => {
      glow.style.opacity = "1.5";
    };

    const handleBlur = () => {
      glow.style.opacity = "1";
    };

    // Add event listeners to form inputs
    const inputs = document.querySelectorAll(
      "#contact input, #contact textarea",
    );
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [shouldAnimate, isMobile]);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)`,
          opacity: 1,
        }}
      />
      <div
        ref={beamRef}
        className="pointer-events-none absolute top-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.04)] to-transparent"
        style={{
          left: "-200px",
          transition: "left 8s linear",
          display: shouldAnimate ? "block" : "none",
        }}
      />
    </>
  );
}
