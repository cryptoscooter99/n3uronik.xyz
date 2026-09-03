"use client";

import { useMemo, useState } from "react";

type Memory = { id: number; kind: "preference" | "decision" | "project" | "identity" | "fact"; content: string; terms: string[]; importance: number };

const memoryIndex: Memory[] = [
  { id: 42, kind: "preference", content: "Deploy commercial projects by git push; Vercel handles the release.", terms: ["deploy", "ship", "release", "vercel", "production", "push"], importance: .94 },
  { id: 18, kind: "decision", content: "Keep production releases reversible and verify the live path after every deploy.", terms: ["deploy", "release", "production", "verify", "reversible"], importance: .84 },
  { id: 73, kind: "project", content: "SoundMoney uses React, Vite, Vercel and Supabase Postgres.", terms: ["soundmoney", "stack", "react", "vite", "vercel", "supabase", "project"], importance: .77 },
  { id: 11, kind: "identity", content: "Scott is a solo operator, builder and trader who prefers direct, action-first replies.", terms: ["scott", "who", "identity", "builder", "trader", "reply", "communication"], importance: .91 },
  { id: 65, kind: "fact", content: "CLM stores shared agent memory in a local SQLite database with WAL mode enabled.", terms: ["clm", "database", "store", "sqlite", "local", "memory", "wal"], importance: .88 },
  { id: 54, kind: "decision", content: "Secrets live in 1Password; memory stores only op:// references.", terms: ["secret", "password", "credential", "1password", "security", "reference"], importance: .96 },
];

function rankMemories(query: string) {
  const words = query.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return memoryIndex.map((memory) => {
    const matches = memory.terms.filter((term) => words.some((word) => term.includes(word) || word.includes(term))).length;
    const semanticBoost = /how|what|where|who|remember|about/.test(query.toLowerCase()) ? .08 : 0;
    return { ...memory, score: Math.min(.99, memory.importance * .55 + matches * .13 + semanticBoost) };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}

export function RecallDemo() {
  const [query, setQuery] = useState("How does Scott deploy?");
  const [submitted, setSubmitted] = useState(query);
  const [pulse, setPulse] = useState(0);
  const results = useMemo(() => rankMemories(submitted), [submitted]);
  function recall() { setSubmitted(query.trim() || "What should I remember?"); setPulse((value) => value + 1); }
  return <div className="recallDemo"><div className="recallDemoTop"><span>CLM / semantic recall</span><b><i /> local / ready</b></div><div className="recallQuery"><span>›</span><input aria-label="Ask CLM a memory question" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && recall()} /><button onClick={recall}>Recall</button></div><div className="querySuggestions"><span>Try:</span>{["Where are secrets stored?", "What is CLM built on?", "Who is Scott?"].map((suggestion) => <button key={suggestion} onClick={() => { setQuery(suggestion); setSubmitted(suggestion); setPulse((value) => value + 1); }}>{suggestion}</button>)}</div><div className="recallResults" key={pulse} aria-live="polite">{results.map((memory, index) => <article key={memory.id} style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}><div><span>#{memory.id}</span><b>{memory.kind}</b><small>score {memory.score.toFixed(2)}</small></div><p>{memory.content}</p></article>)}</div><div className="recallFoot"><span>{results.length} memories surfaced</span><span>local simulation · no network</span></div></div>;
}

const installOptions = { core: { label: "Core", command: "pip install clm-memory", detail: "FTS5 keyword recall and SQLite storage" }, semantic: { label: "Semantic", command: "pip install 'clm-memory[embeddings]'", detail: "Adds local semantic embeddings" }, mcp: { label: "MCP", command: "pip install 'clm-memory[all]'", detail: "Complete agent integration" } };

export function InstallChooser() {
  const [active, setActive] = useState<keyof typeof installOptions>("core");
  const [copied, setCopied] = useState(false);
  const selected = installOptions[active];
  async function copy() { await navigator.clipboard.writeText(selected.command); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  return <div className="installChooser"><div className="installTabs" role="tablist" aria-label="Installation options">{Object.entries(installOptions).map(([key, option]) => <button role="tab" aria-selected={active === key} className={active === key ? "active" : ""} key={key} onClick={() => { setActive(key as keyof typeof installOptions); setCopied(false); }}>{option.label}</button>)}</div><button className="copyInstall" onClick={copy} aria-label={`Copy ${selected.label} installation command`}><code><span>$</span> {selected.command}</code><b>{copied ? "Copied" : "Copy"}</b></button><p>{selected.detail}</p></div>;
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className={`mobileMenu ${open ? "open" : ""}`}><button className="mobileMenuToggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span>{open ? "Close" : "Menu"}</span><i /><i /></button><div id="mobile-navigation" className="mobileMenuPanel" aria-hidden={!open}><a onClick={() => setOpen(false)} href="#system">System</a><a onClick={() => setOpen(false)} href="#recall">Recall</a><a onClick={() => setOpen(false)} href="#install">Install</a><a onClick={() => setOpen(false)} href="/clm/docs">Documentation</a><a onClick={() => setOpen(false)} href="https://github.com/cryptoscooter99/C.L.M">GitHub ↗</a><a onClick={() => setOpen(false)} href="/">n3uronik ↖</a></div></div>;
}

export function DocsCopy({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(command); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
  return <button className="docsCode" onClick={copy}><code>{command}</code><span>{copied ? "Copied" : "Copy"}</span></button>;
}
