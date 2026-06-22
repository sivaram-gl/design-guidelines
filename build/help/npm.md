# Node package (coming soon)

A future npm package that ships the design system as **code-level tokens** — colors, type scale, spacing, breakpoints — generated from a canonical `tokens.json` per system. Same source of truth as the markdown spec, but consumable directly by your build pipeline.

## Planned shape

```bash
npm install @greatlearning/<system>-design-system
```

```ts
import { colors, type, spacing } from '@greatlearning/<system>-design-system';
import '@greatlearning/<system>-design-system/css'; // CSS custom properties
```

- **JS/TS exports** for use in React/Tamagui/Rails view helpers.
- **CSS custom properties** for stylesheets.
- **JSON tokens** for design tools and downstream generators.

## Why it isn't ready yet

The packages will be generated from a canonical `tokens.json` per system. That file doesn't exist yet — adding it is the next milestone after the markdown specs stabilize. Until then, the markdown spec is the authoritative source: copy the hex values into your own theme, then swap to the package when it ships.
