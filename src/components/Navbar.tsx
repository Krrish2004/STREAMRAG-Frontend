"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Languages", href: "#languages" },
  { label: "Paper", href: "https://doi.org/10.65138/ijtrp.2026.v2i2.15", external: true },
  { label: "Install", href: "#install" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg bg-cyan/20 group-hover:bg-cyan/30 transition-colors" />
            <svg
              viewBox="0 0 32 32"
              className="relative w-8 h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8L16 4L24 8V16L16 20L8 16V8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-cyan"
              />
              <path
                d="M8 16L16 20L24 16V24L16 28L8 24V16Z"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-neon"
              />
              <circle cx="16" cy="12" r="2" className="fill-cyan" />
              <circle cx="16" cy="24" r="2" className="fill-neon" />
            </svg>
          </div>
          <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold tracking-tight">
            <span className="text-cyan">Stream</span>
            <span className="text-foreground">RAG</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm text-muted hover:text-cyan transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/Krrish2004/StreamRAG"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan/10 text-cyan border border-cyan/20 hover:bg-cyan/20 hover:border-cyan/40 transition-all duration-300"
          >
            GitHub
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted hover:text-cyan transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-muted hover:text-cyan transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/Krrish2004/StreamRAG"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-semibold text-cyan py-2"
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
