"use client";

export default function Problem() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-red-400 tracking-wider uppercase">
                The Problem
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Claude Code is powerful, but{" "}
              <span className="text-red-400">flies blind</span> on code
              structure
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "M12 9v2m0 4h.01",
                  text: 'Answering "what breaks if I change this?" burns 400+ tokens',
                },
                {
                  icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                  text: "Grep is blind to semantic relationships between files",
                },
                {
                  icon: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6",
                  text: "Multi-turn exploration wastes context window and budget",
                },
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  text: "Dependency tracing takes 80+ seconds of guesswork",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10"
                >
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="text-sm text-muted">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon/20 bg-neon/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-neon" />
              <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-neon tracking-wider uppercase">
                The Solution
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              A live code graph that{" "}
              <span className="text-neon">updates in 0.05ms</span>
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  text: "Incremental updates on every edit — never stale",
                  color: "cyan",
                },
                {
                  icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z",
                  text: "Pull-based tools — Claude decides when to use them",
                  color: "neon",
                },
                {
                  icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z",
                  text: "Native AST parsers with 3-tier fallback chain",
                  color: "violet",
                },
                {
                  icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                  text: "Zero config — activates automatically on first edit",
                  color: "cyan",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg bg-${item.color}/5 border border-${item.color}/10`}
                  style={{
                    backgroundColor:
                      item.color === "cyan"
                        ? "rgba(0,240,255,0.05)"
                        : item.color === "neon"
                        ? "rgba(57,255,20,0.05)"
                        : "rgba(139,92,246,0.05)",
                    borderColor:
                      item.color === "cyan"
                        ? "rgba(0,240,255,0.1)"
                        : item.color === "neon"
                        ? "rgba(57,255,20,0.1)"
                        : "rgba(139,92,246,0.1)",
                  }}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{
                      color:
                        item.color === "cyan"
                          ? "#00f0ff"
                          : item.color === "neon"
                          ? "#39ff14"
                          : "#8b5cf6",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="text-sm text-muted">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
