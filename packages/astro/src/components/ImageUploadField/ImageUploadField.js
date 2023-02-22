import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { Item, Menu } from '../..';
import { useImageUploadState } from '../../hooks/useImageUploadState';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributesBasePropTypes } from '../../utils/devUtils/props/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/devUtils/props/fieldAttributes';

import ImagePreviewButton from './ImagePreviewButton';
import ImageUploadFieldBase from './ImageUploadFieldBase';

/**
 * The Image Upload Field component gives users the ability to upload a file (image by default).
 */
const ImageUploadField = forwardRef((props, ref) => {
  const { isLoading, loaderSize, onRemove, removeItemText, uploadItemText } = props;
  const inputRef = useRef();
  const state = useImageUploadState(inputRef, props);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const statusId = uuid();

  const onAction = useCallback(
    action => {
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
    <>
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
          defaultPreviewImage={state.defaultPreviewImage}
          defaultPreviewNode={state.defaultPreviewNode}
          isImageType={state.isImageType}
          isLoading={isLoading}
          loaderSize={loaderSize}
          onPress={state.pressPreviewButton}
          previewHeight={props?.previewHeight}
          previewImage={state.previewImage}
          previewWidth={props?.previewWidth}
          widthHeightSx={state.widthHeightSx}
          aria-haspopup={state.isMenuOpen}
        />
        <Menu onAction={onAction} aria-labelledby={statusId}>
          <Item key="upload" role="button">{uploadItemText}</Item>
          <Item key="remove" role="button">{removeItemText}</Item>
        </Menu>
      </ImageUploadFieldBase>
      <VisuallyHidden aria-live="polite" role={state.isMenuOpen ? 'button' : 'status'} id={statusId}>{state.isMenuOpen && 'Menu pop up expanded'}</VisuallyHidden>
    </>
  );
});

ImageUploadField.propTypes = {
  /** Image preview (controlled), used to represent the current image state. */
  previewImage: PropTypes.string,
  /** Text that renders in the upload menu item. */
  uploadItemText: PropTypes.string,
  /** Text that renders in the remove menu item. */
  removeItemText: PropTypes.string,
  /** Default image preview (uncontrolled), used when no previewImage is present. */
  defaultPreviewImage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
  /** Loading indicator size */
  loaderSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

ImageUploadField.defaultProps = {
  fileTypes: ['image'],
  loaderSize: 10,
  previewHeight: 50,
  previewWidth: 50,
  uploadItemText: 'Upload New Image',
  removeItemText: 'Remove Image',
};

ImageUploadField.displayName = 'ImageUploadField';
export default ImageUploadField;
