import { act, renderHook } from '@testing-library/react-hooks';

import useTypeAnimation from './useTypeAnimation';

const setAnimationIndex = jest.fn();
const animationIndex = 0;
const text = 'Hello World';
const delay = 100;
const splitText = text.split(' ');

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

    expect(result.current.currentText).toBe('');

    for (let i = 0; i < splitText.length; i += 1) {
      act(() => {
        jest.advanceTimersByTime(delay);
      });
      expect(result.current.currentText).toBe(splitText.slice(0, i + 1).join(' '));
    }

    expect(result.current.currentText).toBe(text);
  });

  it('should NOT render text when shouldStartAnimation = false', () => {
    const { result } = renderHook(() => useTypeAnimation({
      ...defaultProps, shouldStartAnimation: false,
    }));

    expect(result.current.currentText).toBe('');

    for (let i = 0; i < text.length; i += 1) {
      act(() => {
        jest.advanceTimersByTime(delay);
      });
      expect(result.current.currentText).toBe('');
    }

    expect(result.current.currentText).toBe('');
  });
});
