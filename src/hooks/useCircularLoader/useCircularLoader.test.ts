import React from 'react';
import { renderHook } from '@testing-library/react';

import useCircularLoader, { circularSizes } from './useCircularLoader';

const nonCircleProps = {
  isAstro: true,
  defaultLoaderSize: 20,
};

const circleProps = {
  isAstro: false,
  defaultLoaderSize: 20,
};

const defaultProps = {
  isAstro: false,
  defaultLoaderSize: 20,
};

test('astro theme returns isCircle = false ', () => {
  const { result } = renderHook(() => useCircularLoader({ ...nonCircleProps }));
  expect(result.current.isCircle).toEqual(false);
});

test('mode = "dots" returns  returns isCircle = false ', () => {
  const { result } = renderHook(() => useCircularLoader({ ...circleProps, mode: 'dots' }));
  expect(result.current.isCircle).toEqual(false);
});

test('numeric calcuations are correct', () => {
  const { result } = renderHook(() => useCircularLoader({ ...circleProps, size: 120 }));
  const { current } = result;
  const {
    radius,
    strokeWidth,
    center,
    size,
  } = current;
  expect(radius).toEqual(45);
  expect(center).toEqual(50);
  expect(strokeWidth).toEqual(10);
  expect(size).toEqual(100);
});

test('returns isCircle = false when mode is "dots"', () => {
  const { result } = renderHook(() => useCircularLoader({ ...defaultProps, mode: 'dots' }),
  );
  expect(result.current.isCircle).toBe(false);
});

test('returns isCircle = false when isAstro is true', () => {
  const { result } = renderHook(() => useCircularLoader({ ...defaultProps, isAstro: true }),
  );
  expect(result.current.isCircle).toBe(false);
});

test('calculates correct values for circular loader with size "sm"', () => {
  const { result } = renderHook(() => useCircularLoader({ ...defaultProps, size: 'sm' }),
  );
  const { size } = result.current;

  expect(size).toBeCloseTo(circularSizes.sm * (10 / 12)); // Adjust based on actual calculation
});

test('calculates correct values for circular loader with size "lg"', () => {
  const { result } = renderHook(() => useCircularLoader({ ...defaultProps, size: 'lg' }),
  );
  const { size } = result.current;

  expect(size).toBeCloseTo(circularSizes.lg * (10 / 12)); // Adjust based on actual calculation
});

test('uses defaultLoaderSize when size is not provided', () => {
  const { result } = renderHook(() => useCircularLoader({ ...defaultProps }),
  );
  expect(result.current.size).toBe(defaultProps.defaultLoaderSize * (10 / 12));
});

test('calculates correct values for custom progress', () => {
  const { result } = renderHook(() => useCircularLoader(
    { ...defaultProps, size: 120, progress: 50 }),
  );
  const { dashLength, gapLength, radius } = result.current;

  expect(dashLength).toBeCloseTo((50 / 100) * 2 * Math.PI * radius); // Progress = 50%
  expect(gapLength).toBeCloseTo(2 * Math.PI * radius);
});

test('returns correct size when size is a custom number', () => {
  const { result } = renderHook(() => useCircularLoader({ ...defaultProps, size: 100 }),
  );
  expect(result.current.size).toBeCloseTo(100 * (10 / 12)); // Adjust based on actual calculation
});
