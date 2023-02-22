import { renderHook } from '@testing-library/react-hooks';

import useFallbackImage from './useFallbackImage';

const defaultProps = {
  src: 'test-src',
  fallbackImage: 'test-fallback-src',
  onImageLoad: jest.fn(),
  onImageError: jest.fn(),
  fallbackTimeout: 5,
  onFallbackTimeout: jest.fn(),
};

test('should return node if all props are correct ', () => {
  const {
    result: { current },
  } = renderHook(() => useFallbackImage(defaultProps));
  expect(current).toBeInstanceOf(HTMLImageElement);
});

test('should not trigger onImageLoad if no fallback passed', () => {
  renderHook(() => useFallbackImage({
    ...defaultProps,
    fallbackImage: null,
  }),
  );
  expect(defaultProps.onImageLoad).not.toHaveBeenCalled();
});

test('should not trigger onImageLoad if component unmounted', () => {
  const { unmount } = renderHook(() => useFallbackImage({
    ...defaultProps,
    fallbackImage: null,
  }),
  );
  unmount();
  expect(defaultProps.onImageLoad).not.toHaveBeenCalled();
});
