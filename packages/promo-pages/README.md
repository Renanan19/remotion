# @remotion/promo-pages

## Usage

This is an internal package and has no documentation.

## Running the landing locally (this fork)

From the repo root, once per clone or after pulling:

```bash
bun install --ignore-scripts                              # ~2 min
bunx turbo run make --filter='@remotion/promo-pages^...'  # ~20 s, builds the workspace deps
```

Then:

```bash
cd packages/promo-pages
bun server.ts        # http://localhost:3000
```

The turbo step is not optional. Workspace packages resolve through their
`dist/` output, so without it `bun server.ts` fails with
`Could not resolve: "@remotion/design"`.

Checks before committing:

```bash
../../node_modules/.bin/tsc --noEmit                      # types
npx prettier --write "src/**/*.{ts,tsx,css}"              # formatting
```

`bun run lint` also runs eslint, which currently fails on Windows with a
`C:\C:\...` path bug while loading `eslint-plugin-react-hooks`. That failure
is environmental, not a code problem.

## Design direction (this fork only)

The landing is styled as an instrument panel: dark operating mode by default,
warm archive paper in light mode, hairline borders, mono for every label and
number, Instrument Serif for display sizes.

- Design tokens and utilities: `src/index.css` (`hud`, `term`, `display`,
  `readout`, `corner-ticks`, `blueprint-grid`, `grain`).
- Chrome components: `src/components/homepage/cult/`.
- `NewLanding` takes a `standalone` prop. The standalone bundle passes it and
  gets the fixed HUD plus the boot sequence; the docs site leaves it off so
  the landing renders under its own navbar.
- Self-hosted fonts live in `public/fonts` (IBM Plex Mono, Instrument Serif,
  both OFL). GT Planar stays for interactive UI and is licensed separately —
  see the note in `public/fonts/LICENSE.md` before reusing this outside the
  Remotion repo.
