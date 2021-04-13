import React, {
  forwardRef,
  createContext,
  useContext,
  useRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { useRadio } from '@react-aria/radio';

import useField from '../../hooks/useField';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import Radio from '../Radio';
import Label from '../Label';
import FieldHelperText from '../FieldHelperText';

export const RadioContext = createContext();

/**
 * Combines a radio, label, and helper text for a complete, form-ready solution.
 *
 * Utilizes [useRadio](https://react-spectrum.adobe.com/react-aria/useRadioGroup.html) from React
 * Aria.
 */
const RadioField = forwardRef((props, ref) => {
  const {
    checkedContent,
    controlProps,
    hasAutoFocus,
    helperText,
    isDisabled: radioDisabled,
    label,
    status,
  } = props;

  const radioFieldRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => radioFieldRef.current);
  const state = useContext(RadioContext);
  const { isDisabled: groupDisabled } = state;
  const isDisabled = radioDisabled || groupDisabled;
  const { inputProps } = useRadio(
    {
      children: label,
      autoFocus: hasAutoFocus,
      isDisabled,
      ...props,
      ...controlProps,
    },
    state,
    radioFieldRef,
  );
  const { checked: isChecked } = inputProps;
  const statusClasses = { isDisabled, isChecked };
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField({
    statusClasses,
    ...props,
    controlProps: { ...controlProps, ...inputProps },
  });

  return (
    <Box variant="forms.radioField" {...fieldContainerProps}>
      <Label variant="forms.label.radio" {...fieldLabelProps}>
        <Radio ref={radioFieldRef} {...fieldControlProps} />
        {label}
      </Label>
      {
        helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
      }
      {
        isChecked &&
        checkedContent &&
        <Box variant="boxes.radioCheckedContent">
          {checkedContent}
        </Box>
      }
    </Box>
  );
});

RadioField.propTypes = {
  /** Content to display when the radio is checked. */
  checkedContent: PropTypes.node,
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /**
   * Whether the radio button is disabled or not. Shows that a selection exists, but is not
   * available in that circumstance.
  */
  isDisabled: PropTypes.bool,
  /** Whether the Radio can be interacted with but cannot have its selection state changed. */
  isReadOnly: PropTypes.bool,
  /** Whether the Radio is required. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required). */
  isRequired: PropTypes.bool,
  /** Determines the textarea status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
  value: PropTypes.string,
  /** Handler that is called when the element receives focus. */
  onFocus: PropTypes.func,
  /** Handler that is called when the element loses focus. */
  onBlur: PropTypes.func,
  /** Handler that is called when the element's focus status changes. */
  onFocusChange: PropTypes.func,
  /** Handler that is called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Handler that is called when a key is released. */
  onKeyUp: PropTypes.func,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby': PropTypes.string,
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby': PropTypes.string,
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the
   * object.
  */
  'aria-details': PropTypes.string,
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps: PropTypes.shape({}),
  /** Props object that is spread directly into the input element. */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread directly into the label element. */
  labelProps: PropTypes.shape({}),
};

RadioField.displayName = 'RadioField';

export default RadioField;
