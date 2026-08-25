import React, {
  forwardRef,
  useCallback,
} from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { v4 as uuid } from 'uuid';

import { Item, Menu } from '../..';
import { useLocalOrForwardRef } from '../../hooks';
import { useImageUploadState } from '../../hooks/useImageUploadState';
import { ImageUploadFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

import ImagePreviewButton from './ImagePreviewButton';
import ImageUploadFieldBase from './ImageUploadFieldBase';

const displayName = 'ImageUploadField';

const ImageUploadField = forwardRef<HTMLInputElement, ImageUploadFieldProps>((props, ref) => {
  const {
    isLoading,
    loaderSize = 10,
    onRemove,
    previewHeight = 50,
    previewWidth = 50,
    removeItemText = 'Remove Image',
    uploadItemText = 'Upload New Image',
  } = props;

  /* istanbul ignore next */
  const inputRef = useLocalOrForwardRef<HTMLInputElement>(ref);
  // Cast props to the hook's internal interface: defaultPreviewImage narrows to string|null,
  // previewHeight/previewWidth are treated as strings internally. Spread the destructured
  // (defaulted) previewHeight/previewWidth so the hook receives the defaults when not provided.
  const propsWithDefaults = { ...props, previewHeight, previewWidth };
  const stateProps = propsWithDefaults as unknown as Parameters<typeof useImageUploadState>[1];
  const state = useImageUploadState(inputRef, stateProps);

  const statusId = uuid();

  const onAction = useCallback(
    action => {
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
        default:
          break;
      }
    },
    [state.showFileDialog, onRemove, state.removePreview],
  );

  return (
    <>
      <ImageUploadFieldBase
        fileName={state.fileName}
        handleInputChange={state.handleInputChange}
        handleLabelClick={state.handleLabelClick as (event: React.MouseEvent) => void}
        handleOpenMenuChange={state.handleOpenMenuChange}
        isImageType={state.isImageType}
        isMenuOpen={state.isMenuOpen}
        ref={inputRef}
        {...getPendoID(displayName)}
        {...props}
      >
        <ImagePreviewButton
          defaultPreviewImage={state.defaultPreviewImage ?? undefined}
          defaultPreviewNode={state.defaultPreviewNode}
          isImageType={state.isImageType}
          isLoading={isLoading}
          loaderSize={loaderSize}
          onPress={state.pressPreviewButton}
          previewImage={state.previewImage ?? undefined}
          previewWidth={previewWidth}
          widthHeightSx={state.widthHeightSx as { height: string | number; width: string | number }}
          aria-haspopup={state.isMenuOpen}
        />
        <Menu onAction={onAction} aria-labelledby={statusId}>
          <Item key="upload" role="button">{uploadItemText}</Item>
          <Item key="remove" role="button">{removeItemText}</Item>
        </Menu>
      </ImageUploadFieldBase>
      <VisuallyHidden
        aria-live="polite"
        aria-hidden="true"
        role={state.isMenuOpen ? 'button' : 'status'}
        id={statusId}
      >
        {state.isMenuOpen && 'Menu pop up expanded'}
      </VisuallyHidden>
    </>
  );
});

ImageUploadField.displayName = displayName;
export default ImageUploadField;
