import React from 'react';
import { render, screen } from '@testing-library/react';
import Separator from './Separator';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
};

const getComponent = (props = {}) => render(
  <Separator {...defaultProps} {...props} />,
);

test('renders Separator component', () => {
  getComponent();
  const separator = screen.getByTestId(testId);
  screen.getByRole('separator');
  expect(separator).toBeInstanceOf(HTMLDivElement);
  expect(separator).toBeInTheDocument();
});

test('renders correct styles with horizontal prop', () => {
  getComponent({ orientation: 'horizontal' });
  const separator = screen.getByTestId(testId);
  expect(separator).toHaveStyleRule('width', '100%');
  expect(separator).toHaveStyleRule('height', '1px');
});

test('renders correct styles with vertical prop', () => {
  getComponent({ orientation: 'vertical' });
  const separator = screen.getByTestId(testId);
  expect(separator).toHaveStyleRule('width', '1px');
  expect(separator).toHaveStyleRule('height', '100%');
});
