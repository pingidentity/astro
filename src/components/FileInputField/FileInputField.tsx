import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeProps, useVisuallyHidden, VisuallyHidden } from 'react-aria';
import { DropEvent, useDropzone } from 'react-dropzone';
import pluralize from 'pluralize';
import { v4 as uuidv4 } from 'uuid';

import { Box, FieldHelperText, Input, Label, Loader } from '../..';
import useField from '../../hooks/useField';
import { UseFieldProps } from '../../hooks/useField/useField';
import useStatusClasses from '../../hooks/useStatusClasses';
import { FileInputFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';

import FileItem from './FileItem';
import FileSelect from './FileSelect';
import FileSelectIcon from './FileSelectIcon';

const displayName = 'FileInputField';

const FILE_CHANGE_STATUS = {
  ADDED: 'added',
  DELETED: 'deleted',
} as const;

type FileChangeStatusState = {
  fileCount: number;
  status: string;
} | null;

const getFileExtension = (file: File) => {
  const extension = file.name.split('.')[file.name.split('.').length - 1];
  return `.${extension}`;
};

export const filterFileTypes = (
  { arrayWithNewFiles, fileTypes }: { arrayWithNewFiles: File[]; fileTypes?: string[] },
) => arrayWithNewFiles
  .filter(newFile => (!fileTypes?.length
      || fileTypes.includes(getFileExtension(newFile))
      || fileTypes.some(fileType => newFile.type.search(fileType) !== -1)
  ));


const FileInputField = forwardRef<HTMLInputElement, FileInputFieldProps>((props, ref) => {
  const { buttonProps,
    defaultButtonText = 'Select a file',
    defaultFileList,
    fileList: uploadedFilesImperative,
    helperText,
    iconContainerProps,
    iconProps,
    isDisabled,
    isIconButton,
    isLoading,
    isMultiple,
    label,
    onFileSelect,
    onRemove,
    status = 'default',
    textProps,
    fileTypes,
    ...others } = props;
  const [uploadedFiles, setUploadedFiles] = useState(defaultFileList || []);
  const [fileChangeStatus, setFileChangeStatus] = useState<FileChangeStatusState>(null);
  const [fileChangeMessage, setFileChangeMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current!);

  const { ariaProps, nonAriaProps } = getAriaAttributeProps(others);
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    status,
    isDisabled,
    label,
    ...props,
  } as UseFieldProps<unknown>);

  const helperTextId = useMemo(() => uuidv4(), []);

  const { visuallyHiddenProps } = useVisuallyHidden();

  const handleFileSelect = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    inputRef.current.click();
  }, [inputRef]);

  useEffect(() => {
    // TODO: The function works fine in Google Chrome, but sometimes voiceover skips the
    // update/delete file status update on Safari

    if (status === statuses.ERROR) {
      setFileChangeMessage(typeof helperText === 'string' ? helperText : '');
    } else if (fileChangeStatus) {
      setFileChangeMessage(
        `${pluralize('file', fileChangeStatus.fileCount, true)} ${fileChangeStatus.status} successfully`,
      );
    }

    setFileChangeStatus(null);
  }, [fileChangeStatus, helperText, status]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent,
    newFiles: FileList | File[],
  ) => {
    if (status === statuses.ERROR) {
      setFileChangeMessage('');
    }

    if (onFileSelect) {
      onFileSelect(event, newFiles);
    }

    let arrayWithNewFiles = Array.from(newFiles) as File[];

    if (!isMultiple) {
      arrayWithNewFiles = arrayWithNewFiles.slice(0, 1);
    }

    const filesWithIdAndLink = filterFileTypes({ arrayWithNewFiles, fileTypes })
      .map(newFile => {
        return {
          fileObj: newFile,
          name: newFile.name,
          id: uuidv4(),
          downloadLink: URL.createObjectURL(newFile),
          status: statuses.DEFAULT,
        };
      });

    if (isMultiple) {
      setUploadedFiles(prevFiles => [...prevFiles, ...filesWithIdAndLink]);
    } else {
      setUploadedFiles(filesWithIdAndLink);
    }

    setFileChangeStatus({ fileCount: filesWithIdAndLink.length, status: FILE_CHANGE_STATUS.ADDED });
  };

  const onDrop = (acceptedFiles: File[], fileRejections: unknown, event: DropEvent) => {
    handleFileUpload(event as React.DragEvent, acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
    disabled: isDisabled || isLoading,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, event.target.files!);
  };

  const mergedInputProps: React.InputHTMLAttributes<HTMLInputElement> = mergeProps(
    visuallyHiddenProps,
    fieldControlInputProps,
    getInputProps(),
  );

  const filesListNode = useMemo(() => {
    const handleFileDelete = (e: React.SyntheticEvent, fileId: string) => {
      setFileChangeMessage('');

      if (onRemove) {
        onRemove(e, fileId);
      }

      setUploadedFiles(prevFiles => prevFiles.filter(({ id }) => id !== fileId),
      );

      setFileChangeStatus({ fileCount: 1, status: FILE_CHANGE_STATUS.DELETED });
    };

    const filesToRender = uploadedFilesImperative || uploadedFiles;
    if (!filesToRender?.length) {
      return null;
    }
    return (
      <>
        {filesToRender.map(fileProps => (
          <FileItem
            handleFileDelete={handleFileDelete}
            isDisabled={isDisabled || isLoading}
            key={fileProps.id}
            textProps={textProps}
            helperTextId={helperTextId}
            {...fileProps}
          />
        ))}
      </>
    );
  }, [
    helperTextId,
    isDisabled,
    isLoading,
    onRemove,
    textProps,
    uploadedFiles,
    uploadedFilesImperative,
  ]);

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
    <Box {...{ fieldContainerProps } as object}>
      {label && <Label {...fieldLabelProps} />}
      <Box
        variant="forms.fileInputField.wrapper"
        {...getPendoID(displayName)}
        {...mergeProps(fieldControlWrapperProps, nonAriaProps)}
        className={classNames}
        {...getRootProps()}
        // to pass accessibility test, this removes focusable dependents
        role="none"
      >
        <Input
          {...mergedInputProps}
          multiple={isMultiple}
          onChange={handleOnChange}
          ref={inputRef}
          type="file"
          accept={fileTypes ? fileTypes?.join(',') : '*'}
        />
        {filesListNode}
        {shouldFileSelectRender() && (
          isIconButton
            ? (
              <FileSelectIcon
                handleFileSelect={handleFileSelect}
                iconContainerProps={iconContainerProps ?? {}}
                buttonProps={{ ...buttonProps, isDisabled: isDisabled || isLoading }}
                iconProps={iconProps ?? {}}
                {...ariaProps}
              />
            )
            : (
              <FileSelect
                buttonText={defaultButtonText}
                handleFileSelect={handleFileSelect}
                isDisabled={isDisabled || isLoading}
                textProps={textProps}
                {...ariaProps}
              />
            )
        )}
        {isLoading && (
        <Loader
          variant="loader.withinInput"
          sx={{ position: 'absolute' }}
          data-testid="file-input-field__loader"
        />
        )}
      </Box>
      {helperText && (
      <Box aria-label={typeof helperText === 'string' ? helperText : undefined} role="marquee">
        <FieldHelperText status={status} id={helperTextId}>
          {helperText}
        </FieldHelperText>
      </Box>
      )}
      {fileChangeMessage
        && (
          <Box aria-relevant="all" aria-live="assertive" role="status">
            <VisuallyHidden>
              <h1>{fileChangeMessage}</h1>
            </VisuallyHidden>
          </Box>
        )}
    </Box>
  );
},
);

FileInputField.displayName = displayName;

export default FileInputField;
