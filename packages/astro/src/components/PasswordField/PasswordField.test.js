import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordField from '.';

const testId = 'test-text-field';
const testLabel = 'Test Label';
const helperProp = 'helperText';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
  helperTest: helperProp,
  viewHiddenIconTestId: 'view-hidden-test-id',
  viewIconTestId: 'view-icon-test-id',
};
const getComponent = (props = {}) => render(<PasswordField {...defaultProps} {...props} />);

test('default password field', () => {
  getComponent();
  const field = screen.getByTestId(testId);
  const label = screen.getByText(testLabel);
  const control = screen.getByLabelText(testLabel);
  expect(field).toBeInstanceOf(HTMLDivElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(control).toBeInstanceOf(HTMLInputElement);
  expect(field).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(control).toBeInTheDocument();
});

test('renders view icon', async () => {
  getComponent();
  const viewIcon = await screen.findByTestId(defaultProps.viewHiddenIconTestId);
  expect(viewIcon).toBeInTheDocument();
});

test('renders view-hidden icon', async () => {
  getComponent();
  const button = screen.getByRole('button');
  userEvent.click(button);

  const viewHiddenIcon = await screen.findByTestId(defaultProps.viewIconTestId);
  expect(viewHiddenIcon).toBeInTheDocument();

  userEvent.click(button);

  const viewIcon = await screen.findByTestId(defaultProps.viewHiddenIconTestId);
  expect(viewIcon).toBeInTheDocument();
});

test('renders view icon', async () => {
  getComponent();
  const button = screen.getByRole('button');
  userEvent.click(button);

  const viewHiddenIcon = await screen.findByTestId(defaultProps.viewIconTestId);
  expect(viewHiddenIcon).toBeInTheDocument();
});

test('renders password input', () => {
  getComponent();
  const input = screen.getByLabelText(testLabel);
  expect(input.type).toBe('password');
});

test('renders helper text', () => {
  getComponent();
  const helperText = screen.getByText(testLabel);
  expect(helperText).toBeInTheDocument();
});

test('clicking icon changes input type', () => {
  getComponent({ isVisible: true });
  const input = screen.getByLabelText(testLabel);
  expect(input.type).toBe('text');
});

test('clicking the icon calls the callback, if provided', () => {
  const onPress = jest.fn();
  getComponent({ onVisibleChange: onPress });
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(onPress).toHaveBeenCalled();
});

test('renders view hidden icon if state prop is provided', async () => {
  getComponent({ isVisible: true });

  const viewHiddenIcon = await screen.findByTestId(defaultProps.viewIconTestId);
  expect(viewHiddenIcon).toBeInTheDocument();
});
