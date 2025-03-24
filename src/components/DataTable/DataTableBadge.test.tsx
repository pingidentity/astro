import React from 'react';
import { render, screen } from '@testing-library/react';

import { DataTableBadge } from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const getComponent = (props = {}) => render(
  <DataTableBadge {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <DataTableBadge {...props} /> });

test('renders component with rejected label', () => {
  const cell = 'Rejected';

  getComponent({ cell });
  expect(screen.queryByText('Rejected')).toBeInTheDocument();
});

test('renders component with pending label', () => {
  const cell = 'Pending';

  getComponent({ cell });
  expect(screen.queryByText('Pending')).toBeInTheDocument();
});

test('renders component with failed label', () => {
  const cell = 'Failed';

  getComponent({ cell });
  expect(screen.queryByText('Failed')).toBeInTheDocument();
});

test('renders component with null cell', () => {
  const cell = null;

  getComponent({ cell });
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});
