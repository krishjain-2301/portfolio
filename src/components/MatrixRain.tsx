"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let drops: number[] = [];

    const fontSize = 15;
    const chars = "01";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.floor(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.random() * (window.innerHeight / fontSize)
      );
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px "Courier New", monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const posY = y * fontSize;

        const isHead = Math.random() > 0.975;

        if (isHead) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(0, 255, 65, 0.6)";
          ctx.fillStyle = "rgba(200, 255, 200, 0.35)";
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(0, 255, 65, 0.14)";
        }

        ctx.fillText(char, x, posY);

        if (posY > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 0.5 + Math.random() * 0.5;
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}
