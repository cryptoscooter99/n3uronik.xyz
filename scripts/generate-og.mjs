#!/usr/bin/env node
/**
 * Regenerate public/og.png — the social share card.
 *
 *   node scripts/generate-og.mjs
 *
 * This exists so the card is not an unexplained binary in the repo. It is a
 * still echo of the site's own hero: streamlines advected through the same
 * kind of layered sine field the WebGL shader uses, in the site's violet and
 * cyan, carrying the same headline.
 *
 * ⚠️ PNG, NOT SVG, AND THAT IS NOT NEGOTIABLE. The major social scrapers do
 * not rasterise SVG, so an SVG card is silently no card at all — which is the
 * exact failure this image was added to fix.
 *
 * REQUIREMENTS: Google Chrome (for rendering). macOS path is used by default;
 * override with CHROME=/path/to/chrome. No npm dependencies, deliberately —
 * a build-time image toolchain is not worth carrying for an asset that
 * changes once a year.
 */
import { mkdtempSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const W = 1200;
const H = 630;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "og.png");

const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Deterministic PRNG so regenerating without edits reproduces the same card.
let seed = 7;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};
const between = (a, b) => a + rand() * (b - a);

/** The flow field the streamlines follow. */
const field = (x, y) =>
  Math.sin(x * 0.0042) * 1.5 +
  Math.cos(y * 0.0051) * 1.2 +
  Math.sin((x + y) * 0.0027) * 1.1 +
  Math.cos(x * 0.0015 - y * 0.0019) * 0.9;

const paths = [];
for (let i = 0; i < 190; i += 1) {
  let x = between(-120, W + 120);
  let y = between(-80, H + 80);
  const pts = [];
  for (let s = 0; s < 150; s += 1) {
    const angle = field(x, y) * 1.05;
    x += Math.cos(angle) * 4.6;
    y += Math.sin(angle) * 4.6;
    if (x < -200 || x > W + 200 || y < -200 || y > H + 200) break;
    pts.push([x.toFixed(1), y.toFixed(1)]);
  }
  if (pts.length <= 18) continue;
  // Colour by where the line starts: violet high, cyan low — the site's accents.
  const t = Math.min(Math.max(Number(pts[0][1]) / H, 0), 1);
  const r = Math.round(0x83 + (0x21 - 0x83) * t);
  const g = Math.round(0x57 + (0xd9 - 0x57) * t);
  const b = Math.round(0xff + (0xe8 - 0xff) * t);
  const d = `M${pts.map(([px, py]) => `${px} ${py}`).join(" L")}`;
  paths.push(
    `<path d="${d}" fill="none" stroke="rgb(${r},${g},${b})" stroke-opacity="${between(0.14, 0.5).toFixed(2)}" stroke-width="${between(0.7, 2).toFixed(1)}" stroke-linecap="round"/>`,
  );
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<radialGradient id="glow" cx="68%" cy="42%" r="62%">
  <stop offset="0%" stop-color="#8357ff" stop-opacity="0.34"/>
  <stop offset="55%" stop-color="#5b3fd6" stop-opacity="0.12"/>
  <stop offset="100%" stop-color="#050507" stop-opacity="0"/>
</radialGradient>
<linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%" stop-color="#050507" stop-opacity="0.97"/>
  <stop offset="46%" stop-color="#050507" stop-opacity="0.72"/>
  <stop offset="100%" stop-color="#050507" stop-opacity="0"/>
</linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="#050507"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<g>${paths.join("")}</g>
<rect width="${W}" height="${H}" fill="url(#fade)"/>
</svg>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:#050507;font-family:'Geist','Inter','Helvetica Neue',Arial,sans-serif;
     -webkit-font-smoothing:antialiased;position:relative}
.bg{position:absolute;inset:0;background-image:url('bg.svg');background-size:${W}px ${H}px}
.grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(242,242,238,.045) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(242,242,238,.045) 1px,transparent 1px);
  background-size:80px 80px}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;justify-content:space-between}
.mark{font-size:26px;font-weight:600;letter-spacing:-.01em;color:#f2f2ee}
.status{display:flex;align-items:center;gap:9px;font-family:ui-monospace,'SF Mono',Menlo,monospace;
        font-size:12.5px;letter-spacing:.13em;text-transform:uppercase;color:#9c9ba8}
.dot{width:7px;height:7px;border-radius:50%;background:#21d9e8;box-shadow:0 0 10px #21d9e8}
h1{font-size:74px;line-height:1.02;letter-spacing:-.035em;font-weight:500;color:#f2f2ee;max-width:15ch}
.eyebrow{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:13px;letter-spacing:.2em;
         text-transform:uppercase;color:#8357ff;margin-bottom:22px}
.bottom{display:flex;align-items:flex-end;justify-content:space-between}
.tags{display:flex;gap:9px}
.tags span{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:11.5px;letter-spacing:.09em;
  text-transform:uppercase;color:#9c9ba8;border:1px solid rgba(242,242,238,.16);
  border-radius:999px;padding:7px 15px}
.coords{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:12px;color:#6a6976;
        text-align:right;line-height:1.7}
</style></head><body>
<div class="bg"></div><div class="grid"></div>
<div class="wrap">
  <div class="top">
    <div class="mark">n3uronik</div>
    <div class="status"><span class="dot"></span>Independent studio — New Orleans</div>
  </div>
  <div>
    <div class="eyebrow">Portfolio / 2026</div>
    <h1>Independent systems, interfaces, and live experiences.</h1>
  </div>
  <div class="bottom">
    <div class="tags"><span>Systems</span><span>Payments</span><span>WebGL</span><span>Automation</span></div>
    <div class="coords">29.9511° N<br>90.0715° W</div>
  </div>
</div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), "n3-og-"));
writeFileSync(join(dir, "bg.svg"), svg);
writeFileSync(join(dir, "card.html"), html);

execFileSync(
  CHROME,
  [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${W},${H}`,
    `--screenshot=${join(dir, "og.png")}`,
    `file://${join(dir, "card.html")}`,
  ],
  { stdio: "ignore" },
);

copyFileSync(join(dir, "og.png"), OUT);
console.log(`wrote ${OUT} (${W}x${H}, ${paths.length} streamlines)`);
