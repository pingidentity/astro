import { renderHook } from '@testing-library/react-hooks';
import useThemedStyles from './useThemedStyles';
import { THEMES } from '../../themes/utils';

jest.mock('@pingux/end-user/end-user.css', () => ({ theme: 'end-user' }));

test('should use end-user as default theme style object', () => {
  const { result } = renderHook(() => useThemedStyles());

  expect(result.current).toEqual({ theme: THEMES.END_USER });
});
