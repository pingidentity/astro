const { FlatCompat } = require('@eslint/eslintrc');

const path = require('path');
const globals = require('globals');

const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js')
const airbnb =require('eslint-config-airbnb')
const testingLibrary =require('eslint-plugin-testing-library')
const jestDom =require('eslint-plugin-jest-dom')
const reactHooks =require('eslint-plugin-react-hooks')
const jsxA11y =require('eslint-plugin-jsx-a11y')
const react =require('eslint-plugin-react')
const tsEslint =require('@typescript-eslint/eslint-plugin')
const tsEslintParser =require('@typescript-eslint/parser')

const emotion =require('@emotion/eslint-plugin')
const babelParser =require('@babel/eslint-parser')
const simpleImportSort =require('eslint-plugin-simple-import-sort')
const importPlugin = require('eslint-plugin-import');
const tseslint = require('typescript-eslint');


const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
  
});

module.exports = [
    ...baseConfig,
    ...compat.extends('airbnb'),
    ...compat.extends('plugin:testing-library/react'), 
    ...compat.extends('plugin:jest-dom/recommended'),
    ...compat.config({
    settings: {
        'import/resolver': {
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
        },
        },
    },
    }),
  {
    files: [ "**/*.ts", "**/*.tsx", '**/*.js', '**/*.jsx'],
    languageOptions:{
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: babelParser,
        globals: Object.fromEntries(
            Object.entries({
                ...globals.browser,
                ...globals.jest,
                ...globals.jasmine,
                React:'readonly',
                NodeJS: 'readonly',
                VoidFunction: 'readonly',
                FrameRequestCallback: 'readonly',
            }).map(([key, value]) => [key.trim(), value])
        ),
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                presets: ['@babel/preset-react'],
            },
        },
       
    },
    plugins: {
        react: react,
        'jsx-a11y': jsxA11y,
        import: importPlugin,
        '@emotion': emotion,
        'testing-library': testingLibrary,
        'jest-dom': jestDom,
        'react-hooks': reactHooks,
        'simple-import-sort': simpleImportSort,
    },
     settings:{
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
     },
 
    rules: {
        "@emotion/pkg-renaming": "error",
        "arrow-body-style": "off",
        "arrow-parens": ["error", "as-needed"],
        "import/extensions": "off",
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": true
        }],
        "import/prefer-default-export": "off",
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/label-has-associated-control": [2, {
            "labelAttributes": ["label"]
        }],
        "jsx-a11y/anchor-is-valid": [2,
            {
                "components": [] // Our Link component auto-switches to a button when necessary
            }
        ],
        "no-underscore-dangle": "off",
        "no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 0, "maxEOF": 0 }],
        "prefer-destructuring": "off",
        // See UIP-4486 for more info on why instanceOf is forbidden
        "react/forbid-prop-types": ["error", { "forbid": ["any", "array", "object", "instanceOf"] }],
        "react/jsx-filename-extension": "off",
        "react/jsx-first-prop-new-line": ["error", "multiline"],
        "react/prop-types": ["error", { "ignore": ["children", "className"]}],
        "react/require-default-props": "off",
        "react/no-multi-comp": "off",
        "function-paren-newline": "off",
        "quote-props": "off",
        "object-curly-newline": ["error", { "consistent": true }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn", 
        "react/jsx-props-no-spreading": "off",
        "react/function-component-definition": "off",
        "react/destructuring-assignment": "off", 
        "no-restricted-exports": "off",
        "react/no-unstable-nested-components": "off",
        "import/no-cycle": "off",
        "testing-library/prefer-presence-queries": "off",
        "react/button-has-type": "warn",
        "react/no-unused-prop-types": "off",
        "testing-library/no-node-access": "off",
        "testing-library/no-unnecessary-act": "warn",
        "react/no-unknown-property": "off",
        "react/boolean-prop-naming": [
            'error',
            {
            rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
            message: 'Boolean prop names should start with "is" or "has"',
            },
        ],
        "no-promise-executor-return": "off",
        "react/jsx-no-constructed-context-values": "warn",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        'no-unused-vars': 'off',

    },
    
  },
  {
        files: [ 'libs/astro/**/*.ts', 'libs/astro/**/*.tsx', 'libs/astro/**/*.d.ts' ],
        languageOptions:{
            parser: tseslint.parser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
        },
        rules: {
            "no-use-before-define": "off",
            "@typescript-eslint/no-explicit-any": "error",
            '@typescript-eslint/no-useless-constructor': 'error',
        }
    },
    {
        files: [  
            'libs/astro/**/*.stories.js',
            'libs/astro/**/*.story.js',
            'libs/astro/**/*.stories.jsx',
            'libs/astro/**/*.story.jsx',
            'libs/astro/**/*.stories.hidden.js'
        ],
        plugins: {
            react: react,
        },
        rules: {
            "react/prop-types": "off"
        }
    },
    {
    files: [
        'libs/astro/**/*.js', 
        'libs/astro/**/*.jsx', 
        'libs/astro/**/*.ts', 
        'libs/astro/**/*.tsx'
    ],
    plugins: {
        'simple-import-sort': simpleImportSort,
    },
    rules: {
        "simple-import-sort/imports": [
        "error",
        {
            "groups": [
            // Packages `react` related packages come first.
            ["^react", "^@?\\w"],
            // Internal packages.
            ["^(@|components)(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.?(css)$"]
            ]
        }
        ]
    }
    }
];
