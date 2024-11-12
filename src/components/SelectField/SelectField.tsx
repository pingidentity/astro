import React, { forwardRef } from 'react';

import { usePropWarning, useSelectField } from '../../hooks';
import { SelectFieldProps } from '../../types/selectField';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';
import SelectFieldBase from '../SelectFieldBase';

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps<object>>((props, ref) => {
  /* istanbul ignore next */
  const {
    status,
    placeholder = 'Select',
    align = 'start',
    direction = 'bottom',
    scrollBoxProps = {
      margin: '300px',
    },
  } = props;
  usePropWarning(props, 'disabled', 'isDisabled');
  const { ...selectFieldProps } = useSelectField(props, ref);

  return (
    <SelectFieldBase
      placeholder={placeholder}
      align={align}
      direction={direction}
      scrollBoxProps={scrollBoxProps}
      {...props}
      {...selectFieldProps}
      aria-invalid={status === 'error' && true}
    />
  );
});


SelectField.defaultProps = {
  placeholder: 'Select',
  align: 'start',
  direction: 'bottom',
  scrollBoxProps: { maxHeight: '300px' },
  ...statusDefaultProp,
};

SelectField.displayName = 'SelectField';
export default SelectField;
