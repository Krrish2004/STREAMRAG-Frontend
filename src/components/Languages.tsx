"use client";

const languages = [
  {
    name: "Python",
    ext: ".py",
    tier1: "stdlib ast",
    tier2: null,
    tier3: null,
    color: "#3776ab",
    icon: "Py",
  },
  {
    name: "TypeScript",
    ext: ".ts .tsx",
    tier1: "Node.js Daemon",
    tier2: "tree-sitter",
    tier3: "regex",
    color: "#3178c6",
    icon: "TS",
  },
  {
    name: "React JSX",
    ext: ".jsx .tsx",
    tier1: "Node.js Daemon",
    tier2: "tree-sitter",
    tier3: "regex",
    color: "#61dafb",
    icon: "Rx",
  },
  {
    name: "JavaScript",
    ext: ".js .mjs .cjs",
    tier1: "Node.js Daemon",
    tier2: null,
    tier3: "regex",
    color: "#f7df1e",
    icon: "JS",
  },
  {
    name: "Rust",
    ext: ".rs",
    tier1: "Rust Daemon",
    tier2: "tree-sitter",
    tier3: "regex",
    color: "#dea584",
    icon: "Rs",
  },
  {
    name: "C / C++",
    ext: ".c .cpp .h",
    tier1: "Rust Daemon",
    tier2: null,
    tier3: "regex",
    color: "#00599c",
    icon: "C+",
  },
  {
    name: "Java",
    ext: ".java",
    tier1: "JVM Daemon",
    tier2: null,
    tier3: "regex",
    color: "#ed8b00",
    icon: "Jv",
  },
];

export default function Languages() {
  return (
    <section id="languages" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5 mb-6">
            <span className="text-xs font-medium font-[family-name:var(--font-jetbrains-mono)] text-cyan tracking-wider uppercase">
              Multi-Language
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan via-violet to-[#f59e0b] bg-clip-text text-transparent">
              7 Languages
            </span>
            , three-tier extraction
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Native daemon for speed, tree-sitter for accuracy, regex for
            universal coverage. Automatic fallback — always the best parser
            available.
          </p>
        </div>

        {/* Three-tier explanation */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {[
            {
              tier: "Tier 1",
              name: "Native Daemons",
              desc: "Persistent processes using language-native compilers. Fastest, most accurate.",
              color: "#00f0ff",
            },
            {
              tier: "Tier 2",
              name: "tree-sitter",
              desc: "Incremental parsing library. Great for broken mid-edit code recovery.",
              color: "#39ff14",
            },
            {
              tier: "Tier 3",
              name: "Regex Fallback",
              desc: "Pattern-based extraction. Universal coverage, zero dependencies.",
              color: "#8b5cf6",
            },
          ].map((t) => (
            <div
              key={t.tier}
              className="p-4 rounded-xl border text-center"
              style={{
                borderColor: `${t.color}20`,
                backgroundColor: `${t.color}05`,
              }}
            >
              <div
                className="text-xs font-[family-name:var(--font-jetbrains-mono)] font-bold uppercase tracking-widest mb-1"
                style={{ color: t.color }}
              >
                {t.tier}
              </div>
              <div className="font-[family-name:var(--font-space-grotesk)] font-bold mb-1">
                {t.name}
              </div>
              <div className="text-xs text-muted">{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Language cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="p-4 rounded-xl border border-border/50 bg-surface/50 hover:border-border transition-all duration-300 hover:scale-[1.03] group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-[family-name:var(--font-jetbrains-mono)]"
                  style={{
                    backgroundColor: `${lang.color}15`,
                    color: lang.color,
                  }}
                >
                  {lang.icon}
                </div>
                <div>
                  <div className="font-[family-name:var(--font-space-grotesk)] font-bold text-sm">
                    {lang.name}
                  </div>
                  <div className="text-xs text-muted font-[family-name:var(--font-jetbrains-mono)]">
                    {lang.ext}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {lang.tier1 && (
                  <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] px-2 py-0.5 rounded-full bg-cyan/10 text-cyan">
                    {lang.tier1}
                  </span>
                )}
                {lang.tier2 && (
                  <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] px-2 py-0.5 rounded-full bg-neon/10 text-neon">
                    {lang.tier2}
                  </span>
                )}
                {lang.tier3 && (
                  <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] px-2 py-0.5 rounded-full bg-violet/10 text-violet">
                    {lang.tier3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
