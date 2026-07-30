# Liquid Index

Reusable visual direction preserved from the initial n3uronik concept round.
This is a template for a future project, not the production n3uronik interface.

## Visual character

A bright future-editorial system: warm bone and soft silver space, oversized
black typography, cobalt actions, iridescent liquid-chrome forms, and frosted
project panels placed at different spatial depths. It should feel tactile,
art-directed, and optimistic rather than cyberpunk.

## Design tokens

- Canvas: `#F1EEE7` blending toward `#D9DDE1`
- Ink: `#0A0A0B`
- Cobalt: `#174AFF`
- Reflections: cyan `#83E6FF`, violet `#A38BFF`, champagne `#F4D7A1`
- Glass: `rgba(255,255,255,.42)`
- Glass border: `rgba(255,255,255,.72)`
- Display type: Instrument Sans 400, `clamp(72px, 7.25vw, 112px)`,
  line-height `.82`, letter-spacing `-.065em`
- UI type: Instrument Sans 500–600
- Numerals: Roboto Mono 300, 42–48px

## Composition

- 1440×900 reference viewport
- Header inset 56px vertically and 64px horizontally
- Hero begins around x:64 / y:164 and occupies about 700px
- Full-bleed liquid-chrome ribbon travels lower-left to upper-right
- Four 280×158px frosted cards float independently around the ribbon
- Cobalt primary action: 290×62px with a restrained 3px radius

## Motion language

- The liquid field breathes over an 18–24 second cycle
- Pointer parallax stays within 2–4 degrees and ±18px
- Cards drift 4–10px with damped spring movement
- Headline lines reveal upward with a 70ms stagger
- Reduced-motion mode uses a static mesh and opacity-only reveals

## Reference

See `liquid-index-reference.jpg` in this directory. The reference is a visual
contract for hierarchy, balance, surface treatment, and the placement logic of
the floating catalog cards.
