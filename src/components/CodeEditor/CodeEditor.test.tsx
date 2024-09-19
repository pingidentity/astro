import React from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { Diagnostic } from '@codemirror/lint';
import { act } from '@testing-library/react';
import {
  createSystem,
  createVirtualTypeScriptEnvironment,
} from '@typescript/vfs';
import ts from 'code-editor-typescript';
import { EditorView } from 'codemirror';

import '@testing-library/jest-dom';

import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import CodeEditor from './CodeEditor';

const testId = 'test-code-sample';

const defaultProps = {
  'data-testid': testId,
};

const jsCode = `const jsCode = 
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(5));
;`;

const tsCode = `
const stringValue: string = 15;
function addOne(integer: number) {
  return integer + 1;
}

addOne('I am a string');
`;

const jsonCode = `{
  "name": "Luke Skywalker", 
  "gender": "male", 
  "homeworld": "https://swapi.dev/api/planets/1/", 
  "films": [
      "https://swapi.dev/api/films/1/",
  ],
  "starships": [
      "https://swapi.dev/api/starships/12/", 
  ]
}`;


let editor!: EditorView;

const getComponent = (props = {}) => render((
  <CodeEditor
    {...defaultProps}
    {...props}
    onEditorViewInit={editorView => {
      editor = editorView;
    }}
  />
));

document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = jest.fn();

  range.getClientRects = () => {
    return {
      item: () => null,
      length: 0,
      [Symbol.iterator]: jest.fn(),
    };
  };

  return range;
};

// Needs to be added to each components test file
universalComponentTests({
  rules: { 'color-contrast': { enabled: false } },
  renderComponent: props => (
    <CodeEditor
      {...defaultProps}
      {...props}
      initialCode={jsCode}
      supportedLanguage="javascript"
    />
  ),
});

test('renders with initial code', () => {
  getComponent({ initialCode: jsCode, supportedLanguage: 'javascript' });

  const editorComponent = screen.getByRole('textbox') as HTMLDivElement;
  expect(editorComponent).toBeInstanceOf(HTMLDivElement);
  expect(editorComponent).toBeInTheDocument();
  expect(editorComponent).toHaveAttribute('data-language', 'javascript');
  expect(screen.queryByText('function')).toBeInTheDocument();
});

test('renders with startState', () => {
  const mockOnChange = jest.fn();

  getComponent({ onUpdate: mockOnChange, initialCode: 'testString', supportedLanguage: 'javascript' });
  editor.domAtPos(1).node.nodeValue = 'testString2';

  const transaction = editor.state.update({
    changes: { from: 0, to: 10, insert: 'testString2' },
    selection: editor.state.selection,
  });

  act(() => { editor.dispatch([transaction]); });

  expect(editor.state.doc.toString()).toBe('testString2');
  expect(screen.queryByText('testString')).not.toBeInTheDocument();
  expect(screen.queryByText('testString2')).toBeInTheDocument();
  expect(mockOnChange).toHaveBeenCalledWith('testString2');
});

test('renders with typescript', () => {
  getComponent({ initialCode: tsCode, supportedLanguage: 'typescript' });
  const editorComponent = screen.getByRole('textbox') as HTMLDivElement;

  expect(editorComponent).toHaveAttribute('data-language', 'typescript');
});

test('renders with json', () => {
  getComponent({ initialCode: jsonCode, supportedLanguage: 'json' });
  const editorComponent = screen.getByRole('textbox') as HTMLDivElement;

  expect(editorComponent).toHaveAttribute('data-language', 'json');
});

it('returns ts error for tsLinter', () => {
  getComponent({ initialCode: tsCode, supportedLanguage: 'typescript' });
  const diagnostics :Diagnostic[] = [];
  diagnostics.length = 0;
  const fileName = 'index.ts';
  const compilerOpts: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2016, esModuleInterop: true,
  };
  const fsMap = new Map<string, string>();
  const system = createSystem(fsMap);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const env = createVirtualTypeScriptEnvironment(system, [], ts, compilerOpts);
  env.createFile(fileName, editor.state.doc.toString());

  const tsLinter = (view: EditorView): Diagnostic[] => {
    diagnostics.length = 0;
    env.createFile(fileName, view.state.doc.toString());

    const tsErrors = env.languageService
      .getSemanticDiagnostics('index.ts')
      .concat(env.languageService.getSyntacticDiagnostics('index.ts'));

    tsErrors.forEach(tsError => {
      diagnostics.push({
        from: Number(tsError.start),
        message: typeof tsError.messageText === 'string'
          ? tsError.messageText
          : tsError.messageText.messageText,
        severity: 'error',
        to: Number(tsError.start) + Number(tsError.length),

      });
    });
    return diagnostics;
  };
  expect(diagnostics).toHaveLength(0);
  const result = tsLinter(editor);
  expect(result).toEqual([
    {
      from: 7,
      message: "Type 'number' is not assignable to type 'string'.",
      severity: 'error',
      to: 18,
    },
    {
      from: 100,
      message: "Argument of type 'string' is not assignable to parameter of type 'number'.",
      severity: 'error',
      to: 115,
    },
  ]);
});

test('renders CodeEditor with default props', () => {
  getComponent({ initialCode: tsCode, editorLanguage: javascript() });

  expect(screen.getByRole('textbox') as HTMLDivElement).toBeInTheDocument();
});
