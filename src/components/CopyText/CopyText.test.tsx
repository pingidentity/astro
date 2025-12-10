import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link, Text } from '../..';
import { CopyTextProps } from '../../types';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import CopyText from './CopyText';

const testId = 'test-copy-text';

const originalClipboard = { ...global.navigator.clipboard };
const originalGetSelection = window.getSelection;

const defaultTest = getComponent => {
  getComponent();
  const container = screen.getByTestId(testId);
  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(container).toBeInTheDocument();
};

describe('CopyText', () => {
  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: mockClipboard,
      },
      configurable: true,
    });
    global.document.execCommand = jest.fn();

    jest.spyOn(document, 'execCommand').mockReturnValue(true);

    const mockGetSelection = jest.fn();
    mockGetSelection.mockReturnValue('');
    window.getSelection = mockGetSelection;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: originalClipboard,
      },
      configurable: true,
    });

    jest.spyOn(document, 'execCommand').mockReturnValue(true);
    window.getSelection = originalGetSelection;
  });

  describe('Text mode', () => {
    const defaultProps: CopyTextProps = {
      'data-testid': testId,
    };
    const textValue = 'Here is a value';

    const getComponent = (props: CopyTextProps = {}) => render((
      <CopyText {...defaultProps} {...props}>
        <Text>{textValue}</Text>
      </CopyText>
    ));

    // Needs to be added to each component's test file
    universalComponentTests({
      renderComponent: props => (
        <CopyText {...defaultProps} {...props}>
          <Text>{textValue}</Text>
        </CopyText>
      ),
    });

    test('renders component in the default state', () => {
      defaultTest(getComponent);
    });

    test('tooltip renders on hover', () => {
      getComponent();
      const container = screen.getByTestId(testId);
      fireEvent.mouseMove(container);
      fireEvent.mouseEnter(container);
      expect(screen.queryByRole('tooltip')).toBeInTheDocument();
      expect(screen.queryByRole('tooltip')).toHaveTextContent('Copy to clipboard');
    });

    test('copy button is focused with keyboard', () => {
      getComponent();
      const copyBtn = screen.getByLabelText('copy to clipboard');
      expect(copyBtn).not.toHaveFocus();
      userEvent.tab();
      expect(copyBtn).toHaveFocus();
      expect(copyBtn).toHaveClass('is-focused');
    });

    test('click on text copies data to the clipboard', async () => {
      getComponent();
      const button = screen.getByText(textValue);
      await act(async () => userEvent.click(button));
      expect(navigator.clipboard.writeText).toBeCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textValue);
    });

    test('click on copy button copies data to the clipboard', async () => {
      getComponent();
      const button = screen.getByLabelText('copy to clipboard');
      await act(async () => userEvent.click(button));
      expect(navigator.clipboard.writeText).toBeCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textValue);
    });

    test('if textToCopy is provided it\'s copied to clipboard instead of children text data', async () => {
      const textToCopy = 'This text is copied';
      getComponent({ textToCopy });
      const button = screen.getByLabelText('copy to clipboard');
      await act(async () => userEvent.click(button));
      expect(navigator.clipboard.writeText).toBeCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
    });

    test('copying works in insecure origin', async () => {
      Object.defineProperty(window.navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });
      getComponent();
      const button = screen.getByLabelText('copy to clipboard');
      await act(async () => userEvent.click(button));
      expect(document.execCommand).toBeCalledTimes(1);
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    test('if copying is failed, a warning shows in the console', async () => {
      Object.defineProperty(window.navigator, 'clipboard', {
        value: undefined,
        writable: true,
      });
      jest.spyOn(document, 'execCommand').mockReturnValue(false);
      jest.spyOn(console, 'error').mockImplementation(() => { return false; }); // eslint-disable-line no-console

      getComponent();

      const spy = jest.spyOn(console, 'error');
      expect(spy).not.toHaveBeenCalled();

      const button = screen.getByLabelText('copy to clipboard');
      await act(async () => userEvent.click(button));
      expect(document.execCommand).toBeCalledTimes(1);
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(spy).toHaveBeenCalledWith(expect.stringMatching('Failed to copy:'), expect.any(Error));
    });

    test('after button click, the tooltip renders with the text "Copied!"', async () => {
      getComponent();
      const button = screen.getByLabelText('copy to clipboard');
      userEvent.click(button);
      await act(async () => {
        expect(screen.queryByRole('tooltip')).toBeInTheDocument();
      });
      expect(screen.queryByRole('tooltip')).toHaveTextContent('Copied!');
    });

    test('tooltip renders with the text "Copied!" hides after delay', async () => {
      getComponent();
      const button = screen.getByLabelText('copy to clipboard');
      userEvent.click(button);
      await act(async () => {
        expect(screen.queryByRole('tooltip')).toBeInTheDocument();
      });
      expect(screen.queryByRole('tooltip')).toHaveTextContent('Copied!');

      act(() => jest.advanceTimersByTime(2000));

      await act(() => {
        expect(screen.queryByRole('tooltip')).toHaveTextContent('Copy to clipboard');
      }, { timeout: 2000 });
    });
  });

  describe('Link mode', () => {
    const defaultProps: CopyTextProps = {
      'data-testid': testId,
      mode: 'link',
    };
    const linkValue = 'https://a.url.com';

    const getComponent = (props: CopyTextProps = {}) => render((
      <CopyText {...defaultProps} {...props}>
        <Link href={linkValue}>{linkValue}</Link>
      </CopyText>
    ));

    // Needs to be added to each component's test file
    universalComponentTests({
      renderComponent: props => (
        <CopyText {...defaultProps} {...props}>
          <Link href={linkValue}>{linkValue}</Link>
        </CopyText>
      ),
    });

    test('renders component in the default state', () => {
      defaultTest(getComponent);
    });

    test('tooltip renders only when the copy button is hovered', () => {
      getComponent();
      const container = screen.getByTestId(testId);
      fireEvent.mouseMove(container);
      fireEvent.mouseEnter(container);
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      const button = screen.getByLabelText('copy to clipboard');
      fireEvent.mouseMove(button);
      fireEvent.mouseEnter(button);
      expect(screen.queryByRole('tooltip')).toBeInTheDocument();
    });

    test('copy button is focused with keyboard', () => {
      getComponent();
      const copyBtn = screen.getByLabelText('copy to clipboard');
      expect(copyBtn).not.toHaveFocus();
      userEvent.tab();
      userEvent.tab();
      expect(copyBtn).toHaveFocus();
      expect(copyBtn).toHaveClass('is-focused');
    });

    test('click on copy button copies data to the clipboard', async () => {
      getComponent();
      const button = screen.getByLabelText('copy to clipboard');
      await act(async () => userEvent.click(button));
      // If navigator.clipboard is available and in secure context
      if (navigator.clipboard) {
        expect(navigator.clipboard.writeText).toBeCalledTimes(1);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(linkValue);
      }
    });
  });
});
