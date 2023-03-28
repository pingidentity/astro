import { renderHook } from '@testing-library/react-hooks';

import useOverlayPanelState from './useOverlayPanelState';

test('default useOverlayPanelState', () => {
  const { result } = renderHook(() => useOverlayPanelState());

  const obj = {
    state: {
      open: expect.any(Function),
      close: expect.any(Function),
      toggle: expect.any(Function),
      isOpen: expect.any(Boolean),
      setOpen: expect.any(Function),
    },
    onClose: expect.any(Function),
  };

  expect(result.current).toEqual(obj);
});
