# Static Compare Harness

This directory contains the Node-based harness used to produce the frozen Mermaid before/after artifacts committed under [`../../snapshot/`](../../snapshot/).

It compares saved IG HTML using:

- harvested built pages under a `content/` tree
- optional `mermaid_igs.jsonl` catalog rows from the build.fhir.org scan
- matching package metadata under a `packages/` tree (fallback only when no IG index is provided)
- a Mermaid bundle under test
- Chromium for deterministic page capture

## Inputs

- `--content /path/to/content`
- optional `--igs /path/to/mermaid_igs.jsonl`
- optional `--packages /path/to/packages`
- `--mermaid /path/to/mermaid.js`
- optional `--out /path/to/artifacts`
- optional `--cache /path/to/cache`
- optional `--jobs 4`
- optional `--chromium /path/to/chromium`

## Typical use

```bash
npm install
npm run compare -- \
  --content /path/to/content \
  --igs /path/to/mermaid_igs.jsonl \
  --mermaid /path/to/mermaid.js \
  --out ./artifacts \
  --cache ./.cache \
  --jobs 4

node backfill_failure_pages.mjs --content /path/to/content --out ./artifacts
```

Then freeze the resulting `artifacts/` tree into the shareable static snapshot:

```bash
cd ../..
node build_snapshot_site.mjs --source tools/static-compare/artifacts --out snapshot
```

## Notes

- The harness emits `review` flags for human inspection. Those are not all proven regressions.
- `Needs render review` is the strongest signal.
- `Check geometry` is intentionally softer and mostly there to focus spot-checking.

- The compare step now supports persistent artifact caching keyed by rewritten page HTML plus Mermaid bundle hashes.
- A warm rerun should be almost entirely cache hits, with only new or previously failing cases rendered again.
- The worker pool is controlled by `--jobs`; the default is up to 4 concurrent Chromium workers.
