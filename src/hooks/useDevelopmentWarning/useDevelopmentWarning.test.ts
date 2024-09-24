import { renderHook } from '@testing-library/react';

import useDevelopmentWarning from './useDevelopmentWarning';

const message = 'This is test message';

beforeEach(() => {
  process.env.NODE_ENV = 'development';
  global.console.warn = jest.fn(); // eslint-disable-line no-console
});

afterEach(() => {
  process.env.NODE_ENV = 'test';
  jest.restoreAllMocks();
});

test('useDevelopmentWarning with message and trigger false', () => {
  const spy = jest.spyOn(console, 'warn');
  expect(spy).not.toHaveBeenCalled();
  renderHook(() => useDevelopmentWarning({ message, shouldTrigger: false }));
  expect(spy).not.toHaveBeenCalled();
});

test('useDevelopmentWarning with message and trigger true', () => {
  const spy = jest.spyOn(console, 'warn');
  expect(spy).not.toHaveBeenCalled();
  renderHook(() => useDevelopmentWarning({ message, shouldTrigger: true }));
  expect(spy).toHaveBeenNthCalledWith(1,
    expect.stringMatching(message),
    expect.any(String),
    expect.any(String),
    expect.any(String),
  );
});
