"use client";

import { useEffect, useRef } from "react";

export default function CTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      maxLife: number;
    }[] = [];

    const colors = ["#00f0ff", "#39ff14", "#8b5cf6", "#f59e0b"];
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Spawn new particles
      if (particles.length < 40 && Math.random() > 0.92) {
        particles.push({
          x: Math.random() * w,
          y: h + 10,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: -(Math.random() * 1.5 + 0.5),
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 100 + Math.random() * 100,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(alpha * 40)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Ready to give your AI{" "}
          <span className="bg-gradient-to-r from-cyan via-neon to-violet bg-clip-text text-transparent">
            superpowers
          </span>
          ?
        </h2>
        <p className="text-lg text-muted max-w-xl mx-auto mb-10">
          One command. Zero config. StreamRAG starts building your code graph
          the moment you begin editing. Join the developers who stopped
          burning tokens on exploration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#install"
            className="group relative px-10 py-4 rounded-xl font-semibold text-background bg-cyan hover:bg-cyan/90 transition-all duration-300 glow-cyan text-lg"
          >
            Install StreamRAG
          </a>
          <a
            href="https://github.com/Krrish109/StreamRAG"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-xl font-semibold text-foreground border border-border hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 text-lg flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
          <div className="flex items-center gap-2">
            <span className="text-cyan font-[family-name:var(--font-space-grotesk)] font-bold text-2xl">20K+</span>
            <span>Lines of Code</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-neon font-[family-name:var(--font-space-grotesk)] font-bold text-2xl">1700+</span>
            <span>Tests Passing</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-violet font-[family-name:var(--font-space-grotesk)] font-bold text-2xl">98</span>
            <span>Test Files</span>
          </div>
        </div>
      </div>
    </section>
  );
}
