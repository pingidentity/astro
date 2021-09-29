import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '.';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-input';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<Input {...defaultProps} {...props} />);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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
