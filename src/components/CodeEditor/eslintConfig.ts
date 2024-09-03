import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = {
  plugins: {
    'jsx-a11y': jsxA11y,
    'simple-import-sort': simpleImportSort,
    'react-hooks': reactHooks,
  },
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      ecmaFeatures: {
        'jsx': true,
      },
      sourceType: 'module',
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    'arrow-body-style': 0,
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': [2, {
      'labelAttributes': ['label'],
    }],
    'jsx-a11y/anchor-is-valid': [2,
      {
        'components': [],
      },
    ],
    'no-underscore-dangle': 0,
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxBOF': 0, 'maxEOF': 0 }],
    'prefer-destructuring': 0,
    'react/jsx-filename-extension': 0,
    'react/require-default-props': 0,
    'react/no-multi-comp': 0,
    'function-paren-newline': 0,
    'quote-props': 0,
    'object-curly-newline': ['error', { 'consistent': true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/destructuring-assignment': 0,
    'no-restricted-exports': 0,
    'react/no-unstable-nested-components': 0,
    'import/no-cycle': 0,
    'react/no-unused-prop-types': 0,
    'react/no-unknown-property': 0,
    'no-promise-executor-return': 0,
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        'groups': [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
  },
};

export default eslintConfig;
