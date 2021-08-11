import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ImageFilterHdrIcon from 'mdi-react/ImageFilterHdrIcon';
import CameraAltIcon from 'mdi-react/CameraAltIcon';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import { useFocus, useHover } from '@react-aria/interactions';

import { Box, Button, Icon, Image } from '../../index';

const ImagePreviewButton = forwardRef((props, ref) => {
  const {
    defaultPreviewImage,
    isImageType,
    isMenuOpen,
    previewImage,
    previewWidth,
    widthHeightSx,
    ...others
  } = props;

  const buttonRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const [isFocused, setIsFocused] = useState(false);

  const { focusProps } = useFocus({ onFocusChange: setIsFocused });
  const { hoverProps, isHovered } = useHover(props);

  const noImagePreview = (
    <Icon
      icon={ImageFilterHdrIcon}
      color="neutral.60"
      size={24}
      data-testid="image-upload-no-image-preview"
    />
  );

  const imagePreview = (
    <Image
      src={previewImage}
      sx={{ width: previewWidth, height: 'auto', maxHeight: '100%' }}
      alt="uploaded file preview"
      data-testid="image-upload-image-preview"
    />
  );

  const hoveredPreview = (
    <Box
      variant="imageUpload.hoveredPreview.wrapper"
      sx={widthHeightSx}
      data-testid="image-upload-hovered-preview"
    >
      <Icon
        icon={CameraAltIcon}
        color={isFocused || isMenuOpen ? 'active' : 'white'}
        size={24}
        sx={{ zIndex: 1 }}
      />

      {(!previewImage || previewImage === defaultPreviewImage || !isImageType) && (
        <Box variant="imageUpload.hoveredPreview.shaded" />
      )}
    </Box>
  );

  return (
    <Box tabindex={0} sx={widthHeightSx} {...hoverProps}>
      <Button
        ref={buttonRef}
        variant="imageUpload"
        sx={widthHeightSx}
        data-testid="image-preview-button"
        {...mergeProps(focusProps, others)}
      >
        {(previewImage && isImageType) ? imagePreview : noImagePreview}
        {(isHovered || isFocused) && hoveredPreview}
      </Button>
    </Box>
  );
});

ImagePreviewButton.propTypes = {
  defaultPreviewImage: PropTypes.string,
  isImageType: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  previewImage: PropTypes.string,
  previewWidth: PropTypes.number,
  widthHeightSx: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

ImagePreviewButton.displayName = 'ImagePreviewButton';
export default ImagePreviewButton;
