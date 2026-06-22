# Magna DS — AI Context (Tamagui monorepo, Material 3, Inter, Light+Dark — LEARNER/end-user surfaces; internal/admin → use Jedi)

Color = Material 3 role system (blue seed #0066FF), exported as Tamagui tokens ($primary, $onSurface, $surfaceContainerHigh…). ALWAYS use role tokens, NEVER raw hex, NEVER pick by hue. Hexes below are verification only. Philosophy: form follows function; for learners, clarity/warmth/confidence over density.

## THE M3 RULE (most important)
Pick the ROLE for the job, use its paired `on-` role for content on top. Pairs are contrast-engineered (all AA+). primary text on surface = `$primary`; text ON a primary fill = `$onPrimary`; text on `$primaryContainer` = `$onPrimaryContainer`; text on any surfaceContainer = `$onSurface`/`$onSurfaceVariant`. Roles auto-flip light/dark — reference the token, never a mode hex. Elevation = tonal surfaceContainer steps, NOT shadows.

## Engagement protocol
P1. STATE ENUMERATION before generating stateful components — 5 dims: identity (anonymous/learner, enrolled?) · lifecycle (course card: logged-out → not enrolled → not started → in progress → completed → expired) · data (loading/empty/error/populated) · interaction (hover/focus/press/disabled/selected — M3 state layers) · edge (0/1/many items, long titles, slow net, no perm). Static pieces skip.
P2. ASK vs ASSUME vs BUILD: specified → build · inferable → build + DECLARE in coverage report · unknowable (identity/lifecycle/business behavior nothing implies) → ASK first, ONE batched round as a state matrix. Never drip; never ask what you can answer.
P3. COVERAGE REPORT (mandatory, ≤5 lines, after every component): Covered / Assumed / Not covered / Test first / Deviations(omit if none). Never present output as implicitly complete.
P4. REUSE BEFORE CREATE: check the monorepo for an existing Tamagui component; extend, don't fork (forks are extra costly in a shared repo). Justify forks in the report.
P5. PATTERN PRECEDENT: match existing codebase conventions over general best practice; deviation needs a reason. [Jakob's, Nielsen #4]
P6. USE M3 ROLES, NEVER RAW VALUES: reference $role tokens only; pair every surface/container with its on- role; if a role seems missing, ASK — don't invent a color.
P7. DEVIATION FLAG, NOT REFUSAL: explicit off-system request → comply + record under Deviations. Never silently comply, never refuse.
P8. OVERHEAD CAP + TIEBREAKER: report ≤5 lines, matrix only when stateful, one question round. Unspecified+uncovered → fewer steps to task completion; for learners, clearer to a first-timer.

## Behavioral & interaction rules [heuristic]
B1. ~7 options per *designed* decision point (nav/menus/filters); data collections (catalog, long dropdown) get search/filter/pagination, not truncation. [Hick's/Miller's]
B2. Forms 7±2 fields/step (max 9); more → multi-step w/ progress. [chunking, goal-gradient]
B3. Defaults from already-available data (profile/state/last-used); never build new tracking unless asked. [Tesler's]
B4. ONE primary-emphasis action per view; rest recede to surface/secondary. [Von Restorff]
B5. Actions >400ms show state — skeletons for content, M3 progress for waits. [Nielsen #1, Doherty]
B6. Success explicit (snackbar via inverseSurface/inverseOnSurface, state change), never silent. [Nielsen #1]
B7. Destructive confirm (name consequence) + undo where feasible; reversible never confirm. [Nielsen #5]
B8. Validate inline on blur; constrain inputs; show requirements upfront. [Nielsen #5]
B9. Errors: what happened + what to do next, plain learner language, no codes. [Nielsen #9]
B10. Never destroy user input on failed submit. [loss aversion]
B11. Visible labels; icon-only only for universal icons (close/search/back). [Nielsen #6]
B12. Multi-step shows position (stepper/lesson progress); unfinished work visibly resumable. [Zeigarnik, goal-gradient]
B13. Empty states explain what belongs + offer the filling action. [Nielsen #10]
B14. Motion: Tamagui/M3-standard easing + state layers; no unprompted custom/scroll animation (custom on request → flag Deviations); respect reduced-motion.
B15. SCANNABILITY: tables right-align numbers/tabular figures, left-align text, front-load the distinguishing word; key-value = label $onSurfaceVariant + value $onSurface (never same weight); one clear entry point; group by proximity + tonal surface not borders; plain language, expand acronyms, chunk under subheads.
Learner posture: clarity/warmth/confidence over density; generous spacing; large readable type; obvious next action.

## State layers (hover/focus/press)
Overlay the matching `on-` role at fixed opacity: hover 8%, focus/press 12%, drag 16%. Hovered primary button = primary + onPrimary@8%. Don't hand-tune hover colors.

## M3 roles — blue-primary ($token → Light | Dark)
primary #0054D6 | #B3C5FF · onPrimary #FFFFFF | #002B75 · primaryContainer #DAE1FF | #003FA4 · onPrimaryContainer #001849 | #DAE1FF · inversePrimary #B3C5FF | #0054D6 · surfaceTint #0054D6 | #B3C5FF
secondary #3A3BFF | #C0C1FF · onSecondary #FFFFFF | #0C00AA · secondaryContainer #E1E0FF | #1600EC · onSecondaryContainer #05006D | #E1E0FF
tertiary #8B00E8 | #DEB7FF · onTertiary #FFFFFF | #4A007F · tertiaryContainer #F1DBFF | #6900B2 · onTertiaryContainer #2D0050 | #F1DBFF
error #BA1A17 | #FFB4AA · onError #FFFFFF | #690003 · errorContainer #FFDAD5 | #2D171A · onErrorContainer #410001 | #FFDAD5
background #FDFBFF | #1A1B1E · onBackground #1A1B1E | #E3E2E6 · surface #FAF9FD | #121316 · onSurface #1A1B1E | #C7C6CA · surfaceVariant #E2E2EC | #45464F · onSurfaceVariant #45464F | #C5C6D0
surfaceContainerLowest #E4E2E6 | #0D0E11 · Low #E9E7EC | #1A1B1E · Container #EFEDF1 | #1E1F23 (default card) · High #F4F3F7 | #292A2D · Highest #FFFFFF | #343538 · surfaceBright #FAF9FD | #38393C · surfaceDim #DBD9DD | #121316
inverseSurface #2F3033 | #E3E2E6 · inverseOnSurface #F1F0F4 | #1A1B1E · outline #757680 | #8F909A (borders/large text only, 4.3:1) · outlineVariant #C5C6D0 | #45464F · scrim/shadow #000000
white #FFFFFF · black #000000 (mode-invariant only)
Extended: magnaColors/* ramps (Indigo/Amber/Green/Red/… + full magnaOrange M3 theme, orange seed #8B5000/#FFB870) = data-viz, category coding, and success/warning/info via container+on-container pairs. Not core chrome.

## Contrast (verification, blue-primary)
onPrimary/primary 6.5:1 L / 7.7:1 D · onSurface/surface 16.4 L / 10.9 D · onSurfaceVariant/surface 8.9 L · onPrimaryContainer/primaryContainer 13.2 L · primary/surface 6.2 L / 10.9 D · onError/error 6.5 L · outline/surface 4.3 (large/decorative only)

## Hard style rules
1. Only Tamagui role tokens, no hex/hue-picking.
2. Always pair role + its on- role. Never mismatched pairs.
3. Font Inter only, weights 400/500/600.
4. No success/warning/info invented loosely — extended hue container+on-container pair.
5. Elevation = surfaceContainer tonal steps, not shadows.
6. Buttons Title Case (NOT uppercase); only overline is uppercased.
7. Body text ≥14px on learner surfaces; 12px caption metadata only, 10px incidental.
8. Touch targets ≥48dp, ≥8dp apart.
SEM. SEMANTIC ELEMENTS (a11y, web+native): links navigate, buttons act — pick by behavior not looks. Action that looks like a link = link-styled button (web renders `<button>`, native `accessibilityRole="button"`), NEVER an action onPress on something announced as a link. Real navigation = real link (`accessibilityRole="link"`). Icon-only only for universal icons (close/back/search/overflow), ALWAYS with `accessibilityLabel`/`aria-label` (+tooltip on web); primary/destructive get a labeled button. One top heading/screen, levels don't skip, inputs labeled, images have alt.
9. Status never color-only: icon + message.
10. Disabled = 38% opacity / reduced on-surface emphasis, never custom grey.
11. Generous spacing — learner surfaces breathe (inverse of Jedi density).
12. Group by tonal surface + proximity, not borders/dividers.

## Type scale — desktop (Inter; size/weight/lineHeight/letterSpacing)
headline1 32/600/36/-0.4 · h2 28/600/32/-0.4 · h3 24/600/28/-0.4 · h4 20/600/24/-0.4 · h5 18/600/24/-0.4
subtitle1 16/600/24/-0.4 · subtitle2 14/600/20/-0.4 (Bold: 600, ls .35/.1; Medium: 500)
body1 16/400/24/-0.1 · body2 14/400/20/-0.1 · caption 12/400/16/0 · overline 10/600/16/1.25/UPPER
buttonLarge 16/500/24/0/Title · buttonMedium 14/500/20/0/Title · buttonSmall 12/500/16/0/Title

## Type scale — mobile (size/lineHeight; body does NOT shrink — learners read on phones)
h1 26/32 · h2 24/28 · h3 22/24 (ls -0.6) · h4 20/24 · h5 18/24 · subtitle1 16/24 · subtitle2 14/20 · body1 16/24 (ls -0.1) · body2 14/20 (ls -0.1) · caption 12/16 · captionMobile 10/16 · overline 10/16

## Component type
course title 16/600/24/-0.4 · button-med 14/500/20/0/Title · avatar 20/600/24/0.14 · alert title 16/500/1.5/0.15 · badge 12/600/16/0.14

## Aesthetic intent
Warm, clear, confident — reduce learner anxiety. M3 tonality (surfaceContainer steps) creates depth/grouping without borders/shadows. One obvious primary action. Color = meaning (primary="the main thing", tertiary/extended=categories), not decoration. Title Case friendly voice. Trends as execution quality (M3 motion, state layers, skeletons), never legibility-hurting decoration.
