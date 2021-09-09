import { renderHook } from '@testing-library/react-hooks';

import useDeprecationWarning from './useDeprecationWarning';

beforeEach(() => {
  process.env.NODE_ENV = 'development';
  global.console.warn = () => jest.mock(); // eslint-disable-line no-console
});

afterEach(() => {
  process.env.NODE_ENV = 'test';
  jest.restoreAllMocks();
});

test('default useDeprecationWarning', () => {
  const spy = jest.spyOn(console, 'warn');
  expect(spy).not.toHaveBeenCalled();
  renderHook(() => useDeprecationWarning());
  expect(spy).toHaveBeenCalledTimes(1);
});

test('useDeprecationWarning with string', () => {
  const string = 'I\'m a warning!';
  const spy = jest.spyOn(console, 'warn');
  expect(spy).not.toHaveBeenCalled();
  renderHook(() => useDeprecationWarning(string));
  expect(spy).toHaveBeenNthCalledWith(1,
    expect.stringMatching(string),
    expect.any(String),
    expect.any(String),
    expect.any(String),
  );
});

test('useDeprecationWarning by default ignores duplicated messages', () => {
  const spy = jest.spyOn(console, 'warn');
  const message = 'Text';
  renderHook(() => useDeprecationWarning(message));
  renderHook(() => useDeprecationWarning(message));
  expect(spy).toHaveBeenCalledTimes(1);
});

test('useDeprecationWarning showns duplicated messages if explicitly allowed', () => {
  const spy = jest.spyOn(console, 'warn');
  const message = 'Text';
  renderHook(() => useDeprecationWarning(message, true));
  renderHook(() => useDeprecationWarning(message, true));
  expect(spy).toHaveBeenCalledTimes(2);
});
