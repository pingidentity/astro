import { renderHook } from '@testing-library/react';

import useNavBarPress from '.';

const key = 'testKey';

test('using the onPress prop works as a callback', () => {
  const onPress = jest.fn();
  const setSelectedKey = jest.fn();
  const { result } = renderHook(() => useNavBarPress({
    key,
    onPressCallback: onPress,
  }, {
    setSelectedKey,
  }));
  result.current.onNavPress();
  expect(onPress).toHaveBeenCalled();
});

test('if no onPress prop there is no callback', () => {
  const onPress = jest.fn();
  const setSelectedKey = jest.fn();
  const { result } = renderHook(() => useNavBarPress({ key }, { setSelectedKey }));
  result.current.onNavPress();
  expect(onPress).not.toHaveBeenCalled();
});
