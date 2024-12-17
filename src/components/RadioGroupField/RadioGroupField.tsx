import React, { forwardRef, useMemo } from 'react';
import { useRadioGroup } from 'react-aria';
import { RadioGroupState, useRadioGroupState } from 'react-stately';
import { v4 as uuid } from 'uuid';

import { Box, FieldHelperText, Label } from '../..';
import { usePropWarning, useStatusClasses } from '../../hooks';
import { RadioGroupFieldProps } from '../../types/radioGroupField';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { RadioContext } from '../RadioField';

const displayName = 'RadioGroupField';

const RadioGroupField = forwardRef<HTMLDivElement, RadioGroupFieldProps>((props, ref) => {
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

  const state = useRadioGroupState(props) as RadioGroupState;
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

export default RadioGroupField;
