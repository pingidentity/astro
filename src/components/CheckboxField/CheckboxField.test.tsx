import React from 'react';
import userEvent from '@testing-library/user-event';

import { CheckboxFieldProps } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import CheckboxField from '.';

const testLabel = 'Test Label';
const defaultProps: CheckboxFieldProps = {
  label: testLabel,
};
const getComponent = (props: CheckboxFieldProps = {}, { renderFn = render } = {}) => renderFn((
  <CheckboxField {...defaultProps} {...props} />
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <CheckboxField {...defaultProps} {...props} />,
});

universalFieldComponentTests({
  renderComponent: props => (
    <CheckboxField {...defaultProps} {...props} />
  ),
  testValue: 'testvalue',
  testLabel,
  componentType: 'CheckboxField',
});

test('default checkbox', () => {
  getComponent();
  const input = screen.getByRole('checkbox');
  const label = screen.getByText(testLabel);
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(input).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('disabled checkbox disables input and the label', () => {
  getComponent({ isDisabled: true });
  const input = screen.getByRole('checkbox');
  expect(input).toBeDisabled();
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

test('checkbox interaction on svg', () => {
  const onChange = jest.fn();

  getComponent({ onChange, checkBoxProps: { 'data-testid': 'checkbox-icon' } });
  const input = screen.getByRole('checkbox');
  const svg = screen.getByTestId('checkbox-icon');
  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(svg);
  expect(input).toBeChecked();
  expect(onChange).toHaveBeenNthCalledWith(1, true);

  userEvent.click(svg);
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

test('isSelected for controlled checkbox, clicking svg', () => {
  getComponent({ isSelected: true, checkBoxProps: { 'data-testid': 'checkbox-icon' } });
  const input = screen.getByRole('checkbox');
  const svg = screen.getByTestId('checkbox-icon');
  expect(input).toBeChecked();

  // Ensure it is controlled.
  userEvent.click(svg);
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

test('defaultValue for uncontrolled checkbox, clicking svg', () => {
  getComponent({ isDefaultSelected: true, checkBoxProps: { 'data-testid': 'checkbox-icon' } });
  const input = screen.getByRole('checkbox');
  const svg = screen.getByTestId('checkbox-icon');
  expect(input).toBeChecked();

  // Ensure it is uncontrolled.
  userEvent.click(svg);
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

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getByText(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const helperTextID = helper.getAttribute('id');
  expect(screen.getByRole('checkbox')).toHaveAttribute('aria-describedby', helperTextID);
});

test('indeterminate checkbox', () => {
  const { rerender } = getComponent({ isIndeterminate: true });
  let input = screen.getByRole('checkbox');
  const label = screen.getByText(testLabel);
  /* eslint-disable jest-dom/prefer-checked */
  expect(input).toHaveAttribute('aria-checked', 'mixed');
  expect(label).toHaveClass('is-indeterminate');

  // Ensure it cannot be changed via user interaction
  userEvent.click(input);
  expect(input).toHaveAttribute('aria-checked', 'mixed');
  // An indeterminite checkbox can still have the checked attribute
  expect(input).toBeChecked();

  // Ensure it works normally when toggled off again
  getComponent({}, { renderFn: rerender } as {
    renderFn: (ui: React.ReactElement<unknown, string |
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.JSXElementConstructor<unknown>>) => any
  });
  // Reset the variable since the DOM has changed
  input = screen.getByRole('checkbox');

  expect(input).not.toHaveAttribute('aria-checked', 'mixed');
  expect(label).not.toHaveClass('is-indeterminate');

  // Ensure it can be changed via user interaction, should be unchecked now
  userEvent.click(input);
  expect(input).not.toBeChecked();
});

test('indeterminate checkbox, clicking svg', () => {
  const { rerender } = getComponent({ isIndeterminate: true, checkBoxProps: { 'data-testid': 'checkbox-icon' } });
  let input = screen.getByRole('checkbox');
  const svg = screen.getByTestId('checkbox-icon-indeterminate');
  const label = screen.getByText(testLabel);
  /* eslint-disable jest-dom/prefer-checked */
  expect(input).toHaveAttribute('aria-checked', 'mixed');
  expect(label).toHaveClass('is-indeterminate');

  // Ensure it cannot be changed via user interaction
  userEvent.click(svg);
  expect(input).toHaveAttribute('aria-checked', 'mixed');
  // An indeterminite checkbox can still have the checked attribute
  expect(input).toBeChecked();

  // Ensure it works normally when toggled off again
  getComponent({}, { renderFn: rerender } as {
    renderFn: (ui: React.ReactElement<unknown, string |
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.JSXElementConstructor<unknown>>) => any
  });
  // Reset the variable since the DOM has changed
  input = screen.getByRole('checkbox');

  expect(input).not.toHaveAttribute('aria-checked', 'mixed');
  expect(label).not.toHaveClass('is-indeterminate');
});
