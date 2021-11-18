import { renderHook } from '@testing-library/react-hooks';

import usePropWarning from './usePropWarning';

describe('usePropWarning', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'development';
    global.console.warn = () => jest.mock(); // eslint-disable-line no-console
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
    jest.clearAllMocks();
  });

  test('default', () => {
    const props = {};
    props.disabled = true;

    const spy = jest.spyOn(console, 'warn');
    expect(spy).not.toHaveBeenCalled();
    renderHook(() => usePropWarning(props, 'disabled', 'isDisabled'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('does not warn if prop does not exist', () => {
    const props = {};
    props.isDisabled = true;

    const spy = jest.spyOn(console, 'warn');
    expect(spy).not.toHaveBeenCalled();
    renderHook(() => usePropWarning(props, 'disabled', 'isDisabled'));
    expect(spy).not.toHaveBeenCalled();
  });


  test('showns duplicated messages if explicitly allowed', () => {
    const props = {};
    props.disabled = true;
    const spy = jest.spyOn(console, 'warn');

    renderHook(() => usePropWarning(props, 'disabled', 'isDisabled', true));
    renderHook(() => usePropWarning(props, 'disabled', 'isDisabled', true));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('does not warn if it is in production environment', () => {
    process.env.NODE_ENV = 'production';

    const props = {};
    props.disabled = true;

    const spy = jest.spyOn(console, 'warn');
    expect(spy).not.toHaveBeenCalled();
    renderHook(() => usePropWarning(props, 'disabled', 'isDisabled'));
    expect(spy).not.toHaveBeenCalled();
  });
});
