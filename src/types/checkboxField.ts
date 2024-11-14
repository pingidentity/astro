import { UseFieldProps } from '../hooks/useField/useField';

export interface CheckboxFieldProps extends Omit<UseFieldProps<HTMLInputElement>, 'onChange'> {
  /** Handler that is called when a key is pressed. */
  onKeyDown?: () => void;
  /** Handler that is called when a key is released. */
  onKeyUp?: () => void;
   /** Handler that is called when the element's selection state changes. */
  onChange?: (isSelected: boolean) => void;
  /** props that are spread directly into the checkbox component */
  checkBoxProps?: object
}
