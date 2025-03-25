import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useField, useLocalOrForwardRef, useProgressiveState } from '../../../hooks';
import { UseFieldProps } from '../../../hooks/useField/useField';
import { Box, FileInputField, TextArea } from '../../../index';
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
    onKeyUp: onKeyUpProp,
    onKeyDown: onKeyDownProp,
  } = props;
  const { onFileChange, ...propsWithoutOnFileChange } = props;
  const firstUpdate = useRef(true);
  const [userFiles, setUserFiles] = useState<FileProps[] | []>([]);
  const [value, setValue] = useProgressiveState(valueProp, defaultValueProp);

  const countLineBreaks = (str: string) => {
    const lineBreaks = str.match(/\r\n|\r|\n/g);
    return lineBreaks ? lineBreaks.length : 0;
  };

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

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onSubmit && !isLoading) {
      onSubmit(e as unknown as KeyboardEvent, value);
      e.stopPropagation();
      e.preventDefault();
    } else if (onCancel && isLoading) {
      onCancel(e as unknown as KeyboardEvent);
      e.stopPropagation();
    }
  };


  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyUpProp) {
      onKeyUpProp(e, value);
    }
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

  useEffect(() => {
    if (inputRef.current && value) {
      const lb = countLineBreaks(value);
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `calc(${(lb + 1) * 24}px)`;
    } else if (value === '') {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = '26px';
    }
  }, [value]);

  const onKeyDown = e => {
    if (onKeyDownProp) {
      onKeyDownProp(e, value);
    }
    if (!e.shiftKey && e.key === 'Enter') {
      onEnterPress(e);
    }
  };


  return (
    <Box
      variant="forms.input.fieldContainer"
      {...fieldContainerProps}
    >
      <Box variant="forms.input.promptInputWrapper" {...fieldControlWrapperProps}>
        <Box isRow variant="forms.input.promptInputAttachmentWrapper">
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
        <Box
          isRow
          variant="forms.input.promptInputRow"
        >
          <Box mr="1.5rem" mb="auto" ml=".75rem">
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
          <TextArea
            ref={inputRef}
            variant="forms.input.promptInput"
            data-testid="prompt-input"
            {...fieldControlInputProps}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
          />
          <Box
            sx={{
              mx: '.75rem',
              mb: 'auto',
            }}
          >
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
    </Box>
  );
});

PromptInput.defaultProps = {
  controlProps: {
    'aria-label': 'chat assistant text input',
  },
};

export default PromptInput;
