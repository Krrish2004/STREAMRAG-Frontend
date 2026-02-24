"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TermLine {
  type: "command" | "output" | "info" | "success" | "header" | "separator";
  text: string;
  delay?: number;
}

const demos: { title: string; lines: TermLine[] }[] = [
  {
    title: "analyze_impact",
    lines: [
      { type: "command", text: "claude> What breaks if I change UserModel?", delay: 40 },
      { type: "info", text: "  StreamRAG → analyze_impact(\"UserModel\")", delay: 20 },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "header", text: "  Impact Analysis: UserModel" },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "output", text: "  Direct dependents (3):" },
      { type: "success", text: "    ├─ src/auth/useAuth.ts      uses_type" },
      { type: "success", text: "    ├─ src/store/useStore.ts    uses_type" },
      { type: "success", text: "    └─ src/api/ApiClient.ts     calls" },
      { type: "output", text: "  Transitive dependents (5):" },
      { type: "success", text: "    ├─ src/App.tsx              via useAuth" },
      { type: "success", text: "    ├─ src/routes/Router.tsx    via middleware" },
      { type: "success", text: "    ├─ src/middleware/auth.ts   via useAuth" },
      { type: "success", text: "    ├─ src/db/Database.ts       via ApiClient" },
      { type: "success", text: "    └─ src/utils/validate.ts   direct call" },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "info", text: "  8 files affected · 0.05ms · 0 tokens burned" },
    ],
  },
  {
    title: "find_dead_code",
    lines: [
      { type: "command", text: "claude> Find unused functions in the codebase", delay: 40 },
      { type: "info", text: "  StreamRAG → find_dead_code()", delay: 20 },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "header", text: "  Dead Code Detection Results" },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "output", text: "  Unreachable functions (4):" },
      { type: "success", text: "    ├─ legacyAuth()        auth/legacy.ts:23" },
      { type: "success", text: "    ├─ formatDate()        utils/format.ts:45" },
      { type: "success", text: "    ├─ OldApiClient        api/v1/client.ts:1" },
      { type: "success", text: "    └─ debugLogger()       utils/debug.ts:12" },
      { type: "output", text: "  Unreachable classes (1):" },
      { type: "success", text: "    └─ DeprecatedStore     store/old.ts:8" },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "info", text: "  5 dead entries · confidence: high · 0.03ms" },
    ],
  },
  {
    title: "scope_task",
    lines: [
      { type: "command", text: 'claude> I need to add OAuth2 login flow', delay: 40 },
      { type: "info", text: '  StreamRAG → scope_task("add OAuth2 login")', delay: 20 },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "header", text: "  Task Scope: OAuth2 Login Flow" },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "output", text: "  Files to modify (4):" },
      { type: "success", text: "    ├─ src/auth/useAuth.ts       [core]" },
      { type: "success", text: "    ├─ src/api/ApiClient.ts      [integration]" },
      { type: "success", text: "    ├─ src/middleware/auth.ts     [guard]" },
      { type: "success", text: "    └─ src/config.ts             [secrets]" },
      { type: "output", text: "  Files to test (3):" },
      { type: "success", text: "    ├─ src/App.tsx               [entry]" },
      { type: "success", text: "    ├─ src/routes/Router.tsx     [routes]" },
      { type: "success", text: "    └─ src/store/useStore.ts     [state]" },
      { type: "separator", text: "  ─────────────────────────────────────────" },
      { type: "info", text: "  7 files scoped · 0 exploration needed" },
    ],
  },
];

export default function TerminalDemo() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const demo = demos[currentDemo];

  const runDemo = useCallback(
    (demoIndex: number) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);

      const d = demos[demoIndex];
      setVisibleLines(0);
      setTypedText("");
      setIsTyping(true);

      // Type the command character by character
      const cmdLine = d.lines[0];
      let charIdx = 0;

      const typeChar = () => {
        if (charIdx < cmdLine.text.length) {
          setTypedText(cmdLine.text.substring(0, charIdx + 1));
          charIdx++;
          typingRef.current = setTimeout(typeChar, cmdLine.delay || 30);
        } else {
          setIsTyping(false);
          setVisibleLines(1);
          // Then reveal remaining lines one by one
          let lineIdx = 1;
          intervalRef.current = setInterval(() => {
            if (lineIdx < d.lines.length) {
              setVisibleLines(lineIdx + 1);
              lineIdx++;
              // Auto-scroll
              if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
              }
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
          }, d.lines[lineIdx]?.delay || 100);
        }
      };

      typingRef.current = setTimeout(typeChar, 500);
    },
    []
  );

  useEffect(() => {
    runDemo(currentDemo);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentDemo, runDemo]);

  // Auto-cycle demos
  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demos.length);
    }, 8000);
    return () => clearInterval(cycleTimer);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon/20 bg-neon/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-neon tracking-wider uppercase">
              Live Terminal Demo
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4">
            See StreamRAG{" "}
            <span className="bg-gradient-to-r from-neon to-cyan bg-clip-text text-transparent">
              in action
            </span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-lg">
            Real tool outputs. Real data. Zero exploration overhead.
          </p>
        </div>

        {/* Demo selector */}
        <div className="flex justify-center gap-2 mb-4">
          {demos.map((d, i) => (
            <button
              key={d.title}
              onClick={() => setCurrentDemo(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-[family-name:var(--font-jetbrains-mono)] font-medium transition-all duration-300 ${
                currentDemo === i
                  ? "bg-neon/10 text-neon border border-neon/30"
                  : "text-muted border border-border hover:text-foreground hover:border-border"
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        {/* Terminal window */}
        <div className="rounded-xl border border-border overflow-hidden shadow-2xl shadow-cyan/5">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0c1222] border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-muted font-[family-name:var(--font-jetbrains-mono)]">
                claude code — streamrag
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-[10px] text-neon font-[family-name:var(--font-jetbrains-mono)]">
                LIVE
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-5 bg-[#080d19] font-[family-name:var(--font-jetbrains-mono)] text-sm leading-relaxed h-[420px] overflow-y-auto"
          >
            {/* Typed command */}
            <div className="flex">
              <span className="text-foreground">
                {isTyping ? typedText : visibleLines >= 1 ? demo.lines[0].text : ""}
              </span>
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-cyan ml-0.5 animate-pulse" />
              )}
            </div>

            {/* Output lines */}
            {demo.lines.slice(1, visibleLines).map((line, i) => (
              <div
                key={`${currentDemo}-${i}`}
                className="animate-[fadeIn_0.15s_ease-out]"
                style={{
                  color:
                    line.type === "command"
                      ? "#e2e8f0"
                      : line.type === "info"
                      ? "#00f0ff"
                      : line.type === "success"
                      ? "#39ff14"
                      : line.type === "header"
                      ? "#f59e0b"
                      : line.type === "separator"
                      ? "#1e293b"
                      : "#94a3b8",
                }}
              >
                {line.text}
              </div>
            ))}

            {/* Blinking cursor at end */}
            {!isTyping && visibleLines >= demo.lines.length && (
              <div className="mt-2 flex items-center">
                <span className="text-muted">claude&gt; </span>
                <span className="inline-block w-2 h-4 bg-cyan/60 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
