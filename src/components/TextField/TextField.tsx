import React, { forwardRef, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { Box, FieldHelperText, Input, Label } from '../..';
import { useColumnStyles, useField, useLabelHeight, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { FieldControlInputProps, UseFieldProps } from '../../hooks/useField/useField';
import { LabelModeProps, TextFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';

const displayName = 'TextField';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { helperText, helpHintProps, slots, status } = props;

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField(props as UseFieldProps<TextFieldProps>);

  const inputRef = useLocalOrForwardRef<HTMLInputElement>(ref);
  const labelRef = useRef(null);

  usePropWarning(props, 'disabled', 'isDisabled');

  const { isLabelHigher } = useLabelHeight({ labelRef, inputRef });
  const columnStyleProps = useColumnStyles({ labelMode: props.labelMode as LabelModeProps });

  const helperTextId = uuid();

  return (
    <Box
      variant="forms.input.fieldContainer"
      {...getPendoID(displayName)}
      {...fieldContainerProps}
      sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }}
    >
      <Label
        {...fieldLabelProps}
        ref={labelRef}
        sx={isLabelHigher ? { gridRow: '1/5' } : {}}
        helpHintProps={helpHintProps}
      />
      <Box variant="forms.input.fieldControlWrapper" {...fieldControlWrapperProps}>
        {slots?.beforeInput}
        <Input
          ref={inputRef}
          {...fieldControlInputProps as Omit<FieldControlInputProps, 'onChange'>}
          aria-invalid={status === 'error' && true}
          aria-describedby={[helperText && helperTextId, fieldControlInputProps['aria-describedby']].join(fieldControlInputProps['aria-describedby'] ? ' ' : '')}
        />
        {slots?.inContainer}
      </Box>
      {
        helperText
        && (
          <FieldHelperText status={status} id={helperTextId}>
            {helperText}
          </FieldHelperText>
        )

      }
    </Box>
  );
});

TextField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  ...statusDefaultProp,
};

TextField.displayName = displayName;

export default TextField;
