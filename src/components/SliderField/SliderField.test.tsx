import React from 'react';
import userEvent from '@testing-library/user-event';

import { TextProps } from '../../types';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import SliderField from './SliderField';

const thumbId = 'thumb';
const outputId = 'output';

const wrapperId = 'wrapper';
const labelId = 'label';

const trackId = 'track-id';
const activeTrackId = 'active-track-id';

const labelClassName = 'labelClass';
const wrapperClassName = 'wrapperClass';

const testLabel = 'Slider Field';

const wrapperProps = {
  'data-testid': wrapperId,
  className: wrapperClassName,
};

const labelProps = {
  'data-testid': labelId,
  className: labelClassName,
};

const sliderTestId = 'slider-id';

const outputProps = {
  'data-testid': outputId,
} as TextProps;

const defaultProps = {
  thumbProps: {
    'data-testid': thumbId,
  },
  outputProps,
  label: testLabel,
  'data-testid': sliderTestId,
};

const getComponent = (props = {}) => render(
  <SliderField {...defaultProps} {...props} />,
);

universalComponentTests({ renderComponent: props => <SliderField {...props} {...defaultProps} /> });

universalFieldComponentTests({
  renderComponent: props => (
    <SliderField {...defaultProps} {...props} />
  ),
  testValue: 50,
  testLabel,
  componentType: 'SliderField',
});
describe('SliderField Component', () => {
  test('renders SliderField with default props', () => {
    getComponent({ label: 'Slider Field', defaultValue: 50 });
    expect(screen.getByText('Slider Field')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveValue('50');
  });

  test('renders SliderField with custom value', () => {
    getComponent({ label: 'Custom Slider', value: 30 });
    expect(screen.getByText('Custom Slider')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveValue('30');
  });

  test('calls onChange when slider value changes', () => {
    const onChangeMock = jest.fn();
    getComponent({ label: 'Slider Field', onChange: onChangeMock, defaultValue: 40 });

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 60 } });

    expect(onChangeMock).toHaveBeenCalledWith(60);
  });

  test('renders vertical orientation', () => {
    getComponent({ label: 'Vertical Slider', orientation: 'vertical', defaultValue: 20 });
    expect(screen.getByText('Vertical Slider')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('disables the slider when isDisabled is true', () => {
    getComponent({ label: 'Disabled Slider', isDisabled: true });
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
  });

  test('renders display value correctly', () => {
    getComponent({ label: 'Slider with Display', defaultValue: 70, displayValue: '70%' });
    expect(screen.getByText('70%')).toBeInTheDocument();
  });

  test('hides display value when isDisplayValueHidden is true', () => {
    getComponent({ label: 'Hidden Display Slider', defaultValue: 50, isDisplayValueHidden: true });
    expect(screen.queryByText('50')).not.toBeInTheDocument();
  });

  test('calls onChangeEnd when slider interaction ends', () => {
    const onChangeEndMock = jest.fn();
    getComponent({ label: 'Slider Field', onChangeEnd: onChangeEndMock, defaultValue: 40 });

    const slider = screen.getByRole('slider');
    fireEvent.mouseDown(slider);
    fireEvent.mouseUp(slider);

    expect(onChangeEndMock).toHaveBeenCalled();
  });

  test('handles keyboard functionality', () => {
    const onChangeMock = jest.fn();
    getComponent({ label: 'Keyboard Slider', onChange: onChangeMock, defaultValue: 50, step: 10 });

    const slider = screen.getByRole('slider');
    let output = screen.getByTestId(outputId);
    userEvent.tab();

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    fireEvent.keyUp(slider, { key: 'ArrowRight' });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('60');

    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    fireEvent.keyUp(slider, { key: 'ArrowLeft' });
    expect(onChangeMock).toHaveBeenCalledTimes(2);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('50');

    fireEvent.keyDown(slider, { key: 'Home' });
    fireEvent.keyUp(slider, { key: 'Home' });
    expect(onChangeMock).toHaveBeenCalledTimes(3);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('0');

    fireEvent.keyDown(slider, { key: 'End' });
    fireEvent.keyUp(slider, { key: 'End' });
    expect(onChangeMock).toHaveBeenCalledTimes(4);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('100');
  });

  test('handles minValue and maxValue', () => {
    const onChangeMock = jest.fn();
    getComponent({
      label: 'Keyboard Slider',
      onChange: onChangeMock,
      defaultValue: 50,
      step: 10,
      minValue: 10,
      maxValue: 190,
    });

    const slider = screen.getByRole('slider');
    let output = screen.getByTestId(outputId);
    userEvent.tab();

    fireEvent.keyDown(slider, { key: 'Home' });
    fireEvent.keyUp(slider, { key: 'Home' });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('10');

    fireEvent.keyDown(slider, { key: 'End' });
    fireEvent.keyUp(slider, { key: 'End' });
    expect(onChangeMock).toHaveBeenCalledTimes(2);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('190');
  });

  test('handles vertical slider keyboard functionality', () => {
    const onChangeMock = jest.fn();
    getComponent({ label: 'Vertical Slider', onChange: onChangeMock, defaultValue: 50, step: 10, orientation: 'vertical' });

    const slider = screen.getByRole('slider');
    let output = screen.getByTestId(outputId);
    userEvent.tab();

    fireEvent.keyDown(slider, { key: 'ArrowUp' });
    fireEvent.keyUp(slider, { key: 'ArrowUp' });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('60');

    fireEvent.keyDown(slider, { key: 'ArrowDown' });
    fireEvent.keyUp(slider, { key: 'ArrowDown' });
    expect(onChangeMock).toHaveBeenCalledTimes(2);
    output = screen.getByTestId(outputId);
    expect(output).toHaveTextContent('50');
  });

  test('handles multi-thumb slider functionality', () => {
    const onChangeMock = jest.fn();
    getComponent({ label: 'Multi Thumb Slider', onChange: onChangeMock, defaultValue: [20, 80], isMultiThumb: true });

    const thumbs = screen.getAllByTestId(thumbId);
    expect(thumbs).toHaveLength(2);

    const [thumb1, thumb2] = thumbs;

    fireEvent.keyDown(thumb1, { key: 'ArrowRight' });
    fireEvent.keyUp(thumb1, { key: 'ArrowRight' });
    expect(onChangeMock).toHaveBeenCalledWith([30, 80]);

    fireEvent.keyDown(thumb2, { key: 'ArrowLeft' });
    fireEvent.keyUp(thumb2, { key: 'ArrowLeft' });
    expect(onChangeMock).toHaveBeenCalledWith([30, 70]);
  });

  test('adds custom class names to trackProps and activeTrackProps', () => {
    const trackClassName = 'custom-track-class';
    const activeTrackClassName = 'custom-active-track-class';

    getComponent({
      trackProps: { className: trackClassName, 'data-testid': trackId },
      activeTrackProps: { className: activeTrackClassName, 'data-testid': activeTrackId },
      ...defaultProps,
    });

    const track = screen.getByTestId(trackId);
    const activeTrack = screen.getByTestId(activeTrackId);
    const slider = screen.getByRole('slider');

    userEvent.tab();

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    fireEvent.keyUp(slider, { key: 'ArrowRight' });

    expect(track).toBeInTheDocument();
    expect(track).toHaveClass(trackClassName);
    expect(activeTrack).toBeInTheDocument();
    expect(activeTrack).toHaveClass(activeTrackClassName);
  });

  test('adds custom class names to labelProps and wrapperProps', () => {
    getComponent({
      labelProps,
      wrapperProps,
      ...defaultProps,
    });

    const label = screen.getByText('Slider Field');
    const wrapper = screen.getByTestId(wrapperId);

    userEvent.tab();

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(labelClassName);
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass(wrapperClassName);
  });

  test('changes size property', () => {
    const { rerender } = getComponent({ size: '300px' });

    const container = screen.getByTestId(sliderTestId);
    expect(container).toHaveStyle({ width: '300px' });

    rerender(<SliderField {...defaultProps} size="500px" />);
    expect(container).toHaveStyle({ width: '500px' });
  });

  test('applies custom styles via sx prop', () => {
    const customStyles = { backgroundColor: 'red', padding: '20px' };
    getComponent({ sx: customStyles });

    const container = screen.getByTestId(sliderTestId);
    expect(container).toHaveStyle({ backgroundColor: 'red', padding: '20px' });
  });
});
