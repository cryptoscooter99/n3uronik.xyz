import type { Metadata } from "next";
import Link from "next/link";
import { DocsCopy } from "../components";

export const metadata: Metadata = {
  title: "Documentation — CLM",
  description: "Install, connect and use Crystal Lattice Memory.",
  openGraph: { title: "Documentation — CLM", description: "Install, connect and use Crystal Lattice Memory.", images: [] },
  twitter: { title: "Documentation — CLM", description: "Install, connect and use Crystal Lattice Memory.", images: [] },
};

export default function DocsPage() {
  return <div className="clm-shell"><main className="docsSite">
    <nav className="docsNav"><Link className="siteLogo" href="/clm">CLM<span>°</span></Link><div><Link href="/clm">Overview</Link><a className="active" href="/clm/docs">Documentation</a><a href="https://github.com/cryptoscooter99/C.L.M">GitHub ↗</a><Link href="/">n3uronik ↖</Link></div></nav>
    <header className="docsHero"><small>Documentation / v3</small><h1>Start with<br /><em>memory.</em></h1><p>Install CLM, save the first durable fact and connect every CLI agent to one local source of context.</p></header>
    <div className="docsLayout">
      <aside><a href="#quickstart">Quickstart</a><a href="#save">Save memory</a><a href="#recall">Recall</a><a href="#architecture">Architecture</a><a href="#agents">Connect agents</a><a href="#security">Security</a></aside>
      <article className="docsContent">
        <section id="quickstart"><small>01 / Quickstart</small><h2>Install CLM.</h2><p>The core package includes SQLite storage and FTS5 keyword recall. Add the optional local embedding model for semantic retrieval.</p><DocsCopy command="pip install 'clm-memory[all]'" /><p>CLM writes its database to <code>~/.clm/clm.db</code>. Override that location with <code>CLM_DB_PATH</code>.</p></section>
        <section id="save"><small>02 / Capture</small><h2>Save what changed.</h2><p>Store durable facts, decisions, preferences and project state. Pin only context that should appear at every startup.</p><DocsCopy command={'clm save "Deploy via git push" --kind preference --importance 0.9 --pin'} /><div className="docsTable"><span>--kind</span><p>note, fact, preference, project, decision, bug, identity or task</p><span>--importance</span><p>Relevance weight from 0.0 to 1.0</p><span>--pin</span><p>Include in the automatic hot layer</p></div></section>
        <section id="recall"><small>03 / Retrieve</small><h2>Ask naturally.</h2><p>Recall combines exact search, semantic similarity and typed associative spreading. The output includes the score and retrieval path.</p><DocsCopy command={'clm recall "How do we release to production?"'} /></section>
        <section id="architecture"><small>04 / Architecture</small><h2>Two layers,<br />one database.</h2><div className="architectureCards"><div><b>Hot</b><h3>Automatic continuity</h3><p>Pinned and salient memories are written between managed markers in an agent startup file.</p></div><div><b>Cold</b><h3>On-demand recall</h3><p>The full local store stays queryable through the CLI and MCP without filling every context window.</p></div></div></section>
        <section id="agents"><small>05 / Integrations</small><h2>Connect your agents.</h2><h3>Claude Code</h3><DocsCopy command="claude mcp add clm -- python ~/ai/clm/mcp_server.py" /><h3>Codex</h3><pre><code>{`[mcp_servers.clm]\ncommand = "python"\nargs = ["~/ai/clm/mcp_server.py"]`}</code></pre><p>Any MCP-speaking client can use the same five tools: save, recall, link, boot and stats.</p></section>
        <section id="security"><small>06 / Security</small><h2>Memory is not<br />a secret store.</h2><p>SecretGate rejects credential-shaped content at the write boundary. Store secrets in 1Password and save only their <code>op://Vault/Item/field</code> references in CLM.</p><a className="docsButton" href="https://github.com/cryptoscooter99/C.L.M/blob/master/SECRETS.md">Read the security model ↗</a></section>
      </article>
    </div>
    <footer className="docsFooter"><Link href="/clm">← Return to overview</Link><span>Crystal Lattice Memory</span><Link href="/">n3uronik ↖</Link></footer>
  </main></div>;
}
