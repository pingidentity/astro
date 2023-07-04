import React from 'react';
import ApplicationIcon from '@pingux/mdi-react/ApplicationIcon';
import { render, screen } from '@testing-library/react';

import { DataTableMultiLine } from '../../index';

const getComponent = (props = {}) => render(
  <DataTableMultiLine {...props} />,
);

test('renders component with account name', () => {
  const cell = [{ name: 'Acme', icon: ApplicationIcon, accountId: 123 }];

  getComponent({ cell });
  expect(screen.queryByText('Acme')).toBeInTheDocument();
});
