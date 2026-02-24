"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "15", label: "MCP Tools", color: "text-cyan" },
  { value: "0.05ms", label: "Per Update", color: "text-neon" },
  { value: "1700+", label: "Tests Passing", color: "text-violet" },
  { value: "7", label: "Languages", color: "text-cyan" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const nodeCount = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > canvas.offsetWidth) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.offsetHeight) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${0.3 + a.r * 0.1})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated node network background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 mb-8 animate-[float_3s_ease-in-out_infinite]">
          <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
          <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-cyan tracking-wider uppercase">
            Open Source &middot; MIT License
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="text-foreground">Give Claude Code</span>
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-cyan via-[#00d4ff] to-neon bg-clip-text text-transparent glow-text-cyan">
              Structural Superpowers
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Real-time incremental code graph with{" "}
          <span className="text-cyan font-medium">15 native MCP tools</span>.
          Your AI assistant finally understands{" "}
          <span className="text-neon font-medium">how your code connects</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#install"
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-background bg-cyan hover:bg-cyan/90 transition-all duration-300 glow-cyan"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6.5 3.5L11 8l-4.5 4.5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </a>
          <a
            href="#architecture"
            className="px-8 py-3.5 rounded-xl font-semibold text-foreground border border-border hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300"
          >
            View Architecture
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative group"
            >
              <div className="p-4 rounded-xl border border-border/50 bg-surface/50 backdrop-blur-sm hover:border-cyan/30 transition-all duration-500">
                <div
                  className={`font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold metric-value ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted mt-1 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
