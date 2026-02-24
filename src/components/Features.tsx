"use client";

const toolCategories = [
  {
    name: "Navigation",
    color: "#00f0ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      </svg>
    ),
    tools: [
      { name: "find_symbol", desc: "Locate where any symbol is defined" },
      { name: "get_callers", desc: "Find who calls or imports a function" },
      { name: "get_callees", desc: "Discover what a function calls" },
      { name: "get_file_deps", desc: "Trace forward file dependencies" },
      { name: "get_file_rdeps", desc: "Reverse dependency analysis" },
    ],
  },
  {
    name: "Analysis",
    color: "#39ff14",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    tools: [
      { name: "analyze_impact", desc: "Full blast radius of any change" },
      { name: "find_path", desc: "Shortest dependency chain A to B" },
      { name: "find_dead_code", desc: "Detect unreachable code" },
      { name: "find_cycles", desc: "Circular dependency detection" },
    ],
  },
  {
    name: "Overview",
    color: "#8b5cf6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    tools: [
      { name: "scope_task", desc: "Exact files needed for a task" },
      { name: "get_architecture", desc: "High-level module map" },
      { name: "get_file_structure", desc: "All entities & relationships" },
    ],
  },
  {
    name: "Smart",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    tools: [
      { name: "ask_graph", desc: "Natural language queries (70+ patterns)" },
      { name: "session_changes", desc: "Track what changed this session" },
      { name: "visualize_deps", desc: "Mermaid/DOT dependency diagrams" },
    ],
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5 mb-6">
            <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-cyan tracking-wider uppercase">
              15 Native MCP Tools
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4">
            Every tool Claude needs to{" "}
            <span className="bg-gradient-to-r from-cyan to-neon bg-clip-text text-transparent">
              understand your code
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Pull-based architecture means Claude calls tools on demand. No noise,
            no overhead — just instant structural answers.
          </p>
        </div>

        {/* Tool categories grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {toolCategories.map((category) => (
            <div
              key={category.name}
              className="gradient-border group hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="p-6 rounded-2xl bg-surface">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <span style={{ color: category.color }}>{category.icon}</span>
                  </div>
                  <h3
                    className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </h3>
                  <span className="ml-auto text-xs text-muted font-[family-name:var(--font-jetbrains-mono)]">
                    {category.tools.length} tools
                  </span>
                </div>

                {/* Tools list */}
                <div className="space-y-3">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-start gap-3 group/tool"
                    >
                      <code
                        className="text-xs font-[family-name:var(--font-jetbrains-mono)] px-2 py-1 rounded-md shrink-0 mt-0.5 transition-colors duration-300"
                        style={{
                          backgroundColor: `${category.color}10`,
                          color: category.color,
                        }}
                      >
                        {tool.name}
                      </code>
                      <span className="text-sm text-muted group-hover/tool:text-foreground transition-colors">
                        {tool.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
