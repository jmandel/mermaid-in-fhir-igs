# Static Compare Harness

This directory contains the Node-based harness used to produce the frozen Mermaid before/after artifacts committed under [`../../snapshot/`](../../snapshot/).

It compares saved IG HTML using:

- harvested built pages under a `content/` tree
- matching package metadata under a `packages/` tree
- a Mermaid bundle under test
- Chromium for deterministic page capture

## Inputs

- `--content /path/to/content`
- `--packages /path/to/packages`
- `--mermaid /path/to/mermaid.js`
- optional `--out /path/to/artifacts`
- optional `--chromium /path/to/chromium`

## Typical use

```bash
npm install
npm run compare -- \
  --content /path/to/content \
  --packages /path/to/packages \
  --mermaid /path/to/mermaid.js \
  --out ./artifacts

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
