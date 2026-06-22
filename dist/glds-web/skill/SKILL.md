---
name: GLDS Web Design System
description: "Great Learning's WEBSITE/landing-page design system (Rails + HTML/CSS/JS/jQuery, Poppins, Material Icons, conversion-focused). Use whenever building marketing pages, landing pages, or the Academy+ website for Great Learning. NOT for app UI (use Jedi for internal, Magna for learner)."
---

# GLDS Web — Great Learning Design System (Website & Landing Pages)

**Scope:** Foundations + Design Language + strict Component definitions. This is the **website / landing-page** system — distinct from Jedi (internal app) and Magna (learner app).
**Stack:** Ruby on Rails views, **plain HTML + CSS + JavaScript/jQuery**. No React, no component framework — components are HTML/CSS patterns, not JSX. Build them as partials/helpers and a shared stylesheet.
**Type:** Marketing pages, landing pages, the Academy+ website. Mostly static content with basic interactions (hover, focus, active, form submission). No app-style data lifecycles.
**Fonts:** **Poppins** (headings, UI, buttons) + Regular/Medium/SemiBold. Legacy body uses **Noto Sans**; new work uses Poppins throughout.
**Icons:** **Material Icons** (Google). Use the icon font or inline SVGs from the Material Icons set — do not mix in other icon libraries.
**Foundations + Design Language and the Components page must be followed strictly** — the definitions below are extracted directly from the production Figma file.
**Companion file:** `glds-web-design-system.context.md` — lean version for AI coding sessions.

---

## 1. Design Language (the brand voice in UI)

Great Learning's palette is built on named brand colors with intent — use them by meaning, not by hex:

| Brand color | Hex | Meaning / use |
|---|---|---|
| **Freedom Blue** | `#196AE5` | Primary brand & primary UI action (buttons, links, focus) |
| **Trust Blue** | `#0E39A9` | Deeper brand blue — emphasis, hover-dark, headings on light |
| **Wisdom Indigo** | `#0C1D5D` | Darkest brand blue — high-contrast headlines, footers |
| **Creativity Purple** | `#5C34B1` | Accent for creative/innovation themes |
| **Intellect Mandarin** | `#FF9800` | Secondary action / warm accent |
| **Energy Orange** | `#FFBF00` | Highlights, alert/attention (amber) |
| **Optimism Yellow** | `#FFDF00` | Bright accent, sparing use |
| **Balance Black** | `#000000` | Pure contrast |
| **Purity White** | `#FFFFFF` | Primary surface |

**Design Language principles:** Freedom Blue leads every interactive moment; warm colors (Mandarin/Orange/Yellow) are accents, never the primary action. Poppins gives the brand its confident, rounded, modern voice. Generous whitespace, large expressive headlines, clear single calls-to-action per section — this is marketing, so each section should have one obvious next step.

---

## 2. Foundations — Color

### 2.1 Primary UI Action (Freedom Blue ramp)

| Step | Hex | Step | Hex |
|---|---|---|---|
| 50 | `#E8F0FC` | 500 | `#196AE5` (base) |
| 100 | `#BAD2F7` | 600 | `#1455B7` |
| 200 | `#8CB5F2` | 700 | `#0041B2` |
| 300 | `#4788EA` | 800 | `#0F4089` |
| 400 | `#3079E8` | 900 | `#0D3573` |

Primary action = **500**; hover = **600**; pressed/active = **700/800**; tints/backgrounds = **50/100**.

### 2.2 Secondary UI Action (Mandarin ramp)

50 `#FFF3E0` · 100 `#FFE0B2` · 200 `#FFCC80` · 300 `#FFB74D` · 400 `#FFA726` · **500 `#FF9800`** · 600 `#FB8C00` · 700 `#F57C00` · 800 `#EF6C00` · 900 `#E65100`

### 2.3 Web Greys (light mode)

| Token | Hex | Use |
|---|---|---|
| Pure Contrast | `#000000` | Max-contrast text |
| Contrast 190 | `#201F1E` | Near-black headings |
| **Primary Text** | `#323130` | Body & heading text |
| Contrast 150 | `#3B3A39` | Strong text |
| **Secondary Text** | `#605E5C` | Supporting text, captions |
| **Disabled Text** | `#A19F9D` | Disabled |
| Contrast 60 / 50 / 40 | `#C8C6C4` / `#D2D0CE` / `#E1DFDD` | Borders, dividers, fills |
| **Divider** | `#EDEBE9` | Hairline separators |
| **Secondary Surface** | `#F8F8F8` | Alt section background |
| **Primary Surface** | `#FFFFFF` | Page background |

> Brand text ink is `#323130`, not pure black — softer on long marketing copy. Use Pure Contrast/`#000` only where maximum contrast is intended.

### 2.4 Web Dark Mode

Primary Surface `#000000` · Secondary Surface `#201F1E` · Tertiary Surface `#323130` · Disabled Text `#605E5C` · Contrast 90 `#A19F9D` · Contrast 60 `#C8C6C4` · Body Divider `#D2D0CE` · Contrast 40 `#E1DFDD` · Secondary Text `#F8F8F8` · Primary Text `#FFFFFF`

### 2.5 UI Feedback

| Type | 50 (bg) | 500 (main) | 800 (text) |
|---|---|---|---|
| **Error** | `#FFEBEE` | `#FF3333` | `#323130` |
| **Alert** | `#FFF8E1` | `#FFBF00` | `#323130` |
| **Success** | `#E7F7E7` | `#22BB33` | `#323130` |

Pattern: tint-50 background, 500 for icon/border, dark grey 800 for the message text (amber/red/green fail as text on white — never set feedback message text in the 500 color).

### 2.6 Course Card colors (background / foreground pairs)

Cool: Cool10 `#E1F4F4`/`#00A498` · Cool20 `#E3F4FF`/`#196BE5` · Cool30 `#E7E9F7`/`#0E39A9` · Cool40 `#EDE7F6`/`#5C34B1`
Warm: Warm10 `#FFF8E1`/`#FFA200` · Warm20 `#FBE9E7`/`#E64A19` · Warm30 `#FBE8E7`/`#E53119` · Warm40 `#FCE4EC`/`#C2185B`

Always use a pair together (background + its foreground) so text/icon contrast holds on the tinted card.

---

## 3. Foundations — Typography

Two scales exist in the file. **Use the `Web` scale (Poppins throughout) for all new work.** The older `GLDS Typescale` (Poppins headings + Noto Sans body) is legacy — documented in §3.3 for maintaining existing pages.

### 3.1 Web scale — Desktop (Poppins)

| Style | Size | Weight | Line height | Letter spacing | Case |
|---|---|---|---|---|---|
| Headline 1 | 64px | SemiBold | 80px | -2% | — |
| Headline 2 | 48px | SemiBold | 64px | -2% | — |
| Headline 3 | 32px | SemiBold | 40px | 0 | — |
| Headline 4 | 28px | SemiBold | 40px | 0 | — |
| Headline 5 | 24px | SemiBold | 32px | 0 | — |
| Headline 6 | 20px | SemiBold | 32px | 0.15px | — |
| Subtitle 1 | 16px | SemiBold | 24px | 0 | — |
| Subtitle 2 | 14px | SemiBold | 20px | 0 | — |
| Body 1 | 16px | Regular | 24px | 0 | — |
| Body 2 | 14px | Regular | 20px | 2% | — |
| Button | 16px | SemiBold | 16px | 0.5px | UPPERCASE |
| Button (Title Case) | 16px | SemiBold | 24px | 1px | Title Case |
| Button Small | 12px | Medium | 16px | 0.5px | UPPERCASE |
| Caption | 12px | Regular | 20px | 0.15px | — |
| Overline | 12px | SemiBold | 16px | 20% | UPPERCASE |

### 3.2 Web scale — Mobile

H1 40/48/-2% · H2 32/40/-2% · H3 24/32 · H4 20/32 · H5 18/24 · H6 16/24/0.15px · Subtitle1 14/20 · Subtitle2 12/16/0.15px · Body1 14/20 · Body2 12/16 · Button 14/16/0.5px UPPER · Button TC 14/20 Title · Caption 10/16/0.15px · Overline 10/16/1.5px UPPER. All Poppins.

> Headlines scale down substantially on mobile (H1 64→40). Use the responsive pair, not a single fluid value, unless you implement clamp() carefully.

### 3.3 Legacy GLDS Typescale (existing pages only)

Poppins Medium headlines (H1 92px down to H6 20px) with **Noto Sans** Body 1/2/3 (16/14/12). Don't use for new pages; migrate to the Web scale when touching old templates.

---

## 4. Foundations — Spacing, Icons, Layout, Breakpoints

- **Spacing rhythm: base-8.** Confirmed tokens `spacing-xsm = 8px`, `spacing-sm = 16px`; continue the 8px rhythm (8/16/24/32/48/64…) for section padding and gaps.
- **Icons: Material Icons.** Use the Material Icons font (`<span class="material-icons">name</span>`) or inline Material SVGs. Standard sizes 20/24px inline with text; keep icon color matched to adjacent text color. No other icon set.
- **Layout:** marketing sections are full-width bands with a centered max-width content column; alternate Primary Surface (`#FFFFFF`) and Secondary Surface (`#F8F8F8`) to separate bands rather than drawing dividers.

### 4.1 Breakpoints & mobile-first

The targets are **mobile browsers**, **tablets**, and **Windows desktop**. Three device bands:

- **Mobile:** below **768px**
- **Tablet:** **768px – 1024px**
- **Desktop:** above **1024px**

Define these as variables once (`$breakpoint-md: 768px`, `$breakpoint-lg: 1024px`) and reference them everywhere — never hardcode the numbers per-component.

**Type scale swap.** The file ships two discrete type scales (Mobile and Desktop) — type **swaps at a breakpoint**, it does not fluidly interpolate. With three device bands and two scales, the mapping is:
- **< 768px (mobile):** Mobile type scale
- **≥ 768px (tablet + desktop):** Desktop type scale

Tablets are wide enough for the Desktop scale, so the type switch happens at **768px**. The **1024px** breakpoint governs **layout** (column counts, container max-width, grid changes) — not type.

> ⚠️ **Assumption to confirm:** mapping tablet to the Desktop type scale matches the file's two-scale design. If the team wants tablet to use the Mobile scale (or a dedicated tablet treatment), that's a design decision — change the swap point and note it. The band values (768 / 1024) are the standard cutoffs.

**Mobile-first rules** (most ad/landing traffic is mobile):
- The hero value proposition + primary CTA must be visible without scrolling on a typical phone viewport — don't let a decorative hero image push them below the fold.
- **No hover-dependent content.** Touch has no hover; hover may *enhance* but must never *reveal* essential content or actions. Anything behind a hover must also be reachable on tap/focus. (Applies to mobile and tablet — both are touch.)
- CTAs are thumb-reachable; tap targets ≥ 48px, ≥ 8px apart.
- Headlines must survive the 40px mobile H1 without breaking into an awkward wrap — keep hero copy short.

---

## 5. Components (STRICT — match the Figma Components page)

These are HTML/CSS components, not framework components. Each spec gives **anatomy, variants, states, and usage**. The variant axes are exactly those defined in Figma — don't add or rename variants.

### 5.1 Button

**Anatomy:** container (padding + radius) · optional leading icon · label (Button type style) · optional trailing icon. Min height per size; icon is a Material Icon matched to label color.

**Variants (axes from Figma):**
- **configuration:** `linkbutton` · `text` · `outlined` · `filled` · `tonal`
- **icon:** `no-icon` · `with-icon-left` · `with-icon-right`
- **size:** `Small` · `Medium` · `Large`
- **color:** `primary` (Freedom Blue)

**Configuration definitions:**
- **filled** — solid Primary 500 background, white label. The main page CTA. Hover → Primary 600; pressed → Primary 700.
- **tonal** — Primary 50/100 tint background, Primary 700 label. Medium emphasis, secondary CTA.
- **outlined** — transparent bg, Primary 500 border + label. Hover → Primary 50 bg fill.
- **text** — no bg/border, Primary 500 label, padding retained. Low emphasis inline action.
- **linkbutton** — looks like a link (Primary 500, no padding box) but is a real `<button>`. Use for inline text actions that perform an action rather than navigate. **A `<button>`, never an `<a>` with a JS handler.**

**States (every configuration × size):** `enabled` · `hovered` · `pressed` · `disabled`. Disabled uses Disabled Text `#A19F9D` and a muted/again-tint fill; never lower whole-element opacity. Always include a visible `:focus-visible` outline (keyboard).

**Usage:**
- One **filled** primary button per section/view — that's the section's single call-to-action.
- Pair filled (primary CTA) with outlined/text (secondary) — never two filled buttons competing.
- Button label is Poppins SemiBold; UPPERCASE per the Button type style, or Title Case where the friendlier `Button TC` style is specified.
- Icon-only buttons are not part of this set — buttons carry labels. (Material icon-only controls, if ever needed, require an `aria-label`.)

### 5.2 Tag

**Anatomy:** small rounded container · optional icon (left/right) · short label.

**Variants:** **Size** `Small`/`Large` · **Style** `Filled`/`Tonal`/`Outlined`/`Outlined Ghost` · **Colour** `Primary`/`Secondary`/`Success`/`Error` · **Icon** `Left`/`Right`.

- Filled = solid color bg; Tonal = tint bg + dark-color text; Outlined = border only; Outlined Ghost = subtle/low-contrast border.
- **Usage:** status/category labels, not actions. Color carries meaning (Success/Error from UI Feedback; Primary/Secondary for category). Keep labels to 1–2 words.

### 5.3 Text Input

**Anatomy:** label · field container (border, radius, padding) · optional leading adornment · value/placeholder · optional trailing icon · optional helper text.

**Variants:** **Size** `Small`/`Medium*` · **State** `Enabled`/`Hovered`/`Focused`/`Disabled`/`Error` · **Has Value** T/F · **Adornment** T/F · **Icon End** T/F · **Helper Text** T/F.

**States:** Enabled (grey border) · Hovered (darker border) · Focused (Primary 500 border + visible ring) · Error (Error 500 border + helper text in error) · Disabled (Disabled Text, muted border, not opacity). Placeholder uses Secondary Text; entered value uses Primary Text.

**Usage:** every input has a real `<label>` (associated via `for`/`id`). Helper text sits below; error message replaces/ː augments helper text and is announced. Validate on blur, not per keystroke. Error state pairs color with the helper message — never color alone.

### 5.4 Select

**Anatomy:** label · field (like Text Input) · trailing chevron (Material `expand_more`) · optional leading icon · menu list on open · optional helper text.

**Variants:** **Size** `Small`/`Medium*` · **State** `Enabled`/`Hovered`/`Focused`/`Disabled`/`Error` · **Has Value** T/F · **Icon Left** T/F · **Helper Text** T/F.

**Usage:** mirrors Text Input states/colors. Use a native `<select>` for accessibility and mobile unless a custom menu is required; if custom, manage keyboard (arrow/enter/escape) and `aria-expanded`. Closed-with-no-value shows placeholder in Secondary Text.

### 5.5 Checkbox

**Anatomy:** box (border/fill) · check or indeterminate glyph · optional label.

**Variants:** **Checked** T/F · **Indeterminate** T/F · **Label** T/F · **Size** `Small`/`Medium*` · **Color** `Default`/`Info`/`Primary*` · **State** `Hovered`/`Focused`/`Disabled`.

**States:** unchecked (border only) · checked (Primary/Info fill + white check) · indeterminate (fill + dash) · hovered (state-layer tint) · focused (visible ring) · disabled (Disabled Text). 
**Usage:** clickable label is part of the target (wrap in `<label>`); target ≥ the box + label area. Indeterminate only for parent-of-group "some selected".

### 5.6 Switch

**Anatomy:** track · thumb · optional label.

**Variants:** **Checked** T/F · **Label** T/F · **Size** `Small`/`Medium` · **Color** `Primary`/`Default` · **State** `Enabled`/`Hovered`/`Focused`.

**Usage:** for immediate on/off settings (not form submission choices — use Checkbox for those). Checked track = Primary 500. Always has an accessible label; the label states what ON means.

### 5.7 Pagination & PaginationItem

**Pagination variants:** **Shape** `Circular*`/`Rounded` · **Color** `Primary`/`Default`.
**PaginationItem variants:** **Active** T/F · **Icon** T/F (prev/next arrows) · **Size** `Small`/`Medium*`/`Large` · **Variant** `Text*`/`Outlined` · **Shape** `Circular*`/`Rounded` · **Color** `Standard*`/`Primary`/`Secondary` · **Disabled** T/F.

**Usage:** active page item uses the color fill; others are Text variant. Prev/next use Material chevron icons; disable (not hide) them at the ends. Each item is a real link/button with an accessible name ("Page 3", "Next page").

### 5.8 Brand logos & Keyboard

The Components page also includes a **Brand logos** section (partner/brand marks) and a **Keyboard** widget (on-screen keys/toolbar/navigation for specific product surfaces). Reuse these assets as-is; don't recreate logos.

---

## 6. Interaction, Behavioral & Accessibility rules

Marketing pages are mostly static, so the protocol is lighter than the app systems — but these still hold:

1. **One primary call-to-action per section.** One **filled** button; supporting actions are outlined/text/link. `[Von Restorff]`
2. **Links navigate, buttons act.** A link goes to a URL (`<a href>`); an action that looks like a link is a **linkbutton** (`<button>` styled as a link), never an `<a>` with a JS click handler. `[semantics/a11y]`
3. **Material icon-only controls require an `aria-label`.** Buttons in this system carry labels; icon-only is the exception and always needs an accessible name. `[Nielsen #6]`
4. **Interaction states are mandatory, not optional polish:** every interactive element defines `:hover`, `:focus-visible` (visible ring — never `outline:none` without a replacement), `:active`, and disabled. `[Nielsen #1]`
5. **Forms:** real `<label>` per field; validate on blur; errors pair color + message (never color alone) and preserve entered values on failed submit. `[Nielsen #5/#9, loss aversion]`
6. **Feedback color is never text color.** Error/Alert/Success message text is grey 800; the 500 color is for icon/border/accent only (they fail WCAG as text on white). `[contrast]`
7. **Contrast:** body text uses Primary Text `#323130` (≈12:1 on white); Secondary Text `#605E5C` for supporting copy; never set body copy in a brand accent or feedback color.
8. **Heading order:** one `<h1>` per page (usually the hero), descend without skipping levels; pick the heading level for structure, style via CSS.
9. **Respect `prefers-reduced-motion`;** marketing animation (reveals, parallax) must degrade gracefully and never block content.
10. **Scannability:** large headline → short subhead → single CTA per band; front-load the value proposition; don't wall-of-text a landing page. `[F-pattern]`

---

## 7. Conversion & Landing-Page Design

These pages are **transient and attention-first**: a visitor arrives from an ad or search, gives a few seconds, *scans* (doesn't read), and either commits or leaves. The goal is comprehension-and-commitment in one fast pass — not task completion over time. Every rule here serves that.

### 7.1 The band model (one job per section)

Build pages as a vertical stack of full-width **bands**, each self-contained with **one headline, one supporting line, one action** — a single visual path, never competing focal points. A typical landing flow: **hero → value props → social proof → (pricing) → final CTA**. The eye should never have to choose where to look first within a band; if a band has two messages, split it into two bands.

### 7.2 The hero / above-the-fold contract

The first viewport must answer three questions before any scroll, on both mobile and desktop: **what is this · what do I get · what do I do.** That means a value-driven headline (clarity over cleverness), a subhead with the specifics/proof, and the primary CTA — all visible without scrolling. Decorative hero imagery must not push the value proposition or CTA below the fold.

### 7.3 Visual hierarchy & scan path

Visitors scan in an **F/Z pattern** — front-load the important words. Establish one clear focal point per band through size, weight, and position; everything else recedes. Use **whitespace and proximity as the grouping mechanism** (Gestalt): related elements close together, unrelated groups pushed apart, generous space between bands. Whitespace isn't empty space — it's what isolates the one thing you want seen. This is how information stays *connected for the eye* rather than scattered. `[F-pattern, Gestalt proximity, visual hierarchy]`

### 7.4 CTA system

- **Freedom Blue (Primary 500) is reserved for CTAs** — never use it as a decorative accent, so the action color never has to compete for meaning.
- **Repeat the CTA down a long page.** Visitors commit at different scroll depths; the hero CTA, a mid-page CTA, and a closing CTA are all the same action.
- **Action-and-value labels:** "Start free trial", "Book a demo", "Enroll now" — never "Submit"/"Click here". `[goal clarity]`
- **One filled primary CTA per band** (existing rule); supporting actions are outlined/text/linkbutton.

### 7.5 Forms — conversion choke points

Every field costs conversions, so ask for the minimum that the next step truly needs. Real `<label>` per field; validate on blur (not per keystroke); errors pair color + message and **never lose entered input** on a failed submit; show progress on multi-step forms; the submit button states its value ("Get my free guide", not "Submit"). `[Nielsen #5/#9, loss aversion, goal-gradient]`

### 7.6 Motion — spotlight, not wallpaper

Motion must **earn its place by directing attention**, not decorating. The test for any animation: *does it guide the eye to something that matters (the CTA, the next section, a state change)?* If not, cut it. Three tiers:

1. **Functional motion — always fine.** Hover/focus/active feedback, state transitions, validation appearing. Confirmation, not decoration.
2. **Attention motion — allowed but rationed.** Hero element easing in, one key stat counting up, a subtle CTA emphasis. Rule: **one focal animation per viewport, tied to the thing you want seen** — never competing animations in the same eyeful. Entrance reveals fire **once** on scroll-in and are **fast (200–400ms)** so they accelerate the scan, never make the visitor wait.
3. **Decorative / continuous motion — avoid.** Looping backgrounds, scroll-hijacking parallax, auto-advancing carousels (they move at the machine's pace, not the reader's, and measurably hurt conversion).

**Non-negotiables:** motion never hides content (especially on touch — no hover-reveal), never blocks interaction, never delays the CTA becoming usable, always honors `prefers-reduced-motion` with a static fallback. Lean toward *less* on mobile.

### 7.7 Persuasion & Trust (Cialdini's *Influence*, ethical form)

These principles describe how to present **true** things compellingly. Each has an honest form (use it) and a manufactured form (forbidden). The single test: **is the signal real?**

| Principle | Use (when real) |
|---|---|
| **Authority** | Accreditations, university/partner affiliations, instructor credentials, press. *Great Learning's strongest lever — university partnerships are the authority signal.* |
| **Social proof** | Real testimonials (name/photo), enrollment counts, ratings, "most popular" — placed near CTAs. |
| **Scarcity / Urgency** | **Real cohort start dates, application deadlines, genuinely limited seats, time-bound pricing that actually ends.** Urgency is permitted and encouraged where the constraint is true — express it boldly. |
| **Commitment & consistency** | Free/low-friction first step (free lesson, trial), small first yes before the big ask. `[goal-gradient]` |
| **Reciprocity** | Give value first — a useful guide or sample lesson before asking for signup. |
| **Liking** | Warm human voice, relatable faces and imagery, shared-values framing. |
| **Unity** | Belonging language — "join learners like you", community framing. |

**Forbidden — fabricated urgency/proof (dark patterns):** countdown timers that reset on refresh, "only 3 seats left" untied to real inventory, a discount "ending today" that ends every day, fake "N people viewing now" counters, invented reviews/counts, "free" that hides a charge. Real urgency = express it as strongly as you like; if it isn't true, don't invent it. Trust is the conversion metric that compounds.

### 7.8 Measurement hooks

Give CTAs and key bands stable IDs/data attributes so analytics and A/B testing can attach — it's how "better conversion" gets verified rather than assumed. (Implementation/tagging is a build concern; just don't generate markup that makes elements impossible to target.)

---

## 8. AI Engagement Protocol (lightweight)

For an AI coding agent producing Rails views / HTML / CSS / jQuery against this system.

1. **Match the Components page exactly.** Use the defined variant axes and state names; don't invent variants, rename them, or add colors outside the foundations. If a needed variant isn't defined, ask.
2. **Tokens & type by name.** Reference the foundation colors and Web type styles by their role (Primary 500, Secondary Text, Web Headline 2…); emit the hex only into the central stylesheet/variables, never scattered inline.
3. **Use the right element.** Semantic HTML: `<button>` for actions, `<a>` for navigation, `<label>` for fields, Material Icons for icons. Linkbutton = styled `<button>`.
4. **Always include interaction states.** Any interactive element ships hover/focus-visible/active/disabled — generating only the resting state is incomplete work.
5. **Build to the band model** (§7): one headline / one supporting line / one CTA per band; hero answers what-is-this/what-do-I-get/what-do-I-do above the fold.
6. **Persuasion signals must reflect real facts** (§7.7). Use urgency for true deadlines; never fabricate scarcity, proof, or counters.
7. **Coverage report (≤ 4 lines)** after each component/section:
   `Covered:` states & variants built · `Assumed:` any inference · `Not covered:` out of scope · `Deviations:` off-system instructions followed (omit if none).
8. **Reuse before create**; match existing partials/conventions over inventing new patterns. Deviation on explicit request → comply and note under Deviations, never silently.

---

## 9. Anti-patterns (never generate)


1. ❌ Hex values scattered in markup — centralize as CSS variables / Sass tokens by role.
2. ❌ Non-Poppins fonts for new work (Noto Sans is legacy-only); no other icon set than Material Icons.
3. ❌ Feedback 500 colors (`#FF3333`/`#FFBF00`/`#22BB33`) as message text — use grey 800; 500 is icon/border only.
4. ❌ Pure black `#000` for body copy — use Primary Text `#323130`.
5. ❌ `<a>` with a JS click handler for an action — use a linkbutton (`<button>`); `<button>` for navigation — use `<a href>`.
6. ❌ `outline: none` on focus without a visible replacement ring.
7. ❌ Two filled primary buttons competing in one section.
8. ❌ Inventing button/tag/input variants beyond the defined axes.
9. ❌ Icon-only control without an `aria-label`.
10. ❌ Inputs without associated `<label>`; errors shown by color alone.
11. ❌ Disabled states via whole-element `opacity`.
12. ❌ Dividers/borders where alternating surface bands (`#FFFFFF`/`#F8F8F8`) would separate sections.
13. ❌ Skipped heading levels / multiple `<h1>` per page.
14. ❌ Course-card foreground used without its paired background (contrast breaks).
15. ❌ Hero where the value proposition or CTA sits below the fold; or essential content hidden behind hover (dead on touch).
16. ❌ Multiple competing focal points / animations in one band or viewport.
17. ❌ Freedom Blue used as a decorative accent — it's reserved for CTAs.
18. ❌ Auto-advancing carousels, looping background motion, scroll-hijacking parallax; reveals slower than ~400ms.
19. ❌ Fabricated urgency/proof — reset-on-refresh timers, fake seat counts, perpetual "ends today", fake viewer counters, invented reviews.
20. ❌ Vague CTA labels ("Submit", "Click here") instead of action-and-value labels.
21. ❌ Hardcoding breakpoint numbers per component instead of the shared `$breakpoint-md` (768) / `$breakpoint-lg` (1024) variables.
