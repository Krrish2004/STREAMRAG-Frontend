"use client";

const benchmarkData = [
  { metric: "Accuracy", without: 73, with: 78, unit: "%", better: "higher" },
  { metric: "Total Time", without: 966, with: 821, unit: "s", better: "lower" },
  { metric: "Total Cost", without: 6.64, with: 5.87, unit: "$", better: "lower" },
  { metric: "Perfect Scores", without: 3, with: 5, unit: "/10", better: "higher" },
];

const highlights = [
  {
    category: "Cross-Module Understanding",
    improvement: "+25pp",
    detail: "75% → 100% accuracy",
    color: "#00f0ff",
  },
  {
    category: "Dependency Analysis",
    improvement: "52%",
    detail: "fewer tokens consumed",
    color: "#39ff14",
  },
  {
    category: "Architecture Tracing",
    improvement: "33%",
    detail: "faster completion",
    color: "#8b5cf6",
  },
  {
    category: "Cost Savings",
    improvement: "11.6%",
    detail: "reduced total cost",
    color: "#f59e0b",
  },
];

export default function Benchmarks() {
  return (
    <section id="benchmarks" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon/20 bg-neon/5 mb-6">
            <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-neon tracking-wider uppercase">
              Real Benchmarks
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4">
            Numbers that{" "}
            <span className="bg-gradient-to-r from-neon to-cyan bg-clip-text text-transparent">
              speak for themselves
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Tested on a real 18K LOC production app (TypeScript + Rust, Tauri 2)
            with Claude Sonnet 4.5 across 10 diverse tasks.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-surface-light border-b border-border">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider font-[family-name:var(--font-jetbrains-mono)]">
                Metric
              </div>
              <div className="text-xs font-semibold text-red-400 uppercase tracking-wider font-[family-name:var(--font-jetbrains-mono)] text-center">
                Without
              </div>
              <div className="text-xs font-semibold text-neon uppercase tracking-wider font-[family-name:var(--font-jetbrains-mono)] text-center">
                With StreamRAG
              </div>
              <div className="text-xs font-semibold text-cyan uppercase tracking-wider font-[family-name:var(--font-jetbrains-mono)] text-center">
                Delta
              </div>
            </div>

            {/* Rows */}
            {benchmarkData.map((row) => {
              const delta =
                row.better === "higher"
                  ? row.with - row.without
                  : row.without - row.with;
              const pct =
                row.better === "higher"
                  ? `+${delta}${row.unit === "%" ? "pp" : ""}`
                  : `${((delta / row.without) * 100).toFixed(0)}% ↓`;

              return (
                <div
                  key={row.metric}
                  className="grid grid-cols-4 gap-4 p-4 border-b border-border/50 hover:bg-surface-light/50 transition-colors"
                >
                  <div className="font-medium text-sm">{row.metric}</div>
                  <div className="text-center text-sm text-muted font-[family-name:var(--font-jetbrains-mono)]">
                    {row.unit === "$" ? "$" : ""}
                    {row.without}
                    {row.unit !== "$" ? row.unit : ""}
                  </div>
                  <div className="text-center text-sm text-neon font-[family-name:var(--font-jetbrains-mono)] font-semibold">
                    {row.unit === "$" ? "$" : ""}
                    {row.with}
                    {row.unit !== "$" ? row.unit : ""}
                  </div>
                  <div className="text-center text-sm text-cyan font-[family-name:var(--font-jetbrains-mono)] font-semibold">
                    {pct}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {highlights.map((h) => (
            <div
              key={h.category}
              className="relative p-5 rounded-xl border transition-all duration-500 hover:scale-105 group"
              style={{
                borderColor: `${h.color}20`,
                backgroundColor: `${h.color}05`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${h.color}, transparent)`,
                }}
              />
              <div
                className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold metric-value mb-2"
                style={{ color: h.color }}
              >
                {h.improvement}
              </div>
              <div className="text-sm text-muted mb-1">{h.detail}</div>
              <div
                className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider"
                style={{ color: `${h.color}99` }}
              >
                {h.category}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-muted mt-8 font-[family-name:var(--font-jetbrains-mono)]">
          Benchmark: Production App (18K LOC) &middot; Model: Claude Sonnet 4.5
          &middot; 10 tasks across 4 categories
        </p>
      </div>
    </section>
  );
}
