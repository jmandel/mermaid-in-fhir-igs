#!/usr/bin/env node

import path from 'node:path';
import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const CONTENT_DIR = path.resolve(process.cwd(), readFlag('--content') || path.join(__dirname, 'content'));
const OUTPUT_DIR = path.resolve(process.cwd(), readFlag('--out') || path.join(__dirname, 'artifacts'));
const REPORT_PATH = path.join(OUTPUT_DIR, 'report.json');

async function main() {
  const report = JSON.parse(await readFile(REPORT_PATH, 'utf8'));

  for (const item of report.cases) {
    item.fixturePaths = item.fixturePaths || buildFixturePaths(item.packageId, item.fileName);
    item.localPages = item.localPages || successLocalPages(item.fixturePaths);
  }

  for (const item of report.skipped) {
    item.fixturePaths = item.fixturePaths || buildFixturePaths(item.packageId, item.fileName);
    item.fullPath = item.fullPath || path.join(CONTENT_DIR, item.packageId, item.fileName);
    item.localPages = await writeFailureFixture(item);
  }

  await mkdir(path.join(OUTPUT_DIR, 'pages'), { recursive: true });
  await writeFile(REPORT_PATH, JSON.stringify(report, null, 2));
  await writeFile(path.join(OUTPUT_DIR, 'pages', 'manifest.json'), JSON.stringify(buildPagesManifest(report), null, 2));
  await writeFile(path.join(OUTPUT_DIR, 'pages', 'index.html'), renderPagesIndex(report));

  console.log(`Backfilled failure fixtures into ${OUTPUT_DIR}`);
}

function readFlag(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

async function writeFailureFixture(item) {
  const failureDir = path.join(OUTPUT_DIR, item.fixturePaths.failure.dir);
  const sourceDir = path.join(OUTPUT_DIR, item.fixturePaths.source.dir);
  await mkdir(failureDir, { recursive: true });
  await mkdir(sourceDir, { recursive: true });

  let sourceCopied = false;
  let sourceCopyError = null;
  if (item.fullPath) {
    try {
      await stat(item.fullPath);
      await copyFile(item.fullPath, path.join(sourceDir, 'index.html'));
      sourceCopied = true;
    } catch (error) {
      sourceCopyError = error.message;
    }
  }

  const metadata = {
    packageId: item.packageId,
    fileName: item.fileName,
    reason: item.reason || 'unknown failure',
    fullPath: item.fullPath || null,
    pagePath: item.pagePath || null,
    pageUrl: item.pageUrl || null,
    candidateBases: item.candidateBases || [],
    scriptPaths: item.scriptPaths || null,
    fixturePaths: item.fixturePaths,
    sourceCopied,
    sourceCopyError,
  };

  await writeFile(path.join(failureDir, 'index.html'), renderFailureHtml(metadata));
  await writeFile(path.join(OUTPUT_DIR, item.fixturePaths.caseJson), JSON.stringify(metadata, null, 2));

  item.sourceCopied = sourceCopied;
  item.sourceCopyError = sourceCopyError;

  return {
    failure: item.fixturePaths.failure.html,
    source: sourceCopied ? item.fixturePaths.source.html : null,
    caseJson: item.fixturePaths.caseJson,
  };
}

function buildPagesManifest(report) {
  const okEntries = report.cases.map((item) => ({
    slug: item.slug || slugify(`${item.packageId}--${item.fileName.replace(/\.html$/i, '')}`),
    repoPath: item.repoPath || null,
    branch: item.branch || null,
    packageId: item.packageId,
    fileName: item.fileName,
    ...summarizeCaseForIndex(item),
    path: item.fixturePaths.root,
    before: item.localPages.before,
    after: item.localPages.after,
    failure: null,
    source: null,
    caseJson: item.localPages.caseJson,
    pageUrl: item.pageUrl || null,
    reason: null,
  }));

  const failedEntries = report.skipped.map((item) => ({
    slug: slugify(`${item.packageId}--${item.fileName.replace(/\.html$/i, '')}`),
    repoPath: item.repoPath || null,
    branch: item.branch || null,
    packageId: item.packageId,
    fileName: item.fileName,
    status: 'failure',
    reviewLevel: 'fixture',
    blocksLabel: '',
    pageHeightDelta: null,
    maxHeightIncrease: null,
    maxTopShift: null,
    worstFillDrop: null,
    path: item.fixturePaths.root,
    before: null,
    after: null,
    failure: item.localPages?.failure || null,
    source: item.localPages?.source || null,
    caseJson: item.localPages?.caseJson || null,
    pageUrl: item.pageUrl || null,
    reason: item.reason || null,
  }));

  return [...okEntries, ...failedEntries].sort((a, b) => {
    const rankA = reviewSortValue(a);
    const rankB = reviewSortValue(b);
    if (rankA !== rankB) return rankB - rankA;
    if (a.packageId !== b.packageId) return a.packageId.localeCompare(b.packageId);
    return a.fileName.localeCompare(b.fileName);
  });
}

function renderPagesIndex(report) {
  const rows = buildPagesManifest(report)
    .map(
      (entry) => `
      <tr>
        <td>${escapeHtml(entry.repoPath || '')}</td>
        <td>${escapeHtml(entry.branch || '')}</td>
        <td>${escapeHtml(entry.packageId)}</td>
        <td>${escapeHtml(entry.fileName)}</td>
        <td class="${escapeHtml(entry.status)}">${escapeHtml(entry.status)}</td>
        <td class="${escapeHtml(entry.reviewLevel || 'none')}">${escapeHtml(entry.reviewLevel || '')}</td>
        <td>${escapeHtml(entry.blocksLabel || '')}</td>
        <td>${formatSignedCell(entry.pageHeightDelta)}</td>
        <td>${formatSignedCell(entry.maxHeightIncrease)}</td>
        <td>${formatSignedCell(entry.maxTopShift)}</td>
        <td>${formatSignedRatioCell(entry.worstFillDrop)}</td>
        <td>${linkOrEmpty(entry.before, 'before', true)}</td>
        <td>${linkOrEmpty(entry.after, 'after', true)}</td>
        <td>${linkOrEmpty(entry.failure, 'failure', true)}</td>
        <td>${linkOrEmpty(entry.source, 'source', true)}</td>
        <td>${linkOrEmpty(entry.caseJson, 'case.json', true)}</td>
        <td>${linkOrEmpty(entry.pageUrl, 'published page')}</td>
        <td>${escapeHtml(entry.reason || '')}</td>
      </tr>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mermaid page fixtures</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; line-height: 1.4; background: #fff; color: #111; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
      td.pass { background: #eaf7ea; font-weight: 600; }
      td.review { background: #fff6dd; font-weight: 600; }
      td.failure { background: #fdeaea; font-weight: 600; }
      td.render { background: #fdeaea; }
      td.layout { background: #fff0d9; }
      td.check { background: #fff9e8; }
      td.none { background: #eef8ee; }
    </style>
  </head>
  <body>
    <h1>Mermaid page fixtures</h1>
    <p>Each row keeps the local HTML copies used by the harness. “Review” flags call out likely render loss or visible layout shift; the numeric columns summarize before/after geometry deltas.</p>
    <table>
      <thead>
        <tr>
          <th>Repo</th>
          <th>Branch</th>
          <th>Package</th>
          <th>File</th>
          <th>Status</th>
          <th>Review</th>
          <th>Blocks</th>
          <th>Page Δ</th>
          <th>Max h Δ</th>
          <th>Max shift</th>
          <th>Worst fill Δ</th>
          <th>Before</th>
          <th>After</th>
          <th>Failure</th>
          <th>Source</th>
          <th>Case</th>
          <th>Published</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </body>
</html>`;
}

function renderFailureHtml(metadata) {
  const candidateBases = metadata.candidateBases?.length
    ? `<ul>${metadata.candidateBases.map((base) => `<li><code>${escapeHtml(base)}</code></li>`).join('')}</ul>`
    : '<p>none</p>';
  const scriptPaths = metadata.scriptPaths
    ? `<pre>${escapeHtml(JSON.stringify(metadata.scriptPaths, null, 2))}</pre>`
    : '<p>none</p>';
  const sourceLinks = [
    metadata.sourceCopied ? `<a href="../source/index.html">saved source HTML</a>` : '',
    `<a href="../case.json">case.json</a>`,
    metadata.pageUrl ? `<a href="${escapeHtml(metadata.pageUrl)}">published page</a>` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mermaid fixture failure: ${escapeHtml(metadata.packageId)} / ${escapeHtml(metadata.fileName)}</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; line-height: 1.4; background: #fff; color: #111; }
      .status { display: inline-block; padding: 4px 8px; border-radius: 6px; background: #a1260d; color: #fff; font-weight: 700; }
      pre, code { font-family: ui-monospace, SFMono-Regular, monospace; }
      pre { white-space: pre-wrap; border: 1px solid #ccc; padding: 12px; background: #f7f7f7; }
      .reason { border: 2px solid #a1260d; background: #fdeaea; padding: 12px; }
    </style>
  </head>
  <body>
    <h1>Mermaid fixture failure</h1>
    <p><span class="status">failure</span></p>
    <p><strong>Package:</strong> ${escapeHtml(metadata.packageId)}</p>
    <p><strong>File:</strong> ${escapeHtml(metadata.fileName)}</p>
    <div class="reason"><strong>Reason:</strong> ${escapeHtml(metadata.reason)}</div>
    <p><strong>Links:</strong> ${sourceLinks || 'none'}</p>
    <h2>Candidate bases</h2>
    ${candidateBases}
    <h2>Script paths</h2>
    ${scriptPaths}
    <h2>Metadata</h2>
    <pre>${escapeHtml(JSON.stringify(metadata, null, 2))}</pre>
  </body>
</html>`;
}

function buildFixturePaths(packageId, fileName) {
  const { name, version } = splitPackageId(packageId);
  const pageName = fileName.replace(/\.html$/i, '');
  const root = toPosixPath(
    path.join(
      'pages',
      safePathComponent(name),
      safePathComponent(version || 'unversioned'),
      safePathComponent(pageName),
    ),
  );

  return {
    root,
    caseJson: `${root}/case.json`,
    before: {
      dir: `${root}/before`,
      html: `${root}/before/index.html`,
    },
    after: {
      dir: `${root}/after`,
      html: `${root}/after/index.html`,
    },
    failure: {
      dir: `${root}/failure`,
      html: `${root}/failure/index.html`,
    },
    source: {
      dir: `${root}/source`,
      html: `${root}/source/index.html`,
    },
  };
}

function successLocalPages(fixturePaths) {
  return {
    before: fixturePaths.before.html,
    after: fixturePaths.after.html,
    caseJson: fixturePaths.caseJson,
  };
}

function summarizeCaseForIndex(testCase) {
  const comparisons = testCase.blockComparisons || [];
  const before = testCase.before || null;
  const after = testCase.after || null;
  const renderIssueCount = comparisons.filter(
    (comparison) => isRenderedStatus(comparison.beforeStatus) && !isRenderedStatus(comparison.afterStatus),
  ).length +
    (after?.mermaidBlocks || []).filter((block) => !isRenderedStatus(block.renderStatus)).length;
  const blankAfterCount = (after?.mermaidBlocks || []).filter((block) => block.visual?.isEffectivelyBlank).length;
  const pageHeightDelta = diff(after?.documentHeight, before?.documentHeight);
  const maxHeightIncrease = maxPositive(comparisons.map((comparison) => comparison.heightDelta));
  const maxTopShift = maxPositive(comparisons.map((comparison) => comparison.topShift));
  const worstFillDrop = minNegative(comparisons.map((comparison) => comparison.fillDelta));

  let reviewLevel = 'none';
  const reviewReasons = [];
  if (renderIssueCount || blankAfterCount) {
    reviewLevel = 'render';
    if (renderIssueCount) reviewReasons.push(`${renderIssueCount} render issue${renderIssueCount === 1 ? '' : 's'}`);
    if (blankAfterCount) reviewReasons.push(`${blankAfterCount} blank block${blankAfterCount === 1 ? '' : 's'}`);
  } else if ((pageHeightDelta ?? 0) > 200 || (maxTopShift ?? 0) > 120) {
    reviewLevel = 'layout';
    if (pageHeightDelta != null) reviewReasons.push(`page ${formatSignedNumber(pageHeightDelta)}px`);
    if (maxTopShift != null) reviewReasons.push(`shift ${formatSignedNumber(maxTopShift)}px`);
  } else if ((maxHeightIncrease ?? 0) > 120 || (worstFillDrop ?? 0) < -0.25) {
    reviewLevel = 'check';
    if (maxHeightIncrease != null) reviewReasons.push(`max h ${formatSignedNumber(maxHeightIncrease)}px`);
    if (worstFillDrop != null) reviewReasons.push(`fill ${formatSignedRatio(worstFillDrop)}`);
  }

  return {
    status: reviewLevel === 'none' ? 'pass' : 'review',
    reviewLevel,
    blocksLabel: `${displayNumber(before?.renderedMermaidBlockCount)} -> ${displayNumber(after?.renderedMermaidBlockCount)}`,
    pageHeightDelta,
    maxHeightIncrease,
    maxTopShift,
    worstFillDrop,
    reason: reviewReasons.join('; '),
  };
}

function splitPackageId(packageId) {
  const hashIndex = packageId.indexOf('#');
  if (hashIndex === -1) {
    return { name: packageId, version: '' };
  }
  return {
    name: packageId.slice(0, hashIndex),
    version: packageId.slice(hashIndex + 1),
  };
}

function safePathComponent(value) {
  return value
    .replace(/[\/\\]/g, '_')
    .replace(/[^A-Za-z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'unnamed';
}

function toPosixPath(value) {
  return value.split(path.sep).join('/');
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function isRenderedStatus(status) {
  return status === 'rendered' || status === 'rendered-visible-unparsed';
}

function diff(a, b) {
  if (a == null || b == null) return null;
  return Number((a - b).toFixed(2));
}

function maxPositive(values) {
  let max = null;
  for (const value of values) {
    if (value == null || value <= 0) continue;
    if (max == null || value > max) max = value;
  }
  return max;
}

function minNegative(values) {
  let min = null;
  for (const value of values) {
    if (value == null || value >= 0) continue;
    if (min == null || value < min) min = value;
  }
  return min;
}

function displayNumber(value) {
  return value == null ? '?' : String(value);
}

function formatSignedNumber(value) {
  if (value == null) return '';
  return value > 0 ? `+${value}` : String(value);
}

function formatSignedRatio(value) {
  if (value == null) return '';
  return value > 0 ? `+${value.toFixed(3)}` : value.toFixed(3);
}

function formatSignedCell(value) {
  return value == null ? '' : escapeHtml(formatSignedNumber(value));
}

function formatSignedRatioCell(value) {
  return value == null ? '' : escapeHtml(formatSignedRatio(value));
}

function reviewSortValue(item) {
  if (item.status === 'failure') return 5;
  switch (item.reviewLevel) {
    case 'render':
      return 4;
    case 'layout':
      return 3;
    case 'check':
      return 2;
    default:
      return 1;
  }
}

function linkOrEmpty(href, label, isLocal = false) {
  if (!href) return '';
  const target = isLocal ? `../${href}` : href;
  return `<a href="${escapeHtml(target)}">${escapeHtml(label)}</a>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

await main();
