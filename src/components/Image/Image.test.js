import React from 'react';
import { act } from '@testing-library/react';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Image from '.';

const testSrc = 'test-src';
const testFallbackSrc = 'test-fallback-src';
const skeletonImageId = 'skeleton-image';

const defaultProps = {
  src: testSrc,
  fallbackImage: testFallbackSrc,
};

const getComponent = (props = {}, { renderFn = render } = {}) =>
  renderFn(<Image {...defaultProps} {...props} />);


// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

let fallbackImageObj = null;

jest.mock('../../hooks/useFallbackImage', () => (props) => {
  fallbackImageObj = { ...props };
  return [];
});

test('an image is rendered', () => {
  getComponent();
  act(() => {
    fallbackImageObj.onImageLoad();
  });
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
});

test('an image is rendered with no fallback', () => {
  getComponent({ fallbackImage: null });
  act(() => {
    fallbackImageObj.onImageLoad();
  });
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
});

test('image shows disabled status', () => {
  getComponent({ isDisabled: true });
  act(() => {
    fallbackImageObj.onImageLoad();
  });
  const img = screen.getByRole('img');
  expect(img).toHaveClass('is-disabled');
});

test('image source is able to be changed', () => {
  const src2 = 'second-src';
  const { rerender } = getComponent();
  act(() => {
    fallbackImageObj.onImageLoad();
  });

  expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);

  getComponent({ src: src2 }, { renderFn: rerender });
  act(() => {
    fallbackImageObj.onImageLoad();
  });
  expect(screen.getByRole('img')).toHaveAttribute('src', src2);
});

describe('test Image component with useFallbackImage hook', () => {
  test('image component will use src if loaded correctly', () => {
    getComponent();
    act(() => {
      fallbackImageObj.onImageLoad();
    });
    expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);
  });

  test('image component will use fallbackImg if src loaded with error', () => {
    getComponent();
    act(() => {
      fallbackImageObj.onImageError();
    });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testFallbackSrc);
  });

  test('image component will use fallbackImg if src timed out', () => {
    getComponent();
    act(() => {
      fallbackImageObj.onFallbackTimeout();
    });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testFallbackSrc);
  });

  test('if image loads after timeout src still be the fallback', () => {
    getComponent();
    act(() => {
      fallbackImageObj.onFallbackTimeout();
      fallbackImageObj.onImageLoad();
    });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testFallbackSrc);
  });

  test('if image loads before timeout src still be the the origin one', () => {
    getComponent();
    act(() => {
      fallbackImageObj.onImageLoad();
      fallbackImageObj.onFallbackTimeout();
    });
    expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);
  });

  test('the skeleton loading will appear if no fallback image is given', () => {
    getComponent({ fallbackImage: null });
    expect(screen.getByTestId(skeletonImageId)).toBeInTheDocument();
    act(() => {
      fallbackImageObj.onImageLoad();
    });
    expect(screen.getByRole('img')).toHaveAttribute('src', testSrc);
  });

  test('the skeleton will be shown instead of img if no fallback image is given and image load failed', () => {
    getComponent({ fallbackImage: null });
    act(() => {
      fallbackImageObj.onImageError();
    });
    expect(screen.getByTestId(skeletonImageId)).toBeInTheDocument();
  });

  test('the skeleton will be shown instead of img if no fallback image is given and image load timed out', () => {
    getComponent({ fallbackImage: null });
    act(() => {
      fallbackImageObj.onFallbackTimeout();
    });
    expect(screen.getByTestId(skeletonImageId)).toBeInTheDocument();
  });
});
