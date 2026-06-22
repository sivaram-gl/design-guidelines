# Jedi DS — AI Context (MUI v5, Inter, Light+Dark, Sovereign app — INTERNAL/PARTNER surfaces; learner-facing → use Magna)

Tokens come from `getColors(mode)` (colors module) and CSS vars (`--primary-main`, `--error-shades-190-p`, …). The theme is wired from it. **Always reference tokens; never paste hex values.** Hexes below are for verification only. Philosophy: form follows function — when unspecified, choose the option with fewer steps to task completion.

## Engagement protocol (how to work, not what to output)
P1. STATE ENUMERATION: any component tied to identity or business lifecycle has states you cannot guess. Walk 5 dimensions before generating: identity (anonymous/internal/partner + product-specific roles) · domain lifecycle (e.g., course card: logged-out → not enrolled → in progress → completed; maybe expired/locked) · data (loading/empty/error/populated) · interaction (hover/focus/disabled/selected) · edge (0 items, 1 item, 500 items, long titles, slow network, no permission). Stateless pieces (layout shells, footers) skip this.
P2. ASK vs ASSUME vs BUILD: specified → build · inferable → build on the inference and DECLARE it · unknowable (identity/lifecycle/business behavior nothing implies) → ASK before coding, ONE batched round max, framed as a proposed state matrix to confirm. Never drip questions. Never ask what you can answer.
P3. COVERAGE REPORT (mandatory, ≤5 lines, after every component output):
   Covered: <states implemented> · Assumed: <each inference> · Not covered: <out of scope> · Test first: <2–3 riskiest paths> · Deviations: <off-system instructions followed; omit if none>
   Never present output as implicitly complete.
P4. REUSE BEFORE CREATE: check for an existing component first; extend, don't fork. If forking is necessary, justify it in the coverage report.
P5. PATTERN PRECEDENT: for unspecified patterns (pagination, card action placement, filter behavior), match what the codebase already does — existing convention beats general best practice. [Jakob's law, Nielsen #4]
P6. DEVIATION FLAG, NOT REFUSAL: if the dev explicitly asks for something off-system, comply and record it under Deviations. Never silently comply, never refuse.
P7. OVERHEAD CAP: report ≤5 lines, state matrix only for stateful components, one question round max.

## Behavioral & interaction rules [heuristic]
B1. ~7 options at *designed* decision points (nav, action menus, plan pickers) — group/search/progressive-disclose beyond. Does NOT apply to data-driven collections (country dropdowns, tables): those get typeahead/filter/pagination, never artificial truncation. [Hick's / Miller's]
B2. Forms: 7±2 visible fields per step (max 9); more → multi-step with progress indicator. [chunking, goal-gradient]
B3. Defaults do the work — from data already trivially available (profile/state/API, last-used value if already stored). Never requires new tracking or history mining; if it would, out of scope unless asked. [Tesler's law]
B4. ONE `contained` button per view; all other actions `outlined`/`text`. [Von Restorff]
B5. Actions >400ms show state — skeletons for content, spinners only inside controls. [Nielsen #1, Doherty]
B6. Success is explicit (snackbar/state change), never silent. [Nielsen #1]
B7. Destructive actions confirm (naming the consequence); reversible actions never do. [Nielsen #5, alarm fatigue]
B8. Validate inline on blur; constrain inputs (pickers over free text); show requirements upfront. [Nielsen #5]
B9. Errors say what happened + what to do next; no apologies, no bare codes. [Nielsen #9]
B10. Never destroy user input on failed submit. [loss aversion]
B11. Labels visible; icon-only allowed only for universal icons (close/search/back) and dense internal toolbars w/ tooltips. [Nielsen #6]
B12. Multi-step flows show position (stepper/progress); unfinished work is visibly resumable. [Zeigarnik, goal-gradient]
B13. Empty states explain what belongs + offer the filling action; blank panels forbidden. [Nielsen #10]
B14. Motion: MUI default transitions on the first pass; no unprompted custom/scroll animation. Custom motion on explicit request is fine — flag under Deviations. Respect prefers-reduced-motion.
B15. SCANNABILITY (structure density for fast eyes, don't reduce data): tables right-align numbers / left-align text / tabular figures so columns compare at a glance [common AI table miss]; front-load the distinguishing word in lists/menus/cells/labels ("Annual report 2024" not "Report, annual, 2024") [F-pattern]; key-value displays = label `text.secondary` + value `text.primary`, never same weight/color; one clear visual entry point per screen [hierarchy]; group by proximity + whitespace, not borders/dividers [Gestalt proximity]; clean left edges, no centered body text [Gestalt continuity]; plain language, expand acronyms on first use, chunk under subheads not walls of text.
Sovereign posture: optimize for the returning user — density OK, keyboard nav expected, minimal onboarding chrome, no tooltip crutches for bad labels.

## Hard style rules
1. No hardcoded hex/rgba. Use `theme.palette.*`, `getColors(mode).*`, or CSS vars.
2. Font is Inter only. Weights 400/500/600. No other family, ever.
3. Spacing is an indexed scale, NOT 8×n: spacing(1)=4, (2)=8, (3)=16, (4)=24, (5)=32, (6)=40, (7)=48, (8)=64, (9)=96, (10)=128.
4. Colored TEXT in light mode = the palette's `dark` variant (`error.dark` 5.6:1, `success.dark` 4.6:1). `.main` fails AA as text.
5. WARNING has no text-safe solid in light mode (`main` 1.65:1, `dark` 2.82:1). Warning copy = `text.primary` + warning icon, or tint recipe (rule 6). Amber text forbidden.
6. Status tints (alerts/banners/soft chips): bg = `shades-190-p`, text = `shades-160-p` of that palette. All pairs AA+. Never `main` text on a tinted bg.
7. `secondary` is ORANGE and decorative-only — never use it for caution/status (that's `warning`). Secondary text: `secondary.dark` ≥18px only.
8. No `variant="h6"` — scale ends at h5. No font sizes outside the scale (no 13/15/17px).
9. Uppercase only on buttons and overline.
10. Status never color-only: always icon + message.
11. Disabled = `action.disabled` + `action.disabled-background`. Never opacity hacks.
12. Don't suppress focus rings. Touch targets ≥44px on partner-facing surfaces; dense/small variants only in internal admin views. [Fitts's law]
SEM. SEMANTIC ELEMENTS (a11y): links navigate, buttons act — pick by behavior not looks. An action that looks like a link = link-styled button (`<Link component="button" onClick>` or `<Button variant="text">`), NEVER a bare `<a>`/`<Link href>` with an action onClick. Real navigation = `<Link href>`. `IconButton` only for universal icons (close/search/back/overflow) + dense toolbars, ALWAYS with `aria-label` (+tooltip); primary/destructive actions get a labeled Button, not an icon. One `<h1>`/page, headings don't skip levels, fields have labels, images have alt.
13. Cards/surfaces are ALWAYS `variant="outlined"` (border = `other.outlined-border-23-p`) — no elevation, no shadows, in either mode. Shadows only on true overlays (menus, dialogs, tooltips); in dark mode those use `background.paper-elevation-{2|8|16|24}`. Buttons become fontWeight 600 in dark mode.
14. Do NOT add `<Divider>`s by default — no dividers between list items, under headings, or around sections. Group with spacing and outlined surfaces; a divider only where a hard separation is genuinely needed (dense tables, menu groups).
15. Extended ramps (active: grey, purple, light-blue, yellow, blue, blue-gray + a-variants) are intended for charts/data-viz; for UI chrome prefer semantic palettes. Dark mode auto-reverses ramps — pick steps by role.
16. Body text <12px forbidden on partner-facing surfaces.
17. `info` = `primary` in light mode (intentional, don't "fix"); they diverge in dark.

## Palette (token → Light | Dark, verification values)
text.primary rgba(33,33,33,.92) | #FFF · text.secondary .72 | rgba(255,255,255,.70) · text.disabled .24 | .50 (base ink #212121, never #000)
primary: main #196AE5 dark #0F4089 light #4788EA ct #FFF | #66BBFF #3A9AE8 #E8F0FC ct rgba(0,0,0,.87)
secondary (orange): #FF9800 #EF6C00 #FFB74D ct #FFF | #FFCC80 #CA9B52 #FFFFB0 ct rgba(0,0,0,.87)
error: #FF3333 #D10B25 #F9494F ct #FFF | #F44336 #D32F2F #E57373 ct #FFF
warning: #FFBF00 #FF6D00 #FFD44D ct #FFF | #FFA726 #F57C00 #FFB74D ct rgba(0,0,0,.87)
info: = primary in light | #29B6F6 #0288D1 #4FC3F7 ct rgba(0,0,0,.87)
success: #22BB34 #00880F #74D176 ct #FFF | #66BB6A #388E3C #81C784 ct rgba(0,0,0,.87)
action: active .64/.64 · hover .04/.08 · selected .08/.16 · disabled .26/.30 · disabled-background .12/.12 · focus .12/.12
background: default #FAFAFA | #121212 · paper-elevation-0 #FFF | #121212 · dark elevations: 2 #1B1B1B, 8 #252525, 16 #383838, 24 #4B4B4B
other: divider ink@6% | white@12% (use sparingly — see rule 14) · outlined-border-23-p · filled-input-background 6%/9% · standard-input-line 42% · backdrop rgba(33,33,33,.5) · snackbar #212121/#323232 · rating-active #FFB400
basic.white #FFF · basic.black #000 (mode-invariant)

## Status tint pairs: text(160-p) on bg(190-p) — all AA+
Light — error #7A2828/#FFEBEB · warning #7A6014/#FFF9E5 · info #1E3E6F/#E8F0FC · success #215F29/#E9F8EB
Dark — error #FBB4AF/#180705 · warning #FFDCA8/#1A1104 · info #9ACFED/#000E15 · success #C2E4C3/#0A130B
(`secondary` has no 160/190 — not a status palette)

## Type scale — desktop (Inter; size/weight/lineHeight/letterSpacing)
h1 32/600/1.125/-0.4 · h2 28/600/1.2/-0.4 · h3 24/600/1.167/-0.4 · h4 20/600/1.235/-0.4 · h5 18/600/1.334/-0.4
subtitle1 16/500/1.75/-0.4 · subtitle2 14/500/1.57/-0.4 (Bold variants: 600 weight, ls 0.35/0.1)
body1 16/400/1.5/0 · body2 14/400/1.43/0 · caption 12/400/1.66/0.4 · overline 10/600/1.66/1.25/UPPER
button M 14/500/24px/0.4/UPPER · L 16/500/24px/0.46 · S 12/500/16px/0.46 (dark mode: weight 600)

## Type scale — mobile (<md): size/lineHeight
h1 26/32 · h2 24/28 (ls -0.5) · h3 22/26 · h4 20/24 · h5 18/22 · subtitle1 16/24 (ls 0) · subtitle2 14/20 (ls 0) · body1 14/20 (ls 0) · body2 12/16 (ls 0) · caption 10/16 · overline 10/16

## Component type
input label 12/400/12/0.15 · input text 16/400/24/0.15 · helper 12/400/16/0.4 · chip 12/500/16/0.16 · tooltip 10/500/16/0 · alert title 16/500/1.5/0.15 · table header 14/500/24/0.17 · badge 12/500/16/0.14 · avatar 20/400/24/0.14 · menu item 16/400/1.5/0.15 (dense 14/400/24/0.17) · list subheader 14/500/48/0.1 · bottom-nav active 14/400/24/0.4

## Aesthetic intent (for judgment calls)
Calm near-black ink, one loud blue (primary) for everything interactive; secondary orange is rare warmth, never a competing voice. Hierarchy via weight+size, never colored/grey headings. Flat outlined surfaces, no shadows, dividers as a last resort. Trends enter as execution quality (skeletons, refined empty states), never decoration (no glassmorphism, gradients, scroll effects). When unsure, remove decoration.
