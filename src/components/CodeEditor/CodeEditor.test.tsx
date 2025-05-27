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
      value={jsCode}
      language="javascript"
    />
  ),
});

jest.mock('@monaco-editor/react', () => {
  return {
    __esModule: true,
    default: ({ language, value, onChange }) => (
      <textarea
        data-testid="mock-monaco-editor"
        onChange={e => onChange(e.target.value)}
        value={`Editor Language: ${language}, Code:${value}`}
        aria-label="Code editor"
      />
    ),
  };
});

describe('CodeEditor', () => {
  it('renders with initial value', () => {
    const value = 'console.log("Hello, World!");';

    render(<CodeEditor language="javascript" value={value} />);

    expect(screen.getByTestId('mock-monaco-editor')).toBeInTheDocument();
    expect(screen.getByText('Editor Language: javascript, Code:console.log("Hello, World!");')).toBeInTheDocument();
  });

  it('calls onChange when code changes', () => {
    const value = 'console.log("Hello, World!");';

    const mockOnChange = jest.fn();
    render(<CodeEditor language="javascript" value={value} onChange={mockOnChange} />);

    const editor = screen.getByTestId('mock-monaco-editor');
    const newValue = JSON.stringify([{ key: false }]);

    act(() => {
      fireEvent.change(editor, {
        target: { value: newValue },
      });
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
