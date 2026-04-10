# Mermaid Diagrams in FHIR Implementation Guides

A catalog of [Mermaid](https://mermaid.js.org/) diagrams found across FHIR Implementation Guides published on [build.fhir.org](https://build.fhir.org).

**[Browse the catalog](https://jmandel.github.io/mermaid-in-fhir-igs/)** — live-rendered diagrams with links back to each source IG.

## What's here

| File | Description |
|------|-------------|
| [`catalog.html`](catalog.html) | Self-contained HTML catalog with live Mermaid rendering (deployed as GitHub Pages) |
| [`catalog.md`](catalog.md) | Markdown version with fenced mermaid blocks |
| [`diagrams.jsonl`](diagrams.jsonl) | One JSON line per extracted diagram (package, file, type, code) |
| [`mermaid_igs.jsonl`](mermaid_igs.jsonl) | Index of IGs that use Mermaid (with build/GitHub/canonical URLs) |
| [`build_catalog.mjs`](build_catalog.mjs) | The script that generates everything |

## How it works

`build_catalog.mjs` is a zero-dependency Node.js script that:

1. Fetches [`build.fhir.org/ig/qas.json`](https://build.fhir.org/ig/qas.json) — the CI build index for all FHIR IGs
2. Filters to IGs built within a configurable lookback period
3. Deduplicates by package ID (keeps the newest build per package)
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

## Attribution

Every diagram in the catalog links back to:
- The **build.fhir.org page** where it appears
- The **GitHub repository and branch** that produced it
- The IG's **canonical URL**

The diagrams are the work of their respective IG authors. This catalog simply collects and indexes them.

## License

The catalog tooling is released under MIT. The diagrams themselves belong to their respective IG projects — see each IG's license for details.
