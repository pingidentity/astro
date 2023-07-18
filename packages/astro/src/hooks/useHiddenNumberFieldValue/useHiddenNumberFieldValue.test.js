import { renderHook } from '@testing-library/react-hooks';

import useHiddenNumberFieldValue from './useHiddenNumberFieldValue';

test('When number is not currency, negative values return negative values', () => {
  const { result } = renderHook(() => useHiddenNumberFieldValue({
    isCurrency: false,
    numberValue: -1,
  }),
  );

  expect(result.current).toBe(-1);
});

test('When number is currency, it always returns the absolute value', () => {
  const { result } = renderHook(() => useHiddenNumberFieldValue({
    isCurrency: true,
    numberValue: -1,
  }),
  );

  expect(result.current).toBe(1);
});

test('When number is not currency, positive values return positive numbers', () => {
  const { result } = renderHook(() => useHiddenNumberFieldValue({
    isCurrency: false,
    numberValue: 2,
  }),
  );

  expect(result.current).toBe(2);
});
