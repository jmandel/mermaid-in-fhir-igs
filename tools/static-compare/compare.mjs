#!/usr/bin/env node

import http from 'node:http';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';
import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import playwright from 'playwright-core';
import { PNG } from 'pngjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const CONTENT_DIR = path.resolve(process.cwd(), readFlag('--content') || path.join(__dirname, 'content'));
const PACKAGES_DIR = path.resolve(process.cwd(), readFlag('--packages') || path.join(__dirname, 'packages'));
const OUTPUT_DIR = path.resolve(process.cwd(), readFlag('--out') || path.join(__dirname, 'artifacts'));
const PATCHED_MERMAID = path.resolve(process.cwd(), readFlag('--mermaid') || path.join(__dirname, 'mermaid.js'));
const CHROMIUM_PATH = path.resolve(process.cwd(), readFlag('--chromium') || process.env.CHROMIUM || '/usr/bin/chromium');
const VIEWPORT = { width: 1440, height: 1400 };
const SCREENSHOT_WAIT_MS = 1500;
const COLOR_THRESHOLD = 18;
const BLANK_PIXEL_RATIO = 0.0005;
const BLANK_PIXEL_FLOOR = 50;

const textFetchCache = new Map();
const packageBaseCache = new Map();

async function main() {
  await ensurePatchedBundle();

  const { cases, skipped } = await collectCases();
  if (!cases.length) {
    throw new Error(`No Mermaid pages found in ${CONTENT_DIR}`);
  }

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(path.join(OUTPUT_DIR, 'pages'), { recursive: true });
  await mkdir(path.join(OUTPUT_DIR, 'screenshots'), { recursive: true });
  await mkdir(path.join(OUTPUT_DIR, 'metrics'), { recursive: true });

  for (const skippedCase of skipped) {
    try {
      await writeFailureFixture(skippedCase);
    } catch (error) {
      skippedCase.failureFixtureError = error.message;
    }
  }

  const preparedCases = [];
  for (const testCase of cases) {
    try {
      await writeCaseFixtures(testCase);
      preparedCases.push(testCase);
    } catch (error) {
      const skippedCase = {
        ...testCase,
        reason: `fixture prep failed: ${error.message}`,
      };
      try {
        await writeFailureFixture(skippedCase);
      } catch (fixtureError) {
        skippedCase.failureFixtureError = fixtureError.message;
      }
      skipped.push(skippedCase);
    }
  }

  const server = await startStaticServer(OUTPUT_DIR);
  try {
    const browser = await playwright.chromium.launch({
      executablePath: CHROMIUM_PATH,
      headless: true,
      args: ['--disable-gpu', '--no-sandbox'],
    });
    try {
      for (const testCase of preparedCases) {
        for (const variant of ['before', 'after']) {
          try {
            await captureVariant(browser, server.origin, testCase, variant);
          } catch (error) {
            if (!testCase.captureErrors) testCase.captureErrors = {};
            testCase.captureErrors[variant] = error.message;
          }
        }
      }
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise((resolve, reject) => server.instance.close((err) => (err ? reject(err) : resolve())));
  }

  const report = await buildReport(preparedCases, skipped);
  await writeFile(path.join(OUTPUT_DIR, 'report.json'), JSON.stringify(report, null, 2));
  await writeFile(path.join(OUTPUT_DIR, 'index.html'), renderReportHtml(report));
  await writeFile(path.join(OUTPUT_DIR, 'pages', 'index.html'), renderPagesIndex(report));
  await writeFile(
    path.join(OUTPUT_DIR, 'pages', 'manifest.json'),
    JSON.stringify(buildPagesManifest(report), null, 2),
  );

  console.log(`Wrote comparison report to ${path.join(OUTPUT_DIR, 'index.html')}`);
  console.log(
    `Cases: ${report.summary.totalCases}, failed: ${report.summary.failedCases}, skipped: ${report.summary.skippedCases}`,
  );
}

function readFlag(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

async function ensurePatchedBundle() {
  try {
    await stat(PATCHED_MERMAID);
  } catch {
    throw new Error(
      `Missing patched Mermaid bundle at ${PATCHED_MERMAID}. ` +
      'Pass --mermaid /path/to/mermaid.js to point at the bundle under test.',
    );
  }
}

async function collectCases() {
  const cases = [];
  const skipped = [];
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const packageId = entry.name;
    const packageDir = path.join(CONTENT_DIR, packageId);
    const candidateBases = await inferCandidateBasesForPackage(packageId, packageDir);

    const fileNames = (await readdir(packageDir))
      .filter((name) => name.endsWith('.html'))
      .sort();

    for (const fileName of fileNames) {
      const fullPath = path.join(packageDir, fileName);
      const html = await readFile(fullPath, 'utf8');
      const diagrams = extractDiagrams(html);
      if (!diagrams.length) continue;
      const pagePath = fileName.replace(/^web__/, '');
      const fixturePaths = buildFixturePaths(packageId, fileName);

      if (!candidateBases.length) {
        skipped.push({
          packageId,
          fileName,
          fullPath,
          pagePath,
          candidateBases,
          fixturePaths,
          reason: 'could not infer any candidate base URL from package metadata or saved HTML',
        });
        continue;
      }

      const pageUrl = new URL(pagePath, ensureTrailingSlash(candidateBases[0])).href;
      const scriptPaths = extractMermaidScriptPaths(html);
      if (!scriptPaths.mermaidPath || !scriptPaths.mermaidInitPath) {
        skipped.push({
          packageId,
          fileName,
          fullPath,
          pagePath,
          pageUrl,
          candidateBases,
          scriptPaths,
          fixturePaths,
          reason: 'could not find Mermaid script references in saved HTML',
        });
        continue;
      }

      cases.push({
        slug: slugify(`${packageId}--${fileName.replace(/\.html$/i, '')}`),
        packageId,
        canonical: candidateBases[0],
        candidateBases,
        fileName,
        fullPath,
        pagePath,
        pageUrl,
        scriptPaths,
        diagramCount: diagrams.length,
        maxDiagramLength: Math.max(...diagrams.map((diagram) => diagram.length)),
        totalDiagramLength: diagrams.reduce((sum, diagram) => sum + diagram.length, 0),
        diagramKinds: [...new Set(diagrams.map((diagram) => diagram.kind))],
        fixturePaths,
      });
    }
  }

  cases.sort((a, b) => {
    if (b.maxDiagramLength !== a.maxDiagramLength) return b.maxDiagramLength - a.maxDiagramLength;
    if (a.packageId !== b.packageId) return a.packageId.localeCompare(b.packageId);
    return a.fileName.localeCompare(b.fileName);
  });

  return { cases, skipped };
}

async function inferCandidateBasesForPackage(packageId, packageDir) {
  if (packageBaseCache.has(packageId)) {
    return packageBaseCache.get(packageId);
  }

  const bases = [];
  const packageCanonical = await extractCanonicalFromPackage(packageId);
  if (packageCanonical) bases.push(normalizeBaseUrl(packageCanonical));

  const fileNames = (await readdir(packageDir))
    .filter((name) => name.endsWith('.html'))
    .sort();
  for (const fileName of fileNames) {
    const html = await readFile(path.join(packageDir, fileName), 'utf8');
    const clues = extractBaseCluesFromHtml(html);
    for (const base of clues) bases.push(normalizeBaseUrl(base));
  }

  const uniqueBases = [...new Set(bases.filter(Boolean))];
  packageBaseCache.set(packageId, uniqueBases);
  return uniqueBases;
}

async function extractCanonicalFromPackage(packageId) {
  const tgzPath = path.join(PACKAGES_DIR, packageId, 'package.tgz');
  let tgz;
  try {
    tgz = await readFile(tgzPath);
  } catch {
    return null;
  }

  const tar = gunzipSync(tgz);
  for (const entry of iterTar(tar)) {
    if (!['0', '', 'file'].includes(entry.type)) continue;
    if (entry.name !== 'package/package.json' && entry.name !== 'package.json') continue;
    try {
      const pkg = JSON.parse(entry.data.toString('utf8'));
      return pkg.canonical || pkg.url || null;
    } catch {
      return null;
    }
  }
  return null;
}

function extractBaseCluesFromHtml(html) {
  const bases = [];

  const historyMatch = html.match(/<a href=['"](https?:\/\/[^'"<>]+?)\/history\.html['"]>Directory of published versions<\/a>/i);
  if (historyMatch) {
    bases.push(historyMatch[1]);
  }

  const officialMatch = html.match(
    /Official URL<\/i>:\s*<span[^>]*>(https?:\/\/[^<]+?)\/ImplementationGuide\/[^<"']+/i,
  );
  if (officialMatch) {
    bases.push(officialMatch[1]);
  }

  const repoMatch = html.match(/<a href=['"](https?:\/\/github\.com\/([^\/"']+)\/([^\/"']+)\/?)['"][^>]*>\1<\/a>/i);
  if (repoMatch) {
    const owner = repoMatch[2];
    const repo = repoMatch[3].replace(/\/$/, '');
    bases.push(`https://build.fhir.org/ig/${owner}/${repo}`);
  }

  return [...new Set(bases)];
}

function extractMermaidScriptPaths(html) {
  const uncommentedHtml = html.replace(/<!--[\s\S]*?-->/g, '');
  const scriptPaths = {
    mermaidPath: null,
    mermaidInitPath: null,
  };

  let match;
  const scriptRe = /<script\b[^>]*\bsrc=(["'])([^"']+)\1/gi;
  while ((match = scriptRe.exec(uncommentedHtml))) {
    const src = match[2];
    if (!scriptPaths.mermaidInitPath && /mermaid-init\.js(\?|#|$)/i.test(src)) {
      scriptPaths.mermaidInitPath = src;
      continue;
    }
    if (!scriptPaths.mermaidPath && /mermaid(?:\.min)?\.js(\?|#|$)/i.test(src) && !/mermaid-init/i.test(src)) {
      scriptPaths.mermaidPath = src;
    }
  }

  return scriptPaths;
}

async function writeCaseFixtures(testCase) {
  const rawHtml = await readFile(testCase.fullPath, 'utf8');
  const resolvedAssets = await resolveRemoteAssets(testCase);
  const {
    pageUrl,
    remoteMermaidUrl,
    remoteMermaidInitUrl,
    remoteMermaid,
    remoteMermaidInit,
  } = resolvedAssets;

  for (const variant of ['before', 'after']) {
    const variantDir = path.join(OUTPUT_DIR, testCase.fixturePaths.root, variant);
    const assetsDir = path.join(variantDir, 'assets', 'js');
    await mkdir(assetsDir, { recursive: true });

    const rewrittenHtml = rewriteHtml(rawHtml, pageUrl, {
      mermaidPath: './assets/js/mermaid.js',
      mermaidInitPath: './assets/js/mermaid-init.js',
    });
    await writeFile(path.join(variantDir, 'index.html'), rewrittenHtml);
    await writeFile(path.join(assetsDir, 'mermaid-init.js'), remoteMermaidInit);

    if (variant === 'before') {
      await writeFile(path.join(assetsDir, 'mermaid.js'), remoteMermaid);
    } else {
      await copyFile(PATCHED_MERMAID, path.join(assetsDir, 'mermaid.js'));
    }
  }

  await writeFile(
    path.join(OUTPUT_DIR, testCase.fixturePaths.root, 'case.json'),
    JSON.stringify(
      {
        ...testCase,
        resolvedPageUrl: pageUrl,
        remoteMermaidUrl,
        remoteMermaidInitUrl,
      },
      null,
      2,
    ),
  );
}

async function writeFailureFixture(testCase) {
  if (!testCase.fixturePaths) return;

  const failureDir = path.join(OUTPUT_DIR, testCase.fixturePaths.failure.dir);
  const sourceDir = path.join(OUTPUT_DIR, testCase.fixturePaths.source.dir);
  await mkdir(failureDir, { recursive: true });
  await mkdir(sourceDir, { recursive: true });

  let sourceCopied = false;
  let sourceCopyError = null;
  if (testCase.fullPath) {
    try {
      await copyFile(testCase.fullPath, path.join(sourceDir, 'index.html'));
      sourceCopied = true;
    } catch (error) {
      sourceCopyError = error.message;
    }
  }

  const metadata = {
    packageId: testCase.packageId,
    fileName: testCase.fileName,
    reason: testCase.reason || 'unknown failure',
    fullPath: testCase.fullPath || null,
    pagePath: testCase.pagePath || null,
    pageUrl: testCase.pageUrl || null,
    canonical: testCase.canonical || null,
    candidateBases: testCase.candidateBases || [],
    scriptPaths: testCase.scriptPaths || null,
    diagramCount: testCase.diagramCount ?? null,
    maxDiagramLength: testCase.maxDiagramLength ?? null,
    totalDiagramLength: testCase.totalDiagramLength ?? null,
    fixturePaths: testCase.fixturePaths,
    sourceCopied,
    sourceCopyError,
    failureFixtureError: testCase.failureFixtureError || null,
  };

  await writeFile(path.join(failureDir, 'index.html'), renderFailureHtml(metadata));
  await writeFile(path.join(OUTPUT_DIR, testCase.fixturePaths.caseJson), JSON.stringify(metadata, null, 2));

  testCase.sourceCopied = sourceCopied;
  testCase.sourceCopyError = sourceCopyError;
}

async function resolveRemoteAssets(testCase) {
  const attempts = [];
  for (const base of testCase.candidateBases) {
    const pageUrl = new URL(testCase.pagePath, ensureTrailingSlash(base)).href;
    const remoteMermaidUrl = new URL(testCase.scriptPaths.mermaidPath, pageUrl).href;
    const remoteMermaidInitUrl = new URL(testCase.scriptPaths.mermaidInitPath, pageUrl).href;
    try {
      const [remoteMermaid, remoteMermaidInit] = await Promise.all([
        fetchTextCached(remoteMermaidUrl),
        fetchTextCached(remoteMermaidInitUrl),
      ]);
      testCase.pageUrl = pageUrl;
      return {
        pageUrl,
        remoteMermaidUrl,
        remoteMermaidInitUrl,
        remoteMermaid,
        remoteMermaidInit,
      };
    } catch (error) {
      attempts.push(`${base} -> ${error.message}`);
    }
  }

  throw new Error(`could not resolve assets from candidate bases: ${attempts.join(' | ')}`);
}

function rewriteHtml(rawHtml, pageUrl, localScripts) {
  return rawHtml.replace(/\b(src|href)=("([^"]*)"|'([^']*)')/gi, (match, attr, _quoted, doubleQuoted, singleQuoted) => {
    const original = doubleQuoted ?? singleQuoted ?? '';
    const quote = doubleQuoted != null ? '"' : "'";
    if (!original || isSpecialUrl(original)) return match;

    let resolved;
    try {
      resolved = new URL(original, pageUrl).href;
    } catch {
      return match;
    }

    if (resolved.endsWith('/assets/js/mermaid.js')) {
      return `${attr}=${quote}${localScripts.mermaidPath}${quote}`;
    }
    if (resolved.endsWith('/assets/js/mermaid-init.js')) {
      return `${attr}=${quote}${localScripts.mermaidInitPath}${quote}`;
    }

    return `${attr}=${quote}${resolved}${quote}`;
  });
}

function isSpecialUrl(url) {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//') ||
    url.startsWith('#') ||
    url.startsWith('data:') ||
    url.startsWith('mailto:') ||
    url.startsWith('javascript:')
  );
}

async function captureVariant(browser, origin, testCase, variant) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  try {
    page.setDefaultTimeout(30000);
    const targetUrl = `${origin}/${testCase.fixturePaths[variant].html}`;
    console.log(`rendering ${testCase.packageId} :: ${testCase.fileName} :: ${variant}`);

    await page.goto(targetUrl, { waitUntil: 'load', timeout: 30000 });
    await page.waitForFunction(
      () => document.querySelectorAll('.mermaid, pre.language-mermaid').length > 0,
      null,
      { timeout: 15000 },
    );
    try {
      await page.waitForFunction(
        () => document.querySelectorAll('.mermaid iframe, .mermaid svg').length > 0,
        null,
        { timeout: 15000 },
      );
    } catch {
      // Keep going; failed render is part of what we want to classify.
    }
    await page.waitForTimeout(SCREENSHOT_WAIT_MS);

    const screenshotPath = path.join(OUTPUT_DIR, 'screenshots', `${testCase.slug}-${variant}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const metrics = await page.evaluate(() => {
      function summarizeSvg(svg) {
        if (!svg) return null;
        const viewBox = svg.getAttribute('viewBox');
        let viewBoxWidth = null;
        let viewBoxHeight = null;
        if (viewBox) {
          const parts = viewBox.trim().split(/\s+/).map(Number);
          if (parts.length === 4 && Number.isFinite(parts[2]) && Number.isFinite(parts[3])) {
            viewBoxWidth = parts[2];
            viewBoxHeight = parts[3];
          }
        }
        return {
          hasSvg: true,
          viewBox,
          viewBoxWidth,
          viewBoxHeight,
          widthAttr: svg.getAttribute('width') ?? '',
          heightAttr: svg.getAttribute('height') ?? '',
          nodeCount: svg.querySelectorAll('*').length,
          shapeCount: svg.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,text,image,foreignObject').length,
          outerHtmlLength: svg.outerHTML.length,
        };
      }

      function decodeIframeHtml(iframe) {
        const srcdoc = iframe.getAttribute('srcdoc');
        if (srcdoc) return srcdoc;
        const src = iframe.getAttribute('src') || '';
        const prefix = 'data:text/html;base64,';
        if (!src.startsWith(prefix)) return null;
        try {
          return atob(src.slice(prefix.length));
        } catch {
          return null;
        }
      }

      function summarizeIframe(iframe) {
        if (!iframe) return null;
        const src = iframe.getAttribute('src') || '';
        const srcdoc = iframe.getAttribute('srcdoc') || '';
        const docHtml = decodeIframeHtml(iframe);
        let svgSummary = null;
        let bodyTextLength = null;
        let bodyHtmlLength = null;
        if (docHtml) {
          const parsed = new DOMParser().parseFromString(docHtml, 'text/html');
          svgSummary = summarizeSvg(parsed.querySelector('svg'));
          bodyTextLength = (parsed.body?.textContent || '').trim().length;
          bodyHtmlLength = parsed.body?.innerHTML?.length ?? null;
        }
        return {
          srcKind: srcdoc ? 'srcdoc' : src.startsWith('data:') ? 'data' : src ? 'external' : 'none',
          srcLength: src.length,
          srcdocLength: srcdoc.length,
          decodedHtmlLength: docHtml?.length ?? 0,
          bodyTextLength,
          bodyHtmlLength,
          svg: svgSummary,
        };
      }

      const rawMermaidCount = document.querySelectorAll('pre.language-mermaid code.language-mermaid').length;
      const mermaidBlocks = [...document.querySelectorAll('.mermaid')].map((el, index) => {
        const rect = el.getBoundingClientRect();
        const iframe = el.querySelector('iframe');
        const iframeRect = iframe?.getBoundingClientRect();
        const inlineSvg = el.querySelector(':scope > svg');
        const inlineSvgSummary = summarizeSvg(inlineSvg);
        const iframeSummary = summarizeIframe(iframe);
        const svgSummary = inlineSvgSummary || iframeSummary?.svg || null;
        const iframeClientWidth = iframe?.clientWidth ?? null;
        const iframeClientHeight = iframe?.clientHeight ?? null;
        const expectedResponsiveHeight =
          svgSummary?.viewBoxWidth && svgSummary?.viewBoxHeight && iframeClientWidth
            ? iframeClientWidth * (svgSummary.viewBoxHeight / svgSummary.viewBoxWidth)
            : null;

        return {
          index,
          mermaidTag: el.tagName.toLowerCase(),
          className: el.className,
          documentTop: Number((rect.top + window.scrollY).toFixed(2)),
          documentBottom: Number((rect.bottom + window.scrollY).toFixed(2)),
          clientWidth: el.clientWidth,
          clientHeight: el.clientHeight,
          rectWidth: Number(rect.width.toFixed(2)),
          rectHeight: Number(rect.height.toFixed(2)),
          styleHeight: el.style.height || '',
          iframePresent: Boolean(iframe),
          iframeClientWidth,
          iframeClientHeight,
          iframeRectHeight: iframeRect ? Number(iframeRect.height.toFixed(2)) : null,
          iframeStyleHeight: iframe?.style.height ?? '',
          iframeStyleWidth: iframe?.style.width ?? '',
          iframeStyleAspectRatio: iframe?.style.aspectRatio ?? '',
          iframeStyleMaxWidth: iframe?.style.maxWidth ?? '',
          inlineSvg: inlineSvgSummary,
          iframeSummary,
          svgSummary,
          expectedResponsiveHeight:
            expectedResponsiveHeight != null ? Number(expectedResponsiveHeight.toFixed(2)) : null,
          iframeHeightError:
            expectedResponsiveHeight != null && iframeClientHeight != null
              ? Number((iframeClientHeight - expectedResponsiveHeight).toFixed(2))
              : null,
        };
      });

      return {
        title: document.title,
        locationHref: location.href,
        documentHeight: document.documentElement.scrollHeight,
        bodyHeight: document.body.scrollHeight,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        rawMermaidCodeBlockCount: rawMermaidCount,
        renderedMermaidBlockCount: mermaidBlocks.length,
        mermaidBlocks,
      };
    });

    const blockLocator = page.locator('.mermaid');
    const blockCount = await blockLocator.count();
    const blockScreenshots = [];
    for (let index = 0; index < blockCount; index++) {
      const relativePath = `screenshots/${testCase.slug}-${variant}-block${index}.png`;
      const absolutePath = path.join(OUTPUT_DIR, relativePath);
      await blockLocator.nth(index).screenshot({
        path: absolutePath,
        animations: 'disabled',
      });
      const visual = await analyzePng(absolutePath);
      if (metrics.mermaidBlocks[index]) {
        metrics.mermaidBlocks[index].visual = visual;
        metrics.mermaidBlocks[index].renderStatus = classifyRenderStatus(metrics.mermaidBlocks[index]);
      }
      blockScreenshots.push(relativePath);
    }

    metrics.blockScreenshots = blockScreenshots;
    metrics.pageScreenshot = `screenshots/${testCase.slug}-${variant}.png`;

    await writeFile(
      path.join(OUTPUT_DIR, 'metrics', `${testCase.slug}-${variant}.json`),
      JSON.stringify(metrics, null, 2),
    );
  } finally {
    await page.close();
  }
}

async function analyzePng(filePath) {
  const buffer = await readFile(filePath);
  const png = PNG.sync.read(buffer);
  const { width, height, data } = png;

  const samples = cornerSamples(data, width, height);
  const bg = averageColor(samples);
  let fgCount = 0;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4;
      const rgba = [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
      if (isForeground(rgba, bg)) {
        fgCount++;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const totalPixels = width * height;
  const foregroundRatio = totalPixels ? fgCount / totalPixels : 0;
  const bbox =
    fgCount > 0
      ? {
          left: minX,
          top: minY,
          right: maxX,
          bottom: maxY,
          width: maxX - minX + 1,
          height: maxY - minY + 1,
        }
      : null;

  const blankThreshold = Math.max(BLANK_PIXEL_FLOOR, Math.round(totalPixels * BLANK_PIXEL_RATIO));

  return {
    width,
    height,
    background: bg,
    foregroundPixelCount: fgCount,
    foregroundRatio: Number(foregroundRatio.toFixed(6)),
    bbox,
    isEffectivelyBlank:
      fgCount < blankThreshold || !bbox || bbox.width < 8 || bbox.height < 8,
  };
}

function cornerSamples(data, width, height) {
  const coords = [
    [0, 0],
    [Math.max(0, width - 1), 0],
    [0, Math.max(0, height - 1)],
    [Math.max(0, width - 1), Math.max(0, height - 1)],
  ];
  return coords.map(([x, y]) => {
    const idx = (width * y + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  });
}

function averageColor(samples) {
  const sums = [0, 0, 0, 0];
  for (const sample of samples) {
    for (let i = 0; i < 4; i++) sums[i] += sample[i];
  }
  return sums.map((sum) => Math.round(sum / samples.length));
}

function isForeground(rgba, bg) {
  if (rgba[3] < 20) return false;
  const diff =
    Math.max(
      Math.abs(rgba[0] - bg[0]),
      Math.abs(rgba[1] - bg[1]),
      Math.abs(rgba[2] - bg[2]),
    );
  return diff >= COLOR_THRESHOLD;
}

function classifyRenderStatus(block) {
  const hasSvg = Boolean(block.inlineSvg?.hasSvg || block.iframeSummary?.svg?.hasSvg || block.svgSummary?.hasSvg);
  const visuallyPresent = block.visual && !block.visual.isEffectivelyBlank;

  if (hasSvg && visuallyPresent) return 'rendered';
  if (visuallyPresent && block.iframePresent) return 'rendered-visible-unparsed';
  if (hasSvg && !visuallyPresent) return 'svg-blank';
  if (block.iframePresent) {
    if (block.visual?.isEffectivelyBlank) return 'iframe-blank';
    return 'iframe-without-svg';
  }
  if (visuallyPresent) return 'rendered-visible-unparsed';
  return 'no-render';
}

async function buildReport(cases, skipped) {
  const results = [];
  for (const testCase of cases) {
    const before = await maybeReadJson(path.join(OUTPUT_DIR, 'metrics', `${testCase.slug}-before.json`));
    const after = await maybeReadJson(path.join(OUTPUT_DIR, 'metrics', `${testCase.slug}-after.json`));

    const blockComparisons = before && after ? compareBlocks(before.mermaidBlocks, after.mermaidBlocks) : [];
    const regressionFlags = detectRegressions(before, after, blockComparisons, testCase.captureErrors || {});

    results.push({
      ...testCase,
      before,
      after,
      blockComparisons,
      regressionFlags,
      captureErrors: testCase.captureErrors || {},
      screenshots: {
        before: `screenshots/${testCase.slug}-before.png`,
        after: `screenshots/${testCase.slug}-after.png`,
      },
      localPages: {
        before: testCase.fixturePaths.before.html,
        after: testCase.fixturePaths.after.html,
        caseJson: testCase.fixturePaths.caseJson,
      },
      beforeMaxAbsIframeHeightError: before ? maxAbs(before.mermaidBlocks.map((block) => block.iframeHeightError)) : null,
      afterMaxAbsIframeHeightError: after ? maxAbs(after.mermaidBlocks.map((block) => block.iframeHeightError)) : null,
      metricsFiles: {
        before: `metrics/${testCase.slug}-before.json`,
        after: `metrics/${testCase.slug}-after.json`,
      },
      status: regressionFlags.length ? 'fail' : 'pass',
    });
  }

  results.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'fail' ? -1 : 1;
    if (a.packageId !== b.packageId) return a.packageId.localeCompare(b.packageId);
    return a.fileName.localeCompare(b.fileName);
  });

  return {
    generatedAt: new Date().toISOString(),
    viewport: VIEWPORT,
    patchedMermaid: PATCHED_MERMAID,
    summary: {
      totalCases: results.length,
      failedCases: results.filter((result) => result.status === 'fail').length,
      passedCases: results.filter((result) => result.status === 'pass').length,
      skippedCases: skipped.length,
    },
    skipped: skipped.map((item) => ({
      ...item,
      localPages: failureLocalPages(item.fixturePaths, item.sourceCopied),
    })),
    cases: results,
  };
}

async function maybeReadJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function compareBlocks(beforeBlocks, afterBlocks) {
  const maxLen = Math.max(beforeBlocks.length, afterBlocks.length);
  return Array.from({ length: maxLen }, (_, index) => {
    const beforeBlock = beforeBlocks[index] ?? null;
    const afterBlock = afterBlocks[index] ?? null;
    const beforeFill = ratio(beforeBlock?.iframeClientWidth, beforeBlock?.clientWidth);
    const afterFill = ratio(afterBlock?.iframeClientWidth, afterBlock?.clientWidth);
    return {
      index: beforeBlock?.index ?? afterBlock?.index ?? index,
      beforeStatus: beforeBlock?.renderStatus ?? null,
      afterStatus: afterBlock?.renderStatus ?? null,
      beforeTop: beforeBlock?.documentTop ?? null,
      afterTop: afterBlock?.documentTop ?? null,
      topShift: diff(afterBlock?.documentTop, beforeBlock?.documentTop),
      beforeHeight: beforeBlock?.rectHeight ?? null,
      afterHeight: afterBlock?.rectHeight ?? null,
      heightDelta: diff(afterBlock?.rectHeight, beforeBlock?.rectHeight),
      beforeFill,
      afterFill,
      fillDelta: diff(afterFill, beforeFill),
      beforeBlank: beforeBlock?.visual?.isEffectivelyBlank ?? null,
      afterBlank: afterBlock?.visual?.isEffectivelyBlank ?? null,
    };
  });
}

function detectRegressions(before, after, comparisons, captureErrors) {
  const flags = [];

  if (captureErrors.before) flags.push(`before capture failed: ${captureErrors.before}`);
  if (captureErrors.after) flags.push(`after capture failed: ${captureErrors.after}`);
  if (!before) flags.push('missing before metrics');
  if (!after) flags.push('missing after metrics');
  if (!before || !after) return flags;

  if (after.renderedMermaidBlockCount !== before.renderedMermaidBlockCount) {
    flags.push(
      `block count changed: before ${before.renderedMermaidBlockCount}, after ${after.renderedMermaidBlockCount}`,
    );
  }

  for (const block of after.mermaidBlocks) {
    if (!['rendered', 'rendered-visible-unparsed'].includes(block.renderStatus)) {
      flags.push(`after block ${block.index} render status ${block.renderStatus}`);
    }
  }

  for (const comparison of comparisons) {
    if (
      ['rendered', 'rendered-visible-unparsed'].includes(comparison.beforeStatus) &&
      !['rendered', 'rendered-visible-unparsed'].includes(comparison.afterStatus)
    ) {
      flags.push(`block ${comparison.index} regressed from rendered to ${comparison.afterStatus}`);
    }
    if (comparison.fillDelta != null && comparison.fillDelta < -0.08) {
      flags.push(`block ${comparison.index} width fill dropped by ${formatRatio(comparison.fillDelta)}`);
    }
    if (comparison.heightDelta != null && comparison.heightDelta > 20) {
      flags.push(`block ${comparison.index} height increased by ${formatNumber(comparison.heightDelta)}px`);
    }
    if (comparison.topShift != null && comparison.topShift > 30) {
      flags.push(`block ${comparison.index} shifted down by ${formatNumber(comparison.topShift)}px`);
    }
  }

  if (after.documentHeight - before.documentHeight > 80) {
    flags.push(`page height increased by ${after.documentHeight - before.documentHeight}px`);
  }

  return [...new Set(flags)];
}

function renderReportHtml(report) {
  const skippedHtml = report.skipped.length
    ? `<section class="case">
        <h2>Skipped</h2>
        <table>
          <thead><tr><th>Package</th><th>File</th><th>Reason</th><th>Failure</th><th>Source</th><th>Case</th><th>Published</th></tr></thead>
          <tbody>
            ${report.skipped
              .map(
                (item) => `<tr>
                  <td>${escapeHtml(item.packageId)}</td>
                  <td>${escapeHtml(item.fileName)}</td>
                  <td>${escapeHtml(item.reason)}</td>
                  <td>${linkOrEmpty(item.localPages?.failure, 'failure')}</td>
                  <td>${linkOrEmpty(item.localPages?.source, 'source')}</td>
                  <td>${linkOrEmpty(item.localPages?.caseJson, 'case.json')}</td>
                  <td>${linkOrEmpty(item.pageUrl, 'published page')}</td>
                </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </section>`
    : '';

  const rows = report.cases
    .map((testCase) => {
      const beforeBlocks = renderBlockMetrics(testCase.before?.mermaidBlocks || []);
      const afterBlocks = renderBlockMetrics(testCase.after?.mermaidBlocks || []);
      return `
      <section class="case">
        <h2>${escapeHtml(testCase.packageId)} / ${escapeHtml(testCase.fileName)} <span class="badge ${testCase.status}">${testCase.status}</span></h2>
        <p><strong>Page:</strong> <a href="${escapeHtml(testCase.pageUrl)}">${escapeHtml(testCase.pageUrl)}</a></p>
        <p><strong>Local fixtures:</strong> <a href="${escapeHtml(testCase.localPages.before)}">before</a> | <a href="${escapeHtml(testCase.localPages.after)}">after</a> | <a href="${escapeHtml(testCase.localPages.caseJson)}">case.json</a></p>
        <p><strong>Diagram kinds:</strong> ${escapeHtml(testCase.diagramKinds.join(', '))} | <strong>count:</strong> ${testCase.diagramCount} | <strong>max diagram length:</strong> ${testCase.maxDiagramLength}</p>
        <p><strong>Max |iframe height error|:</strong> before ${formatNumber(testCase.beforeMaxAbsIframeHeightError)} px, after ${formatNumber(testCase.afterMaxAbsIframeHeightError)} px</p>
        <p><strong>Regression flags:</strong> ${testCase.regressionFlags.length ? escapeHtml(testCase.regressionFlags.join('; ')) : 'none'}</p>
        <div class="shots">
          <figure>
            <figcaption>Before</figcaption>
            <a href="${testCase.screenshots.before}"><img src="${testCase.screenshots.before}" alt="before screenshot"/></a>
          </figure>
          <figure>
            <figcaption>After</figcaption>
            <a href="${testCase.screenshots.after}"><img src="${testCase.screenshots.after}" alt="after screenshot"/></a>
          </figure>
        </div>
        <div class="metrics">
          <div>
            <h3>Before blocks</h3>
            ${beforeBlocks}
            ${renderBlockShots(testCase.before?.blockScreenshots || [])}
            <p><a href="${testCase.metricsFiles.before}">before metrics JSON</a></p>
          </div>
          <div>
            <h3>After blocks</h3>
            ${afterBlocks}
            ${renderBlockShots(testCase.after?.blockScreenshots || [])}
            <p><a href="${testCase.metricsFiles.after}">after metrics JSON</a></p>
          </div>
        </div>
        <h3>Block deltas</h3>
        ${renderBlockComparisons(testCase.blockComparisons)}
      </section>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mermaid static IG comparison</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; line-height: 1.4; background: #fff; color: #111; }
      h1, h2, h3 { margin: 0 0 12px; }
      .case { margin: 0 0 48px; padding: 0 0 32px; border-bottom: 1px solid #ddd; }
      .shots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: start; }
      figure { margin: 0; }
      figcaption { font-weight: 600; margin: 0 0 8px; }
      img { width: 100%; border: 1px solid #ccc; }
      .metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }
      .block-shots { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
      table { border-collapse: collapse; width: 100%; font-size: 14px; }
      th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
      code { font-family: ui-monospace, SFMono-Regular, monospace; }
      .badge { display: inline-block; padding: 2px 6px; font-size: 12px; border-radius: 6px; color: #fff; vertical-align: middle; }
      .badge.fail { background: #a1260d; }
      .badge.pass { background: #1f7a1f; }
    </style>
  </head>
  <body>
    <h1>Mermaid static IG comparison</h1>
    <p><strong>Generated:</strong> ${escapeHtml(report.generatedAt)}</p>
    <p><strong>Viewport:</strong> ${report.viewport.width} x ${report.viewport.height}</p>
    <p><strong>Patched Mermaid bundle:</strong> <code>${escapeHtml(report.patchedMermaid)}</code></p>
    <p><strong>Summary:</strong> ${report.summary.totalCases} cases, ${report.summary.failedCases} failed, ${report.summary.passedCases} passed, ${report.summary.skippedCases} skipped</p>
    ${skippedHtml}
    ${rows}
  </body>
</html>`;
}

function renderPagesIndex(report) {
  const rows = buildPagesManifest(report)
    .map(
      (entry) => `
      <tr>
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
    <p>Each row keeps the local HTML copies used by the harness. “Review” flags call out cases with render loss or visible layout shift. Simple size changes are summarized numerically rather than treated as a hard failure by name.</p>
    <table>
      <thead>
        <tr>
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

function renderBlockMetrics(blocks) {
  const rows = blocks
    .map((block) => `
      <tr>
        <td>${block.index}</td>
        <td>${escapeHtml(block.renderStatus || '')}</td>
        <td>${formatNumber(block.iframeClientWidth)}</td>
        <td>${formatNumber(block.iframeClientHeight)}</td>
        <td>${formatNumber(block.expectedResponsiveHeight)}</td>
        <td>${formatNumber(block.iframeHeightError)}</td>
        <td>${escapeHtml(block.iframeStyleHeight || '')}</td>
        <td>${escapeHtml(block.iframeStyleAspectRatio || '')}</td>
        <td>${block.visual ? (block.visual.isEffectivelyBlank ? 'blank' : 'visible') : ''}</td>
      </tr>`)
    .join('');

  return `<table>
    <thead>
      <tr>
        <th>#</th>
        <th>status</th>
        <th>iframe w</th>
        <th>iframe h</th>
        <th>expected h</th>
        <th>delta</th>
        <th>style.height</th>
        <th>aspect-ratio</th>
        <th>visual</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderBlockShots(blockScreenshots) {
  if (!blockScreenshots.length) return '';
  const items = blockScreenshots
    .map(
      (screenshotPath, index) => `
      <figure>
        <figcaption>Block ${index}</figcaption>
        <a href="${screenshotPath}"><img src="${screenshotPath}" alt="block ${index} screenshot"/></a>
      </figure>`,
    )
    .join('');
  return `<div class="block-shots">${items}</div>`;
}

function renderBlockComparisons(comparisons) {
  const rows = comparisons
    .map(
      (comparison) => `
      <tr>
        <td>${comparison.index}</td>
        <td>${escapeHtml(comparison.beforeStatus || '')}</td>
        <td>${escapeHtml(comparison.afterStatus || '')}</td>
        <td>${formatNumber(comparison.beforeTop)}</td>
        <td>${formatNumber(comparison.afterTop)}</td>
        <td>${formatNumber(comparison.topShift)}</td>
        <td>${formatNumber(comparison.beforeHeight)}</td>
        <td>${formatNumber(comparison.afterHeight)}</td>
        <td>${formatNumber(comparison.heightDelta)}</td>
        <td>${formatRatio(comparison.beforeFill)}</td>
        <td>${formatRatio(comparison.afterFill)}</td>
        <td>${formatRatio(comparison.fillDelta)}</td>
      </tr>`,
    )
    .join('');

  return `<table>
    <thead>
      <tr>
        <th>#</th>
        <th>before status</th>
        <th>after status</th>
        <th>before top</th>
        <th>after top</th>
        <th>top shift</th>
        <th>before h</th>
        <th>after h</th>
        <th>height delta</th>
        <th>before fill</th>
        <th>after fill</th>
        <th>fill delta</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function maxAbs(values) {
  let max = null;
  for (const value of values) {
    if (value == null) continue;
    const abs = Math.abs(value);
    if (max == null || abs > max) max = abs;
  }
  return max;
}

function ratio(a, b) {
  if (a == null || b == null || b === 0) return null;
  return a / b;
}

function diff(a, b) {
  if (a == null || b == null) return null;
  return Number((a - b).toFixed(2));
}

function formatRatio(value) {
  return value == null ? '' : value.toFixed(3);
}

function extractDiagrams(text) {
  const diagrams = [];
  let match;

  const mermaidElementRe = /<(?:div|pre|code)\s+[^>]*class\s*=\s*["'][^"']*mermaid[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|pre|code)>/gi;
  while ((match = mermaidElementRe.exec(text))) {
    const code = decodeHtmlEntities(match[1]).trim();
    if (code) diagrams.push({ kind: 'mermaid-element', length: code.length });
  }

  const preRe = /<pre>\s*<code\s+[^>]*class\s*=\s*["'][^"']*language-mermaid[^"']*["'][^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi;
  while ((match = preRe.exec(text))) {
    const code = decodeHtmlEntities(match[1]).trim();
    if (code) diagrams.push({ kind: 'pre.language-mermaid', length: code.length });
  }

  return diagrams;
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function normalizeBaseUrl(url) {
  return url.replace(/\/$/, '');
}

function ensureTrailingSlash(url) {
  return url.endsWith('/') ? url : `${url}/`;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
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

function failureLocalPages(fixturePaths, sourceCopied) {
  if (!fixturePaths) return null;
  return {
    failure: fixturePaths.failure.html,
    source: sourceCopied ? fixturePaths.source.html : null,
    caseJson: fixturePaths.caseJson,
  };
}

function buildPagesManifest(report) {
  const okEntries = report.cases.map((testCase) => ({
    slug: testCase.slug,
    packageId: testCase.packageId,
    fileName: testCase.fileName,
    ...summarizeCaseForIndex(testCase),
    path: testCase.fixturePaths.root,
    before: testCase.localPages.before,
    after: testCase.localPages.after,
    failure: null,
    source: null,
    caseJson: testCase.localPages.caseJson,
    pageUrl: testCase.pageUrl,
    reason: null,
  }));

  const failedEntries = report.skipped.map((item) => ({
    slug: slugify(`${item.packageId}--${item.fileName.replace(/\.html$/i, '')}`),
    packageId: item.packageId,
    fileName: item.fileName,
    status: 'failure',
    reviewLevel: 'fixture',
    blocksLabel: '',
    pageHeightDelta: null,
    maxHeightIncrease: null,
    maxTopShift: null,
    worstFillDrop: null,
    path: item.fixturePaths?.root || null,
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

async function fetchTextCached(url) {
  if (textFetchCache.has(url)) return textFetchCache.get(url);
  const promise = fetchText(url);
  textFetchCache.set(url, promise);
  return promise;
}

async function fetchText(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': 'mermaid-static-compare/1.0',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

async function startStaticServer(rootDir) {
  const server = http.createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
      let relativePath = decodeURIComponent(requestUrl.pathname);
      if (relativePath.endsWith('/')) relativePath += 'index.html';
      if (relativePath === '/') relativePath = '/index.html';
      const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, '');
      const filePath = path.join(rootDir, safePath);
      if (!filePath.startsWith(rootDir)) {
        res.writeHead(403);
        res.end('forbidden');
        return;
      }

      const fileInfo = await stat(filePath);
      if (!fileInfo.isFile()) {
        res.writeHead(404);
        res.end('not found');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentTypeFor(filePath) });
      createReadStream(filePath).pipe(res);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });

  await new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', (err) => (err ? reject(err) : resolve()));
  });

  const address = server.address();
  return {
    instance: server,
    origin: `http://127.0.0.1:${address.port}`,
  };
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.css':
      return 'text/css; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

function formatNumber(value) {
  return value == null ? '' : String(value);
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

function linkOrEmpty(href, label, isLocal = false) {
  if (!href) return '';
  const target = isLocal ? `../${href}` : href;
  return `<a href="${escapeHtml(target)}">${escapeHtml(label)}</a>`;
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

function displayNumber(value) {
  return value == null ? '?' : String(value);
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

function* iterTar(buf) {
  const blockSize = 512;
  let offset = 0;
  let pendingLongName = null;

  while (offset + blockSize <= buf.length) {
    if (isZeroBlock(buf, offset)) break;

    let name = readStr(buf, offset, 100);
    const size = parseOctal(buf, offset + 124, 12);
    const type = String.fromCharCode(buf[offset + 156] || 0x30);
    const prefix = readStr(buf, offset + 345, 155);
    if (prefix) name = `${prefix}/${name}`;
    if (pendingLongName !== null) {
      name = pendingLongName;
      pendingLongName = null;
    }

    offset += blockSize;
    const dataStart = offset;
    const dataEnd = dataStart + size;
    if (dataEnd > buf.length) break;

    const data = buf.subarray(dataStart, dataEnd);
    if (type === 'L' || type === 'K') {
      pendingLongName = data.toString('utf8').replace(/\0+$/, '');
    } else {
      yield { name, type, size, data };
    }

    offset = dataEnd + ((blockSize - (size % blockSize)) % blockSize);
  }
}

function isZeroBlock(buf, offset) {
  for (let i = 0; i < 512; i++) {
    if (buf[offset + i] !== 0) return false;
  }
  return true;
}

function readStr(buf, offset, len) {
  let end = offset;
  while (end < offset + len && buf[end] !== 0) end++;
  return buf.toString('utf8', offset, end);
}

function parseOctal(buf, offset, len) {
  const text = readStr(buf, offset, len).trim();
  return text ? parseInt(text, 8) : 0;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
