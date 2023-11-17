import { renderHook, RenderHookResult } from '@testing-library/react-hooks';

import { UseFallbackImageProps } from './useFallbackImage';
import useFallbackImage from '.';

const defaultProps: UseFallbackImageProps = {
  src: 'test-src',
  onImageLoad: jest.fn(),
  onImageError: jest.fn(),
  fallbackTimeout: 5,
  onFallbackTimeout: jest.fn(),
  fallbackImage: 'test-fallback-src',
};

test('should return node if all props are correct', () => {
  const { result }: RenderHookResult<undefined, HTMLImageElement> = renderHook(
    () => useFallbackImage(defaultProps),
  );
  expect(result.current).toBeInstanceOf(HTMLImageElement);
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
