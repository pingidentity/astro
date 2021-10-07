import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import ImageUploadFieldBase from './ImageUploadFieldBase';
import { Item, Menu } from '../../index';
import { useImageUploadState } from '../../hooks/useImageUploadState';
import ImagePreviewButton from './ImagePreviewButton';
import statuses from '../../utils/devUtils/constants/statuses';

/**
 * The Image Upload Field component gives users the ability to upload a file (image by default).
 */
const ImageUploadField = forwardRef((props, ref) => {
  const { isLoading, onRemove } = props;
  const inputRef = useRef();
  const state = useImageUploadState(props, inputRef);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const onAction = useCallback(
    (action) => {
      // eslint-disable-next-line default-case
      switch (action) {
        case 'upload': {
          state.showFileDialog();
          break;
        }
        case 'remove': {
          state.removePreview();
          if (onRemove && typeof onRemove === 'function') {
            onRemove();
          }
          break;
        }
      }
    },
    [state.showFileDialog, props?.onRemove, state.removePreview],
  );

  return (
    <ImageUploadFieldBase
      fileName={state.fileName}
      handleInputChange={state.handleInputChange}
      handleLabelClick={state.handleLabelClick}
      handleOpenMenuChange={state.handleOpenMenuChange}
      isImageType={state.isImageType}
      isMenuOpen={state.isMenuOpen}
      ref={inputRef}
      widthHeightSx={state.widthHeightSx}
      {...props}
    >
      <ImagePreviewButton
        isLoading={isLoading}
        previewImage={state.previewImage}
        defaultPreviewImage={props?.defaultPreviewImage}
        isImageType={state.isImageType}
        onPress={state.pressPreviewButton}
        previewHeight={props?.previewHeight}
        previewWidth={props?.previewWidth}
        widthHeightSx={state.widthHeightSx}
      />
      <Menu onAction={onAction}>
        <Item key="upload">Upload New Image</Item>
        <Item key="remove">Remove Image</Item>
      </Menu>
    </ImageUploadFieldBase>
  );
});

ImageUploadField.propTypes = {
  /** Image preview (controlled), used to represent the current image state. */
  previewImage: PropTypes.string,
  /** Default image preview (uncontrolled), used when no previewImage is present. */
  defaultPreviewImage: PropTypes.string,
  /** An array of accepted file types.
   * (according to the https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#types ) */
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
  /** Text to display after the radio group label. Useful for errors or other info. */
  helperText: PropTypes.node,
  /** Determines whether the loading indicator is shown. */
  isLoading: PropTypes.bool,
  /** Defines a string value that labels the current element. */
  label: PropTypes.string,
  /** The handler that is called when the input file is added.
   *
   * `(event: InputEvent) => void`
   * */
  onChange: PropTypes.func,
  /** The handler that is called when the file is removed.
   *
   * `(event: InputEvent) => void`
   * */
  onRemove: PropTypes.func,
  /** Define component height */
  previewHeight: PropTypes.number,
  /** Define component height */
  previewWidth: PropTypes.number,
  /** Determines the helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
};

ImageUploadField.defaultProps = {
  fileTypes: ['image'],
  previewHeight: 50,
  previewWidth: 50,
};

ImageUploadField.displayName = 'ImageUploadField';
export default ImageUploadField;
