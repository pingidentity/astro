/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/astro',
  plugins: [
    react({
      jsxImportSource: 'react',
      fastRefresh: false,
      babel: {
        parserOpts: {
          plugins: ['jsx'],
        },
      },
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist/astro',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'astro',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    watch: false,
    globals: true,
    alias: {
      '^.+\\.(css|scss)$': path.resolve(__dirname, '__mocks__/styleMock.js'),
      '^.+\\.mdx$': path.resolve(__dirname, '__mocks__/mdxMock.js'),
      '\\.svg': path.resolve(__dirname, '__mocks__/svgrMock.js'),
    },
    environment: 'jsdom',
    css: true,
    isolate: true,
    pool: 'forks',
    reporters: ['default', 'hanging-process'],
    setupFiles: ['src/utils/testUtils/setupTests.ts'],
    include: ['**/**/*.test.{js,ts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      reportsDirectory: '../../coverage/libs/astro',
      provider: 'v8',
      reporter: ['html', 'text', 'json'],
      thresholds: {
        global: {
          lines: 92,
          functions: 92,
          branches: 80,
        },
        './src/**/*.*': {
          lines: 92,
          functions: 92,
          branches: 80,
        },
      },
      exclude: [
        'src/index.ts',
        'src/hooks/index.ts',
        'src/context/*',
        '**/index.ts',
        '**/*.story.*',
        '**/*.stories.*',
        '.(story|stories).(js|jsx|mdx|ts|tsx)',
        'src/styles/**',
        '**/*.styles.js',
        '**/styles/**',
        'src/utils/**',
        '**/utils/**',
        '.storybook/**',
      ],
    },
  },
});
