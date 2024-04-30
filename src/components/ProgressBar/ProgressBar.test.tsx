import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProgressBarProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import ProgressBar, { calculateBarWidth } from '.';

const testId = 'test-progressbar';
const defaultProps: ProgressBarProps = {
  'data-testid': testId,
  value: 25,
  minValue: 0,
  maxValue: 100,
};

const getComponent = (props = {}) => render(
  <ProgressBar {...defaultProps} {...props} aria-label="Progress Bar" />,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <ProgressBar {...defaultProps} {...props} aria-label="Progress Bar" />
  ),
});

test('ProgressBar component does load', () => {
  getComponent();
  const progressBar = screen.getByRole('progressbar', { name: 'Progress Bar' });
  expect(progressBar).toBeInTheDocument();
});

test('should render a label', () => {
  getComponent({ label: 'Loading...' });
  const label = screen.getByText('Loading...');
  expect(label).toBeInTheDocument();
});

test('renders value as a percentage', () => {
  getComponent({ value: 25 });
  const value = screen.getByText('25%');
  expect(value).toBeInTheDocument();
});

test('renders value as custom valueLabel instead of percentage', () => {
  getComponent({ value: 25, valueLabel: '25 of 100 dogs' });
  const value = screen.queryByText('25%');
  const valueLabel = screen.getByText('25 of 100 dogs');
  expect(value).not.toBeInTheDocument();
  expect(valueLabel).toBeInTheDocument();
});

test('does not render value when showValueLabel is false', () => {
  getComponent({ value: 25, showValueLabel: false });
  const valueLabel = screen.queryByText('25%');
  expect(valueLabel).not.toBeInTheDocument();
});

test('renders label and custom valueLabel when labe and valueLabel are present', () => {
  getComponent({ value: 25, label: 'Loading...', valueLabel: '25 of 100 dogs' });
  const label = screen.getByText('Loading...');
  const valueLabel = screen.getByText('25 of 100 dogs');
  expect(label).toBeInTheDocument();
  expect(valueLabel).toBeInTheDocument();
});

test('calculates bar width with default min and max values', () => {
  expect(calculateBarWidth(25, 0, 100)).toBe('25%');
});

test('calculates bar width when value equals minValue', () => {
  expect(calculateBarWidth(0, 0, 100)).toBe('0%');
});

test('calculates bar width when value equals maxValue', () => {
  expect(calculateBarWidth(100, 0, 100)).toBe('100%');
});

test('throws error when value is less than minValue', () => {
  expect(() => calculateBarWidth(-10, 0, 100)).toThrow('Value cannot be less than minValue');
});

test('throws error when value is greater than maxValue', () => {
  expect(() => calculateBarWidth(110, 0, 100)).toThrow('Value cannot be greater than maxValue');
});
