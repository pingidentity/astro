import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { Link, Text } from '../..';
import CopyText from '.';

const testId = 'test-copy-text';

const originalClipboard = { ...global.navigator.clipboard };
const originalExecCommand = global.document.execCommand;

const defaultTest = (getComponent = {}) => {
  getComponent();
  const container = screen.getByTestId(testId);
  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(container).toBeInTheDocument();
};

describe('Text mode', () => {
  const defaultProps = {
    'data-testid': testId,
  };
  const textValue = 'Here is a value';

  const getComponent = (props = {}) => render((
    <CopyText {...defaultProps} {...props}>
      <Text>{textValue}</Text>
    </CopyText>
  ));

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

  test('click on text copies data to the clipboard', async () => {
    getComponent();
    const button = screen.getByText(textValue);
    await act(async () => userEvent.click(button));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textValue);
  });

  test('click on copy button copies data to the clipboard', async () => {
    getComponent();
    const button = screen.getByLabelText('copy');
    await act(async () => userEvent.click(button));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textValue);
  });

  test('if textToCopy is provided it\'s copied to clipboard instead of children text data', async () => {
    const textToCopy = 'This text is copied';
    getComponent({ textToCopy });
    const button = screen.getByLabelText('copy');
    await act(async () => userEvent.click(button));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
  });

  test('copying works in insecure origin', async () => {
    global.navigator.clipboard = undefined;
    getComponent();
    const button = screen.getByLabelText('copy');
    await act(async () => userEvent.click(button));
    expect(document.execCommand).toBeCalledTimes(1);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('after button click, the tooltip renders with the text "Copied!"', async () => {
    getComponent();
    const button = screen.getByLabelText('copy');
    await act(async () => userEvent.click(button));
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).toHaveTextContent('Copied!');
  });
});

describe('Link mode', () => {
  const defaultProps = {
    'data-testid': testId,
    mode: 'link',
  };
  const linkValue = 'https://a.url.com';

  const getComponent = (props = {}) => render((
    <CopyText {...defaultProps} {...props}>
      <Link href={linkValue}>{linkValue}</Link>
    </CopyText>
  ));

  test('renders component in the default state', () => {
    defaultTest(getComponent);
  });

  test('tooltip renders only when the copy button is hovered', () => {
    getComponent();
    const container = screen.getByTestId(testId);
    fireEvent.mouseMove(container);
    fireEvent.mouseEnter(container);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    const button = screen.getByLabelText('copy');
    fireEvent.mouseMove(button);
    fireEvent.mouseEnter(button);
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  });

  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    jest.resetAllMocks();
    global.navigator.clipboard = originalClipboard;
  });

  test('click on copy button copies data to the clipboard', async () => {
    getComponent();
    const button = screen.getByLabelText('copy');
    await act(async () => userEvent.click(button));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(linkValue);
  });
});
