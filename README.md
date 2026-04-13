# Mermaid Diagrams in FHIR Implementation Guides

A catalog of [Mermaid](https://mermaid.js.org/) diagrams found across FHIR Implementation Guides published on [build.fhir.org](https://build.fhir.org), plus a frozen before/after comparison snapshot for the Mermaid sandbox iframe sizing work.

**[Browse the snapshot + catalog](https://jmandel.github.io/mermaid-in-fhir-igs/)**.

## What's here

| File | Description |
|------|-------------|
| [`catalog.html`](catalog.html) | Self-contained HTML catalog with live Mermaid rendering (deployed as GitHub Pages) |
| [`catalog.md`](catalog.md) | Markdown version with fenced mermaid blocks |
| [`diagrams.jsonl`](diagrams.jsonl) | One JSON line per extracted diagram (package, file, type, code) |
| [`mermaid_igs.jsonl`](mermaid_igs.jsonl) | Index of IGs that use Mermaid (with build/GitHub/canonical URLs) |
| [`build_catalog.mjs`](build_catalog.mjs) | The script that generates everything |
| [`snapshot/`](snapshot/) | Frozen, shareable before/after site with vendored assets for local browsing and GitHub Pages |
| [`build_snapshot_site.mjs`](build_snapshot_site.mjs) | Freezes a static-compare artifact tree into a self-contained snapshot |
| [`review_overrides.json`](review_overrides.json) | Manual case-specific review annotations for semantic failures the geometry harness cannot infer |
| [`tools/static-compare/`](tools/static-compare/) | The comparison harness source used to generate the before/after artifacts |

## How it works

`build_catalog.mjs` is a zero-dependency Node.js script that:

1. Fetches [`build.fhir.org/ig/qas.json`](https://build.fhir.org/ig/qas.json) — the CI build index for all FHIR IGs
2. Filters to IGs built within a configurable lookback period
3. Keeps the newest build per GitHub repo/branch, then collapses branch variants whose extracted Mermaid content is byte-for-byte identical
4. For each IG, fetches the built HTML pages and scans for Mermaid content:
   - `<div class="mermaid">` / `<pre class="mermaid">` elements
   - `<code class="language-mermaid">` elements
   - `` ```mermaid `` fenced code blocks
   - `{% include mermaid.html %}` Liquid includes
5. Extracts the raw diagram code and classifies diagram types
6. Generates the catalog files with full attribution (links to build.fhir.org, GitHub source, and canonical URLs)

## Regenerate

```bash
# Default: last 90 days
node build_catalog.mjs

# Custom lookback
node build_catalog.mjs --days 30
node build_catalog.mjs --days 365
```

Requires Node.js 18+ (uses native `fetch`). No `npm install` needed.

## Frozen Before/After Snapshot

The `snapshot/` tree is intended for sharing and review:

- root `index.html`: review-oriented summary of before/after cases
- `pages/.../before` and `pages/.../after`: frozen page fixtures
- `report.json`: compare metrics and per-case flags
- `warnings.json`: asset-freezing warnings from the vendoring pass

Status labels in the snapshot are intentionally conservative:

- `Clean`: no notable change detected
- `Needs render review`: likely blank or missing render after the swap
- `Needs layout review`: rendered, but page-height growth or downstream shift is large enough to inspect
- `Check geometry`: measurable size/fill change without a proved render loss
- `Fixture failures`: the harness could not prepare or replay the case cleanly

Refresh the snapshot from an existing static-compare artifact directory:

```bash
node build_snapshot_site.mjs --source /path/to/static-compare/artifacts --out snapshot
```

Re-run the compare harness itself from harvested IG content plus a Mermaid bundle under test:

```bash
cd tools/static-compare
npm install
npm run compare -- \
  --content /path/to/content \
  --igs /path/to/mermaid_igs.jsonl \
  --mermaid /path/to/mermaid.js \
  --out ./artifacts

node backfill_failure_pages.mjs --content /path/to/content --out ./artifacts
cd ../..
node build_snapshot_site.mjs --source tools/static-compare/artifacts --out snapshot
```

When `--igs` points at `mermaid_igs.jsonl`, the compare harness uses the exact CI build URL from `build.fhir.org/ig/qas.json` as the authoritative page base. That is the normal path for this repo.

Package metadata is only used as a fallback if you run the harness without `mermaid_igs.jsonl` and ask it to infer cases directly from harvested content.

The comparison tables include the GitHub `org/repo` path and branch so each case can be traced back directly to the corresponding `build.fhir.org/ig/:org/:repo/branches/:branch/...` CI build. By default the compare harness now takes every case present in `mermaid_igs.jsonl`; use `--branches main,master` only when you want an explicit branch filter.

The GitHub Pages workflow publishes the committed `snapshot/` tree as the site root and keeps `catalog.html` available alongside it.

Some Mermaid changes are semantic render regressions rather than layout regressions. Those can be annotated in `review_overrides.json` so the published snapshot and case metadata stay accurate even when the automated geometry checks are not sufficient on their own.

## Attribution

Every diagram in the catalog links back to:
- The **build.fhir.org page** where it appears
- The **GitHub repository and branch** that produced it
- The IG's **canonical URL**

The diagrams are the work of their respective IG authors. This catalog simply collects and indexes them.

## License

The catalog tooling is released under MIT. The diagrams themselves belong to their respective IG projects — see each IG's license for details.
