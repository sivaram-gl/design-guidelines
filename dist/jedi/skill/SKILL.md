---
name: Jedi Design System
description: "Great Learning's INTERNAL/admin app design system (MUI + React, sovereign dashboards, light+dark, Inter). Use whenever building internal tools, admin panels, staff/ops UI, or dashboards for Great Learning — even if 'design system' isn't said. NOT for learner apps (use Magna) or marketing pages (use GLDS Web)."
---

# Jedi Design System — Source of Truth

**Scope:** Color + Typography (optimized layers) + Interaction & Behavioral guidelines + AI Engagement Protocol. Component visuals beyond this inherit MUI v5 defaults.
**Stack:** MUI v5+ · Light & Dark mode · Font: **Inter**
**Token source in code:** `getColors(mode)` (colors module) — also exported as CSS variables (`--primary-main`, `--text-secondary`, …). **Tokens are the interface; hex values in this doc are for verification only.**
**Philosophy:** Form follows function. Task completion beats decoration. Modern execution quality (polish, responsiveness, refined states) is welcome; decorative trends are not.
**Audience:** Internal staff + partners (admin/ops surfaces). For learner-facing surfaces, see the **Magna** design system instead.
**Companion file:** `jedi-design-system.context.md` — the lean version to paste into Claude/Codex/Cursor sessions.

---

## 1. Product postures

**Application posture: Sovereign** (Cooper). One codebase serves all surfaces; users live in it for long stretches and become intermediate users fast. Consequences: optimize for the returning user, density is acceptable, keyboard navigation is expected, minimal onboarding chrome, muted visual temperature (loud color and decoration become fatigue over hours), no tooltips as crutches for unclear labels.

**Audience postures** — the same surface serves two audiences; only density and tone shift, never tokens:

| Posture | Who | Design priority |
|---|---|---|
| **Internal** (staff/admin) | Ops, program managers | Information density allowed (dense table/menu variants), speed over hand-holding |
| **Partner** (semi-external) | Visiting faculty, part-time collaborators | Internal-grade efficiency with extra legibility and self-explanatory flows — they visit less often, so assume less learned context. When in doubt, follow Partner rules |

---

## 2. Color System

Token paths below are the **code's own names** from `getColors(mode)`. Reference them via the theme/CSS vars — never paste a hex into component code.

### 2.1 Text — `text.*`

| Token | Light | Dark |
|---|---|---|
| `text.primary` | `rgba(33,33,33,0.92)` | `#FFF` |
| `text.secondary` | `rgba(33,33,33,0.72)` | `rgba(255,255,255,0.70)` |
| `text.disabled` | `rgba(33,33,33,0.24)` | `rgba(255,255,255,0.50)` |
| `text.primary-shades-4-p / 12-p / 30-p` | ink @ 4 / 12 / 30% | white @ 12 / 30% (4-p: see code) |
| `text.secondary-shades-4-p / 18-p` | ink @ 4 / 18% | white @ 4 / 18% |

> Base ink is `#212121` with alpha — **not** pure black. Never substitute `#000`.

### 2.2 Brand / Semantic palettes

Each palette carries `main / dark / light / contrast` plus interaction shades (`shades-hover`, `shades-select`, `shades-12-p`, `shades-30-p`, `shades-50-p`); the four status palettes also carry `shades-160-p` (text-on-tint) and `shades-190-p` (tint background).

| Palette | Role | Light: main / dark / light | Dark: main / dark / light |
|---|---|---|---|
| `primary` | Brand actions, links, focus | `#196AE5` / `#0F4089` / `#4788EA` | `#66BBFF` / `#3A9AE8` / `#E8F0FC` |
| `secondary` | **Orange support accent** | `#FF9800` / `#EF6C00` / `#FFB74D` | `#FFCC80` / `#CA9B52` / `#FFFFB0` |
| `error` | Destructive, failures | `#FF3333` / `#D10B25` / `#F9494F` | `#F44336` / `#D32F2F` / `#E57373` |
| `warning` | Caution, pending | `#FFBF00` / `#FF6D00` / `#FFD44D` | `#FFA726` / `#F57C00` / `#FFB74D` |
| `info` | Neutral notices | = primary values | `#29B6F6` / `#0288D1` / `#4FC3F7` |
| `success` | Completion, positive | `#22BB34` / `#00880F` / `#74D176` | `#66BB6A` / `#388E3C` / `#81C784` |

Contrast text: `#FFF` on all light-mode palettes; `rgba(0,0,0,0.87)` on dark-mode palettes (except dark `error.contrast` = `#FFF`).

> **`secondary` is orange, not a second blue.** Supporting accents only. It is *not* a status color — caution belongs to `warning`.
> **`info` = `primary` in light mode** (one blue voice). They diverge in dark mode. Don't "fix" this.
> Dark-mode primary interaction shades are computed from `#8CB5F2`, not `main` — a codebase quirk, keep as-is.

### 2.3 Status tint recipe — `shades-160-p` on `shades-190-p`

The standard recipe for `<Alert>`, banners, and soft chips: background `190-p`, text/icon `160-p`. All pairs measured AA+:

| Palette | Light 160p / 190p | Dark 160p / 190p | Measured |
|---|---|---|---|
| `error` | `#7A2828` / `#FFEBEB` | `#FBB4AF` / `#180705` | 8.5:1 / 8.5:1 |
| `warning` | `#7A6014` / `#FFF9E5` | `#FFDCA8` / `#1A1104` | 5.7:1 / 14.3:1 |
| `info` | `#1E3E6F` / `#E8F0FC` | `#9ACFED` / `#000E15` | 9.3:1 / 11.7:1 |
| `success` | `#215F29` / `#E9F8EB` | `#C2E4C3` / `#0A130B` | 7.0:1 / 12+:1 |

(`secondary` has no 160/190 tokens — further evidence it is not a status palette.)

### 2.4 Action states — `action.*`

| Token | Light | Dark |
|---|---|---|
| `action.active` | ink @ 64% | white @ 64% |
| `action.hover` | ink @ 4% | white @ 8% |
| `action.selected` | ink @ 8% | white @ 16% |
| `action.disabled` | ink @ 26% | white @ 30% |
| `action.disabled-background` | ink @ 12% | white @ 12% |
| `action.focus` | ink @ 12% | white @ 12% |

### 2.5 Background & surfaces — `background.*`

| Token | Light | Dark |
|---|---|---|
| `background.default` | `#FAFAFA` | `#121212` |
| `background.paper-elevation-0` | `#FFF` | `#121212` |
| `paper-elevation-2 / 8 / 16 / 24` | `#FFF` (all) | `#1B1B1B` / `#252525` / `#383838` / `#4B4B4B` |

**This system is flat: cards and surfaces are always `variant="outlined"` — no shadows, no raised elevation, in either mode.** The `paper-elevation-*` tokens exist for the rare overlay surfaces that genuinely float (menus, dialogs, popovers) in dark mode; they are not a license to elevate cards.

### 2.6 Other — `other.*`

| Token | Light | Dark |
|---|---|---|
| `other.divider` | ink @ **6%** | white @ 12% |
| `other.outlined-border-23-p` | ink @ 23% | white @ 23% |
| `other.filled-input-background` | ink @ 6% | white @ 9% |
| `other.standard-input-line` | ink @ 42% | white @ 42% |
| `other.backdrop-overlay` | `rgba(33,33,33,0.5)` | same |
| `other.snackbar` | `#212121` | `#323232` |
| `other.rating-active` | `#FFB400` | same |

> Divider is **6% in light mode** by design — lighter than MUI's 12% default. **Use dividers sparingly: only when grouping cannot be achieved by spacing or an outlined surface.** AI-generated layouts tend to sprinkle dividers everywhere — between every list item, under every heading, around every section. Default to whitespace; reach for a divider only when content genuinely needs a hard separation (e.g., dense internal tables, menu groups).

### 2.7 Extended ramps — data-viz escape hatch only

Active in code: `grey`, `grey-a`, `purple`, `purple-a`, `light-blue`, `light-blue-a`, `yellow`, `yellow-a`, `blue`, `blue-a`, `blue-gray`. All other Material hues are commented out — **do not use or re-enable them in feature code.**

The `blue` ramp is customized: extra `blue.70` = `#0041B2`, and `blue.700` = `#0057B2` (not Material's `#1976D2`).

In dark mode the code **reverses each ramp** (50↔900) automatically — `grey.100` in dark resolves to a dark grey. Pick ramp steps by *role* (light step = subtle bg) and the reversal does the right thing.

These ramps are intended for charts, tag categories, and data visualization. For UI chrome (buttons, links, text, borders), prefer the semantic palettes — reaching for `blue.600` on a button usually means you wanted `primary.main`.

### 2.8 Basic — `basic.white` `#FFF`, `basic.black` `#000`. Mode-invariant; use for content that must not flip (e.g., imagery overlays).

---

## 3. Typography System

**Single family: Inter.** Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold). Load these three only.

### 3.1 Core scale — Desktop (≥ md breakpoint)

| MUI variant | Size | Weight | Line height | Letter spacing | Case |
|---|---|---|---|---|---|
| `h1` | 32px | 600 | 36px (1.125) | -0.4px | — |
| `h2` | 28px | 600 | 1.2 | -0.4px | — |
| `h3` | 24px | 600 | 1.167 | -0.4px | — |
| `h4` | 20px | 600 | 1.235 | -0.4px | — |
| `h5` | 18px | 600 | 1.334 | -0.4px | — |
| `subtitle1` | 16px | 500 | 1.75 | -0.4px | — |
| `subtitle2` | 14px | 500 | 1.57 | -0.4px | — |
| `body1` | 16px | 400 | 1.5 | 0 | — |
| `body2` | 14px | 400 | 1.43 | 0 | — |
| `caption` | 12px | 400 | 1.66 | 0.4px | — |
| `overline` | 10px | 600 | 1.66 | 1.25px | UPPERCASE |
| `button` (medium) | 14px | 500 | 24px | 0.4px | UPPERCASE |
| button large | 16px | 500 | 24px | 0.46px | UPPERCASE |
| button small | 12px | 500 | 16px | 0.46px | UPPERCASE |

Emphasis variants: Subtitle 1 Bold = 16/600/1.75/0.35px; Subtitle 2 Bold = 14/600/1.57/0.1px. Use these for emphasized labels instead of wrapping subtitles in `<b>`.

**There is no h6 in this system.** The scale stops at h5. If a sixth heading level seems needed, the page hierarchy is too deep — restructure instead.

### 3.2 Core scale — Mobile (< md breakpoint)

| Variant | Size / Line height | Letter spacing |
|---|---|---|
| h1 | 26px / 32px | -0.4px |
| h2 | 24px / 28px | -0.5px |
| h3 | 22px / 26px | -0.4px |
| h4 | 20px / 24px | -0.4px |
| h5 | 18px / 22px | -0.4px |
| subtitle1 | 16px / 24px | 0 |
| subtitle2 | 14px / 20px | 0 |
| body1 | 14px / 20px | 0 |
| body2 | 12px / 16px | 0 |
| caption | 10px / 16px | 0.4px |
| overline | 10px / 16px | 1.25px |

Note: **letter spacing relaxes to 0 on mobile** for subtitles/body — tight tracking hurts small-screen legibility.

### 3.3 Component type tokens

| Component | Spec |
|---|---|
| Input label | Inter 400, 12/12, 0.15px |
| Input text | Inter 400, 16/24, 0.15px |
| Helper text | Inter 400, 12/16, 0.4px |
| Chip | Inter 500, 12/16, 0.16px |
| Tooltip | Inter 500, 10/16, 0 |
| Alert title | Inter 500, 16/1.5, 0.15px |
| Table header | Inter 500, 14/24, 0.17px |
| Badge label | Inter 500, 12/16, 0.14px |
| Avatar initials | Inter 400, 20/24, 0.14px |
| Menu item | Inter 400, 16/1.5, 0.15px |
| Menu item (dense) | Inter 400, 14/24, 0.17px |
| List subheader | Inter 500, 14/48, 0.1px |
| Bottom nav active label | Inter 400, 14/24, 0.4px |

**Dark mode buttons step up to weight 600** (SemiBold) — light strokes on dark surfaces read thinner. Implement as a conditional in the Button override, not by asking devs to remember it.

### 3.4 Spacing scale

Non-linear, indexed: `[0, 4, 8, 16, 24, 32, 40, 48, 64, 96, 128]`.

**Not** MUI's default `8 × n`: `theme.spacing(3)` must yield **16px**, not 24px. Configure spacing as an array. The non-linear jump (…48 → 64 → 96 → 128) exists so large layout gaps come from a sanctioned set, not arbitrary multiples.

---

## 4. Usability Rules (non-negotiable)

Derived from **measured** WCAG contrast ratios of the shipped code values — facts of this system, not generic advice.

### 4.1 Measured contrast — light mode on white

| Token | Ratio | Verdict |
|---|---|---|
| `primary.main` `#196AE5` | 4.96:1 | ✅ AA text |
| `primary.dark` `#0F4089` | 9.93:1 | ✅ AAA |
| `error.main` `#FF3333` | 3.64:1 | ❌ fails AA text — fills/icons/large text only |
| `error.dark` `#D10B25` | 5.55:1 | ✅ AA text |
| `success.main` `#22BB34` | 2.55:1 | ❌ fills only |
| `success.dark` `#00880F` | 4.64:1 | ✅ AA text |
| `warning.main` `#FFBF00` | **1.65:1** | ❌ never as text or icon-only signal |
| `warning.dark` `#FF6D00` | 2.82:1 | ❌ still fails — fills only |
| `secondary.main` `#FF9800` | 2.16:1 | ❌ fills only |
| `secondary.dark` `#EF6C00` | 3.08:1 | ⚠️ large text / ≥24px icons only |
| All 160p-on-190p pairs | 5.7–14.3:1 | ✅ AA+ |
| Dark mode: `primary.main` on `#121212` | 9.03:1 | ✅ AAA |

### 4.2 The rules that follow

1. **Colored text in light mode uses the `dark` variant** of the palette (`error.dark`, `success.dark`) — never `main`. `main` is for fills, borders, icons ≥ 24px, and large text.
2. **Warning has no text-safe solid in light mode** — both `main` (1.65:1) and `dark` (2.82:1) fail. Warning copy is `text.primary` plus a warning-colored icon, or the 160p/190p tint recipe. Amber text is forbidden, full stop.
3. **Secondary (orange) is decorative, not semantic.** Never use it to mean "caution" — that's `warning`'s job via the tint recipe. Secondary text in light mode: `secondary.dark` at ≥18px only.
4. **Tinted surfaces**: bg `shades-190-p`, text `shades-160-p`. Never `main` text on a `190-p` background.
5. **Never communicate state through color alone.** Every error has icon + message; every success has icon or explicit copy. Strict on all postures — color-blind staff exist too.
6. **Focus must be visible.** Don't suppress MUI's focus ring. Keyboard navigation is first-class on all postures (sovereign requirement).
7. **Touch targets ≥ 44×44px on partner-facing surfaces.** Small buttons (12px label) belong in internal data-dense views only. `[Fitts's law]`
8. **Disabled = `action.disabled` + `action.disabled-background`**, never a manual opacity drop — that breaks contrast of adjacent helper text.
9. **Body text below 12px is forbidden** on partner-facing surfaces. 10px (mobile caption, overline, tooltip) is for non-essential metadata.
10. **Density by posture:** internal tools may use dense menu items and compact tables; partner-facing surfaces use standard density. Never mix densities in one view.

### 4.3 Semantic elements & accessible names

The element decides the behavior screen readers and keyboards expect — looks are styling, semantics are not negotiable.

11. **Links navigate, buttons act — pick by behavior, not appearance.** Anything that changes the URL/route is a link; anything that triggers an action (submit, open dialog, toggle, mutate) is a button. An action that *looks* like a link is still a button: use a **link-styled button**, not an anchor. In MUI that's `<Link component="button" onClick>` or `<Button variant="text">` — never a bare `<a>`/`<Link href>` wired to an `onClick` that doesn't navigate. A real anchor without a valid `href` is unreachable by keyboard and mis-announced by screen readers.
12. **Use the `Link` *button* for inline text actions.** Inline "actions" inside copy (e.g., "Show more", "Edit") render as `<Link component="button">` so they're keyboard-focusable, Enter/Space-activatable, and announced as buttons — while keeping the link look. Reserve `<Link href>` for genuine navigation.
13. **`IconButton` only when an icon genuinely suffices — and never without an accessible name.** Use `IconButton` for compact, universally-understood actions (close, search, back, overflow `⋮`) and dense internal toolbars. Every `IconButton` carries an `aria-label` (and usually a `Tooltip`); an icon button with no accessible name is a hard accessibility failure. For primary or destructive actions, a labeled `Button` beats an `IconButton` (ties to rule 19 / §6.4).
14. **One `<h1>` per page; headings descend without skipping levels.** Don't pick a heading variant for its size — use the right level for structure and restyle via `sx` if needed. Form fields always have associated `<label>`s; meaningful images have `alt`, decorative ones `alt=""`.

---

## 5. Aesthetic Intent (within the constraints)

- **Calm ink, one loud blue.** Near-black `#212121` ink at high alpha, quiet 6% dividers, white paper — Primary blue carries every interactive moment. Secondary orange appears rarely, as warmth, never as a competing voice.
- **SemiBold headlines with negative tracking** (-0.4px): compact, modern, product-y — not editorial. Keep headlines short; tight tracking punishes long ones.
- **Hierarchy through weight and size, not color.** Headings are the same ink as body. No colored or grey headings.
- **Flat, outlined, no elevation.** Cards are always `variant="outlined"` (using `other.outlined-border-23-p`); shadows are reserved for true overlays (menus, dialogs, tooltips). Never raise a card.
- **Dividers are a last resort.** Whitespace and outlined surfaces do the grouping; a divider appears only where a hard separation is genuinely needed.
- **Uppercase is reserved** for buttons and overlines only.
- **When unsure, remove.** Fewer tints, fewer weights, more whitespace is on-system.
- **Trends enter as execution quality, not decoration.** Skeleton loaders, refined empty states, subtle interaction polish — yes. Glassmorphism, gradient meshes, scroll-jacking, decorative animation — no. Modernity should make tasks faster, not prettier-but-slower.
- **Structure density for the eye.** Information-rich is fine; unstructured is not. Alignment, proximity grouping, and a clear entry point keep dense screens scannable (see §6.6).

---

## 6. Interaction & Behavioral Design

Form follows function: every rule below exists to raise task-completion speed and confidence, not visual appeal. Each rule is flagged with the heuristic it operationalizes.

### 6.1 Choices & cognitive load

1. **~7 options at a *designed* decision point** — nav items, plan pickers, action menus, filter groups. Beyond that: group, search, or progressive-disclose. **Does not apply to data-driven collections** — a dropdown of 200 countries or a 500-row table is fine; those get search/typeahead, filtering, and pagination/virtualization instead of artificial truncation. `[Hick's law — decision time grows with choice count; Miller's law — working memory holds ~7 items]`
2. **Forms: 7±2 visible fields per step (max 9).** Beyond that, split into steps with a visible progress indicator. Group related fields; never one giant scroll-form. `[Chunking; goal-gradient effect — visible progress accelerates completion]`
3. **Defaults do the work — from data the app already has.** Pre-select the most common option; prefill from profile/state/API values that are already trivially available (last-used value if the store already returns it). **Scope limit: this never requires building new tracking or mining interaction history** — if remembering a choice needs new infrastructure, it's out of scope unless the dev asks. `[Tesler's law — irreducible complexity should be absorbed by the system, not the user]`
4. **One primary action per view.** Exactly one `contained` button; everything else `outlined` or `text`. If two actions feel equally primary, the screen is trying to do two jobs. `[Von Restorff effect — distinctiveness requires a single emphasized element; visual hierarchy]`

### 6.2 Feedback & system status

5. **Every action over ~400ms shows its state.** Prefer skeleton loaders over spinners for content areas (perceived speed); spinners only for indeterminate short waits inside controls. `[Nielsen #1 — visibility of system status; Doherty threshold — sub-400ms keeps users in flow]`
6. **Success is explicit, never silent.** A save, submit, or enroll produces visible confirmation (snackbar, state change, check). Silent success reads as failure. `[Nielsen #1; feedback loops]`
7. **Destructive actions confirm; reversible actions don't.** Delete/unenroll/cancel-subscription get a confirm step naming the consequence; everything reversible executes immediately with an undo path where feasible. Don't confirm-dialog harmless actions — it trains users to click through dialogs blindly. `[Nielsen #5 — error prevention; alarm fatigue]`

### 6.3 Errors & recovery

8. **Prevent before you scold.** Inline-validate on blur (not on every keystroke); constrain inputs (date pickers over free-text dates); show requirements before submission, not after. `[Nielsen #5 — error prevention beats good error messages]`
9. **Errors say what happened and what to do next**, in the interface's voice — no apologies, no vagueness, no error codes alone. `[Nielsen #9 — help users recognize, diagnose, recover]`
10. **Never destroy user input.** Failed submissions preserve every field. A form that empties itself on error is a critical bug, not a style issue. `[Error recovery; loss aversion — losing typed work is the most rage-inducing failure mode]`

### 6.4 Recognition & continuity

11. **Recognition over recall: visible labels everywhere.** No icon-only buttons for primary or destructive actions; icon-only `IconButton` is acceptable only for universally-learned icons (close, search, back, overflow) and dense internal toolbars — and always with an `aria-label` + tooltip (see §4.3 rules 11–13). Inline text actions use the link-styled button, not a bare anchor. `[Nielsen #6 — recognition over recall]`
12. **Multi-step anything shows where you are.** Steppers for flows, progress for courses, breadcrumbs for deep hierarchies. Started-but-unfinished states should be visibly resumable. `[Zeigarnik effect — open tasks occupy memory; goal-gradient]`
13. **Empty states are starting points, not dead ends.** Every empty list/dashboard explains what belongs there and offers the action that fills it. Blank panels are forbidden. `[Nielsen #10 — help and documentation, delivered in-context]`

### 6.5 Motion

14. **MUI default transitions on the first pass.** Don't introduce custom animation or scroll effects unprompted. If the dev explicitly requests custom motion, build it (and note it under `Deviations` in the coverage report). Always respect `prefers-reduced-motion`.

### 6.6 Scannability (let eyes move fast)

Density is not the enemy of scanning — *unstructured* density is. These rules keep information-rich screens (internal dashboards, tables) fast to parse rather than asking for less data. The goal is for eyes to jump to the one thing they came for without reading everything.

15. **Tables scan down columns, not across rows.** Right-align numbers, left-align text, use tabular/lining figures so digits line up by place value. A column of right-aligned amounts is comparable at a glance; a column of left-aligned numbers is not. `[numeric alignment — the most common AI table mistake]`
16. **Front-load the distinguishing word.** In lists, menus, table cells, and labels, the word that differentiates an item goes first — "Annual report 2024", not "Report (annual), 2024". Eyes read the first one or two words of each line then jump; bury the distinguishing word and scanning collapses to full reading. `[F-pattern scanning]`
17. **Label and value are visually distinct in key-value displays.** Label in `text.secondary`, value in `text.primary` (or label smaller, value larger). This lets the eye skip the repeating labels and jump value-to-value. Never render label and value at the same weight and color.
18. **One clear entry point per screen.** Exactly one element wins the visual hierarchy — the eye must know where to land first. Establish it with size, weight, and position; don't flatten everything to equal weight. (Pairs with the one-primary-action rule, B4.) `[visual hierarchy]`
19. **Group by proximity, separate by whitespace.** Related items sit close; unrelated groups are pushed apart by space — not boxed in borders or split by dividers. This is the positive form of the divider-restraint rule. `[Gestalt: proximity]`
20. **Left edges stay clean.** Left-align text and align fields/labels to a shared grid so the eye scans down a straight edge. Avoid centered body text and ragged multi-column starts — every misalignment is a re-scan. `[Gestalt: continuity]`
21. **Plain language; expand acronyms on first use.** Jargon and unexplained abbreviations force a memory lookup mid-scan. Chunk long content under scannable subheads rather than presenting walls of text. `[reduces extraneous cognitive load]`

---

## 7. AI Engagement Protocol

Rules for how an AI coding agent works on this codebase — not what it outputs, but how it engages. Aim: help, never block; surface blind spots; keep overhead near zero.

### 7.1 State enumeration before generation

Any component tied to identity or a business lifecycle has states the AI cannot guess. Before generating, walk five dimensions:

1. **Identity** — who's viewing: anonymous / internal / partner (extend with product-specific roles as they exist)
2. **Domain lifecycle** — where the entity is in its journey (e.g., course card: not logged in → logged in not enrolled → enrolled in progress → completed; could also be expired, locked, waitlisted)
3. **Data** — loading, empty, error, partial, populated
4. **Interaction** — hover, focus, active, disabled, selected (token rules already cover these)
5. **Edge** — zero items, one item, hundreds of items, very long titles, slow network, permission denied

For stateful components, propose the state matrix briefly and proceed or ask per 7.2. Static, stateless pieces (a layout shell, a footer) skip this entirely.

### 7.2 When to ask vs. assume vs. build

- **Specified** (in the prompt, the codebase, or surrounding context) → just build.
- **Inferable** (a reasonable answer exists) → build on the inference and **declare it** in the coverage report. Do not ask.
- **Unknowable** (identity/lifecycle states or business behavior nobody specified and nothing implies) → **ask before coding.** One batched round of questions maximum, framed as a proposed state matrix to confirm/correct — never a drip of one-at-a-time questions.

### 7.3 Coverage report — mandatory, ≤ 5 lines

Every component/feature output ends with this block:

```
COVERAGE
Covered:   <states/cases implemented>
Assumed:   <each inference made — "ASSUMED: anonymous users see price">
Not covered: <states/cases out of scope, deliberate or not>
Test first: <2–3 highest-risk paths>
Deviations: <any explicit off-system instruction followed — omit line if none>
```

This is a self-declaration appended after generation (not test execution). Its job is to convert silent assumptions into visible, reviewable ones — output is never presented as implicitly complete.

### 7.4 Reuse before create

Before building any component, check whether one already exists in the codebase; extend it rather than fork it. If forking is genuinely necessary, say why in the coverage report. Two diverging course cards is a design-system failure regardless of how on-token both are.

### 7.5 Pattern precedent

When facing an unspecified pattern question (pagination style, where card actions sit, how filters behave), **match how the existing codebase already does it** — existing convention beats general best practice. Deviating from an established internal pattern requires a stated reason. Sovereign products run on consistency; users' muscle memory is a feature. `[Jakob's law — users spend most of their time in other interfaces (and other screens of this one); Nielsen #4 — consistency and standards]`

### 7.6 Deviation flag, not refusal

If a dev explicitly requests something off-system ("add a shadow to this card"), comply — and record it under `Deviations` in the coverage report. The dev stays in control; the deviation stays visible. Never silently comply, never refuse.

### 7.7 Overhead cap

The protocol must stay cheaper than the problems it prevents: coverage report ≤ 5 lines; state matrix only for genuinely stateful components; questions only in one batched round; no ceremony beyond what's written here.

### 7.8 Tiebreaker

When a decision is unspecified and not covered above: **choose the option with fewer steps to task completion.** Function over form, always.

### 7.9 Dev request template (optional, copy-paste)

Filling this when requesting a component usually makes the question round unnecessary:

```
What: <component/feature>
Who sees it: <anonymous / internal / partner — any per-role differences>
Lifecycle states: <e.g., not enrolled / enrolled / completed — what differs per state>
Data shape: <source + rough fields, or "mock">
Out of scope: <what NOT to build>
```

---

## 8. MUI theme wiring

The palette must be **fed from `getColors(mode)`** — never duplicated:

```ts
import { createTheme } from '@mui/material/styles'
import getColors from './colors'

const spacingScale = [0, 4, 8, 16, 24, 32, 40, 48, 64, 96, 128]

export const buildTheme = (mode: 'light' | 'dark') => {
  const c = getColors(mode)

  const theme = createTheme({
    palette: {
      mode,
      text: { primary: c.text.primary, secondary: c.text.secondary, disabled: c.text.disabled },
      primary:   { main: c.primary.main,   dark: c.primary.dark,   light: c.primary.light,   contrastText: c.primary.contrast },
      secondary: { main: c.secondary.main, dark: c.secondary.dark, light: c.secondary.light, contrastText: c.secondary.contrast },
      error:     { main: c.error.main,     dark: c.error.dark,     light: c.error.light,     contrastText: c.error.contrast },
      warning:   { main: c.warning.main,   dark: c.warning.dark,   light: c.warning.light,   contrastText: c.warning.contrast },
      info:      { main: c.info.main,      dark: c.info.dark,      light: c.info.light,      contrastText: c.info.contrast },
      success:   { main: c.success.main,   dark: c.success.dark,   light: c.success.light,   contrastText: c.success.contrast },
      action: {
        active: c.action.active, hover: c.action.hover, selected: c.action.selected,
        disabled: c.action.disabled, disabledBackground: c.action['disabled-background'], focus: c.action.focus,
        hoverOpacity: mode === 'light' ? 0.04 : 0.08,
        selectedOpacity: mode === 'light' ? 0.08 : 0.16,
      },
      background: { default: c.background.default, paper: c.background['paper-elevation-0'] },
      divider: c.other.divider,
    },
    spacing: (factor: number) => `${spacingScale[factor] ?? factor * 8}px`,
    typography: {
      fontFamily: '"Inter", -apple-system, "Segoe UI", Roboto, sans-serif',
      h1: { fontSize: 32, fontWeight: 600, lineHeight: 1.125, letterSpacing: '-0.4px' },
      h2: { fontSize: 28, fontWeight: 600, lineHeight: 1.2,   letterSpacing: '-0.4px' },
      h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.167, letterSpacing: '-0.4px' },
      h4: { fontSize: 20, fontWeight: 600, lineHeight: 1.235, letterSpacing: '-0.4px' },
      h5: { fontSize: 18, fontWeight: 600, lineHeight: 1.334, letterSpacing: '-0.4px' },
      subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: 1.75, letterSpacing: '-0.4px' },
      subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: 1.57, letterSpacing: '-0.4px' },
      body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
      body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.43 },
      caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.66, letterSpacing: '0.4px' },
      overline: { fontSize: 10, fontWeight: 600, lineHeight: 1.66, letterSpacing: '1.25px', textTransform: 'uppercase' },
      button: { fontSize: 14, fontWeight: 500, lineHeight: '24px', letterSpacing: '0.4px', textTransform: 'uppercase' },
    },
  })

  // Mobile overrides
  const dn = theme.breakpoints.down('md')
  Object.assign(theme.typography.h1, { [dn]: { fontSize: 26, lineHeight: '32px' } })
  Object.assign(theme.typography.h2, { [dn]: { fontSize: 24, lineHeight: '28px', letterSpacing: '-0.5px' } })
  Object.assign(theme.typography.h3, { [dn]: { fontSize: 22, lineHeight: '26px' } })
  Object.assign(theme.typography.h4, { [dn]: { fontSize: 20, lineHeight: '24px' } })
  Object.assign(theme.typography.h5, { [dn]: { fontSize: 18, lineHeight: '22px' } })
  Object.assign(theme.typography.subtitle1, { [dn]: { fontSize: 16, lineHeight: '24px', letterSpacing: 0 } })
  Object.assign(theme.typography.subtitle2, { [dn]: { fontSize: 14, lineHeight: '20px', letterSpacing: 0 } })
  Object.assign(theme.typography.body1, { [dn]: { fontSize: 14, lineHeight: '20px' } })
  Object.assign(theme.typography.body2, { [dn]: { fontSize: 12, lineHeight: '16px' } })

  theme.components = {
    // Flat system: cards are outlined by default, never elevated
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiPaper: { defaultProps: { variant: 'outlined' }, styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: mode === 'dark' ? 600 : 500 },
        sizeLarge: { fontSize: 16, lineHeight: '24px', letterSpacing: '0.46px' },
        sizeSmall: { fontSize: 12, lineHeight: '16px', letterSpacing: '0.46px' },
      },
    },
  }

  return theme
}
```

Tokens not covered by MUI's palette shape (`shades-160-p`, `paper-elevation-*`, `other.*`) are reached via `getColors(mode)` directly or the CSS vars (`--error-shades-190-p`, …).

---

## 9. Anti-patterns (what AI coders must never generate)

1. ❌ Hardcoded hex/rgba in `sx`/styled — only theme tokens / `getColors` / CSS vars.
2. ❌ `#000` or `grey.900` for text — text tokens only.
3. ❌ `error.main` / `success.main` as a *text* color in light mode; `warning.main`/`warning.dark` as text **anywhere in light mode**.
4. ❌ Using `secondary` (orange) to convey caution or any status meaning.
5. ❌ `<Typography variant="h6">` — the variant doesn't exist in this system.
6. ❌ Roboto, Lato, or any non-Inter `fontFamily`.
7. ❌ Magic-number spacing (`mt: '20px'`) — only `theme.spacing(n)` from the indexed scale.
8. ❌ Elevated/shadowed cards in any mode — cards are `variant="outlined"` only. Shadows belong to true overlays (menus, dialogs) exclusively.
9. ❌ Unnecessary `<Divider>`s — between list items, under headings, around sections "for structure". Use spacing; dividers only where a hard separation is genuinely needed.
10. ❌ Uppercasing anything beyond buttons and overlines.
11. ❌ `opacity: 0.5` to fake a disabled state.
12. ❌ Color-only status indication.
13. ❌ Darkening the divider — 6% in light mode is by design.
14. ❌ Inventing intermediate font sizes (13/15/17px) — the scale is closed.
15. ❌ Two `contained` buttons in one view — one primary action per view.
16. ❌ Happy-path-only components — missing loading/empty/error states is incomplete work, not a polish item.
17. ❌ Confirm dialogs on harmless reversible actions — confirmation is for destructive actions only.
18. ❌ Icon-only primary or destructive actions.
19. ❌ `IconButton` without an `aria-label` — every icon button needs an accessible name.
20. ❌ An anchor/`<Link href>` wired to an action `onClick` (use `<Link component="button">` or a text `Button`); or a `Button` used for plain navigation (use a real link).
21. ❌ Blank empty states — every empty view explains itself and offers the filling action.
22. ❌ Unprompted custom animation or scroll effects — MUI defaults on the first pass; custom motion only on explicit request, flagged under Deviations.
23. ❌ Left-aligned or non-tabular numeric table columns — numbers right-align with lining figures.
24. ❌ Label and value at the same weight/color in key-value displays — label muted, value emphasized.
25. ❌ Centered body text / ragged left edges in scannable content.
26. ❌ Presenting output without the coverage report, or as implicitly complete.
