import React from 'react';

import { UseFieldProps } from '../hooks/useField/useField';

import { TestingAttributes } from './shared/test';

export interface NumberFieldProps extends Omit<UseFieldProps<HTMLInputElement>, 'onChange'>, TestingAttributes {
  /** A custom aria-label for the decrement button.
   * If not provided, the localized string "Decrement" is used. */
  decrementAriaLabel?: string;
  /** A custom aria-label for the increment button.
   * If not provided, the localized string "Increment" is used. */
  incrementAriaLabel?: string;
  /** Formatting options for the value displayed in the number field.
   * This also affects what characters are allowed to be typed by the user.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** The amount that the input value changes with each increment or decrement "tick". */
  step?: number;
  /** The smallest value allowed for the input. */
  minValue?: number;
  /** The largest value allowed for the input. */
  maxValue?: number;
  /** The default value (uncontrolled). */
  defaultValue?: number;
  /** The current value (controlled). */
  value?: number;
  /** Handler that is called when the value changes. */
  onChange?: (value: number) => void;
  /** Handler that is called when a key is pressed. */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}
