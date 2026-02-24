"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-cyan/20" />
                <svg
                  viewBox="0 0 32 32"
                  className="relative w-8 h-8"
                  fill="none"
                >
                  <path
                    d="M8 8L16 4L24 8V16L16 20L8 16V8Z"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 16L16 20L24 16V24L16 28L8 24V16Z"
                    stroke="#39ff14"
                    strokeWidth="1.5"
                  />
                  <circle cx="16" cy="12" r="2" fill="#00f0ff" />
                  <circle cx="16" cy="24" r="2" fill="#39ff14" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
                <span className="text-cyan">Stream</span>
                <span className="text-foreground">RAG</span>
              </span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed mb-4">
              Real-time incremental code graph engine that gives Claude Code
              structural superpowers. Open source, built for production.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs font-[family-name:var(--font-jetbrains-mono)] text-neon">
                1700+ tests passing
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-sm mb-4 text-foreground">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Research Paper", href: "https://doi.org/10.65138/ijtrp.2026.v2i2.15" },
                { label: "GitHub", href: "https://github.com/Krrish2004/StreamRAG" },
                { label: "Benchmarks", href: "#benchmarks" },
                { label: "Architecture", href: "#architecture" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-cyan transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-sm mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Features", href: "#features" },
                { label: "Languages", href: "#languages" },
                { label: "Install", href: "#install" },
                { label: "License", href: "https://github.com/Krrish2004/StreamRAG/blob/main/LICENSE" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-cyan transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-[family-name:var(--font-jetbrains-mono)]">
            &copy; {new Date().getFullYear()} StreamRAG. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Krrish2004/StreamRAG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-cyan transition-colors"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
