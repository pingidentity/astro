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
