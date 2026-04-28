/**
 * Build script to serialize NextGenTheme and NextGenDarkTheme to JSON files
 * for hosting on the CDN.
 *
 * Requires the astro lib to be built first (npm run build:ci).
 *
 * Usage: node buildThemeJson.js
 *
 * Outputs:
 *   cdn/latest/onyxTheme.json
 *   cdn/latest/onyxDarkTheme.json
 */


const fs = require('fs');
const path = require('path');
const Module = require('module');

// Register a no-op handler for CSS imports that Node can't parse
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.endsWith('.css')) {
    return require.resolve('./buildThemeJson.ts');
  }
  // The workspace-linked @pingux/onyx-tokens has no compiled index.js,
  // so redirect to the built dist output.
  if (request === '@pingux/onyx-tokens') {
    return originalResolveFilename.call(
      this,
      path.resolve(__dirname, '../../dist/onyx-tokens/index.cjs'),
      parent,
      isMain,
      options,
    );
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
require.extensions['.css'] = function () { /* empty */ };

const { NextGenTheme, NextGenDarkTheme } = require('../../dist/astro/lib/cjs');

// Custom replacer that strips non-JSON-serializable values (React elements, functions, etc.)
function jsonReplacer(_key, value) {
  if (typeof value === 'function') {
    return undefined;
  }
  if (value && typeof value === 'object' && '$$typeof' in value) {
    return undefined;
  }
  return value;
}

const outputDir = path.join(__dirname, 'cdn', 'latest');
fs.mkdirSync(outputDir, { recursive: true });

const lightPath = path.join(outputDir, 'onyxTheme.json');
const darkPath = path.join(outputDir, 'onyxDarkTheme.json');

fs.writeFileSync(lightPath, JSON.stringify(NextGenTheme, jsonReplacer, 4), 'utf8');
console.log(`Wrote ${lightPath}`);

fs.writeFileSync(darkPath, JSON.stringify(NextGenDarkTheme, jsonReplacer, 4), 'utf8');
console.log(`Wrote ${darkPath}`);

console.log('Theme JSON build complete.');
