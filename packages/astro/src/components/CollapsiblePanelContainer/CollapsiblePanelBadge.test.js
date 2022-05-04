import React from 'react';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import CollapsiblePanelBadge from './CollapsiblePanelBadge';

const testId = 'test-collapsiblePanelBadge';
const defaultProps = {
  'data-testid': testId,
  selectedFilterCount: 9,
};
const getComponent = (props = {}) => render(
  <CollapsiblePanelBadge {...defaultProps} {...props} />,
);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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
