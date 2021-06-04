import { renderHook } from '@testing-library/react-hooks';
import useAriaLabelWarning from './useAriaLabelWarning';

const component = 'TestComponent';

beforeEach(() => {
  process.env.NODE_ENV = 'development';
  global.console.warn = () => jest.mock(); // eslint-disable-line no-console
});

afterEach(() => {
  process.env.NODE_ENV = 'test';
  jest.restoreAllMocks();
});

test('default useAriaLabelWarning', () => {
  const spy = jest.spyOn(console, 'warn');
  expect(spy).not.toHaveBeenCalled();
  renderHook(() => useAriaLabelWarning(component));
  expect(spy).toHaveBeenCalledTimes(1);
});

test('useAriaLabelWarning with string', () => {
  const compound = `${component} requires an aria-label`;
  const spy = jest.spyOn(console, 'warn');
  expect(spy).not.toHaveBeenCalled();
  renderHook(() => useAriaLabelWarning(component));
  expect(spy).toHaveBeenNthCalledWith(1,
    expect.stringMatching(compound),
    expect.any(String),
    expect.any(String),
    expect.any(String),
  );
});
