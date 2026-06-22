#!/usr/bin/env node
// Re-runnable build pipeline. Reads systems/<id>/{spec,context}.md,
// emits dist/<id>/{skill/, *.md, npm/} + dist/manifest.json, then
// copies dist into docs/downloads so GitHub Pages can serve artifacts.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import matter from 'gray-matter';
import archiver from 'archiver';
import { createWriteStream } from 'node:fs';

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SYSTEMS_DIR = path.join(ROOT, 'systems');
const DIST_DIR = path.join(ROOT, 'dist');
const DOCS_DOWNLOADS = path.join(ROOT, 'docs', 'downloads');
const HELP_DIR = path.join(__dirname, 'help');

const SKILL_DESCRIPTIONS = {
  jedi:
    "Great Learning's INTERNAL/admin app design system (MUI + React, sovereign dashboards, light+dark, Inter). Use whenever building internal tools, admin panels, staff/ops UI, or dashboards for Great Learning — even if 'design system' isn't said. NOT for learner apps (use Magna) or marketing pages (use GLDS Web).",
  magna:
    "Great Learning's LEARNER/student-facing app design system (Tamagui monorepo, Material 3 roles, light+dark, Inter). Use whenever building consumer/learner-facing app UI, course screens, or student flows for Great Learning. NOT for internal admin tools (use Jedi) or marketing pages (use GLDS Web).",
  'glds-web':
    "Great Learning's WEBSITE/landing-page design system (Rails + HTML/CSS/JS/jQuery, Poppins, Material Icons, conversion-focused). Use whenever building marketing pages, landing pages, or the Academy+ website for Great Learning. NOT for app UI (use Jedi for internal, Magna for learner)."
};

async function rmrf(p) {
  await fs.rm(p, { recursive: true, force: true });
}
async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}
async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
}
async function writeFile(dest, contents) {
  await ensureDir(path.dirname(dest));
  await fs.writeFile(dest, contents);
}

async function gitLastTouch(filePath) {
  // Returns { author, isoDate } or null when unavailable (no commits yet, or not a git repo).
  try {
    const { stdout } = await execFileP(
      'git',
      ['log', '-1', '--format=%an%x09%aI', '--', filePath],
      { cwd: ROOT }
    );
    const line = stdout.trim();
    if (!line) return null;
    const [author, isoDate] = line.split('\t');
    if (!author || !isoDate) return null;
    return { author, isoDate };
  } catch {
    return null;
  }
}

function formatDate(iso) {
  // YYYY-MM-DD slice; safe for ISO timestamps.
  return iso ? iso.slice(0, 10) : '';
}

function stringifyYaml(obj) {
  // Tiny YAML writer (flat string values). Quote anything with special chars.
  const esc = (v) => {
    const s = String(v);
    return /[:\-#&*!?{}\[\],>%@`"\n]/.test(s) || s !== s.trim()
      ? JSON.stringify(s)
      : s;
  };
  return Object.entries(obj)
    .map(([k, v]) => `${k}: ${esc(v)}`)
    .join('\n');
}

function buildSkillMarkdown(systemMeta, specBody) {
  const fm = {
    name: systemMeta.name,
    description: SKILL_DESCRIPTIONS[systemMeta.id]
  };
  return `---\n${stringifyYaml(fm)}\n---\n\n${specBody.trimStart()}`;
}

async function zipDirectory(srcDir, outZipPath) {
  await ensureDir(path.dirname(outZipPath));
  await new Promise((resolve, reject) => {
    const output = createWriteStream(outZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(srcDir, false);
    archive.finalize();
  });
}

async function fileSize(p) {
  try {
    return (await fs.stat(p)).size;
  } catch {
    return 0;
  }
}

async function readHelp() {
  const files = ['skill.md', 'md.md', 'npm.md'];
  const help = {};
  for (const f of files) {
    const key = f.replace('.md', '');
    help[key] = (await fs.readFile(path.join(HELP_DIR, f), 'utf8')).trim();
  }
  return help;
}

async function buildSystem(id) {
  const sysDir = path.join(SYSTEMS_DIR, id);
  const specPath = path.join(sysDir, 'spec.md');
  const contextPath = path.join(sysDir, 'context.md');

  const specRaw = await fs.readFile(specPath, 'utf8');
  const contextRaw = await fs.readFile(contextPath, 'utf8');
  const parsed = matter(specRaw);
  const fm = parsed.data || {};
  if (!fm.id || !fm.name) {
    throw new Error(`systems/${id}/spec.md missing required frontmatter (id, name)`);
  }
  if (fm.id !== id) {
    throw new Error(`systems/${id}/spec.md id mismatch: frontmatter says "${fm.id}"`);
  }

  // Sticky per-file updatedBy/updatedAt: prefer frontmatter override, else git history.
  let updatedBy = fm.updatedBy;
  let updatedAt = fm.updatedAt;
  if (!updatedBy || !updatedAt) {
    const git = await gitLastTouch(path.relative(ROOT, specPath));
    if (git) {
      updatedBy = updatedBy || git.author;
      updatedAt = updatedAt || formatDate(git.isoDate);
    }
  }
  updatedBy = updatedBy || 'Unknown';
  updatedAt = updatedAt || '—';

  const outDir = path.join(DIST_DIR, id);
  await rmrf(outDir);
  await ensureDir(outDir);

  // (a) Claude skill folder + zip.
  const skillDir = path.join(outDir, 'skill');
  await ensureDir(skillDir);
  const skillMd = buildSkillMarkdown({ id, name: fm.name }, parsed.content);
  await writeFile(path.join(skillDir, 'SKILL.md'), skillMd);
  const skillZipName = `${id}-design-system.skill`;
  const skillZipPath = path.join(outDir, skillZipName);
  await zipDirectory(skillDir, skillZipPath);

  // (b) MD passthroughs (with frontmatter intact).
  const mdName = `${id}-design-system.md`;
  const contextName = `${id}-design-system.context.md`;
  await copyFile(specPath, path.join(outDir, mdName));
  await copyFile(contextPath, path.join(outDir, contextName));

  // (c) Node package scaffold (coming soon).
  const npmDir = path.join(outDir, 'npm');
  await ensureDir(npmDir);
  await writeFile(
    path.join(npmDir, 'package.json'),
    JSON.stringify(
      {
        name: `@greatlearning/${id}-design-system`,
        version: '0.0.0',
        description: `${fm.name} — design tokens (coming soon).`,
        main: 'index.js',
        private: true,
        license: 'UNLICENSED'
      },
      null,
      2
    ) + '\n'
  );
  await writeFile(
    path.join(npmDir, 'index.js'),
    "module.exports = { status: 'coming-soon' };\n"
  );
  await writeFile(
    path.join(npmDir, 'TODO.md'),
    `# ${fm.name} — npm package (coming soon)\n\nThis package will export the design tokens (colors, type scale, spacing) as JS/TS modules + CSS custom properties, generated from a future canonical \`tokens.json\` checked into this system.\n\nUntil then, use the Claude skill or the markdown spec as the source of truth.\n`
  );

  return {
    id,
    name: fm.name,
    audience: fm.audience || '',
    stack: fm.stack || '',
    summary: fm.summary || '',
    updatedBy,
    updatedAt,
    files: {
      skill: {
        url: `downloads/${id}/${skillZipName}`,
        filename: skillZipName,
        sizeBytes: await fileSize(skillZipPath),
        available: true
      },
      md: {
        url: `downloads/${id}/${mdName}`,
        filename: mdName,
        sizeBytes: await fileSize(path.join(outDir, mdName)),
        available: true
      },
      context: {
        url: `downloads/${id}/${contextName}`,
        filename: contextName,
        sizeBytes: await fileSize(path.join(outDir, contextName)),
        available: true
      },
      npm: {
        url: '',
        filename: `@greatlearning/${id}-design-system`,
        sizeBytes: 0,
        available: false
      }
    }
  };
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function main() {
  await rmrf(DIST_DIR);
  await ensureDir(DIST_DIR);

  const ids = (await fs.readdir(SYSTEMS_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const systems = [];
  for (const id of ids) {
    process.stdout.write(`building ${id}...`);
    systems.push(await buildSystem(id));
    process.stdout.write(' ok\n');
  }

  const help = await readHelp();
  const manifest = {
    generatedAt: new Date().toISOString(),
    systems,
    help
  };
  await writeFile(
    path.join(DIST_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );

  // Mirror dist into docs/downloads so Pages (serving /docs) can serve artifacts.
  await rmrf(DOCS_DOWNLOADS);
  await ensureDir(DOCS_DOWNLOADS);
  for (const id of ids) {
    await copyDir(path.join(DIST_DIR, id), path.join(DOCS_DOWNLOADS, id));
  }
  // Also place manifest at docs/manifest.json (root of site) for the SPA to fetch.
  await fs.copyFile(
    path.join(DIST_DIR, 'manifest.json'),
    path.join(ROOT, 'docs', 'manifest.json')
  );

  console.log(`\nbuilt ${systems.length} systems → dist/ and mirrored to docs/downloads/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
