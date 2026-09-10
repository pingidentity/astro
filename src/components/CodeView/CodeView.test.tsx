import React from 'react';
import userEvent from '@testing-library/user-event';

import {
  AstroProvider,
  CodeView,
  CodeViewProps,
  NextGenDarkTheme,
  NextGenTheme,
  OnyxTheme,
} from '../..';
import { copyButton } from '../../styles/themes/next-gen/codeView/codeView';
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
    {'children' in props ? props.children : textValue}
  </CodeView>
));

const getOnyxComponent = (props: CodeViewProps = {}) => render((
  <AstroProvider theme={OnyxTheme}>
    <CodeView {...defaultProps} {...props}>
      {'children' in props ? props.children : textValue}
    </CodeView>
  </AstroProvider>
));

const getOnyxStyledComponent = (theme, variant) => render((
  <AstroProvider theme={theme}>
    <CodeView {...defaultProps} language="json" variant={variant}>
      const value = 1;
    </CodeView>
  </AstroProvider>
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

test('copy button is hovered and renders tooltip via mouse', async () => {
  getComponent();
  const copyBtn = screen.getByLabelText('copy to clipboard');
  expect(copyBtn).not.toHaveFocus();
  await userEvent.hover(copyBtn);
  expect(copyBtn).toHaveClass('is-hovered');
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  expect(screen.queryByRole('tooltip')).toHaveTextContent('Copy to clipboard');
});

test('copy button is focused and renders tooltip via keyboard', async () => {
  getComponent();
  const copyBtn = screen.getByLabelText('copy to clipboard');
  expect(copyBtn).not.toHaveFocus();
  await userEvent.tab();
  await userEvent.tab();
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
  await act(async () => {
    await userEvent.hover(button);
  });
  await act(() => { jest.advanceTimersByTime(500); });
  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toBeInTheDocument();
  await act(async () => userEvent.click(button));
  const newTooltip = await screen.findByRole('tooltip');
  expect(newTooltip).toHaveTextContent('Copied!');
});

test('renders CodeView component with default language', () => {
  const children = '{}';
  getComponent({ children });
  const codeViewElement = screen.getByTestId(testId).querySelector('pre');
  expect(codeViewElement).toBeInTheDocument();
  expect(codeViewElement).toHaveClass('language-json');
});

test('renders CodeView component with null/undefined', () => {
  const children = undefined;
  getComponent({ children });
  screen.getByRole('button', {
    name: /copy to clipboard/i,
  });
  const codeViewElement = screen.getByTestId(testId).querySelector('pre');
  expect(codeViewElement).not.toBeInTheDocument();
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
  const children = '{}';
  getComponent({ children, isOnyx: true, language: 'json' });
  const codeViewElement = screen.getByTestId(testId).querySelector('pre');
  expect(codeViewElement).toBeInTheDocument();
  expect(codeViewElement).toHaveClass('language-json');
});

test.each(['default', 'light'])('renders the Onyx control-bar slot before the copy button for the %s variant', variant => {
  getOnyxComponent({
    children: 'const value = 1;',
    language: 'json',
    variant,
    slots: {
      controlBar: <button type="button">Control bar</button>,
    },
  });

  const languageLabel = screen.getByText('JSON', { exact: true });
  const controlBar = screen.getByRole('button', { name: 'Control bar' });
  const copyControl = screen.getByRole('button', { name: 'copy to clipboard' });

  const documentOrder = Array.from(document.querySelectorAll('*'));
  expect(documentOrder.indexOf(languageLabel)).toBeLessThan(documentOrder.indexOf(controlBar));
  expect(documentOrder.indexOf(controlBar)).toBeLessThan(documentOrder.indexOf(copyControl));
});

test.each(['default', 'light'])('does not render an Onyx control-bar slot when omitted for the %s variant', variant => {
  getOnyxComponent({
    children: 'const value = 1;',
    language: 'json',
    variant,
  });

  expect(screen.getByText('JSON', { exact: true })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'copy to clipboard' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Control bar' })).not.toBeInTheDocument();
});

test.each(['default', 'light'])('honors hasNoCopyButton in the Onyx header for the %s variant', variant => {
  getOnyxComponent({
    children: 'const value = 1;',
    language: 'json',
    variant,
    hasNoCopyButton: true,
  });

  expect(screen.getByText('JSON', { exact: true })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'copy to clipboard' })).not.toBeInTheDocument();
});

test('uses the intended Onyx color tokens for CodeView copy-button variants', () => {
  expect(copyButton.default.path.fill).toBe('white');
  expect(copyButton.light.path.fill).toBe('black');
});

test.each([
  ['NEXT_GEN', NextGenTheme, 'default', '#ffffff'],
  ['NEXT_GEN', NextGenTheme, 'light', '#000'],
  ['NEXT_GEN_DARK', NextGenDarkTheme, 'default', '#ffffff'],
  ['NEXT_GEN_DARK', NextGenDarkTheme, 'light', '#000'],
])('renders the intended copy-icon path for %s %s CodeView', (_themeName, theme, variant, fill) => {
  getOnyxStyledComponent(theme, variant);

  expect(screen.getByRole('button', { name: 'copy to clipboard' }))
    .toHaveStyleRule('fill', fill, { target: 'path' });
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
