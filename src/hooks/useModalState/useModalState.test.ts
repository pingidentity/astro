import { act, renderHook } from '@testing-library/react';

import useModalState from './useModalState';

test('default return', () => {
  const { result } = renderHook(() => useModalState());

  expect(result.current).toEqual(expect.objectContaining({
    isOpen: false,
    open: expect.any(Function),
    close: expect.any(Function),
    toggle: expect.any(Function),
    isTransitioning: expect.any(Boolean),
  }));
});

test('isDefaultOpen returns uncontrolled state', () => {
  const { result } = renderHook(() => useModalState({ isDefaultOpen: true }));

  expect(result.current).toEqual(expect.objectContaining({
    isOpen: true,
    open: expect.any(Function),
    close: expect.any(Function),
    toggle: expect.any(Function),
    isTransitioning: expect.any(Boolean),
  }));

  act(() => result.current.close());
  expect(result.current.isOpen).toBe(false);
  act(() => result.current.open());
  expect(result.current.isOpen).toBe(true);
  act(() => result.current.toggle());
  expect(result.current.isOpen).toBe(false);
});

test('isOpen when true returns controlled state', () => {
  const { result } = renderHook(() => useModalState({ isOpen: true }));

  expect(result.current).toEqual(expect.objectContaining({
    isOpen: true,
    open: expect.any(Function),
    close: expect.any(Function),
    toggle: expect.any(Function),
    isTransitioning: expect.any(Boolean),
  }));

  act(() => result.current.close());
  expect(result.current.isOpen).not.toBe(false);
  act(() => result.current.toggle());
  expect(result.current.isOpen).not.toBe(false);
});

test('isOpen when false returns controlled state', () => {
  const { result } = renderHook(() => useModalState({ isOpen: false }));

  expect(result.current).toEqual(expect.objectContaining({
    isOpen: false,
    open: expect.any(Function),
    close: expect.any(Function),
    toggle: expect.any(Function),
    isTransitioning: expect.any(Boolean),
  }));

  act(() => result.current.open());
  expect(result.current.isOpen).not.toBe(true);
  act(() => result.current.toggle());
  expect(result.current.isOpen).not.toBe(true);
});

test('onOpenChange callback is triggered', () => {
  const onOpenChange = jest.fn();
  const { result } = renderHook(() => useModalState({ onOpenChange }));

  expect(result.current).toEqual(expect.objectContaining({
    isOpen: false,
    open: expect.any(Function),
    close: expect.any(Function),
    toggle: expect.any(Function),
    isTransitioning: expect.any(Boolean),
  }));

  expect(onOpenChange).not.toHaveBeenCalled();
  act(() => result.current.open());
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
  act(() => result.current.close());
  expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
  act(() => result.current.toggle());
  expect(onOpenChange).toHaveBeenNthCalledWith(3, true);
});
