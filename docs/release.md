# Civic Forecast release guide

This checkout prepares the first public package release. The changeset covers
`core`, `react`, `registry`, and `cli`; package versions remain `0.0.0` until the
Changesets version step. This document does not imply that the checkout has been
published to npm or deployed to the existing demo domain.

## Run and verify

Use Node 22.14 or newer and the pinned pnpm 11.1.3. From a fresh clone:

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm check:release
pnpm demo:dev
```

The release check builds package dependencies before the apps. The docs use port
3000 and the demo uses port 3001 in development. Browser checks start their own
production servers on 3100 and 3101 and refuse to reuse another running project.
On Linux CI, install Chromium with `--with-deps`.

The check covers workspace tests, 71 unit/integration/accessibility tests, package
type checks and lint, all production builds, native Node ESM imports, the CLI
entrypoint, and all eight registry payloads. Eighteen Chromium scenarios cover
desktop and mobile docs, themes, Studio, dial dragging and keyboard tabs, invalid input, sample
provenance, registry responses, attribute/class/nested theme scopes, and PNG/SVG export. Visual captures are in the
ignored `test-results/` directory.

The npm packages include compiled ESM with resolvable `.js` imports. Registry JSON
contains source content and rewrites local imports to the installed helper paths.
The demo and docs self-host their fonts with the font licenses. OG PNG export
uses a static Instrument Sans TTF instance because the image renderer does not
accept the variable WOFF2 files used by the page CSS. The dial also has a
Chromium touch-input check, and the Studio checks ensure iframe content fits.
Regression tests cover provider-free hooks, pending polling requests, stale-data
recovery, system theme changes, notional validation, and debounced Studio fields.
The read-only market preview stays in the page flow so it cannot cover market data.

Local `pnpm pack` archives were also checked: all four contain their MIT license,
package manifest, and distribution files; workspace dependency references resolve
to package versions. These archives are retained under ignored `.cache/release/`
and use the current pre-versioning `0.0.0` manifests.

## Dependency audit

As checked on 2026-09-25, `pnpm audit --prod` reports **zero critical, high, or
moderate advisories** and one low advisory. Both CI and the release workflow fail
at moderate severity or above.

Next.js was updated to 15.5.24, including the patch for
[GHSA-p293-qw3h-jr36](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36).
The scoped overrides in `pnpm-workspace.yaml` pin patched transitive packages.
Storybook's actions addon uses UUID v4; its scoped override uses uuid 11.1.1.
The Storybook production build verifies that update.

The remaining [elliptic advisory](https://github.com/advisories/GHSA-848j-6mx2-7j84)
comes through the CLOB client's ethers dependencies in the private
`examples/clob-v2-builder-flow` app. It is absent from the published UI packages
and the main demo. The advisory names 6.6.2 as a fix, but the npm registry had no
published 6.6.2 when checked. Do not force an unavailable version. Recheck the
upstream client before using that example with real signing credentials.

Known nonblocking build output: three existing exhaustive-deps warnings in
`useAsyncData`, and upstream Storybook chunk-size/eval warnings. The `pnpm size`
command currently prints target budgets; it does not measure bundles and is not
a release gate.

## Publish

1. Review the source changes and run the checks above. Ensure generated private
   collateral is absent from the commit; screenshots used by the README are
   intentional product documentation.
2. Merge the reviewed changes to `main`. Run the manual Release workflow. With
   the pending changeset, Changesets opens a version PR; review the resulting
   versions, changelogs, and internal dependency ranges.
3. Merge the version PR and rerun Release. Its checks precede `changesets publish`.
   Configure the repository's `NPM_TOKEN` secret through GitHub settings. Keep
   credentials out of files and chat. The package scope must permit publication.
4. Deploy the demo and docs from the same reviewed commit using the existing
   hosting configuration. Verify `/studio`, `/embed/sample`, `/registry.json`,
   `/r/market-card.json`, and `/api/og?slug=sample&format=png` on that deployment.
5. Check the published package contents and install the registry in a consumer
   project before announcing availability.

The demo is read-only. Sample prices and evidence are labeled as illustrative;
failed public requests never silently replace a requested market with sample data.
