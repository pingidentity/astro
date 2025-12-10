import { renderHook } from '@testing-library/react-hooks';

import useTypeAnimationWrapper from './useTypeAnimationWrapper';

const animationIndex = 0;
const stateIndex = 1;
const isTopLevel = false;
const shouldStartAnimation = false;
const children = [
  { props: { as: 'ul' } },
  { props: { as: 'li' } },
  { props: { as: 'ol' } },
];

describe('useTypeAnimationWrapper', () => {
  it('should not start animation if animationIndex does not match stateIndex and isTopLevel is false', () => {
    const { result } = renderHook(() => useTypeAnimationWrapper({
      animationIndex,
      stateIndex,
      isTopLevel,
      shouldStartAnimation,
      children,
    }));

    expect(result.current.shouldStart).toBe(false);
  });

  it('should start animation if animationIndex matches stateIndex and isTopLevel is true', () => {
    const { result } = renderHook(() => useTypeAnimationWrapper({
      animationIndex: 1,
      stateIndex: 1,
      isTopLevel: true,
      shouldStartAnimation,
      children,
    }));

    expect(result.current.shouldStart).toBe(true);
  });

  it('should start animation if shouldStartAnimation is true', () => {
    const { result } = renderHook(() => useTypeAnimationWrapper({
      animationIndex,
      stateIndex,
      isTopLevel,
      shouldStartAnimation: true,
      children,
    }));

    expect(result.current.shouldStart).toBe(true);
  });

  it('should detect if children contain a list', () => {
    const { result } = renderHook(() => useTypeAnimationWrapper({
      animationIndex,
      stateIndex,
      isTopLevel,
      shouldStartAnimation,
      children,
    }));

    expect(result.current.hasList).toBe(true);
  });

  it('should not detect a list if children do not contain a list', () => {
    const { result } = renderHook(() => useTypeAnimationWrapper({
      animationIndex,
      stateIndex,
      isTopLevel,
      shouldStartAnimation,
      children: [{ props: { as: 'div' } }],
    }));

    expect(result.current.hasList).toBe(false);
  });
});
