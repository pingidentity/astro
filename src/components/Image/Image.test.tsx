import React from 'react';
import { act } from '@testing-library/react';

import { UseFallbackImageProps } from '../../hooks/useFallbackImage/useFallbackImage';
import { ImageProps } from '../../types/image';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Image from '.';

const testSrc = 'test-src';
const testFallbackSrc = 'test-fallback-src';
const testFallbackAlt = 'test-fallback-alt';
const skeletonImageId = 'skeleton-image';

const defaultProps = {
  src: testSrc,
  fallbackImage: testFallbackSrc,
  fallbackAlt: testFallbackAlt,
};

const getComponent = (
  props: ImageProps = {},
  { renderFn = render } = {},
) => renderFn(<Image {...defaultProps} {...props} />);


// Need to be added to each test file to test accessibility using axe.

universalComponentTests({
  renderComponent: props => <Image {...defaultProps} {...props} />,
});

let fallbackImageObj: UseFallbackImageProps | null = null;

jest.mock('../../hooks/useFallbackImage', () => props => {
  fallbackImageObj = { ...props };
  return [];
});

test('an image is rendered', () => {
  getComponent();
  act(() => {
    if (fallbackImageObj) {
      fallbackImageObj.onImageLoad();
    }
  });
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
});

test('an image is rendered with no fallback', () => {
  getComponent({ fallbackImage: undefined });
  act(() => {
    if (fallbackImageObj) {
      fallbackImageObj.onImageLoad();
    }
  });
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
});

test('image shows disabled status', () => {
  getComponent({ isDisabled: true });
  act(() => {
    if (fallbackImageObj) {
      fallbackImageObj.onImageLoad();
    }
  });
  const img = screen.getByRole('img');
  expect(img).toHaveClass('is-disabled');
});

test('image with alt text', () => {
  getComponent({ alt: 'Test' });
  act(() => {
    if (fallbackImageObj) {
      fallbackImageObj.onImageLoad();
    }
  });
  expect(screen.getByAltText('Test')).toBeInTheDocument();
});

test('image source is able to be changed', () => {
  const src2 = 'second-src';
  const { rerender } = getComponent();
  act(() => {
    if (fallbackImageObj) {
      fallbackImageObj.onImageLoad();
    }
  });

  expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);

  rerender(<Image {...defaultProps} src={src2} />);

  act(() => {
    if (fallbackImageObj) {
      fallbackImageObj.onImageLoad();
    }
  });
  expect(screen.getByRole('img')).toHaveAttribute('src', src2);
});

describe('test Image component with useFallbackImage hook', () => {
  test('image component will use src if loaded correctly', () => {
    getComponent();
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onImageLoad();
      }
    });
    expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);
  });

  test('image component will use fallbackImg and fallbackAlt if src loaded with error', () => {
    getComponent();
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onImageError();
      }
    });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testFallbackSrc);
    expect(img).toHaveAttribute('alt', testFallbackAlt);
  });

  test('image component will use fallbackImg and fallbackAlt if src timed out', () => {
    getComponent();
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onFallbackTimeout();
      }
    });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testFallbackSrc);
    expect(img).toHaveAttribute('alt', testFallbackAlt);
  });

  test('if image loads after timeout src and alt still be the fallback', () => {
    getComponent();
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onFallbackTimeout();
        fallbackImageObj.onImageLoad();
      }
    });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testFallbackSrc);
    expect(img).toHaveAttribute('alt', testFallbackAlt);
  });

  test('if image loads before timeout src still be the the origin one', () => {
    getComponent();
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onImageLoad();
        fallbackImageObj.onFallbackTimeout();
      }
    });
    expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);
  });

  test('the skeleton loading will appear if no fallback image is given', () => {
    getComponent({ fallbackImage: undefined });
    expect(screen.getByTestId(skeletonImageId)).toBeInTheDocument();
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onImageLoad();
      }
    });
    expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);
  });

  test('the skeleton will be shown instead of img if no fallback image is given and image load failed', () => {
    getComponent({ fallbackImage: undefined });
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onImageError();
      }
    });
    expect(screen.getByTestId(skeletonImageId)).toBeInTheDocument();
  });

  test('the skeleton will be shown instead of img if no fallback image is given and image load timed out', () => {
    getComponent({ fallbackImage: undefined });
    act(() => {
      if (fallbackImageObj) {
        fallbackImageObj.onFallbackTimeout();
      }
    });
    expect(screen.getByTestId(skeletonImageId)).toBeInTheDocument();
  });
});
