import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import statuses from '../../utils/devUtils/constants/statuses';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import FileInputField from './FileInputField';

const fileInputFieldTestId = 'file-input-test-id';
const testLabel = 'file-input-test-label';
const fileSelectTestIdButton = 'file-input-field__file-select';
const fileUploadedDeleteIconTestId = 'file-uploaded__delete-file-button';
const fileUploadedFileIconErrorTestId = 'file-uploaded__file-icon--is-error';
const fileUploadedDownloadTestId = 'file-uploaded__download-file-button';
const fileUploadedDownloadLinkTestId = 'file-uploaded__download-link';
const loaderTestId = 'file-input-field__loader';
const testFileURL = 'test-file-url';
const testFileId = 'test-file-id-1';
const testFileName = 'chucknorris.png';
const testFileName2 = 'chucknorris222.png';
const testFile = new File(['(⌐□_□)'], testFileName, {
  type: 'image/png',
});
const testFile2 = new File(['(⌐□_□)'], testFileName2, {
  type: 'image/png',
});
const testFileObject = {
  id: testFileId,
  name: testFileName,
  downloadLink: testFileURL,
};

const originalValue = global.URL.createObjectURL;

const defaultProps = {
  'data-testid': fileInputFieldTestId,
  label: testLabel,
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => testFileURL);
});

afterAll(() => {
  global.URL.createObjectURL = originalValue;
});

const getComponent = props => render(<FileInputField {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <FileInputField {...defaultProps} {...props} />,
});

universalFieldComponentTests({
  renderComponent: props => (
    <FileInputField {...defaultProps} {...props} />
  ),
  testValue: testFile,
  testLabel,
  componentType: 'FileInputField',
});

test('should render file input field component by default', () => {
  getComponent();
  const fileUploadField = screen.getByTestId(fileInputFieldTestId);
  expect(fileUploadField).toBeInstanceOf(HTMLDivElement);
  expect(fileUploadField).toBeInTheDocument();
});

test('should render files if they are passed as default', () => {
  getComponent({ defaultFileList: [testFileObject] });
  expect(screen.getByText(testFileName)).toBeInTheDocument();
});

test('should render files if they are passed as controlled prop', () => {
  getComponent({ fileList: [testFileObject] });
  expect(screen.getByText(testFileName)).toBeInTheDocument();
});

test('should be able to display uploaded file', () => {
  getComponent();
  const fileUploadFieldInput = screen.getByLabelText(testLabel);
  userEvent.click(screen.getByTestId(fileSelectTestIdButton));
  fireEvent.change(fileUploadFieldInput, {
    target: { files: [testFile] },
  });
  expect(screen.getByText(testFileName)).toBeInTheDocument();
});

test('should be able to add uploaded file if isMultiple true and file select always present', () => {
  const testCustomButtonName = 'test Custom Button Name';
  getComponent({
    defaultFileList: [testFileObject],
    defaultButtonText: testCustomButtonName,
    isMultiple: true,
  });
  const fileUploadFieldInput = screen.getByLabelText(testLabel);
  userEvent.click(screen.getByTestId(fileSelectTestIdButton));
  fireEvent.change(fileUploadFieldInput, {
    target: { files: [testFile2] },
  });
  expect(screen.getByText(testFileName)).toBeInTheDocument();
  expect(screen.getByText(testFileName2)).toBeInTheDocument();
  expect(screen.getByText(testCustomButtonName)).toBeInTheDocument();
});

test('should call onFileSelect if file uploaded', () => {
  const mockOnFileSelect = jest.fn();
  getComponent({ onFileSelect: mockOnFileSelect });
  const fileUploadFieldInput = screen.getByLabelText(testLabel);
  userEvent.click(screen.getByTestId(fileSelectTestIdButton));
  fireEvent.change(fileUploadFieldInput, {
    target: { files: [testFile] },
  });
  expect(mockOnFileSelect).toHaveBeenCalledTimes(1);
});

test('file should have download link as attribute', () => {
  getComponent({ defaultFileList: [testFileObject] });
  userEvent.click(screen.getByTestId(fileUploadedDownloadTestId));
  expect(screen.getByTestId(fileUploadedDownloadLinkTestId)).toHaveAttribute(
    'href',
    testFileURL,
  );
});

test('should remove file if trash icon clicked', () => {
  getComponent({
    defaultFileList: [testFileObject],
  });
  expect(screen.getByText(testFileName)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(fileUploadedDeleteIconTestId));
  expect(screen.queryByText(testFileName)).not.toBeInTheDocument();
});

test('should call onRemove if trash icon clicked', () => {
  const mockOnRemove = jest.fn();
  getComponent({
    defaultFileList: [{ id: testFileId, name: 'test' }],
    onRemove: mockOnRemove,
  });
  userEvent.click(screen.getByTestId(fileUploadedDeleteIconTestId));
  expect(mockOnRemove).toHaveBeenCalledTimes(1);
  expect(mockOnRemove).toHaveBeenCalledWith(expect.anything(), testFileId);
});

test('file select will have custom text if from props if provided', () => {
  const mockTitle = 'test-title';
  getComponent({ defaultButtonText: mockTitle });
  expect(screen.getByText(mockTitle)).toBeInTheDocument();
});

test('should render error border if appropriate state passed', () => {
  getComponent({ status: statuses.ERROR });
  expect(screen.getByTestId(fileInputFieldTestId)).toHaveClass('is-error');
});

test('file uploaded should render red error icon', () => {
  getComponent({
    defaultFileList: [{ ...testFileObject, status: statuses.ERROR }],
  });
  expect(
    screen.getByTestId(fileUploadedFileIconErrorTestId),
  ).toBeInTheDocument();
});

test('should display loader if appropriate prop is passed', () => {
  getComponent({ isLoading: true });
  expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
});

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent(
    {
      helperText: testHelperText,
      status: statuses.ERROR,
      defaultFileList: [testFileObject],
    });
  const helper = screen.getByRole('alert');
  expect(helper).toHaveTextContent(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const helperTextID = helper.getAttribute('id');
  expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-describedby', helperTextID);
});

test('should display helper text if passed', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText });
  expect(screen.getByText(testHelperText)).toBeInTheDocument();
});

test('should render icon button if isIconButton prop is true', () => {
  getComponent({ isIconButton: true });
  const iconButton = screen.getByRole('button', { name: 'Add File Icon' });
  expect(iconButton).toBeInTheDocument();
});
