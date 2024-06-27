import React from 'react';

import { Grid } from '../../index';
import { GridProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const defaultProps = {
  'data-testid': 'grid',
};

const getComponent = (props: GridProps = {}) => render(<Grid {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Grid {...defaultProps} {...props} /> });

test('renders Grid component', () => {
  getComponent();
  expect(screen.getByTestId('grid')).toBeInTheDocument();
});
