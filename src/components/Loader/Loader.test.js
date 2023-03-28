import React from 'react';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import Loader from '.';

const testId = 'test-loader';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render((
  <Loader {...defaultProps} {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default loader', () => {
  getComponent();
  const loader = screen.getByRole('alert');
  expect(loader).toHaveAttribute('data-testid', testId);
  expect(loader).toBeInTheDocument();
});
