import React from 'react';
import FilterIcon from '@pingux/mdi-react/FilterIcon';

import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import CollapsiblePanelItem from './CollapsiblePanelItem';

const testId = 'collapsible-panel-item';
const iconId = 'collapsible-panel-data-icon';
const defaultProps = {
  text: 'Item name',
};
const getComponent = (props = {}) => render(
  <CollapsiblePanelItem {...defaultProps} {...props} />,
);

afterEach(() => {
  jest.restoreAllMocks();
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <CollapsiblePanelItem {...props} /> });

test('default collapsiblePanel', () => {
  getComponent();
  const collapsiblePanelItem = screen.getByTestId(testId);
  const icon = screen.queryByTestId(iconId);

  expect(icon).not.toBeInTheDocument();
  expect(collapsiblePanelItem).toBeInTheDocument();
});

test('icon button displays when icon prop is present', () => {
  getComponent({ icon: FilterIcon });
  const icon = screen.getByTestId(iconId);
  expect(icon).toBeInTheDocument();
  expect(icon.parentElement).toBeInstanceOf(HTMLButtonElement);
});

test('icon displays when icon prop is present and default selected', () => {
  getComponent({ icon: FilterIcon, isDefaultSelected: true });
  const icon = screen.getByTestId(iconId);
  expect(icon).toBeInTheDocument();
  expect(icon.parentElement).not.toBeInstanceOf(HTMLButtonElement);
});
