# Claude skill (`.skill` file)

A **Claude skill** is a packaged unit of expertise — a folder containing a `SKILL.md` (with YAML frontmatter that tells Claude *when* to load the skill) plus any supporting files. Once installed, Claude scans the description of every available skill and auto-loads the matching one when your prompt looks relevant. No copy/paste, no manual context juggling.

## Install

**Claude.ai (web)** — open Settings → *Capabilities* → *Skills* → *Add skill* → upload the `.skill` file. The skill becomes available in every new chat.

**Claude Code (CLI / IDE)** — drop the unzipped folder into the project's `.claude/skills/` directory (create it if it doesn't exist), or your user-level skills directory for cross-project use. Restart the session.

## How triggering works

Claude reads the `description` field in the skill's frontmatter and decides whether the skill is relevant to your current message. That description is the only signal it has — so these skills are written with explicit "use whenever…" / "NOT for…" cues to keep them from cross-firing with the other Great Learning design systems.

If you don't want the skill to auto-trigger, you can call it out explicitly in your prompt ("use the Jedi design system skill"), or disable it in Settings.

## When to prefer this over the raw MD

Pick the skill when you'll work on the same system repeatedly inside Claude — it loads silently and stays out of your prompt window. Pick the MD when you want to paste it into a different tool (Cursor, Codex, ChatGPT) or commit it to a repo as the canonical reference.
