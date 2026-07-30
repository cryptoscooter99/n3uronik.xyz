# n3uronik.xyz

The portfolio and operating catalog for n3uronik: independent systems,
interfaces, ventures, and live experiences built by Scooter in New Orleans.

## Experience

The production direction is **Neural Flux**—a dark editorial interface with a
generative Three.js flow field, responsive venture catalog, technical metadata,
scroll-reactive navigation, and a lightweight CSS fallback for browsers where
WebGL is unavailable.

Featured work:

- n3uronik — AI-operated website research, demo, outreach, and sales pipeline
- Tip Doll — performer-first sound money interface
- Karma Doll — live experience platform and cinematic EPK
- Fleur Collective — multi-market resale operating system

The alternate **Liquid Index** concept is preserved as a reusable visual
template in [`docs/design-templates/liquid-index`](docs/design-templates/liquid-index).

## Stack

- React 19
- Next.js-compatible Vinext runtime
- Three.js and custom GLSL
- Tailwind CSS 4
- Cloudflare Workers deployment target

## Development

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run build
npm run validate:artifact
```

## Structure

- `app/page.tsx` — portfolio content, interaction, and WebGL flow field
- `app/globals.css` — complete responsive visual system
- `docs/design-templates/` — preserved design directions for reuse
- `worker/` and `build/` — Cloudflare-compatible runtime
