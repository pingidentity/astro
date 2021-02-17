import { renderHook } from '@testing-library/react-hooks';
import EndUserStyles from '@pingux/end-user/end-user.css';
import useThemedStyles from './useThemedStyles';
import { THEMES } from '../../themes/utils';

jest.mock('@pingux/end-user/end-user.css', () => ({ theme: 'end-user' }));

test('should use end-user as default theme style object', () => {
  const { result } = renderHook(() => useThemedStyles());

  expect(result.current).toEqual(EndUserStyles);
});

test('should return null if theme is astro', () => {
  const { result } = renderHook(() => useThemedStyles(THEMES.ASTRO));

  expect(result.current).toEqual(null);
});
