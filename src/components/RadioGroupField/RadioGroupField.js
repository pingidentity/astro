import React, { forwardRef, useMemo } from 'react';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { Box, FieldHelperText, Label } from '../..';
import { usePropWarning, useStatusClasses } from '../../hooks';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusPropTypes } from '../../utils/docUtils/statusProp';
import { RadioContext } from '../RadioField';

const displayName = 'RadioGroupField';

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

  const unhandledAriaProps = {
    'aria-controls': props['aria-controls'],
  };

  const helperTextId = useMemo(() => uuid(), []);

  return (
    <Box
      ref={ref}
      className={classNames}
      {...getPendoID(displayName)}
      {...unhandledAriaProps}
      {...radioGroupProps}
    >
      <Label isDisabled={isDisabled} hintText={hintText} isRequired={isRequired} variant="forms.label.radioGroup" {...labelProps}>
        {label}
      </Label>
      <Box
        variant="forms.radioGroupWrapper"
        isRow={orientation === ORIENTATION.HORIZONTAL}
        aria-labelledby={helperText && helperTextId}
        data-testid="radioGroupWrapper"
      >
        <RadioContext.Provider value={state}>
          {children}
        </RadioContext.Provider>
      </Box>
      {
        helperText && (
        <FieldHelperText status={status} sx={{ pt: 'xs' }} id={helperTextId}>
          {helperText}
        </FieldHelperText>
        )
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
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

RadioGroupField.displayName = displayName;

export default RadioGroupField;
