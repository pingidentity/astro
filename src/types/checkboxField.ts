import { UseFieldProps } from '../hooks/useField/useField';

export interface CheckboxFieldProps extends UseFieldProps<HTMLInputElement> {
  /** Handler that is called when a key is pressed. */
  onKeyDown?: () => void;
  /** Handler that is called when a key is released. */
  onKeyUp?: () => void;
}
