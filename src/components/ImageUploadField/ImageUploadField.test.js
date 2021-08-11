import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/testUtils/testWrapper';
import ImageUploadField from './ImageUploadField';

const testLabel = 'test-label';
const testButtonId = 'image-preview-button';
const testHelperText = 'test-helper-text';
const testImageURL = 'test-image-url';
const testImageURL2 = 'test-image-url2';
const imageUploadImagePreview = 'image-upload-image-preview';
const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
const notImageFileName = 'nice-song.mp3';
const notImageFile = new File(['(⌐□_□)'], notImageFileName, {
  type: 'audio/mpeg',
});
const originalValue = global.URL.createObjectURL;

const defaultProps = {
  label: testLabel,
  helperText: testHelperText,
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => testImageURL);
});

afterAll(() => {
  global.URL.createObjectURL = originalValue;
});

const getComponent = (props = {}) =>
  render(<ImageUploadField {...defaultProps} {...props} />);

test('should render image upload component by default', () => {
  getComponent();
  const imageUploadButton = screen.getByTestId(testButtonId);
  expect(imageUploadButton).toBeInstanceOf(HTMLButtonElement);
  expect(imageUploadButton).toBeInTheDocument();
});

test('should render div with icon when focused', () => {
  getComponent();
  const imageUploadButton = screen.getByTestId(testButtonId);
  imageUploadButton.focus();
  const hoveredPreview = screen.getByTestId('image-upload-hovered-preview');
  expect(hoveredPreview).toBeInstanceOf(HTMLDivElement);
  expect(hoveredPreview).toBeInTheDocument();
  imageUploadButton.blur();
  expect(hoveredPreview).not.toBeInTheDocument();
});

test('should upload a file', () => {
  getComponent();
  const imageUploadButton = screen.getByTestId(testButtonId);
  userEvent.click(imageUploadButton);
  const imageUploadInput = screen.getByTestId('image-upload-input');
  fireEvent.change(imageUploadInput, {
    target: { files: [file] },
  });
  const imagePreview = screen.getByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src', testImageURL);
});

test('should upload a file if label clicked', () => {
  getComponent();
  const imageUploadLabel = screen.getByText(testLabel);
  userEvent.click(imageUploadLabel);
  const imageUploadInput = screen.getByTestId('image-upload-input');
  fireEvent.change(imageUploadInput, {
    target: { files: [file] },
  });
  const imagePreview = screen.getByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src', testImageURL);
});

test('should show the menu if label clicked when preview image exists', () => {
  getComponent();
  const imageUploadLabel = screen.getByText(testLabel);
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = screen.getByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src', testImageURL);
  userEvent.click(imageUploadLabel);
  expect(screen.getByText('Upload New Image')).toBeInTheDocument();
  expect(screen.getByText('Remove Image')).toBeInTheDocument();
});

test('should change image if the corresponding menu option clicked', () => {
  getComponent();
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = screen.getByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src', testImageURL);

  global.URL.createObjectURL.mockImplementationOnce(() => testImageURL2);
  userEvent.click(screen.getByTestId(testButtonId));
  userEvent.click(screen.getByText('Upload New Image'));
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src', testImageURL2);
});

test('should call onChange cb (when provided) when a file is uploaded', () => {
  const testOnChange = jest.fn();
  getComponent({ onChange: testOnChange });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  expect(testOnChange).toHaveBeenCalledTimes(1);
});

test('should call onRemove cb (when provided) when a file is uploaded', () => {
  const testOnRemove = jest.fn();
  getComponent({ onRemove: testOnRemove });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  userEvent.click(screen.getByTestId(testButtonId));
  const imagePreview = screen.getByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  userEvent.click(screen.getByText('Remove Image'));
  expect(imagePreview).not.toBeInTheDocument();
  expect(testOnRemove).toHaveBeenCalledTimes(1);
});

test('should not call onChange cb (when provided) if uploaded file is not allowed by fileTypes', () => {
  const testOnChange = jest.fn();
  getComponent({ onChange: testOnChange, fileTypes: ['audio'] });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  expect(testOnChange).toHaveBeenCalledTimes(0);
});

test('should render helper text', () => {
  getComponent();
  expect(screen.getByText(testHelperText)).toBeInTheDocument();
});

test('should render the file name when file type is not image', () => {
  getComponent({ fileTypes: ['audio'] });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [notImageFile] },
  });
  expect(screen.getByText(notImageFileName)).toBeInTheDocument();
});
