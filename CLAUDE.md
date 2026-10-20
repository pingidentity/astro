# libs/astro — @pingux/astro

Rules specific to the main component library. See the root `CLAUDE.md` for repo-wide conventions.

## No internal-only references in consumer-visible files

`@pingux/astro` is a public package; its README ships in the npm tarball and every
generated file under `build/`/`lib/` can reach consumers. Never add links or references
to resources only Ping employees can access — internal Confluence/Jira pages,
intranet hosts, or internal tooling URLs. State the needed content inline instead
(e.g. name the supported browsers rather than linking the internal support matrix).
Public URLs are fine: `pingidentity.design`, `storybook.pingidentity.design`,
storybookjs.org, theme-ui.com, etc. When unsure whether a URL is public, check it
resolves without authentication or leave it out.

## Packaging contract (tree-shaking)

The package declares `"sideEffects": false` and an `exports` map — the full contract and
its lint enforcement are documented in `README.md` under "Packaging and Tree-Shaking".
The short form:

- No bare side-effect imports (`import './foo'`) or lodash barrel imports in shipped
  source; both are lint errors (`import/no-unassigned-import`, `no-restricted-imports`).
- No import-time side effects: no `injectGlobal`, module-scope `window`/`document`
  access, or global registration (`@nx/workspace-no-import-time-side-effects`).
- Lodash is imported per method (`import omit from 'lodash/omit'`).
- `prune-package.sh` removes dev-only trees from the built package before publish; its
  pruning rules are covered by `prune-package.test.js`. Only test files consume
  `src/utils/testUtils`, so it is pruned; `src/utils/docUtils` is NOT pruned — shipped
  components import its PropTypes shapes at runtime despite the "doc" name.
