# Markdown spec (`.md` file)

The full design system as a single markdown document — the **source of truth**, hand-built from the production Figma extraction. It carries every token, every component spec, every behavioral rule, and YAML frontmatter (`name`, `id`, `audience`, `stack`, `summary`).

## How to use

**Paste into an AI session** — drop the entire file into Claude / Cursor / Codex / ChatGPT as context at the start of a coding session. The model will respect tokens, naming, and the engagement protocol when generating code.

**Keep in-repo** — commit the file into your codebase (e.g. `docs/design-system.md`) as the canonical reference for design and engineering. Link to it from your README.

**Pair with the `.context.md`** — every system also ships a leaner *context* file optimized for AI prompt windows: same rules, denser format, no narrative. Use the context file for short prompts and the full spec when you need the worked examples and rationale.

## When to prefer this over the skill

Pick the MD when you want explicit control over what's in context, when you're using a tool that doesn't support Claude skills, or when the spec needs to live alongside your code as documentation.
