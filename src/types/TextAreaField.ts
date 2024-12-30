import { ReactNode } from 'react';

import { SharedFieldProps } from './shared/fieldProps';
import { TestingAttributes } from './shared/test';
import { ValidPositiveInteger } from './shared';

export interface TextAreaFieldProps extends TestingAttributes, SharedFieldProps{
  /** Whether the textarea is unable to be resized. */
  isUnresizable?: boolean,
  /**
   * Callback fired when the value is changed on the textarea element.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: ((e: any) => void),
  /**
   * Callback fired when focus is lost on the textarea element.
   */
  onBlur?: () => void,
  /**
   * Callback fired when focussed on the textarea element.
   */
  onFocus?: () => void,
  /**
   * Callback fired when textfield is resized.
   */
  resizeCallback?: () => void,
  /** Add max Length to input value */
  maxLength?: ValidPositiveInteger,
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator?: boolean,
  /** Whether the field is required. */
  isRequired?: boolean,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly?: boolean,
  /** Whether the field is disabled. */
  isDisabled?: boolean,
  /** The value for the textarea element (controlled). */
  value?: string,
  /** The number of rows to display for the textarea. Controls the default height. */
  rows?: number,
  /** Provides a way to insert markup in specified places. */
  slots?: {
    /** The given node will be inserted into the field container. */
    inContainer: ReactNode,
  },
  /** The unique identifier for the textarea element. */
  id?: string;
  /** The name for the textarea element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea). */
  name?: string;
}
