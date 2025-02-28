import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import ImageUploadField from './ImageUploadField';

const imageUploadNoImagePreview = 'image-upload-no-image-preview';

jest.mock('../Image', () => props => (
  <img alt="mock" {...props} />
));

const testLabel = 'test-label';
const testButtonId = 'image-preview-button';
const testHelperText = 'test-helper-text';
const testImageURL = 'test-image-url';
const testImageURL2 = 'test-image-url2';
const imageUploadImagePreview = 'image-upload-image-preview';
const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
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

const getComponent = (
  props = {},
  { renderFn = render } = {},
) => renderFn(<ImageUploadField {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <ImageUploadField {...defaultProps} {...props} />,
});

universalFieldComponentTests({
  renderComponent: props => (
    <ImageUploadField {...defaultProps} {...props} />
  ),
  testValue: file,
  testLabel,
  componentType: 'ImageUploadField',
});


test('should render image upload component by default', () => {
  getComponent();
  const imageUploadButton = screen.getByTestId(testButtonId);
  expect(imageUploadButton).toBeInstanceOf(HTMLButtonElement);
  expect(imageUploadButton).toBeInTheDocument();
});

test('should render div with icon when focused', () => {
  getComponent();
  const imageUploadButton = screen.getByTestId(testButtonId);
  act(() => {
    imageUploadButton.focus();
  });
  const hoveredPreview = screen.getByTestId('image-upload-hovered-preview');
  expect(hoveredPreview).toBeInstanceOf(HTMLDivElement);
  expect(hoveredPreview).toBeInTheDocument();
  act(() => {
    imageUploadButton.blur();
  });
  expect(hoveredPreview).not.toBeInTheDocument();
});

test('should upload a file', async () => {
  getComponent();
  const imageUploadButton = screen.getByTestId(testButtonId);
  userEvent.click(imageUploadButton);
  const imageUploadInput = screen.getByTestId('image-upload-input');
  fireEvent.change(imageUploadInput, {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');
});

test('should upload a file if label clicked', async () => {
  getComponent();
  const imageUploadLabel = screen.getByText(testLabel);
  userEvent.click(imageUploadLabel);
  const imageUploadInput = screen.getByTestId('image-upload-input');
  fireEvent.change(imageUploadInput, {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');
});

test('should show the menu if image preview is clicked when preview image exists', async () => {
  getComponent();
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');

  // Click on the image preview button
  userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Upload New Image')).toBeInTheDocument();
  expect(screen.getByText('Remove Image')).toBeInTheDocument();
});

test('should change image if the corresponding menu option clicked', async () => {
  getComponent();
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');

  global.URL.createObjectURL.mockImplementationOnce(() => testImageURL2);
  userEvent.click(screen.getByTestId(testButtonId));
  userEvent.click(screen.getByText('Upload New Image'));
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  expect(
    await screen.findByTestId(imageUploadImagePreview),
  ).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');
});

test('should call onChange cb (when provided) when a file is uploaded', () => {
  const testOnChange = jest.fn();
  getComponent({ onChange: testOnChange });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  expect(testOnChange).toHaveBeenCalledTimes(1);
});

test('should call onRemove cb (when provided) when a file is uploaded', async () => {
  const testOnRemove = jest.fn();
  getComponent({ onRemove: testOnRemove });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  userEvent.click(screen.getByTestId(testButtonId));
  expect(
    await screen.findByTestId(imageUploadImagePreview),
  ).toBeInTheDocument();
  userEvent.click(screen.getByText('Remove Image'));
  expect(imagePreview).not.toBeInTheDocument();
  expect(testOnRemove).toHaveBeenCalledTimes(1);
});

test('should not call onChange cb (when provided) if uploaded file is not allowed by fileTypes', () => {
  const testOnChange = jest.fn();
  getComponent({ onChange: testOnChange, fileTypes: ['audio'] });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [new File(['(⌐□_□)'], 'chucknorris.audio', { type: 'audio' })] },
  });

  expect(testOnChange).toHaveBeenCalledTimes(0);
});

test('should render helper text', () => {
  getComponent();
  expect(screen.getByText(testHelperText)).toBeInTheDocument();
});

test('should render default preview image if defined initially', () => {
  getComponent({ defaultPreviewImage: 'some-image' });
  expect(screen.queryByTestId(imageUploadImagePreview)).toBeInTheDocument();
  expect(
    screen.queryByTestId(imageUploadNoImagePreview),
  ).not.toBeInTheDocument();
});

test('should render new preview image if defined later', () => {
  const { rerender } = getComponent();
  expect(screen.queryByTestId(imageUploadNoImagePreview)).toBeInTheDocument();
  expect(screen.queryByTestId(imageUploadImagePreview)).not.toBeInTheDocument();

  getComponent({ defaultPreviewImage: 'some-image' }, { renderFn: rerender });
  expect(screen.queryByTestId(imageUploadImagePreview)).toBeInTheDocument();
  expect(
    screen.queryByTestId(imageUploadNoImagePreview),
  ).not.toBeInTheDocument();
});

test('should render loader if isLoading prop is true', () => {
  const { rerender } = getComponent();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

  getComponent({ isLoading: true }, { renderFn: rerender });
  expect(screen.queryByRole('alert')).toBeInTheDocument();
});

test('should render loader if isLoading prop is true', () => {
  const { rerender } = getComponent();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

  getComponent({ isLoading: true }, { renderFn: rerender });
  expect(screen.queryByRole('alert')).toBeInTheDocument();
});

test('should render image preview and menu when previewImage prop is supplied', () => {
  getComponent({ previewImage: 'test' });
  expect(screen.queryByTestId(imageUploadImagePreview)).toBeInTheDocument();
  expect(screen.queryByTestId(imageUploadImagePreview)).toHaveAttribute(
    'src',
    'test',
  );
  expect(
    screen.queryByTestId(imageUploadNoImagePreview),
  ).not.toBeInTheDocument();
  userEvent.click(screen.getByTestId(testButtonId));
  expect(screen.getByText('Upload New Image')).toBeInTheDocument();
  expect(screen.getByText('Remove Image')).toBeInTheDocument();
});

test('loader size can be changed via the prop', () => {
  const testLoaderSize = 17;
  getComponent({ isLoading: true, loaderSize: testLoaderSize });
  expect(screen.getByTestId('image-preview-button__loader')).toHaveStyle({
    'font-size': `${testLoaderSize}px`,
  });
});
test('should show the menu if label clicked when preview image exists', async () => {
  getComponent();
  const imageUploadButton = screen.getByTestId(testButtonId);
  userEvent.click(imageUploadButton);
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');

  // Click on the image preview button
  const imageUploadLabel = screen.getByText(testLabel);
  fireEvent.click(imageUploadLabel);
  expect((screen.getAllByRole('button'))[0]).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('menu')).toBeInTheDocument();
  expect(screen.getByText('Upload New Image')).toBeInTheDocument();
  expect(screen.getByText('Remove Image')).toBeInTheDocument();
});

test('should show the menu if label clicked when preview image exists with custom uploads', async () => {
  const customUploadProp = 'Custom Upload';
  const customRemoveProp = 'Custom Remove';
  getComponent({
    uploadItemText: customUploadProp,
    removeItemText: customRemoveProp,
  });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');

  // Click on the image preview button
  userEvent.click(screen.getByRole('button'));
  expect(screen.getByText(customUploadProp)).toBeInTheDocument();
  expect(screen.getByText(customRemoveProp)).toBeInTheDocument();
});

test('should render node element if passed as default image', () => {
  getComponent({ defaultPreviewImage: <img alt="mock" /> });
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
});

test('should implement popover menu props', async () => {
  getComponent({ popoverMenuProps: { direction: 'right' } });
  fireEvent.change(screen.getByTestId('image-upload-input'), {
    target: { files: [file] },
  });
  const imagePreview = await screen.findByTestId(imageUploadImagePreview);
  expect(imagePreview).toBeInTheDocument();
  expect(imagePreview).toHaveAttribute('src');

  // Click on the image preview button
  userEvent.click(screen.getByRole('button'));

  expect(screen.getByRole('presentation')).toBeInTheDocument();
  expect(screen.getByRole('presentation')).toBeVisible();
  expect(screen.getByRole('presentation')).toHaveAttribute('data-popover-placement', 'right');
});
