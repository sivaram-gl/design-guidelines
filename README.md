# Great Learning Design Systems — distribution hub

A GitHub Pages site that lets anyone pick a Great Learning **design system**, pick a **file type** (Claude skill, markdown spec, or Node package), and download it.

Three systems live here:

| System | Audience | Stack |
| --- | --- | --- |
| **Jedi** | Internal / admin app (staff, ops) | MUI v5 + React |
| **Magna** | Learner / student-facing app | Tamagui monorepo (Material 3) |
| **GLDS Web** | Marketing / landing pages (Academy+) | Rails + HTML/CSS/JS/jQuery |

The hand-built markdown specs (extracted from production Figma files) are the **source of truth**. Everything in `/dist` and `/docs/downloads` is generated from them by `npm run build`.

## Repo layout

```
systems/
  jedi/        spec.md  context.md
  magna/       spec.md  context.md
  glds-web/    spec.md  context.md
build/
  build.mjs        # the generator
  help/            # per-file-type "how to use" docs
dist/              # generated artifacts (committed)
docs/              # GitHub Pages site (committed)
  downloads/       # mirror of dist/ so Pages serves the files
site/              # Vite + React + MUI source for the site
```

## How `updatedBy` / `updatedAt` works

Each system's "last updated by" credit lives **per file** and is sticky:

1. If `systems/<id>/spec.md` frontmatter has `updatedBy` / `updatedAt`, those win.
2. Otherwise the build reads `git log -1` for that file and uses the last author + date.
3. Editing one system's spec **never** changes another system's credit.

This is the transparency feature surfaced on every card and download screen.

## Build & develop locally

```bash
npm install
npm run build            # regenerate dist/, docs/manifest.json, docs/downloads/, and the built SPA
npm run dev:site         # live-edit the SPA against the last build's manifest
npm run serve:docs       # serve /docs locally on http://localhost:4173 (mimics Pages)
```

Editing a `systems/<id>/spec.md` and re-running `npm run build` updates that system's skill, MD passthrough, and manifest entry only — other systems are untouched.

## Source files policy

The six markdown files under `systems/` are **final**. The only sanctioned edit is the YAML frontmatter block at the top of each `spec.md` (and even then, the body underneath must remain byte-identical to the original Figma extraction). Context files have no frontmatter and stay byte-for-byte the originals.

## GitHub Pages deployment

Pages is configured to serve from the **`/docs` folder on `main`**. After a successful `npm run build`, commit the updated `/dist`, `/docs/manifest.json`, `/docs/downloads/`, and the rebuilt SPA assets, then push to `main`. GitHub Pages picks it up automatically — no Actions workflow required.

When the repo's Pages URL is finalized, the site will be reachable at `https://<owner>.github.io/<repo>/`. The SPA uses a relative base path so the same build works under any project subpath.

## Generating the skills, MDs, and manifest

The build script:

- reads `systems/<id>/spec.md` (frontmatter + body) and `systems/<id>/context.md`,
- emits `dist/<id>/skill/SKILL.md` with skill-style frontmatter (the `description` is the per-system triggering string baked into `build/build.mjs`) and zips it to `dist/<id>/<id>-design-system.skill`,
- copies the spec MD (with its frontmatter intact) and the context MD into `dist/<id>/`,
- scaffolds a `dist/<id>/npm/` placeholder package (`@greatlearning/<id>-design-system@0.0.0`) marked unavailable in the manifest,
- writes `dist/manifest.json` (and a copy at `docs/manifest.json`) listing every system, every file, sizes, and the `updatedBy` / `updatedAt` for each,
- mirrors `dist/` into `docs/downloads/` so the static Pages site can serve the artifacts directly.

## Local-only — not yet published

This repo currently runs locally only. It will be pushed to GitHub and Pages enabled once you give the go-ahead.
