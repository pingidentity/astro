import { renderHook } from '@testing-library/react-hooks';
import useOverlayPanelState from './useOverlayPanelState';

test('default useOverlayPanelState', () => {
  const { result } = renderHook(() => useOverlayPanelState());

  expect(result.current).toEqual(expect.objectContaining({
    open: expect.any(Function),
    close: expect.any(Function),
    toggle: expect.any(Function),
  }));
});
