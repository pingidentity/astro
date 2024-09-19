import { renderHook } from '@testing-library/react';

import useAriaLabelWarning from './useAriaLabelWarning';

const component = 'TestComponent';

beforeEach(() => {
  process.env.NODE_ENV = 'development';
  global.console.warn = jest.fn(); // eslint-disable-line no-console
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
  const compound = `${component} has an undefined aria-label. If the surrounding content sufficiently labels this component instance, you may disable this warning by setting the prop to \`null\`. Otherwise, please provide an appropriate aria-label. See more info here: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label`;
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
