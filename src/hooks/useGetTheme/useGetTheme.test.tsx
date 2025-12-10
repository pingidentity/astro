import React from 'react';
import { renderHook } from '@testing-library/react';

import { AstroProvider, NextGenDarkTheme, NextGenTheme } from '../..';
import theme from '../../styles/theme';
import { themes } from '../../utils/devUtils/constants/themes';

import useGetTheme, { baseState } from './useGetTheme';

const testChild = (
  <p>Lets see the theme!</p>
);

const wrapper = ({ children }) => (
  <AstroProvider theme={children?.props?.renderCallbackProps?.theme}>{children}</AstroProvider>
);


describe('useGetTheme', () => {
  test('should return NextGen theme', () => {
    const { result } = renderHook(() => useGetTheme(), {
      wrapper,
      initialProps: {
        children: testChild,
        theme: NextGenTheme,
      },
    });
    expect(result.current.name).toBe(themes.NEXT_GEN);
    expect(result.current.themeState).toEqual({ ...baseState, isOnyx: true });
  });
});

describe('useGetTheme', () => {
  test('should return NextGenDark theme', () => {
    const { result } = renderHook(() => useGetTheme(), {
      wrapper,
      initialProps: {
        children: testChild,
        theme: NextGenDarkTheme,
      },
    });
    expect(result.current.name).toBe(themes.NEXT_GEN_DARK);
    expect(result.current.themeState).toEqual({
      ...baseState, isOnyx: true, isOnyxDark: true,
    });
  });
});

describe('useGetTheme', () => {
  test('should return Astro theme', () => {
    const { result } = renderHook(() => useGetTheme(), {
      wrapper,
      initialProps: {
        children: testChild,
        theme,
      },
    });
    expect(result.current.name).toBe(themes.ASTRO);
    expect(result.current.themeState).toEqual({ ...baseState, isAstro: true });
  });
});
