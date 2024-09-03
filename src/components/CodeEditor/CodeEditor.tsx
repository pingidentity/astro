import React, { forwardRef } from 'react';
import { esLint, javascript, tsxLanguage } from '@codemirror/lang-javascript';
import { jsonLanguage, jsonParseLinter } from '@codemirror/lang-json';
import * as eslint from 'eslint-linter-browserify';

import useTsEnvironment from '../../hooks/useTsLinter/useTsLinter';
import { CodeEditorProps } from '../../types';

import DefaultEditor from './DefaultEditor';
import eslintConfig from './eslintConfig';

const CodeEditor = forwardRef<HTMLElement, CodeEditorProps>((props, ref) => {
  const { supportedLanguage, customEslintConfig } = props;

  const tsLinter = useTsEnvironment();

  switch (supportedLanguage) {
    case 'typescript':
      return (
        <DefaultEditor
          ref={ref}
          {...props}
          editorLanguage={tsxLanguage}
          linterExtension={tsLinter}
        />
      );
    case 'javascript':
      return (
        <DefaultEditor
          ref={ref}
          {...props}
          editorLanguage={javascript()}
          linterExtension={esLint(new eslint.Linter(), (customEslintConfig || eslintConfig))}
        />
      );
    case 'json':
      return (
        <DefaultEditor
          ref={ref}
          {...props}
          editorLanguage={jsonLanguage}
          linterExtension={jsonParseLinter()}
        />
      );
    default:
      return (
        <DefaultEditor
          ref={ref}
          {...props}
        />
      );
  }
});

export default CodeEditor;
