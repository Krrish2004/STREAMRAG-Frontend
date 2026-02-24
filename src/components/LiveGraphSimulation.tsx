"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  id: string;
  label: string;
  type: "function" | "class" | "module" | "import";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

interface Edge {
  source: string;
  target: string;
  type: "calls" | "imports" | "inherits" | "uses_type";
  color: string;
  dashOffset: number;
  active: boolean;
  opacity: number;
}

const NODE_COLORS: Record<string, string> = {
  function: "#00f0ff",
  class: "#8b5cf6",
  module: "#39ff14",
  import: "#f59e0b",
};

const EDGE_COLORS: Record<string, string> = {
  calls: "#00f0ff",
  imports: "#39ff14",
  inherits: "#8b5cf6",
  uses_type: "#f59e0b",
};

const graphNodes: Omit<Node, "x" | "y" | "targetX" | "targetY" | "pulse" | "pulseSpeed">[] = [
  { id: "app", label: "App.tsx", type: "module", color: NODE_COLORS.module, radius: 22 },
  { id: "auth", label: "useAuth()", type: "function", color: NODE_COLORS.function, radius: 16 },
  { id: "api", label: "ApiClient", type: "class", color: NODE_COLORS.class, radius: 20 },
  { id: "router", label: "Router", type: "module", color: NODE_COLORS.module, radius: 18 },
  { id: "store", label: "useStore()", type: "function", color: NODE_COLORS.function, radius: 16 },
  { id: "user", label: "UserModel", type: "class", color: NODE_COLORS.class, radius: 18 },
  { id: "db", label: "Database", type: "class", color: NODE_COLORS.class, radius: 20 },
  { id: "validate", label: "validate()", type: "function", color: NODE_COLORS.function, radius: 14 },
  { id: "config", label: "config.ts", type: "import", color: NODE_COLORS.import, radius: 14 },
  { id: "logger", label: "Logger", type: "class", color: NODE_COLORS.class, radius: 16 },
  { id: "middleware", label: "authMiddleware", type: "function", color: NODE_COLORS.function, radius: 16 },
  { id: "types", label: "types.ts", type: "import", color: NODE_COLORS.import, radius: 13 },
];

const graphEdges: Omit<Edge, "dashOffset" | "active" | "opacity">[] = [
  { source: "app", target: "auth", type: "calls", color: EDGE_COLORS.calls },
  { source: "app", target: "router", type: "imports", color: EDGE_COLORS.imports },
  { source: "app", target: "store", type: "calls", color: EDGE_COLORS.calls },
  { source: "auth", target: "api", type: "calls", color: EDGE_COLORS.calls },
  { source: "auth", target: "user", type: "uses_type", color: EDGE_COLORS.uses_type },
  { source: "api", target: "db", type: "calls", color: EDGE_COLORS.calls },
  { source: "api", target: "config", type: "imports", color: EDGE_COLORS.imports },
  { source: "api", target: "logger", type: "calls", color: EDGE_COLORS.calls },
  { source: "router", target: "middleware", type: "calls", color: EDGE_COLORS.calls },
  { source: "middleware", target: "auth", type: "calls", color: EDGE_COLORS.calls },
  { source: "user", target: "validate", type: "calls", color: EDGE_COLORS.calls },
  { source: "user", target: "types", type: "imports", color: EDGE_COLORS.imports },
  { source: "db", target: "config", type: "imports", color: EDGE_COLORS.imports },
  { source: "store", target: "user", type: "uses_type", color: EDGE_COLORS.uses_type },
  { source: "logger", target: "config", type: "imports", color: EDGE_COLORS.imports },
];

export default function LiveGraphSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const activeTraceRef = useRef<{ path: string[]; progress: number; color: string } | null>(null);

  const initGraph = useCallback((width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusX = width * 0.35;
    const radiusY = height * 0.35;

    nodesRef.current = graphNodes.map((n, i) => {
      const angle = (i / graphNodes.length) * Math.PI * 2 - Math.PI / 2;
      const jitter = (Math.random() - 0.5) * 40;
      const tx = centerX + Math.cos(angle) * radiusX + jitter;
      const ty = centerY + Math.sin(angle) * radiusY + jitter;
      return {
        ...n,
        x: centerX,
        y: centerY,
        targetX: tx,
        targetY: ty,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      };
    });

    edgesRef.current = graphEdges.map((e) => ({
      ...e,
      dashOffset: 0,
      active: false,
      opacity: 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    initGraph(w, h);

    const tracePaths = [
      { path: ["app", "auth", "api", "db"], color: "#00f0ff" },
      { path: ["app", "router", "middleware", "auth"], color: "#39ff14" },
      { path: ["app", "store", "user", "validate"], color: "#8b5cf6" },
      { path: ["auth", "user", "types"], color: "#f59e0b" },
      { path: ["api", "logger", "config"], color: "#ec4899" },
    ];
    let traceIndex = 0;
    let traceTimer = 0;

    const draw = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Update node positions (ease toward target)
      for (const node of nodes) {
        node.x += (node.targetX - node.x) * 0.05;
        node.y += (node.targetY - node.y) * 0.05;
        node.pulse += node.pulseSpeed;

        // Gentle floating
        node.targetX += Math.sin(timeRef.current * 0.005 + node.pulse) * 0.15;
        node.targetY += Math.cos(timeRef.current * 0.007 + node.pulse) * 0.1;
      }

      // Update edge dash animation
      for (const edge of edges) {
        edge.dashOffset -= 0.5;
        if (!edge.active) {
          edge.opacity += (0.25 - edge.opacity) * 0.05;
        } else {
          edge.opacity += (0.9 - edge.opacity) * 0.1;
        }
      }

      // Trace animation
      traceTimer++;
      if (traceTimer > 120) {
        traceTimer = 0;
        // Reset previous edges
        for (const e of edges) e.active = false;

        const trace = tracePaths[traceIndex % tracePaths.length];
        activeTraceRef.current = { ...trace, progress: 0 };
        traceIndex++;
      }

      if (activeTraceRef.current) {
        activeTraceRef.current.progress += 0.015;
        const trace = activeTraceRef.current;
        const stepsToShow = Math.floor(trace.progress * trace.path.length);

        for (let i = 0; i < stepsToShow && i < trace.path.length - 1; i++) {
          const src = trace.path[i];
          const tgt = trace.path[i + 1];
          const edge = edges.find(
            (e) => (e.source === src && e.target === tgt) || (e.source === tgt && e.target === src)
          );
          if (edge) edge.active = true;
        }

        if (trace.progress > 1.5) {
          activeTraceRef.current = null;
        }
      }

      // Draw edges
      for (const edge of edges) {
        const src = nodes.find((n) => n.id === edge.source);
        const tgt = nodes.find((n) => n.id === edge.target);
        if (!src || !tgt) continue;

        ctx.beginPath();
        ctx.moveTo(src.x, src.y);

        // Curved edges
        const midX = (src.x + tgt.x) / 2 + (src.y - tgt.y) * 0.1;
        const midY = (src.y + tgt.y) / 2 + (tgt.x - src.x) * 0.1;
        ctx.quadraticCurveTo(midX, midY, tgt.x, tgt.y);

        ctx.strokeStyle = edge.active
          ? edge.color
          : edge.color + Math.floor(edge.opacity * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = edge.active ? 2 : 1;
        ctx.setLineDash(edge.active ? [] : [4, 4]);
        ctx.lineDashOffset = edge.dashOffset;
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow on active edges
        if (edge.active) {
          const t = 0.7;
          const ax = (1 - t) * (1 - t) * src.x + 2 * (1 - t) * t * midX + t * t * tgt.x;
          const ay = (1 - t) * (1 - t) * src.y + 2 * (1 - t) * t * midY + t * t * tgt.y;
          const dt = 0.72;
          const bx = (1 - dt) * (1 - dt) * src.x + 2 * (1 - dt) * dt * midX + dt * dt * tgt.x;
          const by = (1 - dt) * (1 - dt) * src.y + 2 * (1 - dt) * dt * midY + dt * dt * tgt.y;
          const angle = Math.atan2(ay - by, ax - bx);

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(ax - 8 * Math.cos(angle - 0.4), ay - 8 * Math.sin(angle - 0.4));
          ctx.moveTo(ax, ay);
          ctx.lineTo(ax - 8 * Math.cos(angle + 0.4), ay - 8 * Math.sin(angle + 0.4));
          ctx.strokeStyle = edge.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Flowing particle on active edge
        if (edge.active) {
          const particleT = (timeRef.current % 60) / 60;
          const px =
            (1 - particleT) * (1 - particleT) * src.x +
            2 * (1 - particleT) * particleT * midX +
            particleT * particleT * tgt.x;
          const py =
            (1 - particleT) * (1 - particleT) * src.y +
            2 * (1 - particleT) * particleT * midY +
            particleT * particleT * tgt.y;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = edge.color;
          ctx.fill();

          // Glow
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = edge.color + "33";
          ctx.fill();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const isInTrace =
          activeTraceRef.current?.path.includes(node.id) &&
          activeTraceRef.current.progress > 0.1;
        const pulseScale = 1 + Math.sin(node.pulse) * 0.08;
        const r = node.radius * pulseScale;

        // Outer glow
        if (isInTrace) {
          const gradient = ctx.createRadialGradient(node.x, node.y, r, node.x, node.y, r * 3);
          gradient.addColorStop(0, node.color + "40");
          gradient.addColorStop(1, node.color + "00");
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isInTrace ? node.color + "30" : node.color + "15";
        ctx.fill();
        ctx.strokeStyle = isInTrace ? node.color : node.color + "60";
        ctx.lineWidth = isInTrace ? 2 : 1;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Label
        ctx.font = `${isInTrace ? "600" : "400"} 10px JetBrains Mono, monospace`;
        ctx.fillStyle = isInTrace ? node.color : "#94a3b8";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + r + 14);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, [initGraph]);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-cyan tracking-wider uppercase">
              Live Simulation
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4">
            Watch your code graph{" "}
            <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
              come alive
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            StreamRAG traces dependency chains in real-time. See how{" "}
            <code className="text-cyan font-[family-name:var(--font-jetbrains-mono)] text-sm">
              analyze_impact
            </code>{" "}
            illuminates blast radius across your entire codebase.
          </p>
        </div>

        <div className="relative rounded-2xl border border-border/50 bg-surface/30 overflow-hidden">
          {/* Legend */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-3">
            {Object.entries(NODE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-muted capitalize">
                  {type}
                </span>
              </div>
            ))}
          </div>

          {/* Edge type legend */}
          <div className="absolute top-4 right-4 z-10 flex flex-wrap gap-3">
            {Object.entries(EDGE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div
                  className="w-4 h-0.5"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-muted">
                  {type}
                </span>
              </div>
            ))}
          </div>

          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ height: "500px" }}
          />
        </div>
      </div>
    </section>
  );
}
