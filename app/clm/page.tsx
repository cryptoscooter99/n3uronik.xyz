import { InstallChooser, MobileMenu, RecallDemo } from "./components";

export default function ClmHome() {
  return (
    <div className="clm-shell">
      <main className="site">
        <nav className="siteNav">
          <a className="siteLogo" href="#top" aria-label="CLM home">CLM<span>°</span></a>
          <div><a href="#system">System</a><a href="#recall">Recall</a><a href="/clm/docs">Docs</a><a href="#install">Install</a></div>
          <a className="navGithub" href="/">n3uronik ↖</a>
          <MobileMenu />
        </nav>
        <header className="latticeHero" id="top">
          <div className="latticeEyebrow"><i /> Local system · memory online</div>
          <h1>Agents forget.<br /><em>CLM remembers.</em></h1>
          <p>A local-first memory layer that gives every CLI agent continuity—across sessions, tools and the work that matters.</p>
          <div className="latticeHeroActions"><a href="#install">Install CLM <span>↓</span></a><a href="#system">See how it works</a></div>
          <div className="latticeField" aria-hidden="true"><div className="fieldOrbit orbitOne"><i /><i /><i /></div><div className="fieldOrbit orbitTwo"><i /><i /></div><b>context<br /><span>restored</span></b></div>
          <div className="heroSideNote">01 / 05<br /><span>Persistent context<br />without the cloud.</span></div>
        </header>

        <section className="latticeStatement reveal"><small>The continuity problem</small><p>Your agent can reason for hours, make decisions, learn your preferences—then begin the next session knowing none of it.</p><strong>CLM turns finished sessions into durable context.</strong></section>

        <section className="layersSection" id="system">
          <div className="layersSticky"><small>Two layers. One memory.</small><h2>Present when needed.<br /><em>Invisible when not.</em></h2><p>Important context arrives automatically. Everything else stays searchable, local and out of the way.</p><a className="textLink" href="/clm/docs#architecture">Read the architecture →</a></div>
          <div className="layerCards"><article><div className="layerNumber">01</div><div className="layerGlyph hotGlyph"><i /><i /><i /></div><small>Hot layer</small><h3>Continuity at startup.</h3><p>Pinned facts and high-salience memories are injected into each agent&apos;s startup context. No prompt. No tool call. It simply begins informed.</p><code>clm boot ~/.claude/CLAUDE.md</code></article><article><div className="layerNumber">02</div><div className="layerGlyph coldGlyph"><i /><i /><i /><i /></div><small>Cold layer</small><h3>Recall on demand.</h3><p>Keyword search, local embeddings and associative links find the right memory—even when your question uses different words.</p><code>clm recall &quot;how do we ship?&quot;</code></article></div>
        </section>

        <section className="retrievalSection reveal"><div><small>Hybrid retrieval</small><h2>Meaning,<br />not matching.</h2></div><div className="retrievalFlow"><article><span>01</span><h3>Exact signal</h3><p>FTS5 and BM25 find precise language instantly.</p></article><article><span>02</span><h3>Semantic signal</h3><p>Local embeddings understand paraphrase and intent.</p></article><article><span>03</span><h3>Associated signal</h3><p>Typed links surface decisions connected through real work.</p></article></div></section>

        <section className="latticeRecall" id="recall"><div className="recallIntro"><small>Ask naturally</small><h2>The words can change.<br /><em>The memory stays.</em></h2><p>Try the local demo. CLM ranks direct and associated memories, explains why they surfaced, and never sends your context to an API.</p></div><RecallDemo /></section>

        <section className="localProof reveal"><div className="proofOrb"><span>100%</span><small>local</small></div><div><small>Built for trust</small><h2>Your memory<br />stays yours.</h2><p>One inspectable SQLite database. Offline embeddings. WAL-safe access for multiple agents. SecretGate blocks credentials before they enter memory, while 1Password references keep secure operations useful.</p></div><ul><li><span>01</span>No cloud account</li><li><span>02</span>No telemetry</li><li><span>03</span>No vendor lock-in</li><li><span>04</span>Human-readable records</li></ul></section>

        <section className="agentStrip"><span>Shared context for</span><b>Claude Code</b><i /><b>Codex</b><i /><b>Kimi</b><i /><b>Any MCP client</b></section>

        <section className="latticeInstall" id="install"><small>Open source · MIT</small><h2>Give your agents<br /><em>a past.</em></h2><InstallChooser /><p>Python 3.10+ · macOS and Linux · fully local at runtime</p><div className="installLinks"><a href="/clm/docs">Quickstart documentation →</a><a href="https://github.com/cryptoscooter99/C.L.M">Read the source on GitHub ↗</a></div></section>
        <footer className="siteFooter"><a className="siteLogo" href="#top">CLM<span>°</span></a><p>Persistent memory for CLI agents.</p><div><a href="/clm/docs">Docs</a><a href="https://github.com/cryptoscooter99/C.L.M/blob/master/LICENSE">MIT License</a><a href="/">n3uronik ↖</a></div></footer>
      </main>
    </div>
  );
}
