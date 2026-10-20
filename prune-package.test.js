const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const SCRIPT = path.join(__dirname, 'prune-package.sh');

// Mirrors the build's babel --copy-files output: compiled component trees the
// prune must keep, plus the dev-only trees and file types it must remove.
function makeFakeDist(root) {
  const keep = [
    'lib/index.js',
    'lib/cjs/index.js',
    'lib/components/Box/Box.js',
    'lib/components/Box/Box.d.ts',
    'lib/cjs/components/Box/Box.js',
    'lib/styles/themes/next-gen.js',
    'lib/utils/devUtils/constants/variants.js',
    'lib/types/index.d.ts',
    'README.md',
    'package.json',
  ];
  const prune = [
    // Storybook-only trees (esm + cjs)
    'lib/patterns/SaveBarPattern.js',
    'lib/recipes/SomeRecipe.js',
    'lib/docs/index.js',
    'lib/api/index.js',
    'lib/experimental/Widget.js',
    'lib/mocks/handlers.js',
    'lib/release/stableRelease.js',
    'lib/cjs/patterns/SaveBarPattern.js',
    'lib/cjs/recipes/SomeRecipe.js',
    'lib/cjs/docs/index.js',
    'lib/cjs/api/index.js',
    'lib/cjs/experimental/Widget.js',
    'lib/cjs/mocks/handlers.js',
    'lib/cjs/release/stableRelease.js',
    // Babel-copied mdx even with --ignore
    'lib/components/Box/Box.mdx',
    'lib/patterns/Patterns.mdx',
    // Babel-copied test/stories files
    'lib/components/Box/Box.test.js',
    'lib/components/Box/Box.stories.js',
    'lib/components/Box/Box.stories.hidden.js',
    'lib/cjs/components/Box/Box.test.js',
    'lib/cjs/components/Box/Box.spec.tsx',
    'lib/cjs/components/Box/Box.stories.jsx',
  ];
  [...keep, ...prune].forEach(rel => {
    const file = path.join(root, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, '// fixture');
  });
  return { keep, prune };
}

describe('prune-package.sh', () => {
  let dist;

  beforeEach(() => {
    dist = fs.mkdtempSync(path.join(os.tmpdir(), 'prune-pkg-test-'));
  });

  afterEach(() => {
    fs.rmSync(dist, { recursive: true, force: true });
  });

  it('removes storybook/test-only trees and files, keeping everything else', () => {
    const { keep, prune } = makeFakeDist(dist);

    execFileSync(SCRIPT, {
      env: { ...process.env, PRUNE_DIST_DIR: dist },
    });

    prune.forEach(rel => {
      expect(fs.existsSync(path.join(dist, rel))).toBe(false);
    });
    keep.forEach(rel => {
      expect(fs.existsSync(path.join(dist, rel))).toBe(true);
    });
  });

  it('also prunes without the PRUNE_DIST_DIR override (default dist/astro path)', () => {
    // Exercises the script's default path by running it from a repo layout
    // it expects: <tmp>/libs/astro with dist at <tmp>/dist/astro.
    fs.rmSync(dist, { recursive: true, force: true });
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'prune-pkg-repo-'));
    const distDir = path.join(root, 'dist', 'astro');
    const scriptDir = path.join(root, 'libs', 'astro');
    fs.mkdirSync(scriptDir, { recursive: true });
    fs.copyFileSync(SCRIPT, path.join(scriptDir, 'prune-package.sh'));
    const { keep, prune } = makeFakeDist(distDir);

    execFileSync(path.join(scriptDir, 'prune-package.sh'));

    prune.forEach(rel => {
      expect(fs.existsSync(path.join(distDir, rel))).toBe(false);
    });
    keep.forEach(rel => {
      expect(fs.existsSync(path.join(distDir, rel))).toBe(true);
    });
    fs.rmSync(root, { recursive: true, force: true });
  });
});
