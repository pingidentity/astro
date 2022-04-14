import React from 'react';
import FilterIcon from 'mdi-react/FilterIcon';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import MultiselectFilterItem from './MultiselectFilterItem';

const testId = 'multiselect-filter-item';
const iconId = 'multiselect-filter-data-icon';
const defaultProps = {
  text: 'Item name',
};
const getComponent = (props = {}) => render(
  <MultiselectFilterItem {...defaultProps} {...props} />,
);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default multiselectFilter', () => {
  getComponent();
  const multiselectFilterItem = screen.getByTestId(testId);
  const icon = screen.queryByTestId(iconId);

  expect(icon).not.toBeInTheDocument();
  expect(multiselectFilterItem).toBeInTheDocument();
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
