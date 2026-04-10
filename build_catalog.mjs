#!/usr/bin/env node
// build_catalog.mjs — End-to-end mermaid diagram catalog generator for FHIR IGs
//
// Usage:
//   node mermaid/build_catalog.mjs                  # default: 90 days lookback
//   node mermaid/build_catalog.mjs --days 30        # last 30 days
//   node mermaid/build_catalog.mjs --days 365       # last year
//
// Pipeline:
//   1. Fetch build.fhir.org/ig/qas.json
//   2. Filter to IGs built within the lookback period
//   3. Deduplicate by package-id (newest build per package)
//   4. For each IG, fetch built HTML pages from build.fhir.org, scan for mermaid
//   5. Extract mermaid diagram code
//   6. Write data files  (mermaid_igs.jsonl, diagrams.jsonl)
//   7. Generate catalog  (catalog.md, catalog.html)
//
// Output (all in mermaid/):
//   mermaid_igs.jsonl     — one JSON line per IG that uses mermaid
//   mermaid_skipped.jsonl — IGs checked but no mermaid found
//   diagrams.jsonl        — one JSON line per extracted diagram
//   catalog.md            — markdown catalog (fenced mermaid blocks)
//   catalog.html          — self-contained HTML with live-rendered diagrams

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// ================================================================
// CLI & config
// ================================================================

const args = process.argv.slice(2);
const daysFlag = args.indexOf('--days');
const LOOKBACK_DAYS = daysFlag >= 0 && args[daysFlag + 1]
  ? parseInt(args[daysFlag + 1], 10)
  : 90;

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'mermaid');
const CONTENT_DIR = path.join(OUT, 'content');

const TARGET = 200;           // max IGs to collect (most lookbacks won't hit this)
const CONCURRENCY = 6;
const BUILD_BASE = 'https://build.fhir.org/ig';
const CUTOFF = new Date(Date.now() - LOOKBACK_DAYS * 86_400_000);

await mkdir(CONTENT_DIR, { recursive: true });

// ================================================================
// Main
// ================================================================

async function main() {
  console.error(`Mermaid catalog builder — lookback ${LOOKBACK_DAYS} days (since ${CUTOFF.toISOString().slice(0,10)})\n`);

  // --- Phase 1: fetch qas.json ---
  console.error('Fetching build.fhir.org/ig/qas.json…');
  const res = await fetchWithTimeout('https://build.fhir.org/ig/qas.json', 60_000);
  if (!res.ok) throw new Error(`qas.json: HTTP ${res.status}`);
  const qas = await res.json();
  await writeFile(path.join(OUT, 'qas.json'), JSON.stringify(qas, null, 2));
  console.error(`  ${qas.length} total entries`);

  // --- Phase 2: filter & dedupe ---
  const recent = qas.filter(e =>
    e['package-id'] && e.repo && e.dateISO8601 && new Date(e.dateISO8601) >= CUTOFF
  );
  const byPkg = new Map();
  for (const e of recent) {
    const pid = e['package-id'];
    const prev = byPkg.get(pid);
    if (!prev || new Date(e.dateISO8601) > new Date(prev.dateISO8601))
      byPkg.set(pid, e);
  }
  const candidates = [...byPkg.values()]
    .sort((a, b) => new Date(b.dateISO8601) - new Date(a.dateISO8601));

  console.error(`  ${recent.length} entries in lookback window`);
  console.error(`  ${candidates.length} unique packages to check\n`);

  // --- Phase 3: scan for mermaid ---
  const kept = [];
  const skipped = [];
  const allDiagrams = [];
  let idx = 0;

  async function worker() {
    while (idx < candidates.length && kept.length < TARGET) {
      const i = idx++;
      const entry = candidates[i];
      const buildUrl = deriveBuildUrl(entry.repo);
      const safe = safeName(entry['package-id'] + '#' + (entry['ig-ver'] || 'latest'));

      if (!buildUrl) {
        skipped.push({ ...summarize(entry), safe, status: 'no_build_url' });
        continue;
      }

      try {
        const result = await scanBuildForMermaid(buildUrl);

        if (result.mermaidFiles.length === 0) {
          skipped.push({ ...summarize(entry), safe, buildUrl, status: 'no_mermaid' });
          process.stderr.write(`  [${i+1}/${candidates.length}] · skip ${entry['package-id']}\n`);
          continue;
        }

        // Found mermaid — record it
        const row = {
          ...summarize(entry), safe, buildUrl, status: 'kept',
          mermaidFileCount: result.mermaidFiles.length,
          diagramCount: result.diagrams.length,
          mermaidFiles: result.mermaidFiles.map(f => f.name),
        };
        kept.push(row);

        // Save mermaid-containing page files
        const contentDir = path.join(CONTENT_DIR, safe);
        await mkdir(contentDir, { recursive: true });
        for (const f of result.mermaidFiles) {
          await writeFile(path.join(contentDir, f.name.replace(/[/\\]/g, '__')), f.content);
        }

        // Accumulate diagrams
        for (const d of result.diagrams) {
          allDiagrams.push({
            package: entry['package-id'], version: entry['ig-ver'] || '',
            buildUrl, file: d.file, diagramType: d.type, code: d.code,
          });
        }

        process.stderr.write(
          `  [${i+1}/${candidates.length}] + KEPT ${entry['package-id']}` +
          `  (${result.mermaidFiles.length} pages, ${result.diagrams.length} diagrams)` +
          `  -> ${kept.length}\n`
        );
      } catch (e) {
        skipped.push({ ...summarize(entry), safe, buildUrl, status: 'error', error: String(e.message || e) });
        process.stderr.write(`  [${i+1}/${candidates.length}] X err  ${entry['package-id']}  ${e.message}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // --- Phase 4: write data files ---
  const jsonlJoin = arr => arr.map(r => JSON.stringify(r)).join('\n') + (arr.length ? '\n' : '');
  await writeFile(path.join(OUT, 'mermaid_igs.jsonl'), jsonlJoin(kept));
  await writeFile(path.join(OUT, 'mermaid_skipped.jsonl'), jsonlJoin(skipped));
  await writeFile(path.join(OUT, 'diagrams.jsonl'), jsonlJoin(allDiagrams));

  // --- Phase 5: generate catalog files ---
  const catalogMd = generateMarkdown(allDiagrams, kept);
  await writeFile(path.join(OUT, 'catalog.md'), catalogMd);

  const catalogHtml = generateHtml(allDiagrams, kept);
  await writeFile(path.join(OUT, 'catalog.html'), catalogHtml);

  // --- Summary ---
  console.error(`\n========================================`);
  console.error(`Lookback:   ${LOOKBACK_DAYS} days (since ${CUTOFF.toISOString().slice(0,10)})`);
  console.error(`Found:      ${kept.length} IGs with Mermaid`);
  console.error(`Diagrams:   ${allDiagrams.length}`);
  console.error(`Skipped:    ${skipped.length}`);
  console.error(`Output:     mermaid/catalog.html, mermaid/catalog.md`);
  console.error(`Data:       mermaid/mermaid_igs.jsonl, mermaid/diagrams.jsonl`);
}

// ================================================================
// Build URL derivation
// ================================================================

function deriveBuildUrl(repo) {
  if (!repo) return null;
  const base = repo.replace(/\/qa\.json$/, '');
  return base ? `${BUILD_BASE}/${base}` : null;
}

// ================================================================
// Scan a built IG for mermaid content
// ================================================================

async function scanBuildForMermaid(buildUrl) {
  const mermaidFiles = [];
  const diagrams = [];
  const base = buildUrl.replace(/\/$/, '');

  // Fetch index page
  let indexHtml = '';
  try {
    const r = await fetchWithTimeout(base + '/index.html', 15_000);
    if (r.ok) indexHtml = await r.text();
    else {
      const r2 = await fetchWithTimeout(base + '/', 15_000);
      if (r2.ok) indexHtml = await r2.text();
    }
  } catch { return { mermaidFiles, diagrams }; }

  if (!indexHtml || !/mermaid/i.test(indexHtml))
    return { mermaidFiles, diagrams };

  // Check index page itself
  if (hasMermaidDiagramContent(indexHtml)) {
    mermaidFiles.push({ name: 'index.html', content: indexHtml });
    extractDiagrams(indexHtml, 'index.html', diagrams);
  }

  // Gather page links from index + toc
  const pageLinks = new Set();
  extractPageLinks(indexHtml, pageLinks);
  try {
    const tocRes = await fetchWithTimeout(base + '/toc.html', 10_000);
    if (tocRes.ok) extractPageLinks(await tocRes.text(), pageLinks);
  } catch {}

  // Check content pages (skip boilerplate)
  const skipPages = new Set([
    'index.html', 'toc.html', 'artifacts.html', 'downloads.html',
    'searchform.html', 'package-list.html', 'qa.html', 'history.html',
  ]);
  let checked = 0;
  for (const link of pageLinks) {
    if (checked >= 30) break;
    if (skipPages.has(link)) continue;
    if (/^(StructureDefinition|ValueSet|CodeSystem|SearchParameter|CapabilityStatement|OperationDefinition)-/.test(link)) continue;
    try {
      const r = await fetchWithTimeout(`${base}/${link}`, 10_000);
      if (!r.ok) continue;
      checked++;
      const text = await r.text();
      if (!/mermaid/i.test(text) || !hasMermaidDiagramContent(text)) continue;
      mermaidFiles.push({ name: link, content: text });
      extractDiagrams(text, link, diagrams);
    } catch {}
  }

  return { mermaidFiles, diagrams };
}

function extractPageLinks(html, linkSet) {
  const re = /href="([^"]*?\.html)"/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    if (/^(https?:|#|mailto:)/.test(href)) continue;
    const clean = href.replace(/^\.\//, '').replace(/^\.\.\/[^/]+\//, '');
    if (!clean.includes('/')) linkSet.add(clean);
  }
}

// ================================================================
// Mermaid detection & extraction
// ================================================================

function hasMermaidDiagramContent(text) {
  return /```mermaid/i.test(text)
    || /<(?:div|pre|code)\s[^>]*class\s*=\s*["'][^"']*mermaid[^"']*["'][^>]*>/i.test(text)
    || /\{%\s*include\s+mermaid/i.test(text);
}

function extractDiagrams(text, fileName, diagrams) {
  let m;
  // ```mermaid ... ```
  const fenced = /```mermaid\s*\n([\s\S]*?)```/gi;
  while ((m = fenced.exec(text)))
    diagrams.push({ file: fileName, type: 'fenced', code: m[1].trim() });

  // <div|pre class="mermaid" ...>...</div|pre>
  const divPre = /<(?:div|pre)\s+class\s*=\s*["']mermaid["'][^>]*>([\s\S]*?)<\/(?:div|pre)>/gi;
  while ((m = divPre.exec(text))) {
    const c = entities(m[1]).trim();
    if (c.length > 10) diagrams.push({ file: fileName, type: 'html_element', code: c });
  }

  // <code class="language-mermaid">...</code>
  const codeLm = /<code\s+class\s*=\s*["']language-mermaid["'][^>]*>([\s\S]*?)<\/code>/gi;
  while ((m = codeLm.exec(text))) {
    const c = entities(m[1]).trim();
    if (c.length > 10) diagrams.push({ file: fileName, type: 'language_mermaid', code: c });
  }

  // {% include mermaid... content="..." %}
  const incl = /\{%\s*include\s+mermaid[^"]*content\s*=\s*"([\s\S]*?)"\s*%\}/gi;
  while ((m = incl.exec(text)))
    diagrams.push({ file: fileName, type: 'include', code: m[1].trim() });
}

function entities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#10;/g, '\n').replace(/&#13;/g, '\r');
}

// ================================================================
// Catalog generators
// ================================================================

function generateMarkdown(diagrams, igs) {
  const byPkg = groupBy(diagrams, d => d.package);
  const igMap = new Map(igs.map(ig => [ig.package, ig]));

  const stats = computeStats(diagrams);

  let md = '# FHIR IG Mermaid Diagram Catalog\n\n';
  md += `> Auto-generated ${new Date().toISOString().slice(0,10)} from [build.fhir.org](https://build.fhir.org/ig/qas.json) CI builds\n`;
  md += `> Lookback: ${LOOKBACK_DAYS} days — **${diagrams.length} diagrams** from **${byPkg.size} IGs**\n\n`;
  md += '### Diagram types\n\n';
  md += '| Type | Count |\n|------|------:|\n';
  for (const [type, count] of stats) md += `| ${type} | ${count} |\n`;
  md += `| **Total** | **${diagrams.length}** |\n\n`;
  md += '---\n\n';

  for (const [pkg, diags] of byPkg) {
    const ig = igMap.get(pkg) || {};
    md += `## ${pkg}${ig.version ? ' (' + ig.version + ')' : ''}\n\n`;
    if (ig.title && ig.title !== pkg) md += `**${ig.title}**\n\n`;
    const links = [];
    if (ig.buildUrl) links.push(`[Build](${ig.buildUrl})`);
    if (ig.githubUrl) links.push(`[GitHub](${ig.githubUrl})`);
    if (ig.url) links.push(`[Canonical](${ig.url})`);
    if (links.length) md += links.join(' · ') + '\n\n';
    if (ig.fhirVersion) md += `FHIR ${ig.fhirVersion}`;
    if (ig.date) md += ` · ${ig.date.slice(0,10)}`;
    if (ig.fhirVersion || ig.date) md += '\n\n';
    for (let i = 0; i < diags.length; i++) {
      const d = diags[i];
      const pageUrl = ig.buildUrl ? ig.buildUrl.replace(/\/$/, '') + '/' + d.file : '';
      md += `### ${d.file}${diags.length > 1 ? ' (#' + (i+1) + ')' : ''}`;
      if (pageUrl) md += ` — [view page](${pageUrl})`;
      md += '\n\n';
      md += '```mermaid\n' + d.code + '\n```\n\n';
    }
  }
  return md;
}

function generateHtml(diagrams, igs) {
  const byPkg = groupBy(diagrams, d => d.package);
  const igMap = new Map(igs.map(ig => [ig.package, ig]));

  const stats = computeStats(diagrams);
  let statsHtml = '<div class="stats"><h2>Diagram Types</h2><table><thead><tr><th>Type</th><th>Count</th></tr></thead><tbody>';
  for (const [type, count] of stats) statsHtml += `<tr><td>${esc(type)}</td><td>${count}</td></tr>`;
  statsHtml += `</tbody><tfoot><tr><th>Total</th><th>${diagrams.length}</th></tr></tfoot></table></div>`;

  let toc = '';
  let content = '';

  for (const [pkg, diags] of byPkg) {
    const ig = igMap.get(pkg) || {};
    const slug = pkg.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

    toc += `<li><a href="#${slug}">${esc(pkg)}</a> <span class="badge">${diags.length}</span></li>\n`;

    content += `<section id="${slug}">\n`;
    content += `<h2>${esc(pkg)}${ig.version ? ' <small>' + esc(ig.version) + '</small>' : ''}</h2>\n`;
    if (ig.title && ig.title !== pkg) content += `<p class="ig-title">${esc(ig.title)}</p>\n`;
    content += '<div class="ig-meta">';
    if (ig.fhirVersion) content += `<span class="label">FHIR ${esc(ig.fhirVersion)}</span> `;
    if (ig.date) content += `<span class="label">${esc(ig.date.slice(0,10))}</span> `;
    if (ig.buildUrl) content += `<a href="${esc(ig.buildUrl)}" target="_blank">Build</a> `;
    if (ig.githubUrl) content += `<a href="${esc(ig.githubUrl)}" target="_blank">GitHub</a> `;
    if (ig.url) content += `<a href="${esc(ig.url)}" target="_blank">Canonical</a>`;
    content += '</div>\n';

    for (let i = 0; i < diags.length; i++) {
      const d = diags[i];
      const pageUrl = ig.buildUrl ? ig.buildUrl.replace(/\/$/, '') + '/' + d.file : '';
      content += '<div class="diagram-card">\n';
      content += `<h3>${esc(d.file)}${diags.length > 1 ? ' <small>#' + (i+1) + '</small>' : ''}`;
      if (pageUrl) content += ` <a href="${esc(pageUrl)}" target="_blank" class="page-link">view page</a>`;
      content += '</h3>\n';
      content += `<pre class="mermaid">\n${esc(d.code)}\n</pre>\n`;
      content += `<details><summary>Source</summary><pre class="source"><code>${esc(d.code)}</code></pre></details>\n`;
      content += '</div>\n';
    }
    content += '</section>\n';
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FHIR IG Mermaid Diagram Catalog</title>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: { useMaxWidth: true, htmlLabels: true },
      sequence: { useMaxWidth: true },
    });
  </script>
  <style>
    :root {
      --bg: #fff; --fg: #333; --muted: #666; --border: #e0e0e0;
      --accent: #005a9c; --accent-light: #e8f0fe;
      --card-bg: #fafbfc; --badge-bg: #005a9c;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: var(--fg); background: var(--bg); line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header {
      background: var(--accent); color: #fff; padding: 24px 0; margin-bottom: 32px;
      border-bottom: 4px solid #003d6b;
    }
    header h1 { font-size: 1.6rem; font-weight: 600; }
    header p { opacity: 0.85; font-size: 0.95rem; margin-top: 4px; }
    .layout { display: flex; gap: 32px; align-items: flex-start; }
    .sidebar {
      position: sticky; top: 16px; width: 280px; flex-shrink: 0;
      background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px;
      padding: 16px; max-height: calc(100vh - 32px); overflow-y: auto;
    }
    .sidebar h2 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 8px; }
    .sidebar ul { list-style: none; }
    .sidebar li { margin-bottom: 4px; }
    .sidebar a { color: var(--accent); text-decoration: none; font-size: 0.85rem; }
    .sidebar a:hover { text-decoration: underline; }
    .badge {
      display: inline-block; background: var(--badge-bg); color: #fff;
      font-size: 0.7rem; padding: 1px 6px; border-radius: 10px; vertical-align: middle;
    }
    main { flex: 1; min-width: 0; }
    section { margin-bottom: 48px; }
    section h2 {
      font-size: 1.3rem; color: var(--accent); border-bottom: 2px solid var(--border);
      padding-bottom: 8px; margin-bottom: 12px;
    }
    section h2 small { font-weight: 400; color: var(--muted); font-size: 0.8em; }
    .ig-meta { margin-bottom: 16px; font-size: 0.85rem; }
    .ig-meta .label {
      display: inline-block; background: var(--accent-light); color: var(--accent);
      padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; margin-right: 8px;
    }
    .ig-title { font-size: 0.95rem; color: var(--muted); margin-bottom: 4px; }
    .ig-meta a { color: var(--accent); margin-right: 12px; }
    .page-link { font-size: 0.75rem; color: var(--accent); font-weight: 400; }
    .diagram-card {
      background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px;
      padding: 20px; margin-bottom: 20px;
    }
    .diagram-card h3 { font-size: 0.95rem; color: var(--muted); margin-bottom: 12px; font-weight: 500; }
    .diagram-card h3 small { color: #999; }
    .mermaid { background: #fff; padding: 16px; border-radius: 4px; overflow-x: auto; }
    details { margin-top: 12px; }
    summary { cursor: pointer; font-size: 0.8rem; color: var(--muted); padding: 4px 0; user-select: none; }
    pre.source {
      background: #f5f5f5; border: 1px solid var(--border); border-radius: 4px;
      padding: 12px; overflow-x: auto; font-size: 0.8rem; margin-top: 8px;
      white-space: pre-wrap; word-break: break-word;
    }
    .stats { margin-bottom: 32px; }
    .stats h2 { font-size: 1.1rem; color: var(--accent); margin-bottom: 8px; }
    .stats table { border-collapse: collapse; font-size: 0.9rem; }
    .stats th, .stats td { padding: 4px 16px 4px 0; text-align: left; border-bottom: 1px solid var(--border); }
    .stats td:last-child, .stats th:last-child { text-align: right; }
    .stats tfoot th { border-top: 2px solid var(--accent); }
    footer {
      border-top: 1px solid var(--border); padding: 24px 0; margin-top: 48px;
      text-align: center; color: var(--muted); font-size: 0.85rem;
    }
    @media (max-width: 768px) {
      .layout { flex-direction: column; }
      .sidebar { position: static; width: 100%; max-height: none; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>FHIR IG Mermaid Diagram Catalog</h1>
      <p>${diagrams.length} diagrams from ${byPkg.size} Implementation Guides &mdash; last ${LOOKBACK_DAYS} days of CI builds</p>
    </div>
  </header>
  <div class="container">
    <div class="layout">
      <nav class="sidebar">
        <h2>Implementation Guides</h2>
        <ul>
${toc}
        </ul>
      </nav>
      <main>
${statsHtml}
${content}
      </main>
    </div>
  </div>
  <footer>
    <div class="container">
      Generated ${new Date().toISOString().slice(0,10)} from
      <a href="https://build.fhir.org/ig/qas.json">build.fhir.org CI builds</a>
      (${LOOKBACK_DAYS}-day lookback).
      Diagrams rendered by <a href="https://mermaid.js.org/">Mermaid</a>.
    </div>
  </footer>
</body>
</html>`;
}

// ================================================================
// Utilities
// ================================================================

function summarize(entry) {
  return {
    package: entry['package-id'], version: entry['ig-ver'] || '',
    name: entry.name || '', title: entry.title || '',
    date: entry.dateISO8601 || '', fhirVersion: entry.version || '',
    repo: entry.repo || '', url: entry.url || '',
    githubUrl: repoToGithubUrl(entry.repo),
  };
}

// "org/repo/branches/branch/qa.json" → "https://github.com/org/repo/tree/branch"
function repoToGithubUrl(repo) {
  if (!repo) return '';
  const m = repo.match(/^([^/]+\/[^/]+)\/branches\/([^/]+)\//);
  return m ? `https://github.com/${m[1]}/tree/${m[2]}` : '';
}

function safeName(s) { return s.replace(/[^a-z0-9_.\-@#]/gi, '_'); }

// Classify a mermaid diagram by its first meaningful keyword line.
// No hardcoded list — just extract the first token that isn't config/comments.
function classifyDiagram(code) {
  let inConfig = false;
  let inFrontmatter = false;
  let seenFrontmatter = false;
  for (const raw of code.split('\n')) {
    const line = raw.trim().replace(/;$/, '');
    // Track multiline %%{ ... }%% config blocks
    if (/%%\{/.test(line)) inConfig = true;
    if (inConfig) { if (/\}%%/.test(line)) inConfig = false; continue; }
    // Track YAML frontmatter (--- ... ---)
    if (line === '---') {
      if (!seenFrontmatter) { inFrontmatter = true; seenFrontmatter = true; continue; }
      if (inFrontmatter) { inFrontmatter = false; continue; }
    }
    if (inFrontmatter) continue;
    if (!line || line.startsWith('%%')) continue;
    // First word (up to space, {, or end of line) is the diagram type
    const m = line.match(/^(\S+?)[\s{(;]/) || line.match(/^(\S+)$/);
    return m ? m[1] : line;
  }
  return 'unknown';
}

function computeStats(diagrams) {
  const types = {};
  for (const d of diagrams) {
    const t = classifyDiagram(d.code);
    types[t] = (types[t] || 0) + 1;
  }
  return Object.entries(types).sort((a, b) => b[1] - a[1]);
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function groupBy(arr, keyFn) {
  const map = new Map();
  for (const item of arr) {
    const k = keyFn(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  }
  return map;
}

async function fetchWithTimeout(url, ms) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    return await fetch(url, {
      signal: ctl.signal, redirect: 'follow',
      headers: { 'User-Agent': 'fhir-mermaid-study/1.0' },
    });
  } finally { clearTimeout(t); }
}

// ================================================================
main().catch(e => { console.error(e); process.exit(1); });
