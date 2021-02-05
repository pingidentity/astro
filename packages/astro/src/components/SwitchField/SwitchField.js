import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { useToggleState } from '@react-stately/toggle';
import { useSwitch } from '@react-aria/switch';

import useField from '../../hooks/useField';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import FieldHelperText from '../FieldHelperText';
import Label from '../Label';
import Switch from '../Switch';

/**
 * Combines a switch, label, and helper text for a complete, form-ready solution.
 *
 * Utilizes [useSwitch](https://react-spectrum.adobe.com/react-aria/useSwitch.html) from React Aria and
 * [useToggleState](https://react-spectrum.adobe.com/react-stately/useToggleState.html) from React Stately.
 */
const SwitchField = forwardRef((props, ref) => {
  const {
    label,
    helperText,
    isDefaultSelected,
    isSelected,
    onChange,
    value,
    name,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    hasAutoFocus,
    onFocus,
    onBlur,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    status,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-details': ariaDetails,
    controlProps,
    ...others
  } = props;

  const switchRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => switchRef.current);
  const state = useToggleState({
    defaultSelected: isDefaultSelected,
    ...props,
  });

  const whitelistedProps = omit(props, Object.keys(others));
  const { inputProps } = useSwitch({
    children: label,
    ...whitelistedProps,
  }, state, switchRef);
  const statusClasses = { isSelected: inputProps.checked };
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
    <Box {...fieldContainerProps}>
      <Label variant="forms.switch.label" {...fieldLabelProps}>
        <Switch ref={switchRef} inputProps={fieldControlProps} />
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

SwitchField.propTypes = {
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the element should be selected (uncontrolled). */
  isDefaultSelected: PropTypes.bool,
  /** Whether the element should be selected (controlled). */
  isSelected: PropTypes.bool,
  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name: PropTypes.string,
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
  /** The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
  value: PropTypes.string,
  /** A list of class names to apply to the input element. */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
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
  /** Determines the textarea status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
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

SwitchField.defaultProps = {
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  hasAutoFocus: false,
  status: statuses.DEFAULT,
};

SwitchField.displayName = 'SwitchField';

export default SwitchField;
