import { act, renderHook } from '@testing-library/react';

import { UseSliderFieldProps } from '../../types/sliderField';

import useSliderField, { getDefaultValue, getDisplayValue } from './useSliderField';

const defaultProps: UseSliderFieldProps = {
  minValue: 0,
  maxValue: 100,
  step: 10,
  defaultValue: 50,
  isMultiThumb: false,
  label: 'test label',
  trackRef: { current: null },
};

describe('useSliderField utility functions', () => {
  describe('getDefaultValue', () => {
    test('returns defaultValueProp if provided', () => {
      const result = getDefaultValue({ defaultValueProp: [10, 50], minValue: 0, step: 10 });
      expect(result).toEqual([10, 50]);
    });

    test('calculates default value if defaultValueProp is not provided', () => {
      const result = getDefaultValue({ defaultValueProp: undefined, minValue: 0, step: 10 });
      expect(result).toEqual([0, 30]);
    });
  });

  describe('getDisplayValue', () => {
    const mockState = {
      getThumbValueLabel: jest.fn(index => (index === 0 ? '10' : '50')),
    };

    test('returns displayValueProp if provided', () => {
      const result = getDisplayValue({ displayValueProp: 'Custom Display', isMultiThumb: false, state: mockState });
      expect(result).toEqual('Custom Display');
    });

    test('returns single thumb value if isMultiThumb is false', () => {
      const result = getDisplayValue({
        displayValueProp: undefined, isMultiThumb: false, state: mockState,
      });
      expect(result).toEqual('10');
    });

    test('returns range value if isMultiThumb is true', () => {
      const result = getDisplayValue({
        displayValueProp: undefined, isMultiThumb: true, state: mockState,
      });
      expect(result).toEqual('10 - 50');
    });
  });
});

describe('useSliderField hook', () => {
  test('should initialize with default minValue and maxValue', () => {
    const { result } = renderHook(() => useSliderField(defaultProps));
    const { containerProps } = result.current;

    expect(containerProps).toBeDefined();
    expect(result.current.sliderActiveTrackProps.state.values).toEqual([50]);
  });

  test('should update minValue and maxValue when props change', () => {
    const { result, rerender } = renderHook(
      (props: UseSliderFieldProps) => useSliderField(props),
      { initialProps: defaultProps },
    );

    expect(result.current.sliderActiveTrackProps.state.values).toEqual([50]);

    rerender({ ...defaultProps, minValue: 20, maxValue: 80, defaultValue: 30 });
  });
});
