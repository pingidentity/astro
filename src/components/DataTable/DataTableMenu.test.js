import React from 'react';
import { render, screen } from '@testing-library/react';

import { DataTableMenu } from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const getComponent = () => render(
  <DataTableMenu />,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <DataTableMenu {...props} /> });

test('renders component with menu', () => {
  getComponent();
  expect(screen.getByLabelText('row menu')).toBeInTheDocument();
});
