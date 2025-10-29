import { renderHook } from '@testing-library/react';

import useStatusClasses from './useStatusClasses';

test('should return empty', () => {
  const { result } = renderHook(() => useStatusClasses());
  const { classNames } = result.current;

  expect(classNames).toBe('');
});

test('should return default', () => {
  const { result } = renderHook(() => useStatusClasses('default'));
  const { classNames } = result.current;

  expect(classNames).toBe('default');
});

test('should return statuses without default', () => {
  const statuses = { isDisabled: true, isBlah: false, isFocused: true };
  const { result } = renderHook(() => useStatusClasses(null, statuses));
  const { classNames } = result.current;

  expect(classNames).toBe('is-disabled is-focused');
});

test('should return statuses with default', () => {
  const statuses = { isDisabled: true, isBlah: false, isFocused: true };
  const { result } = renderHook(() => useStatusClasses('default', statuses));
  const { classNames } = result.current;

  expect(classNames).toBe('default is-disabled is-focused');
});
