import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLM — Persistent memory for CLI agents",
  description:
    "Local-first memory shared across Claude Code, Codex, and other CLI agents.",
  openGraph: {
    title: "Agents forget. CLM remembers.",
    description: "Persistent, local-first memory shared across CLI AI agents.",
    url: "/clm",
    images: [],
  },
  twitter: {
    title: "Agents forget. CLM remembers.",
    description: "Persistent, local-first memory shared across CLI AI agents.",
    images: [],
  },
};

export default function ClmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
