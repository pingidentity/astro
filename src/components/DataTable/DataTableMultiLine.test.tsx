import React from 'react';
import ApplicationIcon from '@pingux/mdi-react/ApplicationIcon';
import { render, screen } from '@testing-library/react';

import { DataTableMultiLine } from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const cell = [{ name: 'Acme', icon: ApplicationIcon, accountId: 123 }];

const getComponent = props => render(
  <DataTableMultiLine {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <DataTableMultiLine cell={cell} {...props} />,
});

test('renders component with account name', () => {
  getComponent({ cell });
  expect(screen.queryByText('Acme')).toBeInTheDocument();
});
