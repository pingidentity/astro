import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFocusRing } from '@react-aria/focus';
import CheckboxField from '../CheckboxField';

const testLabel = 'Test Label';
const defaultProps = {
  children: testLabel,
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
  useFocusRing.mockImplementation(() => ({ isFocusVisible: true, focusProps: {} }));
  getComponent();
  const icon = document.querySelector('svg');
  expect(icon).toHaveStyleRule('background-color', 'highlight', { target: ':focus' });
});

test('disabled checkbox disables input and the label', () => {
  getComponent({ isDisabled: true });
  const label = screen.getByText(testLabel);
  const input = screen.getByRole('checkbox');
  expect(label).toHaveStyleRule('opacity', '0.5');
  expect(label).toHaveStyleRule('pointer-events', 'none');
  expect(input).toBeDisabled();
});

test('checkbox interaction', () => {
  const onChange = jest.fn();
  getComponent({ controlProps: { onChange } });
  const input = screen.getByRole('checkbox');
  expect(onChange).not.toHaveBeenCalled();

  act(() => userEvent.click(input));
  expect(input).toBeChecked();
  expect(onChange).toHaveBeenNthCalledWith(1, true);

  act(() => userEvent.click(input));
  expect(input).not.toBeChecked();
  expect(onChange).toHaveBeenNthCalledWith(2, false);
});

test('isSelected for controlled checkbox', () => {
  getComponent({ controlProps: { isSelected: true } });
  const input = screen.getByRole('checkbox');
  expect(input).toBeChecked();

  // Ensure it is controlled.
  act(() => userEvent.click(input));
  expect(input).toBeChecked();
});

test('defaultValue for uncontrolled checkbox', () => {
  getComponent({ controlProps: { isDefaultSelected: true } });
  const input = screen.getByRole('checkbox');
  expect(input).toBeChecked();

  // Ensure it is uncontrolled.
  act(() => userEvent.click(input));
  expect(input).not.toBeChecked();
});

test('name for checkbox', () => {
  const name = 'custom';
  getComponent({ controlProps: { name } });
  const input = screen.getByRole('checkbox');
  expect(input).toHaveAttribute('name', name);
});

test('read only checkbox', () => {
  getComponent({ controlProps: { isReadOnly: true } });
  const input = screen.getByRole('checkbox');
  expect(input).toHaveAttribute('readonly');
});
