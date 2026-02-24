"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    label: "File Edit",
    icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",
    time: "0.00ms",
    color: "#64748b",
    desc: "Developer modifies source file",
  },
  {
    label: "AST Extract",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    time: "0.02ms",
    color: "#00f0ff",
    desc: "Parse source into entity list",
  },
  {
    label: "Delta Compute",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    time: "0.01ms",
    color: "#39ff14",
    desc: "Minimal diff: added/removed/modified",
  },
  {
    label: "Graph Patch",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    time: "0.01ms",
    color: "#8b5cf6",
    desc: "Surgically update affected nodes",
  },
  {
    label: "Edge Resolve",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    time: "0.01ms",
    color: "#f59e0b",
    desc: "Two-pass linking: calls, imports, types",
  },
  {
    label: "Propagate",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    time: "0.00ms",
    color: "#00f0ff",
    desc: "Bounded re-parse of dependents",
  },
];

export default function AnimatedPipeline() {
  const [activeStage, setActiveStage] = useState(-1);
  const [showParticle, setShowParticle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inViewRef.current) {
          inViewRef.current = true;
          // Start the animation cycle
          let step = 0;
          const cycle = () => {
            setActiveStage(step);
            setShowParticle(true);
            setTimeout(() => setShowParticle(false), 400);
            step = (step + 1) % stages.length;
            setTimeout(cycle, 800);
          };
          setTimeout(cycle, 300);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto mt-16 mb-8">
      <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-center mb-3">
        Incremental Pipeline{" "}
        <span className="text-cyan font-[family-name:var(--font-jetbrains-mono)] text-lg">
          (0.05ms total)
        </span>
      </h3>
      <p className="text-center text-sm text-muted mb-8">
        Watch data flow through each stage in real-time
      </p>

      {/* Pipeline visualization */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-[52px] left-[8%] right-[8%] h-0.5 bg-border hidden md:block">
          <div
            className="h-full bg-gradient-to-r from-cyan via-neon to-violet transition-all duration-700"
            style={{
              width: `${((activeStage + 1) / stages.length) * 100}%`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stages.map((stage, i) => {
            const isActive = i === activeStage;
            const isPast = i < activeStage || (activeStage === -1 ? false : i <= activeStage);

            return (
              <div
                key={stage.label}
                className="relative flex flex-col items-center group"
              >
                {/* Stage circle */}
                <div
                  className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center transition-all duration-500 mb-3"
                  style={{
                    backgroundColor: isActive ? `${stage.color}20` : isPast ? `${stage.color}10` : "rgba(30,41,59,0.3)",
                    borderWidth: "1px",
                    borderColor: isActive ? stage.color : isPast ? `${stage.color}40` : "rgba(30,41,59,0.5)",
                    boxShadow: isActive ? `0 0 30px ${stage.color}30, 0 0 60px ${stage.color}10` : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {/* Pulse ring on active */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl animate-ping"
                      style={{
                        borderWidth: "1px",
                        borderColor: `${stage.color}40`,
                        animationDuration: "1.5s",
                      }}
                    />
                  )}

                  <svg
                    className="w-6 h-6 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    style={{
                      color: isActive || isPast ? stage.color : "#475569",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={stage.icon} />
                  </svg>
                </div>

                {/* Label */}
                <div
                  className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold text-center transition-colors duration-300 mb-1"
                  style={{ color: isActive ? stage.color : isPast ? `${stage.color}cc` : "#64748b" }}
                >
                  {stage.label}
                </div>

                {/* Time */}
                <div
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] transition-colors duration-300"
                  style={{ color: isActive ? stage.color : "#475569" }}
                >
                  {stage.time}
                </div>

                {/* Description on hover/active */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-muted transition-opacity duration-300 hidden lg:block"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  {stage.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total time display */}
      <div className="flex justify-center mt-12">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan/20 bg-cyan/5">
          <div className="flex gap-1">
            {stages.map((s, i) => (
              <div
                key={i}
                className="w-1.5 h-4 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i <= activeStage ? s.color : "#1e293b",
                  transform: i === activeStage ? "scaleY(1.3)" : "scaleY(1)",
                }}
              />
            ))}
          </div>
          <span className="text-sm font-[family-name:var(--font-jetbrains-mono)] text-cyan font-semibold">
            Total: 0.05ms
          </span>
          <span className="text-xs text-muted">per incremental update</span>
        </div>
      </div>
    </div>
  );
}
