import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';
import { usePress } from '@react-aria/interactions';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { Box, FieldHelperText, Label, Switch } from '../..';
import { useField, usePropWarning } from '../../hooks';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';

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
    controlProps,
    ...others
  } = props;

  const switchRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => switchRef.current);
  const state = useToggleState({
    defaultSelected: isDefaultSelected,
    ...props,
  });

  const { pressProps } = usePress({ isDisabled });

  const whitelistedProps = omit(props, Object.keys(others));
  const { inputProps } = useSwitch({
    children: label,
    ...whitelistedProps,
    'aria-label': 'switch-field',
  }, state, switchRef);
  const statusClasses = { isSelected: inputProps.checked };
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    statusClasses,
    ...pressProps,
    ...props,
    controlProps: { ...controlProps, ...inputProps },
  });

  const unhandledAriaProps = {
    'aria-controls': others['aria-controls'],
    'aria-errormessage': others['aria-errormessage'],
  };

  return (
    <Box {...fieldContainerProps}>
      <Label variant="forms.switch.label" {...fieldLabelProps}>
        <Box {...fieldControlWrapperProps}>
          <Switch ref={switchRef} inputProps={fieldControlInputProps} {...unhandledAriaProps} />
        </Box>
        {label}
      </Label>
      {
        helperText
        && (
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
        )
      }
    </Box>
  );
});

SwitchField.propTypes = {
  /** A list of class names to apply to the input element. */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the element should be selected (uncontrolled). */
  isDefaultSelected: PropTypes.bool,
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
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
  /** Handler that is called when the element loses focus. */
  onBlur: PropTypes.func,
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
  /** Handler that is called when the element receives focus. */
  onFocus: PropTypes.func,
  /** Handler that is called when the element's focus status changes. */
  onFocusChange: PropTypes.func,
  /** Handler that is called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Handler that is called when a key is released. */
  onKeyUp: PropTypes.func,
  /** The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
  value: PropTypes.string,
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

SwitchField.defaultProps = {
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  hasAutoFocus: false,
  ...statusDefaultProp,
};

SwitchField.displayName = 'SwitchField';

export default SwitchField;
