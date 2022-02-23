import { renderHook } from '@testing-library/react-hooks';
import useNavBarPress from './';

const key = 'testKey';

test('using the onPress prop works as a callback', () => {
  const onPress = jest.fn();
  const setSelectedKeys = jest.fn();
  const { result } = renderHook(() => useNavBarPress({
    key,
    onPressCallback: onPress,
  }, {
    setSelectedKeys,
  }));
  result.current.onNavPress();
  expect(onPress).toHaveBeenCalled();
});

test('if no onPress prop there is no callback', () => {
  const onPress = jest.fn();
  const setSelectedKeys = jest.fn();
  const { result } = renderHook(() => useNavBarPress({ key }, { setSelectedKeys }));
  result.current.onNavPress();
  expect(onPress).not.toHaveBeenCalled();
});
