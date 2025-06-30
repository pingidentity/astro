import React from 'react';
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
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
          {
            id: 'aria-roledescription',
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

const tsCode = `const stringValue: string = 15;

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

export const TypescriptEditor:StoryFn<CodeEditorProps> = args => {
  return (
    <CodeEditor
      {...args}
      defaultValue={tsCode}
      language="typescript"
      height="200px"
    />
  );
};

export const JavascriptEditor:StoryFn<CodeEditorProps> = args => {
  return (
    <CodeEditor
      {...args}
      defaultValue={jsCode}
      language="javascript"
      height="200px"
    />
  );
};

export const JsonEditor:StoryFn<CodeEditorProps> = args => {
  return (
    <CodeEditor
      {...args}
      defaultValue={jsonCode}
      language="json"
      height="200px"
    />
  );
};

export const ReadOnly:StoryFn<CodeEditorProps> = () => {
  return (
    <CodeEditor
      defaultValue={jsonCode}
      language="json"
      height="200px"
      isReadOnly
    />
  );
};
