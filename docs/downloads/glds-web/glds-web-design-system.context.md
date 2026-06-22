# GLDS Web — AI Context (Great Learning website/landing pages · Rails + HTML/CSS/JS/jQuery · Poppins · Material Icons)

Website/marketing system — NOT an app (that's Jedi=internal, Magna=learner). Components are HTML/CSS patterns, not React. Foundations + Design Language + the Components page are STRICT: use defined variant axes/colors/type by role, emit hex only into the central stylesheet, never invent variants. Fonts: Poppins (headings/UI/buttons), Noto Sans legacy body only. Icons: Material Icons only.

## Protocol (light — marketing pages are mostly static)
1. Match the Components page exactly: defined variant axes + state names only; no invented variants/colors. Missing variant → ask.
2. Tokens/type by ROLE (Primary 500, Secondary Text, Web Headline 2…); hex only in central CSS vars/Sass, never inline.
3. Right element: `<button>`=action, `<a href>`=navigation, `<label>`=field, Material Icons=icons. Linkbutton = styled `<button>`, NEVER `<a>`+JS handler.
4. Always ship interaction states: hover + focus-visible + active + disabled. Resting-state-only = incomplete.
5. Coverage report ≤4 lines after each component: Covered / Assumed / Not covered / Deviations(omit if none).
6. Reuse before create; match existing partials. Off-system on explicit request → comply + note Deviations.

## Behavioral & a11y rules
- ONE filled primary CTA per section; supporting = outlined/text/linkbutton. [Von Restorff]
- Links navigate, buttons act; action-that-looks-like-a-link = linkbutton (`<button>`), never `<a>`+onClick. [a11y]
- Icon-only control → requires aria-label (buttons normally carry labels). [Nielsen #6]
- Interaction states mandatory: :hover/:focus-visible(visible ring, never bare outline:none)/:active/disabled. [Nielsen #1]
- Forms: real `<label>` per field; validate on blur; errors = color + message (never color alone); preserve input on failed submit. [Nielsen #5/#9]
- Feedback color is NEVER text color — message text = grey 800 (#323130); 500 = icon/border only (fail WCAG as text). [contrast]
- Body text = Primary Text #323130 (~12:1), supporting = Secondary Text #605E5C; never brand/feedback color for body.
- One `<h1>`/page, headings don't skip levels, level by structure not size.
- Respect prefers-reduced-motion; reveals/parallax degrade gracefully.
- Scannability: headline → short subhead → single CTA per band; front-load value prop; no wall of text. [F-pattern]

## Design Language (brand colors by meaning)
Freedom Blue #196AE5 (primary action/brand) · Trust Blue #0E39A9 (emphasis/hover-dark) · Wisdom Indigo #0C1D5D (darkest headlines/footers) · Creativity Purple #5C34B1 · Intellect Mandarin #FF9800 (secondary/warm) · Energy Orange #FFBF00 (amber/attention) · Optimism Yellow #FFDF00 · Balance Black #000 · Purity White #FFF. Freedom Blue leads every interaction; warm colors are accents, never the primary action. Poppins = confident modern voice; generous whitespace; one clear CTA per section.

## Foundations — color
Primary UI Action (blue): 50 #E8F0FC · 100 #BAD2F7 · 200 #8CB5F2 · 300 #4788EA · 400 #3079E8 · 500 #196AE5(base) · 600 #1455B7(hover) · 700 #0041B2(pressed) · 800 #0F4089 · 900 #0D3573
Secondary UI Action (mandarin): 50 #FFF3E0 … 500 #FF9800 … 700 #F57C00 · 800 #EF6C00 · 900 #E65100
Web Greys (light): PureContrast #000 · Contrast190 #201F1E · PrimaryText #323130 · Contrast150 #3B3A39 · SecondaryText #605E5C · DisabledText #A19F9D · Contrast60 #C8C6C4 · 50 #D2D0CE · 40 #E1DFDD · Divider #EDEBE9 · SecondarySurface #F8F8F8 · PrimarySurface #FFFFFF
Web Darkmode: PrimarySurface #000 · SecondarySurface #201F1E · TertiarySurface #323130 · DisabledText #605E5C · Contrast90 #A19F9D · Contrast60 #C8C6C4 · BodyDivider #D2D0CE · Contrast40 #E1DFDD · SecondaryText #F8F8F8 · PrimaryText #FFF
UI Feedback (50 bg / 500 main / 800 text=#323130): Error #FFEBEE/#FF3333 · Alert #FFF8E1/#FFBF00 · Success #E7F7E7/#22BB33
Course cards (bg/fg pairs, use together): Cool10 #E1F4F4/#00A498 · Cool20 #E3F4FF/#196BE5 · Cool30 #E7E9F7/#0E39A9 · Cool40 #EDE7F6/#5C34B1 · Warm10 #FFF8E1/#FFA200 · Warm20 #FBE9E7/#E64A19 · Warm30 #FBE8E7/#E53119 · Warm40 #FCE4EC/#C2185B

## Foundations — type (Web scale, Poppins; use for all new work)
Desktop: H1 64/SemiBold/80/-2% · H2 48/SB/64/-2% · H3 32/SB/40/0 · H4 28/SB/40 · H5 24/SB/32 · H6 20/SB/32/0.15 · Subtitle1 16/SB/24 · Subtitle2 14/SB/20 · Body1 16/Reg/24 · Body2 14/Reg/20/2% · Button 16/SB/16/0.5/UPPER · ButtonTC 16/SB/24/1px/Title · ButtonSmall 12/Med/16/0.5/UPPER · Caption 12/Reg/20/0.15 · Overline 12/SB/16/20%/UPPER
Mobile: H1 40/48 · H2 32/40 · H3 24/32 · H4 20/32 · H5 18/24 · H6 16/24 · Subtitle1 14/20 · Subtitle2 12/16 · Body1 14/20 · Body2 12/16 · Button 14/16/UPPER · Caption 10/16 · Overline 10/16/UPPER
(Legacy GLDS Typescale = Poppins headings + Noto Sans body — existing pages only, migrate when touched.)
Spacing: base-8 rhythm (xsm 8, sm 16; continue 24/32/48/64). Icons: Material Icons font/SVG, 20–24px, color matched to text.
Breakpoints: mobile <768px · tablet 768–1024px · desktop >1024px. Vars: `$breakpoint-md: 768px`, `$breakpoint-lg: 1024px` (never hardcode per-component). TYPE swaps at a breakpoint (not fluid): Mobile scale <768, Desktop scale ≥768 (tablet uses Desktop type — wide enough). The 1024 breakpoint governs LAYOUT (columns/container width), not type. (ASSUMPTION: tablet→Desktop type matches the file's two-scale design; change + note if team wants a tablet treatment.) Mobile-first: hero value prop + CTA visible without scroll on phone; NO hover-dependent content (touch — incl. tablet — has no hover; hover enhances, never reveals); CTAs thumb-reachable, tap targets ≥48px ≥8px apart; hero copy short enough to survive 40px mobile H1.

## Conversion & landing-page (these pages are transient, attention-first — scan-and-commit in one pass)
- BAND MODEL: page = stack of full-width bands, each with ONE headline / ONE supporting line / ONE action. Single visual path per band, no competing focal points. Flow: hero → value props → social proof → (pricing) → final CTA. Two messages → two bands.
- HERO CONTRACT: first viewport answers what-is-this / what-do-I-get / what-do-I-do before any scroll, mobile + desktop. Value headline (clarity > cleverness) + specifics subhead + primary CTA, all above the fold. Decorative imagery never pushes value/CTA down.
- SCAN PATH: F/Z pattern — front-load important words; one focal point per band via size/weight/position; whitespace + proximity group related items and isolate the one thing to see (info connected, not scattered). [F-pattern, Gestalt]
- CTA SYSTEM: Freedom Blue (Primary 500) RESERVED for CTAs (never decorative); repeat CTA down long pages (commit at different depths); action+value labels ("Start free trial", never "Submit"); one filled CTA per band.
- FORMS (choke points): minimum fields only; real <label>; validate on blur; never lose input on failed submit; multi-step shows progress; submit states its value.
- MOTION = spotlight not wallpaper. Test: does it direct attention to something that matters? If not, cut. (1) functional (hover/focus/active/transitions) always fine; (2) attention motion rationed — ONE focal animation per viewport, fires once on scroll-in, fast 200–400ms; (3) avoid decorative/continuous — looping bg, scroll-hijack parallax, auto-advancing carousels. Never hide content/block interaction/delay CTA; honor prefers-reduced-motion; less on mobile.
- PERSUASION (Cialdini, ethical — present TRUE things compellingly; test = is the signal real?): Authority (accreditation/university partners — GL's strongest), Social proof (real testimonials/counts near CTAs), Scarcity/Urgency (REAL cohort dates/deadlines/limited seats/time-bound pricing — permitted & encouraged, express boldly), Commitment (free/low-friction first step), Reciprocity (give value first), Liking (warm voice/faces), Unity (belonging). FORBIDDEN fabricated forms: reset-on-refresh timers, fake seat counts, perpetual "ends today", fake viewer counters, invented reviews, "free" hiding a charge. Real urgency = bold; fake = never.
- MEASUREMENT: give CTAs/key bands stable ids/data-attrs so analytics/A-B can attach.

## Components (STRICT — variant axes exactly as defined; full specs in main doc §5)
Button — configuration: linkbutton|text|outlined|filled|tonal · icon: no-icon|with-icon-left|with-icon-right · size: Small|Medium|Large · color: primary. filled=Primary500 bg/white (main CTA, hover 600, pressed 700); tonal=Primary50/100 tint+Primary700 text; outlined=Primary500 border+label (hover 50 bg); text=label only; linkbutton=link-look but real `<button>`. States: enabled/hovered/pressed/disabled (+focus-visible). One filled per section; disabled via tokens not opacity; labels carried (no icon-only in set).
Tag — Size Small|Large · Style Outlined Ghost|Outlined|Filled|Tonal · Colour Primary|Secondary|Success|Error · Icon Left|Right. Status/category labels, not actions; color=meaning; 1–2 words.
Text Input — Size Small|Medium* · State Enabled|Hovered|Focused|Disabled|Error · Has Value · Adornment · Icon End · Helper Text. Focused=Primary500 border+ring; Error=Error500 border+helper msg. Real `<label>`; validate on blur; error=color+message.
Select — Size Small|Medium* · State Enabled|Hovered|Focused|Disabled|Error · Has Value · Icon Left · Helper Text. Mirrors Text Input; prefer native `<select>`; if custom, manage keyboard + aria-expanded.
Checkbox — Checked · Indeterminate · Label · Size Small|Medium* · Color Default|Info|Primary* · State Hovered|Focused|Disabled. Checked=fill+white check; indeterminate=dash (parent-of-group only); label inside target (`<label>`).
Switch — Checked · Label · Size Small|Medium · Color Primary|Default · State Enabled|Hovered|Focused. Immediate on/off (not form choice); checked track=Primary500; accessible label states what ON means.
Pagination — Shape Circular*|Rounded · Color Primary|Default. PaginationItem — Active · Icon · Size Small|Medium*|Large · Variant Text*|Outlined · Shape Circular*|Rounded · Color Standard*|Primary|Secondary · Disabled. Active=color fill, others=Text; prev/next=Material chevrons, disable(not hide) at ends; each item accessible-named.
Also: Brand logos section + Keyboard widget — reuse as-is, don't recreate.

## Anti-patterns
Scattered inline hex (centralize as CSS vars) · non-Poppins for new work / non-Material icons · feedback 500 as message text (use grey 800) · #000 body copy (use #323130) · `<a>`+JS for actions / `<button>` for nav · outline:none w/o replacement ring · two filled CTAs per section · invented variants beyond defined axes · icon-only without aria-label · inputs without `<label>` / color-only errors · disabled via opacity · dividers where surface bands suffice · skipped headings/multiple h1 · course-card fg without its paired bg · hero value/CTA below the fold or behind hover · competing focal points/animations in one band · Freedom Blue as decorative accent · auto-carousels/looping bg/scroll-hijack parallax/reveals >400ms · fabricated urgency (reset timers, fake counts, perpetual "ends today") or invented proof · vague CTA labels ("Submit") · hardcoded breakpoint number instead of $breakpoint-md.
