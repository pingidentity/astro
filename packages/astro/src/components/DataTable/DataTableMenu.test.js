import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTableMenu } from '../../index';

const getComponent = () => render(
  <DataTableMenu />,
);

test('renders component with menu', () => {
  getComponent();
  expect(screen.getByLabelText('row menu')).toBeInTheDocument();
});
