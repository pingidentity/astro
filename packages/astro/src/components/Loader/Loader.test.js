import React from 'react';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Loader from '.';

const testId = 'test-loader';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render((
  <Loader {...defaultProps} {...props} />
));

test('default loader', () => {
  getComponent();
  const loader = screen.getByRole('progressbar');
  expect(loader).toHaveAttribute('data-testid', testId);
  expect(loader).toBeInTheDocument();
});
