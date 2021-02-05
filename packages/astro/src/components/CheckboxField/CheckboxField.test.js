import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/testUtils/testWrapper';
import CheckboxField from '../CheckboxField';

const testLabel = 'Test Label';
const defaultProps = {
  label: testLabel,
};
const getComponent = (props = {}) => render((
  <CheckboxField {...defaultProps} {...props} />
));

test('default checkbox', () => {
  getComponent();
  const input = screen.getByRole('checkbox');
  const label = screen.getByText(testLabel);
  const icon = document.querySelector('svg');
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(input).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(icon).toHaveStyleRule('background-color', 'transparent', { target: ':focus' });
});

test('checkbox with focus', () => {
  getComponent();
  const icon = document.querySelector('svg');

  userEvent.tab();
  expect(icon).toHaveStyle({ backgroundColor: 'highlight' });
});

test('disabled checkbox disables input and the label', () => {
  getComponent({ isDisabled: true });
  const label = screen.getByText(testLabel);
  const input = screen.getByRole('checkbox');
  expect(input).toBeDisabled();
  expect(label).toHaveStyle({ opacity: 0.5, pointerEvents: 'none' });
});

test('checkbox interaction', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const input = screen.getByRole('checkbox');
  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(input);
  expect(input).toBeChecked();
  expect(onChange).toHaveBeenNthCalledWith(1, true);

  userEvent.click(input);
  expect(input).not.toBeChecked();
  expect(onChange).toHaveBeenNthCalledWith(2, false);
});

test('isSelected for controlled checkbox', () => {
  getComponent({ isSelected: true });
  const input = screen.getByRole('checkbox');
  expect(input).toBeChecked();

  // Ensure it is controlled.
  userEvent.click(input);
  expect(input).toBeChecked();
});

test('defaultValue for uncontrolled checkbox', () => {
  getComponent({ isDefaultSelected: true });
  const input = screen.getByRole('checkbox');
  expect(input).toBeChecked();

  // Ensure it is uncontrolled.
  userEvent.click(input);
  expect(input).not.toBeChecked();
});

test('name for checkbox', () => {
  const name = 'custom';
  getComponent({ name });
  const input = screen.getByRole('checkbox');
  expect(input).toHaveAttribute('name', name);
});

test('read only checkbox', () => {
  getComponent({ isReadOnly: true });
  const input = screen.getByRole('checkbox');
  expect(input).toHaveAttribute('readonly');
});
