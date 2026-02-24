"use client";

const layers = [
  {
    id: "mcp",
    label: "MCP Server",
    sublabel: "JSON-RPC stdio transport to Claude Code",
    color: "#00f0ff",
    items: ["JSON-RPC Protocol", "Daemon Fallback", "Unix Socket IPC"],
  },
  {
    id: "tools",
    label: "15 Native MCP Tools",
    sublabel: "Pull-based tools Claude calls on demand",
    color: "#39ff14",
    items: ["Navigation (5)", "Analysis (4)", "Overview (3)", "Smart (3)"],
  },
  {
    id: "engine",
    label: "Incremental Graph Engine",
    sublabel: "0.05ms per update via semantic diffing",
    color: "#8b5cf6",
    items: [
      "AST Extraction",
      "Delta Computation",
      "Surgical Patching",
      "Edge Resolution",
    ],
  },
  {
    id: "parsers",
    label: "Three-Tier Parser Daemons",
    sublabel: "Native daemon → tree-sitter → regex fallback",
    color: "#f59e0b",
    items: [
      "Node.js Daemon (TS/JSX)",
      "Rust Daemon (Rust/C/C++)",
      "JVM Daemon (Java)",
      "tree-sitter (fallback)",
    ],
  },
  {
    id: "graph",
    label: "LiquidGraph In-Memory DB",
    sublabel: "6-index graph with persistent storage",
    color: "#00f0ff",
    items: [
      "node_id → GraphNode",
      "file_path → {node_ids}",
      "source_id → [edges]",
      "JSON persistence",
    ],
  },
];

const pipeline = [
  { step: "Edit", time: "0.00ms", color: "#64748b" },
  { step: "Extract AST", time: "0.02ms", color: "#00f0ff" },
  { step: "Compute Delta", time: "0.01ms", color: "#39ff14" },
  { step: "Patch Graph", time: "0.01ms", color: "#8b5cf6" },
  { step: "Resolve Edges", time: "0.01ms", color: "#f59e0b" },
  { step: "Propagate", time: "0.00ms", color: "#00f0ff" },
];

export default function Architecture() {
  return (
    <section id="architecture" className="relative py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/20 bg-violet/5 mb-6">
            <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-violet tracking-wider uppercase">
              System Architecture
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent">
              real-time performance
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Five layers working in concert. Native daemons for speed, incremental
            updates for freshness, and a pull-based architecture for zero overhead.
          </p>
        </div>

        {/* Architecture Stack */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="space-y-3">
            {layers.map((layer, i) => (
              <div key={layer.id} className="group">
                <div
                  className="relative rounded-xl border p-5 transition-all duration-500 hover:scale-[1.02] cursor-default"
                  style={{
                    borderColor: `${layer.color}20`,
                    backgroundColor: `${layer.color}05`,
                  }}
                >
                  {/* Connector line */}
                  {i < layers.length - 1 && (
                    <div
                      className="absolute left-1/2 -bottom-3 w-px h-3"
                      style={{ backgroundColor: `${layer.color}40` }}
                    />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: layer.color }}
                        />
                        <h3
                          className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg"
                          style={{ color: layer.color }}
                        >
                          {layer.label}
                        </h3>
                      </div>
                      <p className="text-sm text-muted ml-5">{layer.sublabel}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-5 sm:ml-0">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-[family-name:var(--font-jetbrains-mono)] px-2.5 py-1 rounded-md"
                          style={{
                            backgroundColor: `${layer.color}10`,
                            color: `${layer.color}cc`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incremental Pipeline */}
        <div className="max-w-5xl mx-auto">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-center mb-8">
            Incremental Pipeline{" "}
            <span className="text-cyan font-[family-name:var(--font-jetbrains-mono)] text-lg">
              (0.05ms total)
            </span>
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {pipeline.map((step, i) => (
              <div key={step.step} className="flex items-center gap-2">
                <div
                  className="px-4 py-3 rounded-lg border text-center min-w-[120px] transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: `${step.color}30`,
                    backgroundColor: `${step.color}08`,
                  }}
                >
                  <div
                    className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)]"
                    style={{ color: step.color }}
                  >
                    {step.step}
                  </div>
                  <div className="text-xs text-muted font-[family-name:var(--font-jetbrains-mono)] mt-1">
                    {step.time}
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="text-muted shrink-0"
                  >
                    <path
                      d="M7 4l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Edge Types */}
        <div className="max-w-3xl mx-auto mt-20">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-center mb-8">
            Relationship Types
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: "calls", example: "fn() → fn()", color: "#00f0ff" },
              { name: "imports", example: "import → def", color: "#39ff14" },
              { name: "inherits", example: "class → class", color: "#8b5cf6" },
              { name: "uses_type", example: "var: Type", color: "#f59e0b" },
              { name: "decorated", example: "@dec → fn", color: "#ec4899" },
            ].map((edge) => (
              <div
                key={edge.name}
                className="p-3 rounded-lg border text-center transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: `${edge.color}20`,
                  backgroundColor: `${edge.color}05`,
                }}
              >
                <code
                  className="text-xs font-[family-name:var(--font-jetbrains-mono)] font-semibold"
                  style={{ color: edge.color }}
                >
                  {edge.name}
                </code>
                <div className="text-xs text-muted mt-1">{edge.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
