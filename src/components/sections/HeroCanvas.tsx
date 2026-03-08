"use client";

import { useEffect, useRef, useState } from "react";
import { useShouldAnimate } from "@/hooks/usePerformanceDetection";

export function HeroCanvas() {
  const shouldAnimate = useShouldAnimate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null) as React.MutableRefObject<
    number | null
  >;
  const [dimensions, setDimensions] = useState(() => ({ width: 0, height: 0 }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    // Only run complex animation if performance allows
    if (!shouldAnimate) return;

    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution
    canvas.width = Math.floor(dimensions.width * window.devicePixelRatio);
    canvas.height = Math.floor(dimensions.height * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Initialize stars
    const stars: Star[] = [];
    const count = Math.floor((dimensions.width * dimensions.height) / 3000);

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height * 0.72,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Initialize shooting stars
    const shooters: Shooter[] = [];
    let tick = 0;

    const spawnShooter = () => {
      shooters.push({
        x: Math.random() * dimensions.width * 0.8,
        y: Math.random() * dimensions.height * 0.35,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 6 + 4,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      });
    };

    const shooterInterval = setInterval(
      spawnShooter,
      4000 + Math.random() * 3000,
    );

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const horizonY = dimensions.height * 0.72;
      const planetRadius = dimensions.width * 1.6;
      const planetCX = dimensions.width * 0.5;
      const planetCY = horizonY + planetRadius;

      // Deep space background
      const spaceBg = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      spaceBg.addColorStop(0, "#000000");
      spaceBg.addColorStop(0.4, "#00040F");
      spaceBg.addColorStop(0.65, "#010A1F");
      spaceBg.addColorStop(0.75, "#020D28");
      spaceBg.addColorStop(1, "#030E2E");
      ctx.fillStyle = spaceBg;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Milky way band
      const mw = ctx.createRadialGradient(
        dimensions.width * 0.5,
        dimensions.height * 0.2,
        0,
        dimensions.width * 0.5,
        dimensions.height * 0.2,
        dimensions.width * 0.55,
      );
      mw.addColorStop(0, "rgba(80,120,200,0.06)");
      mw.addColorStop(0.5, "rgba(50,80,160,0.03)");
      mw.addColorStop(1, "transparent");
      ctx.fillStyle = mw;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Twinkling stars
      stars.forEach((s) => {
        const twinkle =
          0.5 + 0.5 * Math.sin(tick * s.twinkleSpeed + s.twinkleOffset);
        const a = s.alpha * (0.4 + 0.6 * twinkle);
        ctx.globalAlpha = a;
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = s.r > 1 ? 4 : 0;
        ctx.shadowColor = "#aaccff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        if (s.alpha <= 0) {
          shooters.splice(i, 1);
          continue;
        }

        const ex = s.x + Math.cos(s.angle) * s.len;
        const ey = s.y + Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, ex, ey);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.7, `rgba(200,220,255,${s.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;
      }
      ctx.globalAlpha = 1;

      // Planet body
      ctx.save();
      ctx.beginPath();
      ctx.arc(planetCX, planetCY, planetRadius, 0, Math.PI * 2);
      const planetFill = ctx.createRadialGradient(
        planetCX,
        planetCY - planetRadius * 0.1,
        planetRadius * 0.7,
        planetCX,
        planetCY,
        planetRadius,
      );
      planetFill.addColorStop(0, "#030B1A");
      planetFill.addColorStop(0.6, "#010810");
      planetFill.addColorStop(1, "#000408");
      ctx.fillStyle = planetFill;
      ctx.fill();
      ctx.restore();

      // Atmosphere glow layers
      const atmoOuter = ctx.createRadialGradient(
        planetCX,
        planetCY,
        planetRadius * 0.96,
        planetCX,
        planetCY,
        planetRadius * 1.04,
      );
      atmoOuter.addColorStop(0, "rgba(0,60,180,0)");
      atmoOuter.addColorStop(0.3, "rgba(10,80,220,0.25)");
      atmoOuter.addColorStop(0.6, "rgba(30,100,255,0.12)");
      atmoOuter.addColorStop(1, "rgba(0,40,120,0)");
      ctx.fillStyle = atmoOuter;
      ctx.beginPath();
      ctx.arc(planetCX, planetCY, planetRadius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      const atmoRim = ctx.createRadialGradient(
        planetCX,
        planetCY,
        planetRadius * 0.985,
        planetCX,
        planetCY,
        planetRadius * 1.015,
      );
      atmoRim.addColorStop(0, "rgba(60,140,255,0)");
      atmoRim.addColorStop(0.4, "rgba(80,160,255,0.55)");
      atmoRim.addColorStop(0.7, "rgba(100,180,255,0.3)");
      atmoRim.addColorStop(1, "rgba(60,120,255,0)");
      ctx.fillStyle = atmoRim;
      ctx.beginPath();
      ctx.arc(planetCX, planetCY, planetRadius * 1.02, 0, Math.PI * 2);
      ctx.fill();

      // Sunrise bloom
      const breathe = 0.92 + 0.08 * Math.sin(tick * 0.008);

      const bloomWide = ctx.createRadialGradient(
        planetCX,
        horizonY,
        0,
        planetCX,
        horizonY,
        dimensions.width * 0.9 * breathe,
      );
      bloomWide.addColorStop(0, "rgba(180,220,255,0.18)");
      bloomWide.addColorStop(0.08, "rgba(100,180,255,0.14)");
      bloomWide.addColorStop(0.2, "rgba(50,120,255,0.08)");
      bloomWide.addColorStop(0.45, "rgba(20,60,200,0.04)");
      bloomWide.addColorStop(1, "transparent");
      ctx.fillStyle = bloomWide;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const bloomMid = ctx.createRadialGradient(
        planetCX,
        horizonY,
        0,
        planetCX,
        horizonY,
        dimensions.width * 0.4 * breathe,
      );
      bloomMid.addColorStop(0, "rgba(220,240,255,0.35)");
      bloomMid.addColorStop(0.1, "rgba(150,200,255,0.25)");
      bloomMid.addColorStop(0.3, "rgba(80,150,255,0.12)");
      bloomMid.addColorStop(1, "transparent");
      ctx.fillStyle = bloomMid;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const bloomCore = ctx.createRadialGradient(
        planetCX,
        horizonY,
        0,
        planetCX,
        horizonY,
        dimensions.width * 0.12 * breathe,
      );
      bloomCore.addColorStop(0, "rgba(255,255,255,0.95)");
      bloomCore.addColorStop(0.05, "rgba(240,248,255,0.8)");
      bloomCore.addColorStop(0.15, "rgba(160,210,255,0.5)");
      bloomCore.addColorStop(0.4, "rgba(80,150,255,0.2)");
      bloomCore.addColorStop(1, "transparent");
      ctx.fillStyle = bloomCore;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Horizon line
      ctx.save();
      ctx.beginPath();
      ctx.arc(planetCX, planetCY, planetRadius + 1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(120,180,255,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const arcGlow = ctx.createLinearGradient(
        planetCX - dimensions.width * 0.15,
        horizonY,
        planetCX + dimensions.width * 0.15,
        horizonY,
      );
      arcGlow.addColorStop(0, "transparent");
      arcGlow.addColorStop(0.5, "rgba(255,255,255,0.9)");
      arcGlow.addColorStop(1, "transparent");
      ctx.strokeStyle = arcGlow;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      // Top darken overlay
      const topDarken = ctx.createLinearGradient(
        0,
        0,
        0,
        dimensions.height * 0.55,
      );
      topDarken.addColorStop(0, "rgba(0,0,0,0.55)");
      topDarken.addColorStop(1, "transparent");
      ctx.fillStyle = topDarken;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      tick++;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      clearInterval(shooterInterval);
    };
  }, [dimensions, shouldAnimate]);

  // Early return if animations are disabled - render empty canvas
  if (!shouldAnimate) {
    return (
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        style={{ willChange: "transform", zIndex: -1 }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ willChange: "transform", zIndex: -1 }}
    />
  );
}

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Shooter {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
  angle: number;
}
