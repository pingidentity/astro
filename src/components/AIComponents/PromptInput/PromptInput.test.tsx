import React from 'react';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import userEvent from '@testing-library/user-event';

import { PromptInputProps } from '../../../types/promptInput';
import { render, screen } from '../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../utils/testUtils/universalComponentTest';
import { getFileExtension } from '../Attachment/Attachment';

import PromptInput from './PromptInput';

const onSubmitCallback = jest.fn();
const onCancelCallback = jest.fn();
const onChangeCallback = jest.fn();
const onFileChangeCallback = jest.fn();
const onKeyDownCallback = jest.fn();
const onKeyUpCallback = jest.fn();
const originalValue = global.URL.createObjectURL;
const testFileURL = 'test-file-url';
const testFileName = 'chucknorris.png';
const testFile = new File(['(⌐□_□)'], testFileName, {
  type: 'image/png',
});
const buttonTestId = 'upload button';
const testId = 'test-id';
const testId2 = 'test-id-2';
const testLabel = 'Test Label';
const testValue = 'test value';
const defaultProps = {
  'data-testid': testId,
  controlProps: {
    'aria-label': testLabel,
  },
};

const getComponent = (props: PromptInputProps = {}) => render(
  <PromptInput {...defaultProps} {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <PromptInput {...defaultProps} {...props} /> });

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => testFileURL);
});

afterAll(() => {
  global.URL.createObjectURL = originalValue;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('default PromptInput', () => {
  getComponent();

  const field = screen.getByTestId(testId);
  const control = screen.getByLabelText(testLabel);

  expect(field).toBeInstanceOf(HTMLDivElement);
  expect(control).toBeInstanceOf(HTMLTextAreaElement);
  expect(field).toBeInTheDocument();
  expect(control).toBeInTheDocument();
});

test('onChange and value props work correctly', async () => {
  getComponent({ onChange: onChangeCallback });

  const control = screen.getByLabelText(testLabel);
  await userEvent.type(control, testValue);

  expect(control).toHaveValue(testValue);
  expect(onChangeCallback).toHaveBeenCalledTimes(testValue.length);
});

test('onSubmit prop works correctly', async () => {
  getComponent({
    onSubmit: onSubmitCallback,
    uploadButtonProps: {
      'data-testid': buttonTestId,
    },
  });

  const control = screen.getByLabelText(testLabel);

  // Try to click before entering a value
  userEvent.click(screen.getByTestId(buttonTestId));
  expect(screen.getByTestId(buttonTestId)).toBeDisabled();
  expect(onSubmitCallback).toHaveBeenCalledTimes(0);

  // Enter a value and click
  await userEvent.type(control, testValue);
  userEvent.click(screen.getByTestId(buttonTestId));
  expect(onSubmitCallback).toHaveBeenCalledTimes(1);

  // Type a value and press enter
  await userEvent.type(control, testValue);
  await userEvent.type(control, '{enter}');
  expect(onSubmitCallback).toHaveBeenCalledTimes(2);
});

test('onCancel prop works correctly', async () => {
  getComponent({
    isLoading: true,
    onCancel: onCancelCallback,
    uploadButtonProps: {
      'data-testid': buttonTestId,
    },
  });

  const control = screen.getByLabelText(testLabel);

  // Click the button
  await userEvent.type(control, testValue);
  userEvent.click(screen.getByTestId(buttonTestId));
  expect(onCancelCallback).toHaveBeenCalledTimes(1);

  // Press enter
  await userEvent.type(control, testValue);
  await userEvent.type(control, '{enter}');
  expect(onCancelCallback).toHaveBeenCalledTimes(2);
});

test('onKeyDown prop works correctly', async () => {
  getComponent({
    onKeyDown: onKeyDownCallback,
  });

  const control = screen.getByLabelText(testLabel);

  await userEvent.type(control, '{enter}');
  expect(onKeyDownCallback).toHaveBeenCalled();
});

test('onKeyUp prop works correctly', async () => {
  getComponent({
    onKeyUp: onKeyUpCallback,
  });

  const control = screen.getByLabelText(testLabel);

  await userEvent.type(control, '{enter}');
  expect(onKeyUpCallback).toHaveBeenCalled();
});

test('should add and remove a file attachment', async () => {
  getComponent({
    isLoading: true,
    onCancel: onCancelCallback,
    onFileChange: onFileChangeCallback,
    uploadButtonProps: {
      'data-testid': buttonTestId,
    },
    attachmentProps: {
      icon: GlobeIcon,
      iconWrapperProps: {
        'data-testid': testId2,
      },
    },
  });

  const fileInput = screen.getAllByLabelText('add attachment')[0];

  await userEvent.upload(fileInput, testFile);
  expect(onFileChangeCallback).toHaveBeenCalledTimes(1);
  expect(screen.getByText(testFileName)).toBeInTheDocument();
  expect(screen.getByTestId(testId2)).toBeInTheDocument();

  const removeButton = screen.getByTestId('remove-attachment');
  userEvent.click(removeButton);

  expect(onFileChangeCallback).toHaveBeenCalledTimes(2);

  expect(screen.queryByText(testFileName)).not.toBeInTheDocument();
  expect(screen.queryByTestId(testId2)).not.toBeInTheDocument();
});

test('should use default icon if no icon is provided', async () => {
  getComponent({
    isLoading: true,
    onCancel: onCancelCallback,
    onFileChange: onFileChangeCallback,
    uploadButtonProps: {
      'data-testid': buttonTestId,
    },
    attachmentProps: {
      icon: GlobeIcon,
      iconWrapperProps: {
        'data-testid': testId2,
      },
    },
  });

  const fileInput = screen.getAllByLabelText('add attachment')[0];

  await userEvent.upload(fileInput, testFile);
  expect(onFileChangeCallback).toHaveBeenCalledTimes(1);
  expect(screen.getByText(testFileName)).toBeInTheDocument();
  expect(screen.getByTestId(testId2)).toBeInTheDocument();

  const removeButton = screen.getByTestId('remove-attachment');
  userEvent.click(removeButton);

  expect(onFileChangeCallback).toHaveBeenCalledTimes(2);

  expect(screen.queryByText(testFileName)).not.toBeInTheDocument();
  expect(screen.queryByTestId(testId2)).not.toBeInTheDocument();
});

test('regex expression', () => {
  const string = 'alongiflename.txt';
  expect(getFileExtension(string)).toBe('txt');

  const badString = 'alongfilename.rtrtrert...';
  expect(getFileExtension(badString)).toBe('unknown file type');
});
