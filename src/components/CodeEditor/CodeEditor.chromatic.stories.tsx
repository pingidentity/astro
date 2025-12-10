import React from 'react';
import { StoryFn } from '@storybook/react';

import { CodeEditor } from '../../index';
import { CodeEditorProps } from '../../types';

export default {
  title: 'Chromatic Only CodeEditor',
  component: CodeEditor,

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
      editorOptionsProps={{
        minimap: { enabled: false },
        scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
        renderValidationDecorations: 'off',
        renderLineHighlight: 'none',
        cursorStyle: 'block',
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        selectionHighlight: false,
      }}
      onMount={editor => {
        editor.layout(); // Force layout stabilization
      }}
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
      editorOptionsProps={{
        minimap: { enabled: false },
        scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
        renderValidationDecorations: 'off',
        renderLineHighlight: 'none',
        cursorStyle: 'block',
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        selectionHighlight: false,
      }}
      onMount={editor => {
        editor.layout();
      }}
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
      editorOptionsProps={{
        minimap: { enabled: false },
        scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
        renderValidationDecorations: 'off',
        renderLineHighlight: 'none',
        cursorStyle: 'block',
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        selectionHighlight: false,
      }}
      onMount={editor => {
        editor.layout();
      }}
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
      editorOptionsProps={{
        minimap: { enabled: false },
        scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
        renderValidationDecorations: 'off',
        renderLineHighlight: 'none',
        cursorStyle: 'block',
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        selectionHighlight: false,
      }}
      onMount={editor => {
        editor.layout();
      }}
    />
  );
};
