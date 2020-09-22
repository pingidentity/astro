import { renderHook } from '@testing-library/react-hooks';
import useBoxStyles from './useBoxStyles';

test('should return default styles', () => {
  const { result } = renderHook(() => useBoxStyles());
  const { styles } = result.current;
  // Have to replace whitespace, otherwise empty lines exist
  const trimmedStyles = styles.replace(/\s/g, '');

  expect(trimmedStyles).toEqual(
    expect.stringMatching('box-sizing:border-box;display:flex;flex-direction:column;outline:none;'),
  );
});

test('should return styles for row', () => {
  const { result } = renderHook(() => useBoxStyles({ isRow: true }));
  const { styles } = result.current;

  expect(styles).toEqual(
    expect.stringMatching('flex-direction:row;'),
  );
});

test('should return styles for selectors', () => {
  const { result } = renderHook(() => useBoxStyles({
    selectorStyle: {
      '&:focus': {
        color: 'white',
      },
    },
  }));
  const { styles } = result.current;

  expect(styles).toEqual(
    expect.stringMatching('&:focus{color:white;}'),
  );
});
