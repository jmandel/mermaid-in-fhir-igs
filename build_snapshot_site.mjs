#!/usr/bin/env node

import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  unlink,
  writeFile,
} from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REVIEW_OVERRIDES_PATH = path.join(__dirname, 'review_overrides.json');

const args = process.argv.slice(2);
const sourceArg = readFlag('--source');
const outArg = readFlag('--out') || 'snapshot';

if (!sourceArg) {
  console.error('Usage: node build_snapshot_site.mjs --source /path/to/static-compare/artifacts [--out snapshot]');
  process.exit(2);
}

const SOURCE_DIR = path.resolve(process.cwd(), sourceArg);
const SOURCE_PAGES_DIR = path.join(SOURCE_DIR, 'pages');
const OUT_DIR = path.resolve(process.cwd(), outArg);
const OUT_PAGES_DIR = path.join(OUT_DIR, 'pages');
const VENDOR_DIR = path.join(OUT_DIR, 'vendor');
const SHARED_DIR = path.join(OUT_DIR, 'shared');
const USER_AGENT = 'mermaid-in-fhir-igs-snapshot/1.0';

const resourceCache = new Map();
const warnings = [];
const localSharedAssets = new Map();
const reviewOverrides = await loadReviewOverrides();

await main();

async function main() {
  await stat(path.join(SOURCE_PAGES_DIR, 'manifest.json'));

  console.error(`Source: ${SOURCE_DIR}`);
  console.error(`Output: ${OUT_DIR}`);

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });
  let report = null;
  await cp(SOURCE_PAGES_DIR, OUT_PAGES_DIR, { recursive: true });
  if (await exists(path.join(SOURCE_DIR, 'vendor'))) {
    await cp(path.join(SOURCE_DIR, 'vendor'), VENDOR_DIR, { recursive: true });
  }
  if (await exists(path.join(SOURCE_DIR, 'shared'))) {
    await cp(path.join(SOURCE_DIR, 'shared'), SHARED_DIR, { recursive: true });
  }
  if (await exists(path.join(SOURCE_DIR, 'report.json'))) {
    report = JSON.parse(await readFile(path.join(SOURCE_DIR, 'report.json'), 'utf8'));
    applyReviewOverrides(report);
    report.summary = recomputeReportSummary(report);
    await writeFile(path.join(OUT_DIR, 'report.json'), JSON.stringify(report, null, 2));
  }
  await hoistSharedLocalAssets();

  const htmlFiles = await findFiles(OUT_PAGES_DIR, (name) => name.endsWith('.html'));
  console.error(`HTML files to freeze: ${htmlFiles.length}`);

  let index = 0;
  for (const filePath of htmlFiles) {
    index += 1;
    console.error(`  [${index}/${htmlFiles.length}] ${path.relative(OUT_DIR, filePath)}`);
    const original = await readFile(filePath, 'utf8');
    const rewritten = await rewriteHtml(original, filePath);
    await writeFile(filePath, rewritten);
  }

  await cleanupHoistedLocalAssets();

  if (report) {
    await applyOverridesToCaseJson(report);
    await writeFile(path.join(OUT_PAGES_DIR, 'manifest.json'), JSON.stringify(buildIndexItemsFromReport(report), null, 2));
    await writeFile(path.join(OUT_PAGES_DIR, 'index.html'), renderFixtureIndex(report));
  }

  for (const extraFile of ['catalog.html', 'catalog.md']) {
    const extraSource = path.resolve(process.cwd(), extraFile);
    if (await exists(extraSource)) {
      await writeFile(path.join(OUT_DIR, extraFile), await readFile(extraSource));
    }
  }

  await writeFile(path.join(OUT_DIR, '.nojekyll'), '');
  await writeFile(path.join(OUT_DIR, 'index.html'), await buildSnapshotIndex());
  await writeFile(path.join(OUT_DIR, 'warnings.json'), JSON.stringify(warnings, null, 2));

  console.error(`Vendored resources: ${resourceCache.size}`);
  console.error(`Warnings: ${warnings.length}`);
  console.error(`Snapshot ready: ${OUT_DIR}`);
}

async function loadReviewOverrides() {
  if (!(await exists(REVIEW_OVERRIDES_PATH))) return new Map();
  const raw = JSON.parse(await readFile(REVIEW_OVERRIDES_PATH, 'utf8'));
  const items = Array.isArray(raw) ? raw : raw.overrides || [];
  const map = new Map();
  for (const item of items) {
    if (!item.packageId || !item.fileName) continue;
    map.set(makeReviewOverrideKey(item.packageId, item.fileName), item);
  }
  return map;
}

function makeReviewOverrideKey(packageId, fileName) {
  return `${packageId}::${fileName}`;
}

function findReviewOverride(testCase) {
  return reviewOverrides.get(makeReviewOverrideKey(testCase.packageId, testCase.fileName)) || null;
}

function applyReviewOverrides(report) {
  for (const testCase of report.cases || []) {
    const override = findReviewOverride(testCase);
    if (!override) continue;
    testCase.manualReview = override;
    testCase.status = override.caseStatus || testCase.status;
    if (override.regressionFlagsAppend?.length) {
      testCase.regressionFlags = [...new Set([...(testCase.regressionFlags || []), ...override.regressionFlagsAppend])];
    }
  }
}

function recomputeReportSummary(report) {
  const failedCases = (report.cases || []).filter((testCase) => testCase.status === 'fail').length;
  const passedCases = (report.cases || []).filter((testCase) => testCase.status !== 'fail').length;
  return {
    totalCases: (report.cases || []).length,
    failedCases,
    passedCases,
    skippedCases: (report.skipped || []).length,
  };
}

async function applyOverridesToCaseJson(report) {
  for (const testCase of report.cases || []) {
    const caseJsonPath = testCase.localPages?.caseJson ? path.join(OUT_DIR, testCase.localPages.caseJson) : null;
    if (!caseJsonPath || !(await exists(caseJsonPath))) continue;
    const data = JSON.parse(await readFile(caseJsonPath, 'utf8'));
    if (testCase.manualReview) {
      data.manualReview = testCase.manualReview;
      data.status = testCase.manualReview.caseStatus || data.status;
      data.reviewLevel = testCase.manualReview.reviewLevel || data.reviewLevel || null;
      data.reason = testCase.manualReview.reason || data.reason || null;
      if (testCase.manualReview.regressionFlagsAppend?.length) {
        data.regressionFlags = [...new Set([...(data.regressionFlags || []), ...testCase.manualReview.regressionFlagsAppend])];
      }
    }
    await writeFile(caseJsonPath, JSON.stringify(data, null, 2));
  }
}

function readFlag(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

async function findFiles(rootDir, predicate) {
  const out = [];
  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (predicate(entry.name, full)) {
        out.push(full);
      }
    }
  }
  await walk(rootDir);
  out.sort();
  return out;
}

async function rewriteHtml(html, htmlPath) {
  let out = html;

  out = await replaceTagAttr(out, 'script', 'src', async (value) => {
    const sharedLocal = resolveSharedLocalAsset(value, htmlPath);
    if (sharedLocal) return sharedLocal;
    if (!isRemoteUrl(value)) return value;
    return await vendorForHtml(value, htmlPath);
  });

  out = await replaceTagAttr(out, 'img', 'src', async (value) => {
    if (!isRemoteUrl(value)) return value;
    return await vendorForHtml(value, htmlPath);
  });

  out = await replaceTagAttr(out, 'source', 'src', async (value) => {
    if (!isRemoteUrl(value)) return value;
    return await vendorForHtml(value, htmlPath);
  });

  out = await replaceLinkHrefs(out, htmlPath);

  return out;
}

async function hoistSharedLocalAssets() {
  const localJsFiles = await findFiles(OUT_PAGES_DIR, (_name, fullPath) => /[\\/]assets[\\/]js[\\/][^/]+\.js$/i.test(fullPath));
  for (const filePath of localJsFiles) {
    const buffer = await readFile(filePath);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 16);
    const baseName = path.basename(filePath);
    const sharedName = `${hash}-${baseName}`;
    const sharedPath = path.join(SHARED_DIR, 'assets', sharedName);
    if (!(await exists(sharedPath))) {
      await mkdir(path.dirname(sharedPath), { recursive: true });
      await writeFile(sharedPath, buffer);
    }
    localSharedAssets.set(path.resolve(filePath), sharedPath);
  }
}

async function cleanupHoistedLocalAssets() {
  for (const originalPath of localSharedAssets.keys()) {
    if (originalPath.includes(`${path.sep}source${path.sep}`)) continue;
    try {
      await unlink(originalPath);
    } catch {
      // leave best-effort cleanup
    }
  }
}

function resolveSharedLocalAsset(url, htmlPath) {
  if (isSpecialUrl(url) || isRemoteUrl(url)) return null;
  const resolved = path.resolve(path.dirname(htmlPath), url);
  const sharedPath = localSharedAssets.get(resolved);
  if (!sharedPath) return null;
  return toPosix(path.relative(path.dirname(htmlPath), sharedPath));
}

async function replaceTagAttr(html, tagName, attrName, rewrite) {
  const tagRe = new RegExp(`<${tagName}\\b[^>]*\\b${attrName}=(["'])([^"']+)\\1[^>]*>`, 'gi');
  let result = '';
  let lastIndex = 0;
  let match;
  while ((match = tagRe.exec(html))) {
    const full = match[0];
    const url = match[2];
    const start = match.index;
    const end = start + full.length;
    result += html.slice(lastIndex, start);
    const replacement = await rewrite(url);
    result += full.replace(
      new RegExp(`\\b${attrName}=(["'])${escapeRegExp(url)}\\1`),
      `${attrName}="${replacement}"`,
    );
    lastIndex = end;
  }
  result += html.slice(lastIndex);
  return result;
}

async function replaceLinkHrefs(html, htmlPath) {
  const tagRe = /<link\b[^>]*\bhref=(["'])([^"']+)\1[^>]*>/gi;
  let result = '';
  let lastIndex = 0;
  let match;
  while ((match = tagRe.exec(html))) {
    const full = match[0];
    const url = match[2];
    const start = match.index;
    const end = start + full.length;
    result += html.slice(lastIndex, start);

    const relMatch = full.match(/\brel=(["'])([^"']+)\1/i);
    const rel = (relMatch?.[2] || '').toLowerCase();
    const shouldVendor =
      isRemoteUrl(url) &&
      /(stylesheet|icon|apple-touch-icon|mask-icon|manifest|preload)/.test(rel);

    if (shouldVendor) {
      try {
        const absoluteUrl = normalizeRemoteUrl(url);
        const localAbsPath = await vendorResource(absoluteUrl);
        const replacement = toPosix(path.relative(path.dirname(htmlPath), localAbsPath));
        result += full.replace(
          new RegExp(`\\bhref=(["'])${escapeRegExp(url)}\\1`),
          `href="${replacement}"`,
        );
      } catch (error) {
        warn(`Dropping HTML link resource: ${url} (${error.message})`);
      }
    } else {
      result += full;
    }

    lastIndex = end;
  }
  result += html.slice(lastIndex);
  return result;
}

async function vendorForHtml(url, htmlPath) {
  const absoluteUrl = normalizeRemoteUrl(url);
  try {
    const localAbsPath = await vendorResource(absoluteUrl);
    return toPosix(path.relative(path.dirname(htmlPath), localAbsPath));
  } catch (error) {
    warn(`HTML resource not vendored: ${absoluteUrl} (${error.message})`);
    return url;
  }
}

async function vendorResource(url) {
  const normalized = normalizeRemoteUrl(url);
  if (resourceCache.has(normalized)) {
    return await resourceCache.get(normalized);
  }

  const promise = (async () => {
    const res = await fetch(normalized, {
      redirect: 'follow',
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${normalized}: ${res.status} ${res.statusText}`);
    }

    const finalUrl = normalizeRemoteUrl(res.url || normalized);
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    const destination = vendorPathForUrl(finalUrl, contentType);
    await mkdir(path.dirname(destination), { recursive: true });

    if (isCss(finalUrl, contentType)) {
      const cssText = await res.text();
      const rewritten = await rewriteCss(cssText, finalUrl, destination);
      await writeFile(destination, rewritten);
    } else if (isText(finalUrl, contentType)) {
      const text = await res.text();
      await writeFile(destination, text);
    } else {
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(destination, buffer);
    }

    if (finalUrl !== normalized) {
      resourceCache.set(finalUrl, Promise.resolve(destination));
    }
    return destination;
  })();

  resourceCache.set(normalized, promise);
  return await promise;
}

async function rewriteCss(cssText, cssUrl, cssAbsPath) {
  let out = cssText;

  out = await replaceCssImports(out, cssUrl, cssAbsPath);
  out = await replaceCssUrls(out, cssUrl, cssAbsPath);

  return out;
}

async function replaceCssImports(cssText, cssUrl, cssAbsPath) {
  const importRe = /@import\s+(url\(\s*)?(["']?)([^"')\s]+)\2\s*\)?/gi;
  let result = '';
  let lastIndex = 0;
  let match;
  while ((match = importRe.exec(cssText))) {
    const full = match[0];
    const rawUrl = match[3];
    const start = match.index;
    const end = start + full.length;
    result += cssText.slice(lastIndex, start);
    if (shouldSkipResourceUrl(rawUrl)) {
      result += full;
    } else {
      try {
        const absoluteUrl = new URL(rawUrl, cssUrl).href;
        const localAbsPath = await vendorResource(absoluteUrl);
        const replacement = toPosix(path.relative(path.dirname(cssAbsPath), localAbsPath));
        result += full.replace(rawUrl, replacement);
      } catch (error) {
        warn(`CSS import not vendored: ${rawUrl} from ${cssUrl} (${error.message})`);
        result += full;
      }
    }
    lastIndex = end;
  }
  result += cssText.slice(lastIndex);
  return result;
}

async function replaceCssUrls(cssText, cssUrl, cssAbsPath) {
  const urlRe = /url\(\s*(["']?)([^"')]+)\1\s*\)/gi;
  let result = '';
  let lastIndex = 0;
  let match;
  while ((match = urlRe.exec(cssText))) {
    const full = match[0];
    const rawUrl = match[2];
    const start = match.index;
    const end = start + full.length;
    result += cssText.slice(lastIndex, start);
    if (shouldSkipResourceUrl(rawUrl)) {
      result += full;
    } else {
      try {
        const absoluteUrl = new URL(rawUrl, cssUrl).href;
        const localAbsPath = await vendorResource(absoluteUrl);
        const replacement = toPosix(path.relative(path.dirname(cssAbsPath), localAbsPath));
        result += `url("${replacement}")`;
      } catch (error) {
        warn(`CSS asset not vendored: ${rawUrl} from ${cssUrl} (${error.message})`);
        result += full;
      }
    }
    lastIndex = end;
  }
  result += cssText.slice(lastIndex);
  return result;
}

function vendorPathForUrl(urlString, contentType) {
  const url = new URL(urlString);
  const protocol = url.protocol.replace(':', '');
  const host = safePathComponent(url.host);
  const pathname = url.pathname || '/';
  const segments = pathname.split('/').filter(Boolean).map(safePathComponent);

  if (pathname.endsWith('/')) {
    segments.push(defaultNameForContentType(contentType));
  }
  if (segments.length === 0) {
    segments.push(defaultNameForContentType(contentType));
  }

  let fileName = segments.pop();
  if (!path.extname(fileName)) {
    fileName += defaultExtensionForContentType(contentType);
  }
  if (url.search) {
    const hash = shortHash(url.search);
    const ext = path.extname(fileName);
    const stem = ext ? fileName.slice(0, -ext.length) : fileName;
    fileName = `${stem}__q_${hash}${ext}`;
  }

  return path.join(VENDOR_DIR, protocol, host, ...segments, fileName);
}

function defaultNameForContentType(contentType) {
  if (contentType.includes('css')) return 'index.css';
  if (contentType.includes('javascript')) return 'index.js';
  if (contentType.includes('svg')) return 'index.svg';
  if (contentType.includes('json')) return 'index.json';
  if (contentType.includes('html')) return 'index.html';
  return 'index.bin';
}

function defaultExtensionForContentType(contentType) {
  if (contentType.includes('css')) return '.css';
  if (contentType.includes('javascript')) return '.js';
  if (contentType.includes('svg')) return '.svg';
  if (contentType.includes('json')) return '.json';
  if (contentType.includes('html')) return '.html';
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('jpeg')) return '.jpg';
  if (contentType.includes('gif')) return '.gif';
  if (contentType.includes('woff2')) return '.woff2';
  if (contentType.includes('woff')) return '.woff';
  if (contentType.includes('ttf')) return '.ttf';
  return '';
}

function isCss(url, contentType) {
  return contentType.includes('text/css') || url.toLowerCase().endsWith('.css');
}

function isText(url, contentType) {
  return (
    isCss(url, contentType) ||
    contentType.startsWith('text/') ||
    contentType.includes('javascript') ||
    contentType.includes('json') ||
    contentType.includes('svg') ||
    /\.(js|mjs|json|svg|txt|xml|map)$/i.test(new URL(url).pathname)
  );
}

function shouldSkipResourceUrl(url) {
  return (
    !url ||
    url.startsWith('data:') ||
    url.startsWith('#') ||
    url.startsWith('javascript:') ||
    url.startsWith('mailto:')
  );
}

function isSpecialUrl(url) {
  return (
    !url ||
    url.startsWith('data:') ||
    url.startsWith('#') ||
    url.startsWith('javascript:') ||
    url.startsWith('mailto:')
  );
}

function isRemoteUrl(url) {
  return /^https?:\/\//i.test(url) || /^\/\//.test(url);
}

function normalizeRemoteUrl(url) {
  if (/^\/\//.test(url)) return `https:${url}`;
  return url;
}

function shortHash(value) {
  return crypto.createHash('sha1').update(value).digest('hex').slice(0, 10);
}

function safePathComponent(value) {
  return (value || '')
    .replace(/[\/\\]/g, '_')
    .replace(/[^A-Za-z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'unnamed';
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function buildSnapshotIndex() {
  const reportPath = path.join(OUT_DIR, 'report.json');
  const manifestPath = path.join(OUT_PAGES_DIR, 'manifest.json');
  const rows = [];
  let summary = null;

  if (await exists(reportPath)) {
    const report = JSON.parse(await readFile(reportPath, 'utf8'));
    const items = buildIndexItemsFromReport(report);
    summary = summarizeIndexItems(items);
    for (const item of items) {
      rows.push(renderIndexRow(item));
    }
  } else {
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    summary = summarizeIndexItems(manifest);
    for (const item of manifest) {
      rows.push(renderIndexRow(item));
    }
  }

  const summaryHtml = summary
    ? `<ul>
        <li><strong>Total cases:</strong> ${summary.total}</li>
        <li><strong>Clean:</strong> ${summary.pass}</li>
        <li><strong>Needs render review:</strong> ${summary.render}</li>
        <li><strong>Needs layout review:</strong> ${summary.layout}</li>
        <li><strong>Check geometry:</strong> ${summary.check}</li>
        <li><strong>Fixture failures:</strong> ${summary.failure}</li>
      </ul>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mermaid Before/After Snapshot</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; line-height: 1.4; background: #fff; color: #111; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
      a { color: #0645ad; }
      td.pass { background: #eaf7ea; font-weight: 600; }
      td.review { background: #fff6dd; font-weight: 600; }
      td.failure { background: #fdeaea; font-weight: 600; }
      td.render { background: #fdeaea; }
      td.layout { background: #fff0d9; }
      td.check { background: #fff9e8; }
      td.none { background: #eef8ee; }
      code { font-family: ui-monospace, SFMono-Regular, monospace; }
    </style>
  </head>
  <body>
    <h1>Mermaid Before/After Snapshot</h1>
    <p>This snapshot is frozen for local browsing and GitHub Pages publication. Render-critical assets are vendored under <code>vendor/</code>. A <code>review</code> flag means “worth checking”, not “proved regression”.</p>
    <ul>
      <li><strong>Needs render review</strong>: a diagram that rendered before looks blank or missing after.</li>
      <li><strong>Needs layout review</strong>: the diagram still renders, but page height or downstream content position changed enough to inspect by eye.</li>
      <li><strong>Check geometry</strong>: size or fill changed measurably, but the harness did not prove dead space or a lost render.</li>
    </ul>
    <p><a href="./pages/index.html">Fixture index</a> | <a href="./report.json">report.json</a> | <a href="./warnings.json">warnings.json</a> | <a href="./catalog.html">catalog</a></p>
    ${summaryHtml}
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
      <tbody>${rows.join('\n')}</tbody>
    </table>
  </body>
</html>`;
}

function buildIndexItemsFromReport(report) {
  const items = [];
  for (const testCase of report.cases || []) {
    const summary = summarizeCaseForIndex(testCase);
    items.push({
      repoPath: testCase.repoPath || null,
      branch: testCase.branch || null,
      packageId: testCase.packageId,
      fileName: testCase.fileName,
      status: summary.status,
      reviewLevel: summary.reviewLevel,
      blocksLabel: `${displayNumber(summary.blocksBefore)} -> ${displayNumber(summary.blocksAfter)}`,
      pageHeightDelta: summary.pageHeightDelta,
      maxHeightIncrease: summary.maxHeightIncrease,
      maxTopShift: summary.maxTopShift,
      worstFillDrop: summary.worstFillDrop,
      before: testCase.localPages?.before,
      after: testCase.localPages?.after,
      failure: null,
      source: null,
      caseJson: testCase.localPages?.caseJson,
      pageUrl: testCase.pageUrl || null,
      reason: summary.reviewSummary,
    });
  }
  for (const skipped of report.skipped || []) {
    items.push({
      repoPath: skipped.repoPath || null,
      branch: skipped.branch || null,
      packageId: skipped.packageId,
      fileName: skipped.fileName,
      status: 'failure',
      reviewLevel: 'fixture',
      blocksLabel: '',
      pageHeightDelta: null,
      maxHeightIncrease: null,
      maxTopShift: null,
      worstFillDrop: null,
      before: null,
      after: null,
      failure: skipped.localPages?.failure || null,
      source: skipped.localPages?.source || null,
      caseJson: skipped.localPages?.caseJson || null,
      pageUrl: skipped.pageUrl || null,
      reason: skipped.reason || '',
    });
  }
  return items.sort(compareIndexItems);
}

function summarizeCaseForIndex(testCase) {
  if (testCase.manualReview) {
    return {
      status: testCase.manualReview.status || 'review',
      reviewLevel: testCase.manualReview.reviewLevel || 'render',
      reviewSummary: testCase.manualReview.reason || '',
      blocksBefore: testCase.before?.renderedMermaidBlockCount ?? null,
      blocksAfter: testCase.after?.renderedMermaidBlockCount ?? null,
      pageHeightDelta: diff(testCase.after?.documentHeight, testCase.before?.documentHeight),
      maxHeightIncrease: maxPositive((testCase.blockComparisons || []).map((comparison) => comparison.heightDelta)),
      maxTopShift: maxPositive((testCase.blockComparisons || []).map((comparison) => comparison.topShift)),
      worstFillDrop: minNegative((testCase.blockComparisons || []).map((comparison) => comparison.fillDelta)),
    };
  }

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
    if (pageHeightDelta != null) reviewReasons.push(`page +${pageHeightDelta}px`);
    if (maxTopShift != null) reviewReasons.push(`shift +${formatSignedNumber(maxTopShift)}px`);
  } else if ((maxHeightIncrease ?? 0) > 120 || (worstFillDrop ?? 0) < -0.25) {
    reviewLevel = 'check';
    if (maxHeightIncrease != null) reviewReasons.push(`max h +${formatSignedNumber(maxHeightIncrease)}px`);
    if (worstFillDrop != null) reviewReasons.push(`fill ${formatSignedRatio(worstFillDrop)}`);
  }

  return {
    status: reviewLevel === 'none' ? 'pass' : 'review',
    reviewLevel,
    reviewSummary: reviewReasons.join('; '),
    blocksBefore: before?.renderedMermaidBlockCount ?? null,
    blocksAfter: after?.renderedMermaidBlockCount ?? null,
    pageHeightDelta,
    maxHeightIncrease,
    maxTopShift,
    worstFillDrop,
  };
}

function summarizeIndexItems(items) {
  const summary = { total: items.length, pass: 0, render: 0, layout: 0, check: 0, failure: 0 };
  for (const item of items) {
    if (item.status === 'failure') summary.failure += 1;
    else if (item.reviewLevel === 'render') summary.render += 1;
    else if (item.reviewLevel === 'layout') summary.layout += 1;
    else if (item.reviewLevel === 'check') summary.check += 1;
    else summary.pass += 1;
  }
  return summary;
}

function renderIndexRow(item) {
  return `
      <tr>
        <td>${escapeHtml(item.repoPath || '')}</td>
        <td>${escapeHtml(item.branch || '')}</td>
        <td>${escapeHtml(item.packageId)}</td>
        <td>${escapeHtml(item.fileName)}</td>
        <td class="${escapeHtml(item.status || 'pass')}">${escapeHtml(item.status || 'pass')}</td>
        <td class="${escapeHtml(item.reviewLevel || 'none')}">${escapeHtml(item.reviewLevel || 'none')}</td>
        <td>${escapeHtml(item.blocksLabel || '')}</td>
        <td>${formatSignedCell(item.pageHeightDelta)}</td>
        <td>${formatSignedCell(item.maxHeightIncrease)}</td>
        <td>${formatSignedCell(item.maxTopShift)}</td>
        <td>${formatSignedRatioCell(item.worstFillDrop)}</td>
        <td>${linkOrEmpty(item.before, 'before')}</td>
        <td>${linkOrEmpty(item.after, 'after')}</td>
        <td>${linkOrEmpty(item.failure, 'failure')}</td>
        <td>${linkOrEmpty(item.source, 'source')}</td>
        <td>${linkOrEmpty(item.caseJson, 'case.json')}</td>
        <td>${item.pageUrl ? `<a href="${escapeHtml(item.pageUrl)}">published</a>` : ''}</td>
        <td>${escapeHtml(item.reason || '')}</td>
      </tr>`;
}

function compareIndexItems(a, b) {
  const rankA = reviewSortValue(a);
  const rankB = reviewSortValue(b);
  if (rankA !== rankB) return rankB - rankA;
  if (a.packageId !== b.packageId) return a.packageId.localeCompare(b.packageId);
  return a.fileName.localeCompare(b.fileName);
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

function renderFixtureIndex(report) {
  const relFromPages = (href) => {
    if (!href) return href;
    return href.startsWith('pages/') ? href.slice('pages/'.length) : href;
  };
  const linkFromPages = (href, label) => linkOrEmpty(relFromPages(href), label);
  const rows = buildIndexItemsFromReport(report)
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.repoPath || '')}</td>
        <td>${escapeHtml(item.branch || '')}</td>
        <td>${escapeHtml(item.packageId)}</td>
        <td>${escapeHtml(item.fileName)}</td>
        <td class="${escapeHtml(item.status)}">${escapeHtml(item.status)}</td>
        <td class="${escapeHtml(item.reviewLevel || 'none')}">${escapeHtml(item.reviewLevel || '')}</td>
        <td>${escapeHtml(item.blocksLabel || '')}</td>
        <td>${formatSignedCell(item.pageHeightDelta)}</td>
        <td>${formatSignedCell(item.maxHeightIncrease)}</td>
        <td>${formatSignedCell(item.maxTopShift)}</td>
        <td>${formatSignedRatioCell(item.worstFillDrop)}</td>
        <td>${linkFromPages(item.before, 'before')}</td>
        <td>${linkFromPages(item.after, 'after')}</td>
        <td>${linkFromPages(item.failure, 'failure')}</td>
        <td>${linkFromPages(item.source, 'source')}</td>
        <td>${linkFromPages(item.caseJson, 'case.json')}</td>
        <td>${item.pageUrl ? `<a href="${escapeHtml(item.pageUrl)}">published</a>` : ''}</td>
        <td>${escapeHtml(item.reason || '')}</td>
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
    <p><a href="../index.html">Snapshot index</a> | <a href="../report.json">report.json</a></p>
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
          <th>Max Height Δ</th>
          <th>Max Top Shift</th>
          <th>Worst Fill Δ</th>
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function linkOrEmpty(href, label) {
  if (!href) return '';
  return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

function isRenderedStatus(status) {
  return status === 'rendered' || status === 'rendered-visible-unparsed';
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

function diff(a, b) {
  if (a == null || b == null) return null;
  return Number((a - b).toFixed(2));
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

function displayNumber(value) {
  return value == null ? '?' : String(value);
}

function warn(message) {
  warnings.push(message);
  console.error(`WARN ${message}`);
}
