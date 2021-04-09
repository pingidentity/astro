import React from 'react';
import { render, screen } from '../../utils/testUtils/testWrapper';
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
  expect(separator).toHaveStyle({ width: '100%' });
  expect(separator).toHaveStyle({ height: '1px' });
});

test('renders correct styles with vertical prop', () => {
  getComponent({ orientation: 'vertical' });
  const separator = screen.getByTestId(testId);
  expect(separator).toHaveStyle({ width: '1px' });
  expect(separator).toHaveStyle({ height: '100%' });
});
