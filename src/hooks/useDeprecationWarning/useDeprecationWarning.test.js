import { renderHook } from '@testing-library/react';

import useDeprecationWarning from './useDeprecationWarning';

// since we cannot reset `alreadyShown` inside of module we will generate unique messages
let uniqueIndex = 0;
function generateUniqueMessage() {
  const message = `Text ${uniqueIndex}`;
  uniqueIndex += 1;
  return message;
}

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
  const string = generateUniqueMessage();
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
  const message = generateUniqueMessage();
  renderHook(() => useDeprecationWarning(message));
  renderHook(() => useDeprecationWarning(message));
  expect(spy).toHaveBeenCalledTimes(1);
});

test('useDeprecationWarning shows same message for few times if explicitly allowed', () => {
  const spy = jest.spyOn(console, 'warn');
  const message = generateUniqueMessage();
  renderHook(() => useDeprecationWarning(message, { onlyOnce: false }));
  renderHook(() => useDeprecationWarning(message, { onlyOnce: false }));
  expect(spy).toHaveBeenCalledTimes(2);
});

test('shows message after isActive is flipped from false to true', () => {
  const spy = jest.spyOn(console, 'warn');
  const message = generateUniqueMessage();
  const { rerender } = renderHook(
    ([...args]) => useDeprecationWarning(...args),
    { initialProps: [message, { isActive: false }] },
  );
  rerender([message, { isActive: true }]);
  expect(spy).toHaveBeenCalledTimes(1);
});
