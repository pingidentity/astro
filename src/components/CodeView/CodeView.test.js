import React from 'react';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { CodeView } from '../..';

const testId = 'test-code-sample';

const originalClipboard = { ...global.navigator.clipboard };
const originalExecCommand = global.document.execCommand;

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

const getComponent = (props = {}) => render((
  <CodeView {...defaultProps} {...props}>
    {textValue}
  </CodeView>
));

beforeEach(() => {
  const mockClipboard = {
    writeText: jest.fn(),
  };
  global.navigator.clipboard = mockClipboard;
  global.document.execCommand = jest.fn();
  global.document.execCommand.mockReturnValue(true);
});

afterEach(() => {
  jest.resetAllMocks();
  global.navigator.clipboard = originalClipboard;
  global.document.execCommand = originalExecCommand;
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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
  await act(async () => userEvent.click(button));
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  expect(screen.queryByRole('tooltip')).toHaveTextContent('Copied!');
});
