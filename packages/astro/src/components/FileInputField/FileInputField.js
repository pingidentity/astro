import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeProps, useVisuallyHidden } from 'react-aria';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Box, FieldHelperText, Input, Label, Loader } from '../..';
import useField from '../../hooks/useField';
import useStatusClasses from '../../hooks/useStatusClasses';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributesBasePropTypes, getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';

import FileItem from './FileItem';
import FileSelect from './FileSelect';

const FileInputField = forwardRef(({
  defaultButtonText,
  defaultFileList,
  fileList: uploadedFilesImperative,
  helperText,
  isDisabled,
  isLoading,
  isMultiple,
  onFileSelect,
  onRemove,
  status,
  textProps,
  ...others
}, ref) => {
  const [uploadedFiles, setUploadedFiles] = useState(defaultFileList || []);

  const inputRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const { ariaProps, nonAriaProps } = getAriaAttributeProps(others);
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    status,
    isDisabled,
    ...nonAriaProps,
  });

  const helperTextId = uuidv4();

  const { visuallyHiddenProps } = useVisuallyHidden();

  const handleFileSelect = useCallback(() => {
    inputRef.current.value = null;
    inputRef.current.click();
  }, [inputRef]);

  const handleFileUpload = useCallback(
    (event, newFiles) => {
      if (onFileSelect) {
        onFileSelect(event, newFiles);
      }

      let arrayWithNewFiles = Array.from(newFiles);
      if (!isMultiple) {
        arrayWithNewFiles = arrayWithNewFiles.slice(0, 1);
      }
      const newFilesWithIdAndLink = arrayWithNewFiles.map(newFile => {
        return {
          fileObj: newFile,
          name: newFile.name,
          id: uuidv4(),
          downloadLink: URL.createObjectURL(newFile),
          status: statuses.DEFAULT,
        };
      });
      if (isMultiple) {
        setUploadedFiles(prevFiles => [
          ...prevFiles,
          ...newFilesWithIdAndLink,
        ]);
      } else {
        setUploadedFiles(newFilesWithIdAndLink);
      }
    },
    [isMultiple, onFileSelect],
  );

  const onDrop = useCallback(
    (acceptedFiles, fileRejections, event) => {
      handleFileUpload(event, acceptedFiles);
    },
    [handleFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
    disabled: isDisabled || isLoading,
  });

  const handleOnChange = useCallback(
    event => {
      handleFileUpload(event, event.target.files);
    },
    [handleFileUpload],
  );

  const handleFileDelete = useCallback((e, fileId) => {
    if (onRemove) {
      onRemove(e, fileId);
    }

    setUploadedFiles(prevFiles => prevFiles.filter(({ id }) => id !== fileId),
    );
  }, [onRemove]);

  const filesListNode = useMemo(() => {
    const filesToRender = uploadedFilesImperative || uploadedFiles;
    if (!filesToRender?.length) {
      return null;
    }
    return filesToRender.map(fileProps => (
      <FileItem
        handleFileDelete={handleFileDelete}
        isDisabled={isDisabled || isLoading}
        key={fileProps.id}
        textProps={textProps}
        helperTextId={helperTextId}
        {...fileProps}
      />
    ));
  }, [uploadedFilesImperative, uploadedFiles, handleFileDelete, isDisabled, isLoading, textProps]);

  const { classNames } = useStatusClasses('fileInputFieldWrapper', {
    isDragActive,
    isLoading,
    [`is-${status}`]: true,
  });

  const shouldFileSelectRender = useCallback(() => {
    let isFileUploaded;
    if (uploadedFilesImperative) {
      isFileUploaded = Boolean(uploadedFilesImperative?.length);
    } else {
      isFileUploaded = Boolean(uploadedFiles?.length);
    }
    return isMultiple || !isFileUploaded;
  }, [uploadedFiles, uploadedFilesImperative, isMultiple]);

  return (
    <Box fieldContainerProps={fieldContainerProps}>
      <Label {...fieldLabelProps} />
      <Box
        variant="forms.fileInputField.wrapper"
        {...mergeProps(fieldControlWrapperProps, nonAriaProps)}
        className={classNames}
        {...getRootProps()}
        // to pass accessibility test, this removes focusable dependents
        role="none"
      >
        <Input
          {...mergeProps(
            visuallyHiddenProps,
            fieldControlInputProps,
            getInputProps(),
          )}
          aria-label="File Input"
          multiple={isMultiple}
          onChange={handleOnChange}
          ref={inputRef}
          type="file"
        />
        {filesListNode}
        {shouldFileSelectRender() && (
          <FileSelect
            buttonText={defaultButtonText}
            handleFileSelect={handleFileSelect}
            isDisabled={isDisabled || isLoading}
            textProps={textProps}
            {...ariaProps}
          />
        )}
        {isLoading && (
          <Loader
            color="active"
            sx={{ position: 'absolute' }}
            data-testid="file-input-field__loader"
          />
        )}
      </Box>
      {helperText && (
        <FieldHelperText status={status} id={helperTextId}>{helperText}</FieldHelperText>
      )}
    </Box>
  );
});

FileInputField.displayName = 'FileInputField';

FileInputField.propTypes = {
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** Default button text that will be changed on the file name once file is uploaded */
  defaultButtonText: PropTypes.string,
  /** Defines whether input can accept multiple files or not */
  isMultiple: PropTypes.bool,
  /** Determines whether the loading indicator is shown. */
  isLoading: PropTypes.bool,
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Array of objects for uploaded files.
   * Objects should have the following structure:
   *
   * {
   *
   *  fileObj: File object (optional),
   *
   *  id: file id (required - will be returned on delete),
   *
   *  name: file name that will be displayed (required - will be displayed),
   *
   *  downloadLink: link for the file download (optional),
   *
   *  status: file status (if error - icon of the
   *  component will be red icon and warning sign)(optional),
   *
   * }
   * */
  fileList: PropTypes.arrayOf(
    PropTypes.shape({
      fileObj: PropTypes.shape({}),
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      downloadLink: PropTypes.string,
      ...statusPropTypes,
    }),
  ),
  /** Default array of objects for uploaded files. */
  defaultFileList: PropTypes.arrayOf(
    PropTypes.shape({
      fileObj: PropTypes.shape({}),
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      downloadLink: PropTypes.string,
      ...statusPropTypes,
    }),
  ),
  /** The handler that is called when the input files is uploaded.
   *
   * `(event, files) => void`
   * */
  onFileSelect: PropTypes.func,
  /** The handler that is called when an uploaded file got removed.
   *
   * `(fileId) => void`
   * */
  onRemove: PropTypes.func,
  /** These props will be spread to the field text component. */
  textProps: PropTypes.shape({}),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

FileInputField.defaultProps = {
  defaultButtonText: 'Select a file',
  ...statusDefaultProp,
};

export default FileInputField;
