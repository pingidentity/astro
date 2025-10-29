import React from 'react';

import { LoaderProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Loader from '.';

const testId = 'test-loader';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props: LoaderProps = {}) => render((
  <Loader {...defaultProps} {...props} />
));

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Loader {...defaultProps} {...props} /> });

test('default loader', () => {
  getComponent();
  const loader = screen.getByRole('alert');
  expect(loader).toHaveAttribute('data-testid', testId);
  expect(loader).toBeInTheDocument();
});
