import React from 'react';
import { ThemeUICSSObject } from 'theme-ui';

import { LabelProps, Status, ValidPositiveInteger } from '.';

export type RenderFieldFunction = (
  id: string,
  fieldValue: string,
  onFieldValueChange: (e: React.ChangeEvent, fieldId: string) => void,
  onFieldDelete: (fieldId: string) => void,
  isDisabled: boolean,
  otherFieldProps?: Record<string, string>
) => React.ReactNode;

export interface FieldValue {
  id: string;
  value?: string;
  onComponentRender?: RenderFieldFunction;
  fieldValue?: string;
}

export interface ArrayFieldProps {
  /** Label for add button */
  addButtonLabel?: string;
  /** The default value for the array input field (uncontrolled). */
  defaultValue?: FieldValue[];
  /** The default value of the array input field (controlled). */
  value?: FieldValue[];
  /** The rendered label for the field. */
  label?: React.ReactNode;
  /** Props object that is spread directly into the label element. */
  labelProps?: LabelProps;
  /** Text to display before add button. Useful for errors or other info. */
  helperText?: React.ReactNode;
  /** Callback for changing array field data  */
  onChange?: (value: FieldValue[]) => void;
  /** Callback for adding new empty field */
  onAdd?: () => void;
  /** Callback for deleting a field */
  onDelete?: (fieldId: string) => void;
  /** Render prop to display an input field */
  renderField?: RenderFieldFunction;
  /** Determines the maximum number of items */
  maxSize?: ValidPositiveInteger;
  /** Text to display when the maximum number of items is reached */
  maxSizeText?: React.ReactNode;
  sx?: ThemeUICSSObject;
  status?: Status;
  /** Props object that is spread directly into the wrapper rendering the fields. */
  fieldControlWrapperProps?: Record<string, string>;
  /** slots that render on either the left or right side of the add more button */
  slots?: {
    right?: React.ReactNode,
    left?: React.ReactNode,
  }
}

export interface ArrayFieldDeleteButtonProps {
  id?: number;
  isDisabled?: boolean;
  onDelete?: (id?: number) => void;
}
