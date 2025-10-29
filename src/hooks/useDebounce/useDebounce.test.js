import { act, renderHook } from '@testing-library/react';

import useDebounce from '.';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('Updates value only after `delay` milliseconds have expired', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      { initialProps: { value: 'foo', delay: 500 } },
    );

    expect(result.current).toBe('foo');
    act(() => jest.advanceTimersByTime(510));
    expect(result.current).toBe('foo');

    rerender({ value: 'bar', delay: 500 });

    expect(result.current).toBe('foo');
    act(() => jest.advanceTimersByTime(498));
    expect(result.current).toBe('foo');
    act(() => jest.advanceTimersByTime(3));
    expect(result.current).toBe('bar');
  });
});
