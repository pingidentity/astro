import { renderHook } from '@testing-library/react';

import nextGenTShirtSizes from '../../styles/themes/next-gen/customProperties/tShirtSizes';
import { iconWrapperSizes } from '../../utils/devUtils/constants/tShirtSizes';

import useTShirtSize from './useTShirtSize';

describe('useTShirtSize', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'development';
    global.console.warn = jest.fn(); // eslint-disable-line no-console
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
    jest.clearAllMocks();
  });

  test('default', () => {
    const props = {};
    const spy = jest.spyOn(console, 'warn');
    expect(spy).toHaveBeenCalledTimes(0);
    renderHook(() => useTShirtSize(props));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

test('does not warn if size prop does exist', () => {
  const props = { size: 15 };

  const spy = jest.spyOn(console, 'warn');
  expect(spy).not.toHaveBeenCalled();
  renderHook(() => useTShirtSize(props));
  expect(spy).not.toHaveBeenCalled();
});

test('returns size value if size is a tshirt value', () => {
  const props = { size: 'xs' };
  const { result } = renderHook(() => useTShirtSize(props));
  const obj = {
    sizeProps: {
      size: '15px',
    },
  };
  expect(result.current).toEqual(obj);
});

test('returns size value if size is a t-shirt value', () => {
  const props = { size: 'icon-500', sizes: nextGenTShirtSizes };
  const { result } = renderHook(() => useTShirtSize(props));

  const obj = {
    sizeProps: {
      size: '3rem',
    },
  };
  expect(result.current).toEqual(obj);
});

test('returns size value if size is a string value', () => {
  const props = { size: '20px' };
  const { result } = renderHook(() => useTShirtSize(props));
  const obj = {
    sizeProps: {
      size: '20px',
    },
  };
  expect(result.current).toEqual(obj);
});

test('returns size value if size is a number value', () => {
  const props = { size: 20 };
  const { result } = renderHook(() => useTShirtSize(props));
  const obj = {
    sizeProps: {
      size: 20,
    },
  };
  expect(result.current).toEqual(obj);
});

test('using custom sizes, returns size value if size is a string value', () => {
  const props = { size: '20px', sizes: iconWrapperSizes };
  const { result } = renderHook(() => useTShirtSize(props));
  const obj = {
    sizeProps: {
      size: '20px',
    },
  };
  expect(result.current).toEqual(obj);
});
