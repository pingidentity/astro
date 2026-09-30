import React from 'react';
import userEvent from '@testing-library/user-event';

import onyxTheme from '../../styles/themes/next-gen';
import { EmptyStateProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import EmptyState from '.';

const CustomIcon = () => <svg data-testid="custom-icon" />;

const defaultProps: EmptyStateProps = {};

// EmptyState is an Onyx-only component, so it is tested under the Onyx theme.
const getComponent = (props: Partial<EmptyStateProps> = {}) => render(
  <EmptyState {...defaultProps} {...props} />,
  { providerTheme: onyxTheme },
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <EmptyState {...defaultProps} {...props} />,
});

test('renders default heading', () => {
  getComponent();
  expect(screen.getByText('No items exist')).toBeInTheDocument();
});

test('renders default icon with an accessible title', () => {
  getComponent();
  expect(screen.getByTitle('Empty state icon')).toBeInTheDocument();
});

test('does not render a description by default', () => {
  getComponent();
  expect(screen.queryByText(/Take action/)).not.toBeInTheDocument();
});

test('does not render a button by default', () => {
  getComponent();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders a custom heading', () => {
  getComponent({ heading: 'No results found' });
  expect(screen.getByText('No results found')).toBeInTheDocument();
  expect(screen.queryByText('No items exist')).not.toBeInTheDocument();
});

test('renders a custom description when provided', () => {
  getComponent({ description: 'Try a different query.' });
  expect(screen.getByText('Try a different query.')).toBeInTheDocument();
});

test('renders a custom icon when provided', () => {
  getComponent({ icon: CustomIcon });
  expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  expect(screen.queryByTitle('Empty state icon')).not.toBeInTheDocument();
});

test('does not render the button when only buttonLabel is provided', () => {
  getComponent({ buttonLabel: 'Add Item' });
  expect(screen.queryByRole('button', { name: /Add Item/i })).not.toBeInTheDocument();
});

test('does not render the button when only onButtonPress is provided', () => {
  getComponent({ onButtonPress: jest.fn() });
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders the button when buttonLabel and onButtonPress are provided', async () => {
  const onButtonPress = jest.fn();
  getComponent({ buttonLabel: 'Add Item', onButtonPress });
  const button = screen.getByRole('button', { name: /Add Item/i });
  expect(button).toBeInTheDocument();
  await userEvent.click(button);
  expect(onButtonPress).toHaveBeenCalledTimes(1);
});

test('buttonProps are spread onto the underlying button', () => {
  getComponent({
    buttonLabel: 'Add Item',
    onButtonPress: jest.fn(),
    buttonProps: { 'data-testid': 'custom-button' },
  });
  const button = screen.getByTestId('custom-button');
  expect(button).toHaveAttribute('type', 'button');
});

test('buttonProps override the default button props', () => {
  getComponent({
    buttonLabel: 'Add Item',
    onButtonPress: jest.fn(),
    buttonProps: { 'data-testid': 'custom-button', sx: { borderRadius: '0px' } },
  });
  expect(screen.getByTestId('custom-button')).toBeInTheDocument();
});

test('iconProps are spread onto the underlying icon', () => {
  getComponent({ iconProps: { 'data-testid': 'empty-state-icon' } });
  expect(screen.getByTestId('empty-state-icon')).toBeInTheDocument();
});

test('headerProps are spread onto the underlying heading Text', () => {
  getComponent({ headerProps: { 'data-testid': 'empty-state-heading' } });
  expect(screen.getByTestId('empty-state-heading')).toBeInTheDocument();
});

test('headerProps override the default heading variant', () => {
  getComponent({ headerProps: { variant: 'bodyStrong' } });
  expect(screen.getByText('No items exist')).toBeInTheDocument();
});

test('iconProps override the default icon title', () => {
  getComponent({ iconProps: { title: { name: 'Custom icon title' } } });
  expect(screen.getByTitle('Custom icon title')).toBeInTheDocument();
  expect(screen.queryByTitle('Empty state icon')).not.toBeInTheDocument();
});

test('renders custom children', () => {
  getComponent({ children: <a href="upgrade">Upgrade now</a> });
  expect(screen.getByRole('link', { name: /Upgrade now/i })).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('children take priority over the built-in button', () => {
  getComponent({
    children: <a href="upgrade">Upgrade now</a>,
    buttonLabel: 'Add Item',
    onButtonPress: jest.fn(),
  });
  expect(screen.getByRole('link', { name: /Upgrade now/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Add Item/i })).not.toBeInTheDocument();
});

test('spreads container props onto the root element', () => {
  getComponent({
    'data-testid': 'empty-container',
    id: 'empty-id',
    sx: { my: 'xl' },
  });
  const container = screen.getByTestId('empty-container');
  expect(container).toHaveAttribute('id', 'empty-id');
});
