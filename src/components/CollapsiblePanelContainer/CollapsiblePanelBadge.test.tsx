import React from 'react';

import { CollapsiblePanelBadgeProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import CollapsiblePanelBadge from './CollapsiblePanelBadge';

const testId = 'test-collapsiblePanelBadge';
const defaultProps = {
  'data-testid': testId,
  selectedFilterCount: 9,
};
const getComponent = (props: CollapsiblePanelBadgeProps = {}) => render(
  <CollapsiblePanelBadge {...defaultProps} {...props} />,
);

afterEach(() => {
  jest.restoreAllMocks();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <CollapsiblePanelBadge {...defaultProps} {...props} />,
});

test('default CollapsiblePanelBadge', () => {
  getComponent();
  const collapsiblePanelBadge = screen.getByTestId(testId);
  expect(collapsiblePanelBadge).toBeInTheDocument();
});

test('custom classname can be passed', () => {
  getComponent({ className: 'testing-class' });
  const collapsiblePanelBadge = screen.getByTestId(testId);
  expect(collapsiblePanelBadge).toHaveClass('testing-class');
});

test('Filter count is passed', () => {
  getComponent({ selectedFilterCount: 5 });
  const collapsiblePanelBadge = screen.getByTestId(testId);
  expect(collapsiblePanelBadge).toHaveTextContent('5');
});
