import { act, renderHook } from '@testing-library/react-hooks';

import { modes as labelModes } from '../../components/Label/constants';
import statuses from '../../utils/devUtils/constants/statuses';

import useField from './useField';

const defaultProps = {
  autoComplete: 'off',
  className: 'test',
  containerProps: {
    id: 'test',
    statusClasses: {
      isContainer: true,
    },
  },
  controlProps: {
    id: 'test',
    statusClasses: {
      isControlInput: true,
    },
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
  labelProps: {
    statusClasses: {
      isFieldLabel: true,
    },
  },
  name: 'test',
  placeholder: 'test',
  role: 'test',
  statusClasses: {
    isTested: true,
  },
  type: 'test',
  value: 'test',
  wrapperProps: {
    id: 'test',
    statusClasses: {
      isControlWrapper: true,
    },
  },
};

test('default useField', () => {
  renderHook(() => useField());
});

test('should return props objects for field components', () => {
  const { result } = renderHook(() => useField(defaultProps));
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = result.current;

  expect(fieldContainerProps).toEqual({
    className: 'field-container has-value is-tested is-container',
    id: defaultProps.containerProps.id,
    onBlur: expect.any(Function),
    onFocus: expect.any(Function),
    sx: expect.objectContaining({ position: 'relative' }),
    statusClasses: {
      isContainer: true,
    },
  });
  expect(fieldControlInputProps).toEqual({
    autoComplete: defaultProps.autoComplete,
    autoCorrect: undefined,
    autoFocus: defaultProps.hasAutoFocus,
    className: `${defaultProps.className} field-control-input is-disabled is-read-only is-${statuses.DEFAULT} is-tested is-control-input`,
    defaultSelected: true,
    defaultValue: defaultProps.defaultValue,
    disabled: true,
    id: defaultProps.id,
    isFocused: false,
    maxLength: undefined,
    readOnly: true,
    required: true,
    onBlur: expect.any(Function),
    onChange: expect.any(Function),
    onFocus: expect.any(Function),
    name: defaultProps.name,
    placeholder: defaultProps.placeholder,
    role: defaultProps.role,
    spellCheck: undefined,
    statusClasses: {
      isControlInput: true,
    },
    type: defaultProps.type,
    value: defaultProps.value,
    'aria-label': undefined,
    'aria-labelledby': expect.any(String),
  });
  expect(fieldLabelProps).toEqual({
    children: defaultProps.label,
    className: `${defaultProps.className} field-label is-disabled is-read-only is-${statuses.DEFAULT} is-tested is-field-label`,
    hintText: undefined,
    id: expect.any(String),
    htmlFor: expect.any(String),
    isRequired: true,
    mode: undefined,
    statusClasses: {
      isFieldLabel: true,
    },
  });

  expect(fieldControlWrapperProps).toEqual({
    className: `${defaultProps.className} field-control-wrapper is-disabled is-read-only is-default is-tested is-control-wrapper`,
    id: expect.any(String),
    statusClasses: {
      isControlWrapper: true,
    },
  });
});

test('should support autocomplete additionally', () => {
  const newProps = { ...defaultProps, autocomplete: 'new-password' };
  delete newProps.autoComplete;
  const { result } = renderHook(() => useField(newProps));
  const { fieldControlInputProps } = result.current;
  expect(fieldControlInputProps).toMatchObject({ autoComplete: 'new-password' });
});

test('should return isFloatLabelActive class for container', () => {
  const { result, rerender } = renderHook(
    initialProps => useField({ ...initialProps, placeholder: null }),
    {
      initialProps: defaultProps,
    },
  );
  // Does not have the class if the label mode is not set to float
  expect(result.current.fieldContainerProps.className).not.toContain('is-float-label-active');

  // Has the class if the value is valid and label mode is float
  rerender({ ...defaultProps, labelMode: labelModes.FLOAT });
  expect(result.current.fieldContainerProps.className).toContain('is-float-label-active');

  // Does not have the class if the value is invalid
  act(() => result.current.fieldControlInputProps.onChange({ target: { value: undefined } }));
  expect(result.current.fieldContainerProps.className).not.toContain('is-float-label-active');

  // Has the class if the container has focus within it
  act(() => result.current.fieldContainerProps.onFocus({}));
  expect(result.current.fieldContainerProps.className).toContain('is-float-label');

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
  const { result } = renderHook(() => useField({
    ...defaultProps,
    defaultValue: null,
    placeholder: null,
    onChange,
    value: '',
  }),
  );
  // Empty string is not a valid value
  expect(result.current.fieldContainerProps.className).not.toContain('has-value');

  // 0 should be a valid value
  act(() => result.current.fieldControlInputProps.onChange({ target: { value: 0 } }));
  expect(result.current.fieldContainerProps.className).toContain('has-value');
  numCalls += 1;

  // undefined is not a valid value
  act(() => result.current.fieldControlInputProps.onChange({ target: { value: undefined } }));
  expect(result.current.fieldContainerProps.className).not.toContain('has-value');
  numCalls += 1;

  // a non-empty string is a valid value
  act(() => result.current.fieldControlInputProps.onChange({ target: { value: 'a' } }));
  expect(result.current.fieldContainerProps.className).toContain('has-value');
  numCalls += 1;

  // the original onChange should be called each time
  expect(numCalls).toBeGreaterThan(0);
  expect(onChange).toHaveBeenCalledTimes(numCalls);
});
