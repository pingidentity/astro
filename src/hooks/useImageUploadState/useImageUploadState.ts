import React, { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

import { supportedImageTypes } from '../../utils/devUtils/constants/htmlElements';

interface ImageUploadStateProps {
  previewImage?: string;
  defaultPreviewImage?: string | null;
  fileTypes?: string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewHeight?: string;
  previewWidth?: string;
}

const useImageUploadState = (inputRef: RefObject<HTMLInputElement | null>,
  props: ImageUploadStateProps = {}) => {
  const {
    previewImage: existingImage,
    defaultPreviewImage: defaultPreviewNode,
    fileTypes,
    onChange,
    previewHeight,
    previewWidth,
  } = props;

  const defaultPreviewImage = useMemo(
    () => (typeof defaultPreviewNode === 'string'
      ? defaultPreviewNode
      : null),
    [defaultPreviewNode],
  );

  const [previewImage, setPreviewImage] = useState(existingImage || defaultPreviewImage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImageType, setIsImageType] = useState(true);
  const [fileName, setFileName] = useState('');

  useEffect(
    () => setPreviewImage(existingImage || defaultPreviewImage),
    [existingImage, defaultPreviewImage],
  );

  const pressPreviewButton = useCallback(() => {
    if (previewImage && previewImage !== defaultPreviewImage) {
      setIsMenuOpen(true);
    } else {
      inputRef.current?.click();
    }
  }, [defaultPreviewImage, previewImage, inputRef]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) return;

    const hasCustomFileTypes = fileTypes && fileTypes[0] !== 'image';
    const currentFileType = event.target?.files[0]?.type;
    const isSupportedFileType = supportedImageTypes.includes(currentFileType);

    // If custom file types are provided, only allow those file types
    if (hasCustomFileTypes && !fileTypes?.includes(currentFileType)) return;
    // If no custom file types are provided, only allow image file types
    if (!hasCustomFileTypes && !currentFileType.includes('image')) return;

    if (isSupportedFileType && onChange && typeof onChange === 'function') onChange(event);

    if (isSupportedFileType) {
      setIsImageType(true);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(event.target?.files[0]);
    } else {
      setIsImageType(false);
      setFileName(event.target?.files[0]?.name);
    }
  }, []);

  const handleOpenMenuChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen && previewImage && previewImage !== defaultPreviewImage) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    },
    [defaultPreviewImage, previewImage],
  );

  const removePreview = useCallback(
    () => setPreviewImage(defaultPreviewImage),
    [defaultPreviewImage],
  );

  const showFileDialog = useCallback(() => inputRef?.current?.click(), [
    inputRef,
  ]);

  const handleLabelClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (previewImage && previewImage !== defaultPreviewImage) {
        setIsMenuOpen(true);
      } else {
        showFileDialog();
      }
    },
    [previewImage, defaultPreviewImage],
  );

  const widthHeightSx = useMemo(
    () => ({
      height: previewHeight,
      width: previewWidth,
    }),
    [previewHeight, previewWidth],
  );

  return {
    defaultPreviewImage,
    defaultPreviewNode,
    fileName,
    handleInputChange,
    handleLabelClick,
    handleOpenMenuChange,
    isImageType,
    isMenuOpen,
    pressPreviewButton,
    previewImage,
    removePreview,
    showFileDialog,
    widthHeightSx,
  };
};

export default useImageUploadState;
