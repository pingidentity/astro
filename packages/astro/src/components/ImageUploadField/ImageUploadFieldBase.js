import React, { forwardRef, useMemo, useRef } from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import { useVisuallyHidden } from 'react-aria';

import { PopoverMenu } from '../../index';
import useField from '../../hooks/useField';
import FieldHelperText from '../FieldHelperText';
import Input from '../Input';
import Box from '../Box';
import Label from '../Label';
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
    <Box variant="forms.input.fieldContainer" {...fieldContainerProps}>
      <Label {...fieldLabelProps} onClick={handleLabelClick} ref={labelRef} />
      <PopoverMenu isOpen={isMenuOpen} onOpenChange={handleOpenMenuChange}>
        {children}
      </PopoverMenu>
      <Input
        {...fieldControlInputProps}
        {...visuallyHiddenProps}
        accept={acceptableInputTypes}
        data-testid="image-upload-input"
        onChange={handleInputChange}
        ref={inputRef}
        type="file"
        value=""
      />
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
