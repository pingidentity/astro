#!/bin/sh
# Prunes Storybook-only and test-only files from the built package in
# dist/astro before it is packed and published. Babel's CLI copies
# non-compilable files (mdx) unconditionally even when --ignore matches,
# so the mdx and whole Storybook-only trees are removed here instead.
#
# Everything pruned is dev-only: nothing under src/components, src/context,
# src/hooks, src/styles, src/types, src/utils, or the root barrel imports
# from src/api, src/docs, src/experimental, src/mocks, src/patterns,
# src/recipes, or src/release.
#
# PRUNE_DIST_DIR overrides the package directory (used by prune-package.test.js);
# it must point at the directory containing lib/.
set -e

DIST="${PRUNE_DIST_DIR:-"$(cd "$(dirname "$0")" && pwd)/../../dist/astro"}"

for tree in lib/cjs/api lib/cjs/docs lib/cjs/experimental lib/cjs/mocks lib/cjs/patterns lib/cjs/recipes lib/cjs/release \
            lib/api lib/docs lib/experimental lib/mocks lib/patterns lib/recipes lib/release; do
  rm -rf "$DIST/$tree"
done

find "$DIST/lib" -name "*.mdx" -delete
find "$DIST/lib" \( -name "*.test.js" -o -name "*.test.jsx" -o -name "*.test.ts" -o -name "*.test.tsx" \
  -o -name "*.spec.js" -o -name "*.spec.jsx" -o -name "*.spec.ts" -o -name "*.spec.tsx" \
  -o -name "*.stories.js" -o -name "*.stories.jsx" -o -name "*.stories.ts" -o -name "*.stories.tsx" \
  -o -name "*.stories.hidden.js" \) -delete

echo "prune-package: removed storybook/test-only files from $DIST"
