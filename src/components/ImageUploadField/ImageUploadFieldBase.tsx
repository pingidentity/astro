import React, { forwardRef, useRef } from 'react';
import { useVisuallyHidden } from 'react-aria';
import omit from 'lodash/omit';

import { Box, FieldHelperText, Input, Label, PopoverMenu } from '../..';
import useField from '../../hooks/useField';
import { UseFieldProps } from '../../hooks/useField/useField';
import { InputProps, PopoverMenuProps, Status } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';

interface ImageUploadFieldBaseProps {
  children?: React.ReactNode;
  fileName?: string;
  fileTypes?: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLabelClick: (event: React.MouseEvent) => void;
  handleOpenMenuChange: (isOpen: boolean) => void;
  helperText?: React.ReactNode;
  isImageType?: boolean;
  isMenuOpen?: boolean;
  popoverMenuProps?: Partial<PopoverMenuProps>;
  status?: Status;
}

const ImageUploadFieldBase = forwardRef<HTMLInputElement, ImageUploadFieldBaseProps>(
  (props, inputRef) => {
    const {
      children,
      fileName,
      fileTypes,
      handleInputChange,
      handleLabelClick,
      handleOpenMenuChange,
      helperText,
      isImageType,
      isMenuOpen,
      popoverMenuProps,
      status,
    } = props;
    const {
      fieldContainerProps,
      fieldControlInputProps,
      fieldControlWrapperProps,
      fieldLabelProps,
    } = useField({
      ...omit(props, ['onRemove', 'helperText']),
    } as UseFieldProps<unknown>);
    const labelRef = useRef<HTMLLabelElement>(null);

    const { visuallyHiddenProps } = useVisuallyHidden();

    const getAcceptableInputTypes = () => (fileTypes ?? [])
      .map(type => (type.includes('/') ? type : `${type}/*`))
      .join(', ');

    return (
      <Box variant="forms.input.wrapper" {...fieldContainerProps}>
        <Label {...fieldLabelProps} onClick={handleLabelClick} ref={labelRef} tabIndex={-1} />
        <PopoverMenu isOpen={isMenuOpen} onOpenChange={handleOpenMenuChange} {...popoverMenuProps}>
          {children}
        </PopoverMenu>
        <Box {...fieldControlWrapperProps}>
          <Input
            {...fieldControlInputProps}
            {...visuallyHiddenProps}
            {...({ accept: getAcceptableInputTypes() } as unknown as InputProps)}
            data-testid="image-upload-input"
            onChange={handleInputChange}
            ref={inputRef}
            sx={{ display: 'none' }}
            type="file"
            value=""
          />
        </Box>
        {!isImageType && (
        <FieldHelperText status={statuses.DEFAULT}>{fileName}</FieldHelperText>
        )}
        {helperText && (
        <FieldHelperText status={status}>{helperText}</FieldHelperText>
        )}
      </Box>
    );
  });

ImageUploadFieldBase.displayName = 'ImageUploadFieldBase';
export default ImageUploadFieldBase;
