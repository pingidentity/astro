import React from 'react';

import { CodeEditor } from '../../index';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-code-sample';

const defaultProps = {
  'data-testid': testId,
};

const jsCode = `
  function helloWorld() {
    console.log("Hello, World!");
  }
`;

// Needs to be added to each components test file
universalComponentTests({
  rules: { 'color-contrast': { enabled: false } },
  renderComponent: props => (
    <CodeEditor
      {...defaultProps}
      {...props}
      defaultValue={jsCode}
      language="javascript"
    />
  ),
});

jest.mock('@monaco-editor/react', () => {
  return {
    __esModule: true,
    default: ({ language, defaultValue, onChange }) => (
      <textarea
        data-testid="mock-monaco-editor"
        onChange={e => onChange(e.target.value)}
        value={`Editor Language: ${language}, Code:${defaultValue}`}
        aria-label="Code editor"
      />
    ),
  };
});

describe('CodeEditor', () => {
  it('renders with initial value', () => {
    const value = 'console.log("Hello, World!");';

    render(<CodeEditor language="javascript" defaultValue={value} />);

    expect(screen.getByTestId('mock-monaco-editor')).toBeInTheDocument();
    expect(screen.getByText('Editor Language: javascript, Code:console.log("Hello, World!");')).toBeInTheDocument();
  });

  it('calls onChange when code changes', () => {
    const value = 'console.log("Hello, World!");';

    const mockOnChange = jest.fn();
    render(<CodeEditor language="javascript" defaultValue={value} onChange={mockOnChange} />);

    const editor = screen.getByTestId('mock-monaco-editor');
    const newValue = JSON.stringify([{ key: false }]);

    act(() => {
      fireEvent.change(editor, {
        target: { value: newValue },
      });
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays the correct language name in the header for mapped languages', () => {
    render(<CodeEditor language="typescript" defaultValue={jsCode} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    render(<CodeEditor language="scss" defaultValue={jsCode} />);
    expect(screen.getByText('SCSS')).toBeInTheDocument();

    render(<CodeEditor language="python" defaultValue={jsCode} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('displays the language extension as-is if not mapped', () => {
    render(<CodeEditor language="unknownlang" defaultValue={jsCode} />);
    expect(screen.getByText('unknownlang')).toBeInTheDocument();
  });
});
