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

describe('useSliderField - minValue and maxValue constraints', () => {
  test('should set thumb value to minValue if it is less than minValue', () => {
    const { result, rerender } = renderHook(
      (props: UseSliderFieldProps) => useSliderField(props),
      { initialProps: { ...defaultProps, minValue: 20, defaultValue: 10 } },
    );

    // Verify that the thumb value is adjusted to minValue
    expect(result.current.sliderActiveTrackProps.state.values[0]).toEqual(20);

    // Update minValue and verify adjustment
    rerender({ ...defaultProps, defaultValue: 10, minValue: 30 });
    expect(result.current.sliderActiveTrackProps.state.values[0]).toEqual(30);
  });

  test('should set thumb value to maxValue if it exceeds maxValue', () => {
    const { result, rerender } = renderHook(
      (props: UseSliderFieldProps) => useSliderField(props),
      { initialProps: { ...defaultProps, maxValue: 80, defaultValue: 90 } },
    );

    // Verify that the thumb value is adjusted to maxValue
    expect(result.current.sliderActiveTrackProps.state.values[0]).toEqual(80);

    // Update maxValue and verify adjustment
    rerender({ ...defaultProps, defaultValue: 10, maxValue: 70 });
    expect(result.current.sliderActiveTrackProps.state.values[0]).toEqual(70);
  });

  test('should handle multi-thumb sliders with minValue and maxValue constraints', () => {
    const { result, rerender } = renderHook(
      (props: UseSliderFieldProps) => useSliderField(props),
      {
        initialProps: {
          ...defaultProps,
          isMultiThumb: true,
          minValue: 20,
          maxValue: 80,
          defaultValue: [10, 90],
        },
      },
    );

    // Verify that both thumb values are adjusted to minValue and maxValue
    expect(result.current.sliderActiveTrackProps.state.values).toEqual([20, 80]);

    // Update minValue and maxValue and verify adjustment
    rerender({ ...defaultProps, isMultiThumb: true, minValue: 30, maxValue: 70 });
    expect(result.current.sliderActiveTrackProps.state.values).toEqual([30, 70]);
  });
});
