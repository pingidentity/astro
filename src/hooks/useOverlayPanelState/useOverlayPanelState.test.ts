import { renderHook } from '@testing-library/react';

import useOverlayPanelState from './useOverlayPanelState';

test('default useOverlayPanelState matches the state fields stable across react-stately versions', () => {
  const { result } = renderHook(() => useOverlayPanelState());

  const obj = {
    state: expect.objectContaining({
      open: expect.any(Function),
      close: expect.any(Function),
      toggle: expect.any(Function),
      isTransitioning: expect.any(Boolean),
      setOpen: expect.any(Function),
      isOpen: expect.any(Boolean),
      point: null,
      setPoint: expect.any(Function),
    }),
    onClose: expect.any(Function),
    isTransitioning: expect.any(Boolean),
  };
  expect(result.current).toEqual(obj);
});
