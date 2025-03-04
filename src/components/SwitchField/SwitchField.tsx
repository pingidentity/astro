import React, { forwardRef } from 'react';
import { useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';
import { usePress } from '@react-aria/interactions';
import { ToggleState, ToggleStateOptions } from '@react-stately/toggle';
import omit from 'lodash/omit';

import { Box, FieldHelperText, Label, Switch } from '../..';
import { useField, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { UseFieldProps } from '../../hooks/useField/useField';
import { SwitchFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';

const displayName = 'SwitchField';

const SwitchField = forwardRef<HTMLInputElement, SwitchFieldProps>((props, ref) => {
  const {
    label,
    helperText,
    isDefaultSelected,
    isDisabled,
    status,
    controlProps,
    name,
    ...others
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');
  const switchRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  const state = useToggleState({
    defaultSelected: isDefaultSelected,
    ...props,
  } as ToggleStateOptions) as ToggleState;

  const { pressProps } = usePress({ isDisabled });

  const whitelistedProps = omit(props, Object.keys(others));

  const { inputProps } = useSwitch({
    children: label,
    ...whitelistedProps,
    'aria-label': others['aria-label'] || 'switch-field',
  }, state, switchRef);

  const statusClasses = { isSelected: inputProps.checked ?? false };

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
  } as UseFieldProps<SwitchFieldProps>);

  const unhandledAriaProps = {
    'aria-controls': others['aria-controls'],
    'aria-errormessage': others['aria-errormessage'],
  };

  return (
    <Box {...getPendoID(displayName)} {...fieldContainerProps}>
      <Label variant="forms.switch.label" {...fieldLabelProps}>
        <Box
          {...fieldControlWrapperProps}
          sx={{
            ...fieldControlWrapperProps.sx,
            flexShrink: 0,
          }}
        >
          <Switch
            ref={switchRef}
            inputProps={fieldControlInputProps}
            name={name}
            {...unhandledAriaProps}
            {...omit(others, 'data-pendo-id', 'aria-label')}
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

SwitchField.defaultProps = {
  status: statuses.DEFAULT,
  isDisabled: false,
};

SwitchField.displayName = displayName;

export default SwitchField;
