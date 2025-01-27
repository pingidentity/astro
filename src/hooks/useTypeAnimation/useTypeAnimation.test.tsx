import { act, renderHook } from '@testing-library/react-hooks';

import useTypeAnimation from './useTypeAnimation';

const setAnimationIndex = jest.fn();
const animationIndex = 0;
const text = 'Hello';
const delay = 100;

const defaultProps = {
  text,
  delay,
  setAnimationIndex,
  animationIndex,
  shouldStartAnimation: true,
};

describe('useTypeAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should type out text with delay', () => {
    const { result } = renderHook(() => useTypeAnimation(defaultProps));

    expect(result.current).toBe('');

    for (let i = 0; i < text.length; i += 1) {
      act(() => {
        jest.advanceTimersByTime(delay);
      });
      expect(result.current).toBe(text.slice(0, i + 1));
    }

    expect(result.current).toBe(text);
  });

  it('should NOT render text when shouldStartAnimation = false', () => {
    const { result } = renderHook(() => useTypeAnimation({
      ...defaultProps, shouldStartAnimation: false,
    }));

    expect(result.current).toBe('');

    for (let i = 0; i < text.length; i += 1) {
      act(() => {
        jest.advanceTimersByTime(delay);
      });
      expect(result.current).toBe('');
    }

    expect(result.current).toBe('');
  });
});
