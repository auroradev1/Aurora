"use client";

import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

export function PerformanceIndicator() {
  const {
    tier,
    isHighPerformance,
    deviceMemory,
    hardwareConcurrency,
    screenWidth,
    screenHeight,
    isReducedMotion,
  } = usePerformanceDetection();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 9999,
        border: "1px solid #333",
        pointerEvents: "none",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
        Performance: {tier.toUpperCase()}
      </div>
      <div>Animations: {isHighPerformance ? "ENABLED" : "DISABLED"}</div>
      <div>Reduced Motion: {isReducedMotion ? "YES" : "NO"}</div>
      <div>
        Screen: {screenWidth}x{screenHeight}
      </div>
      <div>Memory: {deviceMemory || "N/A"}GB</div>
      <div>Cores: {hardwareConcurrency || "N/A"}</div>
    </div>
  );
}
