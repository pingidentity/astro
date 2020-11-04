import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';
import Box from '../Box';
import Label from '../Label';
import { RadioContext } from '../RadioField';

/**
 * Radio group wrapper for individual `Radio` components.
 * Built on top of the [Box from Rebass Forms](https://rebassjs.org/box) and uses the
 * available [props from Rebass](https://rebassjs.org/props/).
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useRadioGroup.html) and
 * [React Stately](https://react-spectrum.adobe.com/react-stately/useRadioGroupState.html).
 */
const RadioGroup = forwardRef((props, ref) => {
  const { children, isDisabled, label } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <Box
      ref={ref}
      {...radioGroupProps}
    >
      <Label isDisabled={isDisabled} {...labelProps}>
        {label}
      </Label>
      <RadioContext.Provider value={{ isDisabled, ...state }}>
        {children}
      </RadioContext.Provider>
    </Box>
  );
});

RadioGroup.propTypes = {
  /** The name of the RadioGroup, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name_and_radio_buttons). */
  name: PropTypes.string,
  /** The current value (controlled). */
  value: PropTypes.string,
  /** The default value (uncontrolled). */
  defaultValue: PropTypes.string,
  /** Handler that is called when the value changes. */
  onChange: PropTypes.func,
  /** Whether the radio group is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /**
   * The content to display as the label. If not set, It is recommended to set an aria-label or
   * aria-labelledby attribute for accessibility.
  */
  label: PropTypes.node,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
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
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
