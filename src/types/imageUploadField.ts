import React from 'react';

import { UseFieldProps } from '../hooks/useField/useField';

import { PopoverMenuProps } from './popoverMenu';

export interface ImageUploadFieldProps extends Omit<UseFieldProps<HTMLInputElement>, 'onChange' | 'helperText'> {
  /** The URL or path of the currently uploaded image preview. */
  previewImage?: string;
  /** Text for the upload item in the menu. */
  uploadItemText?: string;
  /** Text for the remove item in the menu. */
  removeItemText?: string;
  /** The default image to display when no preview image is provided. */
  defaultPreviewImage?: string | React.ReactNode;
  /** Array of accepted file MIME types or type prefixes (e.g. 'image', 'image/jpeg'). */
  fileTypes?: string[];
  /** Whether the component is in a loading state. */
  isLoading?: boolean;
  /** Size of the loader spinner. */
  loaderSize?: string | number;
  /** Handler called when the uploaded image is removed. */
  onRemove?: () => void;
  /** Props passed directly to the PopoverMenu component. */
  popoverMenuProps?: Partial<PopoverMenuProps>;
  /** Height of the preview image area. */
  previewHeight?: number;
  /** Width of the preview image area. */
  previewWidth?: number;
  /** Handler called when the input value changes. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Helper text rendered below the input. */
  helperText?: React.ReactNode;
}
