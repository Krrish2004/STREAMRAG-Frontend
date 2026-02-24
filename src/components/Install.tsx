"use client";

import { useState } from "react";

const methods = [
  {
    id: "marketplace",
    label: "Plugin Marketplace",
    badge: "Recommended",
    command: "claude plugin marketplace add Krrish109/StreamRAG",
    description: "One command. Installs from the official Claude Code plugin marketplace.",
  },
  {
    id: "manual",
    label: "Manual MCP Config",
    badge: null,
    command: `// Add to ~/.claude/mcp.json
{
  "mcpServers": {
    "streamrag": {
      "command": "python",
      "args": ["-m", "streamrag.mcp_server"],
      "env": {
        "PYTHONPATH": "/path/to/StreamRAG"
      }
    }
  }
}`,
    description: "Add StreamRAG as an MCP server in your Claude Code configuration.",
  },
  {
    id: "local",
    label: "Local Development",
    badge: null,
    command: `git clone https://github.com/Krrish109/StreamRAG.git
cd StreamRAG
pip install -e ".[dev]"`,
    description: "Clone the repo and install in development mode for contributing.",
  },
];

export default function Install() {
  const [active, setActive] = useState("marketplace");
  const [copied, setCopied] = useState(false);

  const activeMethod = methods.find((m) => m.id === active)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeMethod.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon/20 bg-neon/5 mb-6">
            <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-neon tracking-wider uppercase">
              Get Started
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4">
            Install in{" "}
            <span className="text-neon">seconds</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-lg">
            Zero configuration required. StreamRAG activates automatically on
            your first edit and builds the graph in the background.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-[family-name:var(--font-jetbrains-mono)] transition-all duration-300 ${
                active === m.id
                  ? "bg-cyan/10 text-cyan border border-cyan/30"
                  : "text-muted border border-border hover:border-border hover:text-foreground"
              }`}
            >
              {m.label}
              {m.badge && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-neon/10 text-neon">
                  {m.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="relative rounded-xl border border-border overflow-hidden bg-[#0a0f1a]">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-light/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs text-muted font-[family-name:var(--font-jetbrains-mono)] ml-2">
              terminal
            </span>
            <button
              onClick={handleCopy}
              className="ml-auto text-xs text-muted hover:text-cyan transition-colors font-[family-name:var(--font-jetbrains-mono)] flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code */}
          <div className="p-5 overflow-x-auto">
            <pre className="text-sm font-[family-name:var(--font-jetbrains-mono)] text-cyan leading-relaxed">
              {activeMethod.command}
            </pre>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted text-center mt-4">
          {activeMethod.description}
        </p>

        {/* Requirements */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { label: "Python", value: "3.9+", color: "#3776ab" },
            { label: "License", value: "Proprietary", color: "#39ff14" },
            { label: "Size", value: "20K+ LOC", color: "#00f0ff" },
          ].map((req) => (
            <div
              key={req.label}
              className="p-4 rounded-xl border border-border/50 bg-surface/30 text-center"
            >
              <div className="text-xs text-muted font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider mb-1">
                {req.label}
              </div>
              <div
                className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold"
                style={{ color: req.color }}
              >
                {req.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
