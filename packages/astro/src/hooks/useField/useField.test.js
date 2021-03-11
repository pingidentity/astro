import { renderHook, act } from '@testing-library/react-hooks';

import useField from './useField';
import statuses from '../../utils/devUtils/constants/statuses';
import { modes as labelModes } from '../../components/Label/constants';

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
    className: 'field-container has-value',
    id: defaultProps.containerProps.id,
    onBlur: expect.any(Function),
    onFocus: expect.any(Function),
    sx: expect.objectContaining({ position: 'relative' }),
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
    onChange: expect.any(Function),
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

test('should return isFloatLabelActive class for container', () => {
  const { result, rerender } = renderHook(initialProps => useField(initialProps), {
    initialProps: defaultProps,
  });
  // Does not have the class if the label mode is not set to float
  expect(result.current.fieldContainerProps.className).not.toContain('is-float-label-active');

  // Has the class if the value is valid and label mode is float
  rerender({ ...defaultProps, labelMode: labelModes.FLOAT });
  expect(result.current.fieldContainerProps.className).toContain('is-float-label-active');

  // Does not have the class if the value is invalid
  act(() => result.current.fieldControlProps.onChange({ target: { value: undefined } }));
  expect(result.current.fieldContainerProps.className).not.toContain('is-float-label-active');

  // Has the class if the container has focus within it
  act(() => result.current.fieldContainerProps.onFocus({}));
  expect(result.current.fieldContainerProps.className).toContain('is-float-label-active');

  // Does not have the class if the container loses focus within it
  act(() => result.current.fieldContainerProps.onBlur({ currentTarget: { contains: jest.fn() } }));
  expect(result.current.fieldContainerProps.className).not.toContain('is-float-label-active');

  // Has the class if the mode is float and the isFloatLabelActive containerProp is passed in
  rerender({
    ...defaultProps,
    labelMode: labelModes.FLOAT,
    containerProps: {
      isFloatLabelActive: true,
    },
  });
  expect(result.current.fieldContainerProps.className).toContain('is-float-label-active');
});

test('should return isLeftLabel class for container', () => {
  const { result, rerender } = renderHook(initialProps => useField(initialProps), {
    initialProps: defaultProps,
  });
  // Does not have the class if the label mode is not set to left
  expect(result.current.fieldContainerProps.className).not.toContain('is-left-label');

  // Has the class if the value is valid and label mode is left
  rerender({ ...defaultProps, labelMode: labelModes.LEFT });
  expect(result.current.fieldContainerProps.className).toContain('is-left-label');
});

test('should return hasValue class for container when onChange updates internal state', () => {
  const onChange = jest.fn();
  let numCalls = 0;
  const { result } = renderHook(() => useField({ ...defaultProps, onChange, value: '' }));
  // Empty string is not a valid value
  expect(result.current.fieldContainerProps.className).not.toContain('has-value');

  // 0 should be a valid value
  act(() => result.current.fieldControlProps.onChange({ target: { value: 0 } }));
  expect(result.current.fieldContainerProps.className).toContain('has-value');
  numCalls += 1;

  // undefined is not a valid value
  act(() => result.current.fieldControlProps.onChange({ target: { value: undefined } }));
  expect(result.current.fieldContainerProps.className).not.toContain('has-value');
  numCalls += 1;

  // a non-empty string is a valid value
  act(() => result.current.fieldControlProps.onChange({ target: { value: 'a' } }));
  expect(result.current.fieldContainerProps.className).toContain('has-value');
  numCalls += 1;

  // the original onChange should be called each time
  expect(numCalls).toBeGreaterThan(0);
  expect(onChange).toHaveBeenCalledTimes(numCalls);
});
