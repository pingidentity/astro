/* eslint-disable no-unused-vars */
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';
import { usePress } from '@react-aria/interactions';
import omit from 'lodash/omit';

import { Box, FieldHelperText, Label, Switch } from '../..';
import { useField, usePropWarning } from '../../hooks';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';

import { switchFieldPropTypes } from './switchFieldAttributes';

const displayName = 'SwitchField';

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
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    hasAutoFocus = false,
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
    <Box {...getPendoID(displayName)} {...fieldContainerProps}>
      <Label variant="forms.switch.label" {...fieldLabelProps}>
        <Box {...fieldControlWrapperProps}>
          <Switch
            ref={switchRef}
            inputProps={fieldControlInputProps}
            {...unhandledAriaProps}
            {...omit(others, 'data-pendo-id')}
          />
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

SwitchField.propTypes = switchFieldPropTypes;

SwitchField.defaultProps = {
  ...statusDefaultProp,
};

SwitchField.displayName = displayName;

export default SwitchField;
