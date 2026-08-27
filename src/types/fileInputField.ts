import React from 'react';

import { ContainerProps, ControlProps } from '../hooks/useField/useField';

import { BoxProps } from './box';
import { ButtonProps } from './button';
import { HelpHintProps } from './helpHint';
import { IconProps } from './icon';
import { Status } from './item';
import { LabelProps } from './label';
import { DOMAttributes, StyleProps } from './shared';
import { TextProps } from './text';

export interface FileListItem {
  /** The File object from the browser File API. */
  fileObj?: object;
  /** Unique identifier for the file (required). */
  id: string;
  /** Display name for the file (required). */
  name: string;
  /** URL to download the file. */
  downloadLink?: string;
  /** Status of the file upload. */
  status?: Status;
}

export interface FileInputFieldProps extends StyleProps, DOMAttributes {
  /** Props object that is spread directly into the select button element. */
  buttonProps?: ButtonProps;
  /** Default button text that will be changed to the file name once a file is uploaded. */
  defaultButtonText?: string;
  /** Default array of objects for uploaded files (uncontrolled). */
  defaultFileList?: FileListItem[];
  /** Array of accepted file type extensions or MIME type strings. */
  fileTypes?: string[];
  /** Array of objects for uploaded files (controlled). */
  fileList?: FileListItem[];
  /** Text rendered below the input. */
  helperText?: string | React.ReactNode;
  /** Props object that is spread directly into the helphint element. */
  helpHintProps?: HelpHintProps;
  /** Props object that is spread directly into the icon container element. */
  iconContainerProps?: BoxProps;
  /** Props object that is spread directly into the icon element. */
  iconProps?: IconProps;
  /** Whether the field is disabled. */
  isDisabled?: boolean;
  /** Whether to render the select trigger as an icon button. */
  isIconButton?: boolean;
  /** Determines whether the loading indicator is shown. */
  isLoading?: boolean;
  /** Defines whether the input can accept multiple files. */
  isMultiple?: boolean;
  /** The rendered label for the field. */
  label?: React.ReactNode;
  /** Handler called when files are selected or dropped.
   *
   * `(event: React.ChangeEvent<HTMLInputElement> | React.DragEvent, files: FileList
   * | File[]) => void`
   */
  onFileSelect?: (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent,
    files: FileList | File[]
  ) => void;
  /** Handler called when an uploaded file is removed.
   *
   * `(e: React.SyntheticEvent, fileId: string) => void`
   */
  onRemove?: (e: React.SyntheticEvent, fileId: string) => void;
  /** Determines the field status indicator and helper text styling. */
  status?: Status;
  /** Props object that is spread into the field text component. */
  textProps?: TextProps;
  /** Props object that is spread into the container element. */
  containerProps?: ContainerProps;
  /** Props object that is spread into the control element. */
  controlProps?: ControlProps;
  /** Props object that is spread into the control wrapper element. */
  controlWrapperProps?: BoxProps;
  /** Props object that is spread into the label element. */
  labelProps?: LabelProps;
}

export interface FileItemProps {
  /** URL to download the file. */
  downloadLink?: string;
  /** Handler called when a file is deleted.
   *
   * `(e: React.SyntheticEvent, id: string) => void`
   */
  handleFileDelete: (e: React.SyntheticEvent, id: string) => void;
  /** The aria-describedby id from the helper text element. */
  helperTextId?: string;
  /** Unique identifier for the file. */
  id: string;
  /** Whether the item is disabled. */
  isDisabled?: boolean;
  /** Display name for the file. */
  name: string;
  /** Determines the file item status indicator styling. */
  status?: Status;
  /** Props object that is spread into the file name text component. */
  textProps?: TextProps;
}

export interface FileSelectProps extends DOMAttributes {
  /** Text to display in the select button. */
  buttonText?: string;
  /** Handler called when the select button is pressed. */
  handleFileSelect?: () => void;
  /** Whether the select button is disabled. */
  isDisabled?: boolean;
  /** Props object that is spread into the button text component. */
  textProps?: TextProps;
}
