import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import Label from '../Label';
import { RadioContext } from '../RadioField';
import FieldHelperText from '../FieldHelperText';
import { useStatusClasses, usePropWarning } from '../../hooks';
import ORIENTATION from '../../utils/devUtils/constants/orientation';

/**
 * Radio group component for a single-choice list of options.
 *
 * Utilizes [useRadioGroup](https://react-spectrum.adobe.com/react-aria/useRadioGroup.html) from
 * React Aria and
 * [useRadioGroupState](https://react-spectrum.adobe.com/react-stately/useRadioGroupState.html)
 * from React Stately.
 */
const RadioGroupField = forwardRef((props, ref) => {
  const {
    children,
    className,
    helperText,
    isDisabled,
    isRequired,
    hintText,
    label,
    orientation,
    status,
  } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);
  const { classNames } = useStatusClasses(className, {
    'is-horizontal': orientation === ORIENTATION.HORIZONTAL,
  });
  usePropWarning(props, 'disabled', 'isDisabled');

  return (
    <Box
      ref={ref}
      className={classNames}
      {...radioGroupProps}
    >
      <Label isDisabled={isDisabled} hintText={hintText} isRequired={isRequired} variant="forms.label.radioGroup" {...labelProps}>
        {label}
      </Label>
      <Box
        variant="forms.radioGroupWrapper"
        isRow={orientation === ORIENTATION.HORIZONTAL}
      >
        <RadioContext.Provider value={{ isDisabled, ...state }}>
          {children}
        </RadioContext.Provider>
      </Box>
      {
        helperText &&
        <FieldHelperText status={status} sx={{ pt: 'xs' }}>
          {helperText}
        </FieldHelperText>
      }
    </Box>
  );
});

RadioGroupField.propTypes = {
  /** The name of the RadioGroupField, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name_and_radio_buttons). */
  name: PropTypes.string,
  /** The current value (controlled). */
  value: PropTypes.string,
  /** The default value (uncontrolled). */
  defaultValue: PropTypes.string,
  /** Text to display after the radio group label. Useful for errors or other info. */
  helperText: PropTypes.node,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /** Determines the arrangement of the radios. */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Determines the helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /**
   * Handler that is called when the value changes.
   *
   * `(newValue) => void`
   */
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

RadioGroupField.displayName = 'RadioGroupField';

export default RadioGroupField;
