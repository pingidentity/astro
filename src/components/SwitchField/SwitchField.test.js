import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/testUtils/testWrapper';
import SwitchField from './SwitchField';

const testId = 'test-switch';

const defaultProps = {
  label: 'Example label',
  'data-testid': testId,
};

const getComponent = (props = {}) => render((
  <SwitchField {...defaultProps} {...props} />
));

test('renders Switch component', () => {
  getComponent({ 'aria-label': 'test' });
  const switchComponent = screen.getByTestId(testId);
  screen.getByRole('switch');
  expect(switchComponent).toBeInstanceOf(HTMLDivElement);
  expect(switchComponent).toBeInTheDocument();
});

test('renders label', () => {
  getComponent();
  const label = screen.getByText(defaultProps.label);
  expect(label).toBeInTheDocument();
});


test('switch toggles on click', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const input = screen.getByRole('switch');
  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(input);
  expect(input).toBeChecked();
  expect(onChange).toHaveBeenNthCalledWith(1, true);

  userEvent.click(input);
  expect(input).not.toBeChecked();
  expect(onChange).toHaveBeenNthCalledWith(2, false);
});


test('isDisabled disables switch functionality', () => {
  const onChange = jest.fn();
  getComponent({ isDisabled: true, onChange });

  const input = screen.getByRole('switch');
  userEvent.click(input);
  expect(onChange).not.toHaveBeenCalled();
});

test('isDisabled adds disabled styles to label and switch', () => {
  getComponent({ isDisabled: true });
  const label = screen.getByText(defaultProps.label);
  expect(label).toHaveClass('is-disabled');
  const switchComponent = screen.getByRole('switch');
  expect(switchComponent).toHaveClass('is-disabled');
});

test('does not have isDisabled styling without isDisabled prop', () => {
  getComponent();
  const label = screen.getByText(defaultProps.label);
  expect(label).not.toHaveClass('is-disabled');
  const switchComponent = screen.getByRole('switch');
  expect(switchComponent).not.toHaveClass('is-disabled');
});

test('Switch focuses when tabbed to', () => {
  getComponent();
  const input = screen.getByRole('switch');
  userEvent.tab();
  expect(input).toHaveFocus();
});

test('Switch toggles with keyboard', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const input = screen.getByRole('switch');
  expect(input).not.toHaveFocus();
  expect(onChange).not.toHaveBeenCalled();

  userEvent.tab();
  expect(input).toHaveFocus();
  userEvent.type(input, '{space}');
  expect(onChange).toHaveBeenCalled();
});

test('switch field with helper text', () => {
  const helperText = 'helper text';
  getComponent({ helperText });
  const helper = screen.getByText(helperText);
  expect(helper).toBeInTheDocument();
});
