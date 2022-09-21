import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicationIcon from 'mdi-react/ApplicationIcon';
import { DataTableMultiLine } from '../../index';

const getComponent = (props = {}) => render(
  <DataTableMultiLine {...props} />,
);

test('renders component with account name', () => {
  const cell = [{ name: 'Acme', icon: ApplicationIcon, accountId: 123 }];

  getComponent({ cell });
  expect(screen.queryByText('Acme')).toBeInTheDocument();
});
