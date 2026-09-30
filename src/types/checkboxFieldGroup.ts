import { ReactNode } from 'react';
import { AriaCheckboxGroupItemProps, AriaCheckboxGroupProps } from 'react-aria';

import { SharedFieldProps } from './shared/fieldProps';
import { HelpHintProps } from './helpHint';
import { Status } from './item';

type CheckboxFieldGroupValidation = {
  isInvalid: boolean;
  validationErrors: string[];
  validationDetails: ValidityState;
};

export type CheckboxFieldGroupOrientation = 'vertical' | 'horizontal';

export interface CheckboxFieldGroupProps
  extends Omit<AriaCheckboxGroupProps, 'label' | 'description' | 'errorMessage'>,
    Omit<SharedFieldProps, 'label' | 'helperText'> {
  /** The visible label for the group. */
  label?: ReactNode;
  /** Text rendered below the group. */
  helperText?: ReactNode;
  /** Error text rendered below the group when the group is invalid. */
  errorMessage?: ReactNode | ((validation: CheckboxFieldGroupValidation) => ReactNode);
  /** The direction in which group items are laid out. */
  orientation?: CheckboxFieldGroupOrientation;
  /** The children that consume this group's selection context. */
  children?: ReactNode;
  /** Props object that is spread directly into the help hint element. */
  helpHintProps?: HelpHintProps;
  className?: string;
}

export interface CheckboxFieldGroupItemProps
  extends Omit<AriaCheckboxGroupItemProps, 'children' | 'onChange'> {
  /** The visible label for the item. */
  label?: ReactNode;
  /** Text rendered below the item. */
  helperText?: ReactNode;
  /** The visual status applied to the item helper text and field. */
  status?: Status;
  /** Props object that is spread directly into the checkbox input. */
  controlProps?: object;
  /** Props object that is spread directly into the checkbox visual primitive. */
  checkBoxProps?: object;
  /** Whether the item should receive focus on render. */
  hasAutoFocus?: boolean;
  /** If present, renders a help hint next to the item label. */
  hintText?: string;
  /** Props object that is spread directly into the help hint element. */
  helpHintProps?: HelpHintProps;
  /** Handler called when this item's selection state changes. */
  onChange?: (isSelected: boolean) => void;
  className?: string;
}
