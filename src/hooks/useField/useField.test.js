import { renderHook } from '@testing-library/react-hooks';

import useField from './useField';
import statuses from '../../utils/devUtils/constants/statuses';

const defaultProps = {
  autocomplete: 'off',
  className: 'test',
  containerProps: {
    id: 'test',
  },
  controlProps: {
    id: 'test',
  },
  defaultValue: 'test',
  hasAutoFocus: true,
  id: 'test',
  isDefaultSelected: true,
  isDisabled: true,
  isReadOnly: true,
  isRequired: true,
  isSelected: true,
  label: 'test',
  name: 'test',
  placeholder: 'test',
  role: 'test',
  statusClasses: {
    isTested: true,
  },
  type: 'test',
  value: 'test',
};

test('default useField', () => {
  renderHook(() => useField());
});

test('should return props objects for field components', () => {
  const { result } = renderHook(() => useField(defaultProps));
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = result.current;

  expect(fieldContainerProps).toEqual({
    id: defaultProps.containerProps.id,
  });
  expect(fieldControlProps).toEqual({
    autocomplete: defaultProps.autocomplete,
    autoFocus: defaultProps.hasAutoFocus,
    className: `${defaultProps.className} is-disabled is-${statuses.DEFAULT} is-tested`,
    defaultSelected: true,
    defaultValue: defaultProps.defaultValue,
    disabled: true,
    id: defaultProps.id,
    readOnly: true,
    required: true,
    onBlur: expect.any(Function),
    onChange: undefined,
    onFocus: expect.any(Function),
    name: defaultProps.name,
    placeholder: defaultProps.placeholder,
    role: defaultProps.role,
    type: defaultProps.type,
    value: defaultProps.value,
    'aria-label': undefined,
    'aria-labelledby': expect.any(String),
  });
  expect(fieldLabelProps).toEqual({
    children: defaultProps.label,
    className: `${defaultProps.className} is-disabled is-${statuses.DEFAULT} is-tested`,
    id: expect.any(String),
    htmlFor: expect.any(String),
    isRequired: true,
  });
});
