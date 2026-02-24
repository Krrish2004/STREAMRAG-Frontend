import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
  },
  title: "StreamRAG | Real-time Code Graph for Claude Code",
  description:
    "Give Claude Code structural superpowers. Real-time incremental code graph with 15 native MCP tools. 52% fewer tokens, 33% faster, 7 languages supported.",
  keywords: [
    "StreamRAG",
    "Claude Code",
    "MCP tools",
    "code graph",
    "code intelligence",
    "AST parsing",
    "developer tools",
    "AI coding",
  ],
  authors: [{ name: "StreamRAG" }],
  openGraph: {
    title: "StreamRAG | Structural Superpowers for Claude Code",
    description:
      "Real-time incremental code graph with 15 native MCP tools. 52% fewer tokens. 33% faster. Production-grade from day one.",
    type: "website",
    siteName: "StreamRAG",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamRAG | Structural Superpowers for Claude Code",
    description:
      "Real-time incremental code graph with 15 native MCP tools. 52% fewer tokens. 33% faster.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
