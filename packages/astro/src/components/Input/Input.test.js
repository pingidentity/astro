import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '.';

const testId = 'test-input';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<Input {...defaultProps} {...props} />);

test('default input', () => {
  getComponent();
  const input = screen.getByTestId(testId);
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(input).toBeInTheDocument();
});

test('input type as password', () => {
  getComponent({ type: 'password' });
  const input = screen.getByTestId(testId);
  expect(input).toHaveAttribute('type', 'password');
});
