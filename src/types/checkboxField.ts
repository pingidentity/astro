import { UseFieldProps } from '../hooks/useField/useField';

import { HelpHintProps } from './helpHint';

export interface CheckboxFieldProps extends Omit<UseFieldProps<HTMLInputElement>, 'onChange' | 'onKeyDown' | 'onKeyUp'> {
  /** Handler that is called when the element's selection state changes. */
  onChange?: (isSelected: boolean) => void;
  /** props that are spread directly into the checkbox component */
  checkBoxProps?: object
  /** Props object that is spread directly into the helphint element. */
  helpHintProps?: HelpHintProps
}
