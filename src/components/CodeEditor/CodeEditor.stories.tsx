import React from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { syntaxTree } from '@codemirror/language';
import { Diagnostic } from '@codemirror/lint';
import { StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { CodeEditor } from '../../index';
import { CodeEditorProps } from '../../types';

import CodeEditorReadme from './CodeEditor.mdx';

export default {
  title: 'Experimental/CodeEditor',
  component: CodeEditor,
  parameters: {
    docs: {
      page: () => (
        <>
          <CodeEditorReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
};

const jsonCode = `{
  "name": "Luke Skywalker", 
  "height": "172", 
  "mass": "77", 
  "hair_color": "blond", 
  "skin_color": "fair", 
  "eye_color": "blue", 
  "birth_year": "19BBY", 
  "gender": "male", 
  "homeworld": "https://swapi.dev/api/planets/1/", 
  "films": [
      "https://swapi.dev/api/films/1/", 
      "https://swapi.dev/api/films/2/", 
      "https://swapi.dev/api/films/3/", 
      "https://swapi.dev/api/films/6/"
  ],
  "starships": [
      "https://swapi.dev/api/starships/12/", 
      "https://swapi.dev/api/starships/22/"
  ]
}`;

const tsCode = `
const stringValue: string = 15;

function addOne(integer: number) {
  return integer + 1;
}

addOne('I am a string');
`;

const jsCode = `
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(5));

(a) => {};
`;

const regexCode = `
function isNumber(string) {
  return /^\\d+(\\.\\d*)?$/.test(string)
}
`;


export const TypescriptEditor:StoryFn<CodeEditorProps> = () => {
  return (
    <CodeEditor
      initialCode={tsCode}
      supportedLanguage="typescript"
    />
  );
};

export const JavascriptEditor:StoryFn<CodeEditorProps> = (args: CodeEditorProps) => {
  return (
    <CodeEditor
      {...args}
      initialCode={jsCode}
      supportedLanguage="javascript"
    />
  );
};

export const JavascriptEditorCustomEslint:StoryFn<CodeEditorProps> = (args: CodeEditorProps) => {
  const eslintConfig = {
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
      semi: ['error', 'never'],

    },
  };
  return (
    <CodeEditor
      {...args}
      initialCode={jsCode}
      supportedLanguage="javascript"
      customEslintConfig={eslintConfig}
    />
  );
};

export const JsonEditor:StoryFn<CodeEditorProps> = () => {
  return (
    <CodeEditor
      initialCode={jsonCode}
      supportedLanguage="json"
    />
  );
};

export const CustomRules:StoryFn<CodeEditorProps> = () => {
  const regexpLinter = (view => {
    const diagnostics: Diagnostic[] = [];
    syntaxTree(view.state).cursor().iterate(node => {
      if (node.name === 'RegExp') {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: 'warning',
          message: 'Regular expressions are FORBIDDEN',
        });
      }
    });
    return diagnostics;
  });

  return (
    <CodeEditor
      initialCode={regexCode}
      editorLanguage={javascript()}
      customRules={regexpLinter}
    />
  );
};
