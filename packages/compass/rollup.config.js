import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import svgr from '@svgr/rollup';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import corePkg from '@pingux/compass-core/package.json';
import pkg from './package.json';

const external = [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(corePkg.dependencies),
];

export default [

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/index.js',
        output: [
            { file: `./build/${pkg.main}`, format: 'cjs' },
            { file: `./build/${pkg.module}`, format: 'es' },
        ],
        external,
        plugins: [
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true,
            }),
            resolve({
                extensions: ['.js', '.jsx'],
            }),
            commonjs({
                namedExports: {
                    // left-hand side can be an absolute path, a path
                    // relative to the current directory, or the name
                    // of a module in node_modules
                    '@pingux/compass-core/lib/components/List': ['ListBox'],
                    '@pingux/compass-core/lib/components/Between': ['between'],
                    '@pingux/compass-core/lib/components/Link': ['LinkProvider'],
                },
                ignore: [
                    '@emotion/core',
                    '@emotion-theming',
                    'styled-system',
                ],
            }),
            svgr({ include: ['**/*.svg', '../../node_modules/**/*.svg'] }),
            generatePackageJson({
                inputFolder: './',
                baseContents: pkg,
                additionalDependencies: corePkg.dependencies,
            }),
        ],
    },
];
