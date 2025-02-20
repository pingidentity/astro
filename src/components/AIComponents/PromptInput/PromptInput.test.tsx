import React, { useState } from 'react';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import PaperOutlineIcon from '@pingux/mdi-react/PaperOutlineIcon';

import { AstroProvider, NextGenTheme } from '../../..';
import { fireEvent, render, screen } from '../../../utils/testUtils/testWrapper';
import { getFileExtension } from '../Attachment/Attachment';

import PromptInput from './PromptInput';

const testFileURL = 'test-file-url';
const testFileName = 'chucknorris.png';
const testFile = new File(['(⌐□_□)'], testFileName, {
  type: 'image/png',
});

const onSubmitCallback = jest.fn();
const onCancelCallback = jest.fn();
const onChangeCallback = jest.fn();
const onFileChangeCallback = jest.fn();

const PromptInputStory = (props: {isLoading?: boolean, attachmentIcon?: React.ElementType}) => {
  const [value, setValue] = useState('');
  return (
    <AstroProvider themeOverrides={[NextGenTheme]}>
      <PromptInput
        placeholder="Enter a prompt here"
        onChange={e => {
          setValue((e.target as HTMLInputElement).value);
          onChangeCallback(e);
        }}
        onSubmit={onSubmitCallback}
        onCancel={onCancelCallback}
        onFileChange={onFileChangeCallback}
        value={value}
        data-testid="testid"
        label="chat prompt"
        isLoading={props.isLoading}
        attachmentProps={{
          icon: props.attachmentIcon,
          iconWrapperProps: {
            'data-testid': 'icon-wrapper',
          },
        }}
        uploadButtonProps={{
          'data-testid': 'upload button',
        }}
      />
    </AstroProvider>
  );
};

const originalValue = global.URL.createObjectURL;

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => testFileURL);
});

afterAll(() => {
  global.URL.createObjectURL = originalValue;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('prompt is rendered', async () => {
  render(<PromptInputStory />);

  const input = screen.getByTestId('testid');

  expect(input).toBeInTheDocument();
});

test('onChange and value props work correctly', async () => {
  render(<PromptInputStory />);

  const input = screen.getByTestId('prompt-input');
  const testValue = 'test input';

  fireEvent.change(input, { target: { value: testValue } });

  expect(input).toHaveValue(testValue);
  expect(onChangeCallback).toHaveBeenCalledTimes(1);
});

test('onSubmit prop works correctly', async () => {
  render(<PromptInputStory />);

  const input = screen.getByTestId('prompt-input');
  const button = screen.getByTestId('upload button');

  const testValue = 'test input';

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.mouseDown(button);
  fireEvent.mouseUp(button);

  expect(onSubmitCallback).toHaveBeenCalledTimes(1);
});

test('onCancel prop works correctly', async () => {
  render(<PromptInputStory isLoading />);

  const input = screen.getByTestId('prompt-input');
  const button = screen.getByTestId('upload button');

  const testValue = 'test input';

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.mouseDown(button);
  fireEvent.mouseUp(button);

  expect(onCancelCallback).toHaveBeenCalledTimes(1);
});

test('should add and remove a file attachment', async () => {
  render(<PromptInputStory attachmentIcon={GlobeIcon} />);

  const fileInput = screen.getAllByLabelText('add attachment')[0];

  fireEvent.change(fileInput, { target: { files: [testFile] } });

  expect(onFileChangeCallback).toHaveBeenCalledTimes(1);
  expect(screen.getByText(testFileName)).toBeInTheDocument();
  expect(screen.getByTestId('icon-wrapper')).toBeInTheDocument();

  const removeButton = screen.getByTestId('remove-attachment');
  fireEvent.mouseDown(removeButton);
  fireEvent.mouseUp(removeButton);

  expect(onFileChangeCallback).toHaveBeenCalledTimes(2);

  expect(screen.queryByText(testFileName)).not.toBeInTheDocument();
  expect(screen.queryByTestId('icon-wrapper')).not.toBeInTheDocument();
});

test('should use default icon if no icon is provided', async () => {
  render(<PromptInputStory />);

  const fileInput = screen.getAllByLabelText('add attachment')[0];

  fireEvent.change(fileInput, { target: { files: [testFile] } });

  expect(onFileChangeCallback).toHaveBeenCalledTimes(1);
  expect(screen.getByText(testFileName)).toBeInTheDocument();
  expect(screen.getByTestId('icon-wrapper')).toBeInTheDocument();

  const removeButton = screen.getByTestId('remove-attachment');
  fireEvent.mouseDown(removeButton);
  fireEvent.mouseUp(removeButton);

  expect(onFileChangeCallback).toHaveBeenCalledTimes(2);

  expect(screen.queryByText(testFileName)).not.toBeInTheDocument();
  expect(screen.queryByTestId('icon-wrapper')).not.toBeInTheDocument();
});

test('regex expression', () => {
  const string = 'alongiflename.txt';
  expect(getFileExtension(string)).toBe('txt');

  const badString = 'alongfilename.rtrtrert...';
  expect(getFileExtension(badString)).toBe('unknown file type');
});
