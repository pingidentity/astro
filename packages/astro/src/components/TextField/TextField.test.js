import React from 'react';
import { render, screen } from '@testing-library/react';
import TextField from '.';

const testId = 'test-text-field';
const testLabel = 'Test Label';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
};
const getComponent = (props = {}) => render(<TextField {...defaultProps} {...props} />);

test('default text field', () => {
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

test('text field with control props', () => {
  getComponent({ controlProps: { color: 'red' } });
  const control = screen.getByLabelText(testLabel);
  expect(control).toHaveStyleRule('color', 'red');
});

test('text field with label props', () => {
  getComponent({ labelProps: { color: 'red' } });
  const label = screen.getByText(testLabel);
  expect(label).toHaveStyleRule('color', 'red');
});
