import React, { forwardRef, useRef } from 'react';
import { useVisuallyHidden } from 'react-aria';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { Box, FieldHelperText, Input, Label, PopoverMenu } from '../..';
import useField from '../../hooks/useField';
import { imageUploadPropTypes } from '../../utils/devUtils/constants/htmlElements';
import statuses from '../../utils/devUtils/constants/statuses';
import { statusPropTypes } from '../../utils/docUtils/statusProp';

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
    popoverMenuProps,
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

  const getAcceptableInputTypes = () => fileTypes
    .map(type => (type.includes('/') ? type : `${type}/*`))
    .join(', ');

  return (
    <Box variant="forms.input.wrapper" {...fieldContainerProps}>
      <Label {...fieldLabelProps} onClick={handleLabelClick} ref={labelRef} tabIndex="-1" />
      <PopoverMenu isOpen={isMenuOpen} onOpenChange={handleOpenMenuChange} {...popoverMenuProps}>
        {children}
      </PopoverMenu>
      <Box {...fieldControlWrapperProps}>
        <Input
          {...fieldControlInputProps}
          {...visuallyHiddenProps}
          accept={getAcceptableInputTypes()}
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
    PropTypes.oneOf(imageUploadPropTypes),
  ),
  handleInputChange: PropTypes.func,
  handleLabelClick: PropTypes.func,
  handleOpenMenuChange: PropTypes.func,
  helperText: PropTypes.node,
  isImageType: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  popoverMenuProps: PropTypes.shape({}),
  ...statusPropTypes,
};

ImageUploadFieldBase.displayName = 'ImageUploadFieldBase';
export default ImageUploadFieldBase;
