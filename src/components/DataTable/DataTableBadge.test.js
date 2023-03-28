import React from 'react';
import { render, screen } from '@testing-library/react';

import { DataTableBadge } from '../../index';

const getComponent = (props = {}) => render(
  <DataTableBadge {...props} />,
);

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
