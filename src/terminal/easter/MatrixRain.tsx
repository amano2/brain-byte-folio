import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  onClose: () => void;
  durationMs?: number;
}

export default function MatrixRain({ onClose, durationMs = 5000 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onClose();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => 1);

    const draw = () => {
      ctx.fillStyle = "rgba(13, 17, 23, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const timer = setTimeout(() => {
      onClose();
    }, durationMs);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, [onClose, durationMs]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 cursor-pointer bg-black/90 backdrop-blur-sm flex items-center justify-center"
      title="Click or press any key to exit Matrix Rain"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="relative z-10 font-mono text-xs text-[var(--term-accent)] bg-black/70 px-4 py-2 rounded border border-[var(--term-border)]">
        HACKERMODE ACTIVE &bull; Click anywhere to dismiss
      </div>
    </div>
  );
}
