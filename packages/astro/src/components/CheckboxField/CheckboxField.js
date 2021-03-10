import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useToggleState } from '@react-stately/toggle';
import { useCheckbox } from '@react-aria/checkbox';

import useField from '../../hooks/useField';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import Checkbox from '../Checkbox';
import FieldHelperText from '../FieldHelperText';
import Label from '../Label';

/**
 * Combines a checkbox, label, and helper text for a complete, form-ready solution.
 *
 * Utilizes [useCheckbox](https://react-spectrum.adobe.com/react-aria/useCheckbox.html) from React Aria and
 * [useToggleState](https://react-spectrum.adobe.com/react-stately/useToggleState.html) from React Stately.
 */
const CheckboxField = forwardRef((props, ref) => {
  const {
    label,
    controlProps = {},
    hasAutoFocus,
    helperText,
    isDefaultSelected,
    status,
  } = props;
  const checkboxProps = {
    children: label,
    autoFocus: hasAutoFocus || controlProps.hasAutoFocus,
    defaultSelected: isDefaultSelected || controlProps.isDefaultSelected,
    ...props,
    ...controlProps,
  };
  const state = useToggleState(checkboxProps);
  const checkboxRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => checkboxRef.current);

  const { inputProps } = useCheckbox(checkboxProps, state, checkboxRef);
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField({
    ...props,
    controlProps: { ...controlProps, ...inputProps },
  });

  return (
    <Box {...fieldContainerProps}>
      <Label variant="forms.label.checkbox" {...fieldLabelProps}>
        <Checkbox ref={checkboxRef} {...fieldControlProps} />
        {label}
      </Label>
      {
        helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
      }
    </Box>
  );
});

CheckboxField.propTypes = {
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the element should be selected (uncontrolled). */
  isDefaultSelected: PropTypes.bool,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /**
   * Indeterminism is presentational only. The indeterminate visual representation remains
   * regardless of user interaction.
  */
  isIndeterminate: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** Whether the element should be selected (controlled). */
  isSelected: PropTypes.bool,
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name: PropTypes.string,
  /** Determines the textarea status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
  value: PropTypes.string,
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
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
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current
   * element.
  */
  'aria-controls': PropTypes.string,
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
  /** Identifies the element that provides an error message for the object. */
  'aria-errormessage': PropTypes.string,
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps: PropTypes.shape({}),
  /** Props object that is spread directly into the input element. */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread directly into the label element. */
  labelProps: PropTypes.shape({}),
};

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
