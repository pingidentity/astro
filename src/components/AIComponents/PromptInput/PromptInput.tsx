import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useField, useLocalOrForwardRef, useProgressiveState } from '../../../hooks';
import { UseFieldProps } from '../../../hooks/useField/useField';
import { Box, FileInputField, Input } from '../../../index';
import { FileProps, PromptInputProps } from '../../../types/promptInput';
import statuses from '../../../utils/devUtils/constants/statuses';
import Attachment, { getFileExtension } from '../Attachment/Attachment';

import PromptUploadButton from './PromptUploadButton';

const PromptInput = forwardRef<HTMLInputElement, PromptInputProps>((props, ref) => {
  const {
    attachmentProps,
    isFullScreen,
    isLoading,
    fileInputButtonProps,
    value: valueProp,
    defaultValue: defaultValueProp,
    onCancel,
    onSubmit,
    uploadButtonContainerProps,
    uploadButtonProps,
  } = props;
  const { onFileChange, ...propsWithoutOnFileChange } = props;
  const firstUpdate = useRef(true);
  const [userFiles, setUserFiles] = useState<FileProps[] | []>([]);
  const [value, setValue] = useProgressiveState(valueProp, defaultValueProp);

  const handleFileSelect = (_event, files) => {
    const arrayWithNewFiles = Array.from(files) as FileProps[];

    const filesWithIdAndLink = arrayWithNewFiles.map(newFile => {
      return {
        fileObj: newFile,
        name: newFile.name,
        id: uuid(),
        downloadLink: URL.createObjectURL(newFile as unknown as Blob),
        status: statuses.DEFAULT,
        fileType: getFileExtension(newFile.name),
      };
    });
    setUserFiles(prevFiles => [...prevFiles, ...filesWithIdAndLink]);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (onFileChange) {
      onFileChange(userFiles);
    }
  }, [userFiles, onFileChange]);

  const handleFileRemove = (id: string) => {
    setUserFiles(userFiles.filter(_file => _file.id !== id));
  };

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
  } = useField({
    onChange: (e: ChangeEvent<Element>) => {
      setValue((e as ChangeEvent<HTMLInputElement>).target.value);
    },
    ...propsWithoutOnFileChange as UseFieldProps<PromptInputProps>,
  });

  const inputRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  return (
    <Box
      variant="forms.input.fieldContainer"
      {...fieldContainerProps}
    >
      <Box variant="forms.input.promptInputWrapper" {...fieldControlWrapperProps}>
        <Box isRow gap="1.5rem" sx={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
          {userFiles.map(({ name, fileType, id }) => (
            <Attachment
              key={id}
              title={name}
              fileType={fileType}
              removeFile={handleFileRemove}
              id={id}
              isFullScreen={isFullScreen}
              {...attachmentProps}
            />
          ))}
        </Box>
        <Box isRow alignItems="center" justifyContent="center" flexGrow="1">
          <Box mr="md">
            <FileInputField
              onFileSelect={handleFileSelect}
              onRemove={handleFileRemove}
              fileList={[]}
              isIconButton
              buttonProps={{ sx: { size: '24px', padding: '0px' } }}
              sx={{ width: 'fit-content', border: 'none', p: '0px' }}
              aria-label="add attachment"
              {...fileInputButtonProps}
            />
          </Box>
          <Input
            ref={inputRef}
            variant="forms.input.promptInput"
            data-testid="prompt-input"
            {...fieldControlInputProps}
          />
          <PromptUploadButton
            isLoading={isLoading}
            value={value}
            onSubmit={onSubmit}
            onCancel={onCancel}
            {...uploadButtonProps}
            uploadButtonContainerProps={uploadButtonContainerProps}
          />
        </Box>
      </Box>
    </Box>
  );
});

PromptInput.defaultProps = {
  controlProps: {
    'aria-label': 'chat assistant text input',
  },
};

export default PromptInput;
