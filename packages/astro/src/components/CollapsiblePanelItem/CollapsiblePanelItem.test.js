import React from 'react';
import FilterIcon from '@pingux/mdi-react/FilterIcon';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

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

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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
