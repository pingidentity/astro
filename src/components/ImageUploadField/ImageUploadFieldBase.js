import React, { forwardRef, useMemo, useRef } from 'react';
import { useVisuallyHidden } from 'react-aria';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { Box, FieldHelperText, Input, Label, PopoverMenu } from '../..';
import useField from '../../hooks/useField';
import statuses from '../../utils/devUtils/constants/statuses';

const ImageUploadFieldBase = forwardRef((props, inputRef) => {
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
    status,
  } = props;
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    ...omit(props, ['onRemove']),
  });
  const labelRef = useRef();

  const { visuallyHiddenProps } = useVisuallyHidden();

  const acceptableInputTypes = useMemo(() => `${fileTypes?.join('/*, ')}/*`, [
    fileTypes,
  ]);

  return (
    <Box variant="forms.input.wrapper" {...fieldContainerProps}>
      <Label {...fieldLabelProps} onClick={handleLabelClick} ref={labelRef} tabIndex="-1" />
      <PopoverMenu isOpen={isMenuOpen} onOpenChange={handleOpenMenuChange}>
        {children}
      </PopoverMenu>
      <Box {...fieldControlWrapperProps}>
        <Input
          {...fieldControlInputProps}
          {...visuallyHiddenProps}
          accept={acceptableInputTypes}
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

ImageUploadFieldBase.propTypes = {
  fileName: PropTypes.string,
  fileTypes: PropTypes.arrayOf(
    PropTypes.oneOf([
      'application',
      'audio',
      'example',
      'application',
      'image',
      'model',
      'text',
      'video',
    ]),
  ),
  handleInputChange: PropTypes.func,
  handleLabelClick: PropTypes.func,
  handleOpenMenuChange: PropTypes.func,
  helperText: PropTypes.node,
  isImageType: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  status: PropTypes.oneOf(Object.values(statuses)),
};

ImageUploadFieldBase.displayName = 'ImageUploadFieldBase';
export default ImageUploadFieldBase;
