import { renderHook } from '@testing-library/react';

import useOverlayPanelState from './useOverlayPanelState';

test('default useOverlayPanelState', () => {
  const { result } = renderHook(() => useOverlayPanelState());

  const obj = {
    state: {
      open: expect.any(Function),
      close: expect.any(Function),
      toggle: expect.any(Function),
      isTransitioning: expect.any(Boolean),
      setOpen: expect.any(Function),
      isOpen: expect.any(Boolean),
    },
    onClose: expect.any(Function),
    isTransitioning: expect.any(Boolean),
  };
  expect(result.current).toEqual(obj);
});
