import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import ImageFilterHdrIcon from 'mdi-react/ImageFilterHdrIcon';
import CameraAltIcon from 'mdi-react/CameraAltIcon';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';

import { Box, Button, Icon, Image } from '../../index';
import Loader from '../Loader';

const ImagePreviewButton = forwardRef((props, ref) => {
  const {
    defaultPreviewImage,
    defaultPreviewNode,
    isImageType,
    isLoading,
    loaderSize,
    isMenuOpen,
    previewImage,
    previewWidth,
    widthHeightSx,
    ...others
  } = props;

  const buttonRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover(props);

  const noImagePreview = defaultPreviewNode || (
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

  const loadingPreview = (
    <Box
      variant="imageUpload.hoveredPreview.wrapper"
      sx={widthHeightSx}
      data-testid="image-upload-hovered-preview"
    >
      <Loader
        color={isFocusVisible || isMenuOpen ? 'active' : 'white'}
        size={loaderSize}
        sx={{ zIndex: 1 }}
        data-testid="image-preview-button__loader"
      />

      {(previewImage || previewImage === defaultPreviewImage || !isImageType) && (
        <Box variant="imageUpload.hoveredPreview.shaded" />
      )}
    </Box>
  );

  const hoveredPreview = (
    <Box
      variant="imageUpload.hoveredPreview.wrapper"
      sx={widthHeightSx}
      data-testid="image-upload-hovered-preview"
    >
      <Icon
        icon={CameraAltIcon}
        color={isFocusVisible || isMenuOpen ? 'active' : 'white'}
        size={24}
        sx={{ zIndex: 1 }}
      />

      {(previewImage || previewImage === defaultPreviewImage || !isImageType) && (
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
        {isLoading && loadingPreview}
        {(isHovered || isFocusVisible) && !isLoading && hoveredPreview}
      </Button>
    </Box>
  );
});

ImagePreviewButton.propTypes = {
  defaultPreviewImage: PropTypes.string,
  defaultPreviewNode: PropTypes.node,
  isImageType: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  loaderSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  previewImage: PropTypes.string,
  previewWidth: PropTypes.number,
  widthHeightSx: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

ImagePreviewButton.displayName = 'ImagePreviewButton';
export default ImagePreviewButton;
