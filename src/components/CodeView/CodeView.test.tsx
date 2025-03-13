import React from 'react';
import userEvent from '@testing-library/user-event';

import { CodeView } from '../..';
import { CodeViewProps } from '../../types/codeView';
import { act, fireEvent, render, screen, waitFor } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-code-sample';

const originalClipboard = { ...global.navigator.clipboard };

const defaultProps = {
  'data-testid': testId,
};

const textValue = `
export const Default = args => (
  <>
    <Text sx={{ fontWeight: 2 }}>JSON</Text>
    <CodeView {...args} />
  </>
);
`;

const getComponent = (props: CodeViewProps = {}) => render((
  <CodeView {...defaultProps} {...props}>
    {textValue}
  </CodeView>
));

beforeEach(() => {
  const mockClipboard = {
    writeText: jest.fn(),
  };
  Object.defineProperty(global.navigator, 'clipboard', {
    writable: true,
    value: mockClipboard,
  });
  global.document.execCommand = jest.fn();
  jest.spyOn(document, 'execCommand').mockReturnValue(true);
  jest.useFakeTimers();
});

afterEach(() => {
  jest.resetAllMocks();

  Object.defineProperty(global.navigator, 'clipboard', {
    writable: true,
    value: originalClipboard,
  });
  jest.spyOn(document, 'execCommand').mockReturnValue(true);
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <CodeView {...props}>{textValue}</CodeView> });

test('renders component in the default state', () => {
  getComponent();
  const container = screen.getByTestId(testId);
  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(container).toBeInTheDocument();
});

test('copy button is hovered and renders tooltip via mouse', () => {
  getComponent();
  const copyBtn = screen.getByLabelText('copy to clipboard');
  expect(copyBtn).not.toHaveFocus();
  userEvent.hover(copyBtn);
  expect(copyBtn).toHaveClass('is-hovered');
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  expect(screen.queryByRole('tooltip')).toHaveTextContent('Copy to clipboard');
});

test('copy button is focused and renders tooltip via keyboard', () => {
  getComponent();
  const copyBtn = screen.getByLabelText('copy to clipboard');
  expect(copyBtn).not.toHaveFocus();
  userEvent.tab();
  userEvent.tab();
  expect(copyBtn).toHaveFocus();
  expect(copyBtn).toHaveClass('is-focused');
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  expect(screen.queryByRole('tooltip')).toHaveTextContent('Copy to clipboard');
});

test('doesn\'t render copy button and tooltip with prop hasNoCopyButton', () => {
  getComponent({ hasNoCopyButton: true });
  const container = screen.getByTestId(testId);
  fireEvent.mouseMove(container);
  fireEvent.mouseEnter(container);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(screen.queryByLabelText('copy')).not.toBeInTheDocument();
});

test('renders line numbers with prop hasLineNumbers', () => {
  const linesLength = (textValue.trim().split('\n').length - 1).toString();
  getComponent();
  expect(screen.queryByText('1')).not.toBeInTheDocument();
  expect(screen.queryByText(linesLength)).not.toBeInTheDocument();

  getComponent({ hasLineNumbers: true });
  expect(screen.queryByText('1')).toBeInTheDocument();
  expect(screen.queryByText(linesLength)).toBeInTheDocument();
});

test('click on copy button copies data to the clipboard', async () => {
  getComponent();
  const button = screen.getByLabelText('copy to clipboard');
  await act(async () => userEvent.click(button));
  expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textValue);
});

test('after button click, the tooltip renders with the text "Copied!"', async () => {
  getComponent();
  const button = screen.getByLabelText('copy to clipboard');
  act(() => {
    userEvent.hover(button);
  });
  act(() => { jest.advanceTimersByTime(500); });
  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toBeInTheDocument();
  await act(async () => userEvent.click(button));
  const newTooltip = await screen.findByRole('tooltip');
  expect(newTooltip).toHaveTextContent('Copied!');
});

test('renders CodeView component with default language', () => {
  const children = ' ';
  getComponent({ children });
  const codeViewElement = screen.getByTestId(testId).querySelector('pre');
  expect(codeViewElement).toBeInTheDocument();
  expect(codeViewElement).toHaveClass('language-json');
});

test('renders CodeView component with highlighted code', () => {
  const children = `
    export const Default = args => (
      <>
        <Text sx={{ fontWeight: 2 }}>JSON</Text>
        <CodeView {...args} />
      </>
    );
  `;
  const language = 'jsx';
  getComponent({ children, language });

  const codeViewElement = screen.getByTestId(testId).querySelector('pre');
  expect(codeViewElement).toBeInTheDocument();
  expect(codeViewElement).toHaveClass(`language-${language}`);
});

test('isOnyx prop renders CodeView component with next-gen theme', () => {
  const children = ' ';
  getComponent({ children, isOnyx: true, language: 'json' });
  const codeViewElement = screen.getByTestId(testId);
  expect(codeViewElement).toHaveTextContent('JSON');
});

test('if textToCopy is provided it\'s copied to clipboard instead of children text data', async () => {
  const textToCopy = 'This text is copied';
  getComponent({ textToCopy });
  const button = screen.getByLabelText('copy to clipboard');
  await act(async () => userEvent.click(button));
  expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
});

it('does not log a warning when the module is found (valid language)', async () => {
  jest.mock('prismjs/components/prism-javascript', () => ({}), { virtual: true });

  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
    // Intentionally left blank
  });

  const language = 'jsx';
  getComponent({ language });

  await waitFor(() => {
    expect(warnSpy).not.toHaveBeenCalled();
  });

  warnSpy.mockRestore();
});

it('does log a warning when the module is not found (invalid language)', async () => {
  jest.mock('prismjs/components/prism-javascript', () => ({}), { virtual: true });

  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
    // Intentionally left blank
  });

  const language = 'invalid';
  getComponent({ language });

  await waitFor(() => {
    expect(warnSpy).toHaveBeenCalledWith(
      'Prism language module for "invalid" not found.',
    );
  });

  warnSpy.mockRestore();
});
