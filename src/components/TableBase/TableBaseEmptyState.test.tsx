import React from 'react';
import { render, screen } from '@testing-library/react';

import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import TableBaseEmptyState from './TableBaseEmptyState';

universalComponentTests({
  renderComponent: props => <TableBaseEmptyState {...props} />,
});

test('renders default headerLabel', () => {
  render(<TableBaseEmptyState />);
  expect(screen.getByText('No items exist')).toBeInTheDocument();
});

test('renders default descriptionLabel', () => {
  render(<TableBaseEmptyState />);
  expect(screen.getByText('Take action by doing x, y, z')).toBeInTheDocument();
});

test('renders custom headerLabel', () => {
  render(<TableBaseEmptyState headerLabel="No results found" />);
  expect(screen.getByText('No results found')).toBeInTheDocument();
});

test('renders custom descriptionLabel', () => {
  render(<TableBaseEmptyState descriptionLabel="Try adjusting your filters." />);
  expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
});

test('does not render add button when addButtonLabel is not provided', () => {
  render(<TableBaseEmptyState />);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('does not render add button when action is not provided', () => {
  render(<TableBaseEmptyState addButtonLabel="Add Item" />);
  expect(screen.queryByRole('button', { name: /Add Item/i })).not.toBeInTheDocument();
});

test('renders add button when addButtonLabel and action are provided', () => {
  render(<TableBaseEmptyState addButtonLabel="Add Item" onAddButtonPress={jest.fn()} />);
  expect(screen.getByRole('button', { name: /Add Item/i })).toBeInTheDocument();
});
