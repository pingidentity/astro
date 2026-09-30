import { ReactNode } from 'react';

import { BoxProps } from './box';
import { ValidPositiveInteger } from './shared';

export interface CheckboxBaseProps extends Omit<BoxProps, 'title'> {
  /** Whether the checkbox is displayed in the indeterminate (mixed) state. */
  isIndeterminate?: boolean;
  /** Whether the checkbox is checked (controlled). */
  checked?: boolean;
  /** Whether the checkbox is checked by default (uncontrolled). */
  defaultChecked?: boolean;
  /** Whether the checkbox is selected by default (uncontrolled). */
  defaultSelected?: boolean;
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean;
  /** Provides a hint for autocompletion of the input value. */
  autoComplete?: string;
  /** Provides a hint for autocorrection of the input value. */
  autoCorrect?: string;
  /** The default value of the input (uncontrolled). */
  defaultValue?: string | number;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
  /** The maximum number of characters allowed in the input. */
  maxLength?: ValidPositiveInteger;
  /** The name of the input, used when submitting form data. */
  name?: string;
  /** The placeholder text displayed when the input is empty. */
  placeholder?: string;
  /** Whether the input is read-only. */
  readOnly?: boolean;
  /** Whether the input is required. */
  required?: boolean;
  /** Whether the input can be spell-checked. */
  spellCheck?: boolean;
  /** Native input title (tooltip text). */
  title?: string;
  /** The value of the input (controlled). */
  value?: string | number;
  /** The content rendered inside the checkbox container. */
  children?: ReactNode;
}

export type CheckboxProps = CheckboxBaseProps;
