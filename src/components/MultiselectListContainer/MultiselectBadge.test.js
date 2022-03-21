import React from 'react';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import MultiselectBadge from './MultiselectBadge';

const testId = 'test-multiselectBadge';
const defaultProps = {
  'data-testid': testId,
  selectedFilterCount: 9,
};
const getComponent = (props = {}) => render(
  <MultiselectBadge {...defaultProps} {...props} />,
);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default multiselectBadge', () => {
  getComponent();
  const multiselectBadge = screen.getByTestId(testId);
  expect(multiselectBadge).toBeInTheDocument();
});

test('custom classname can be passed', () => {
  getComponent({ className: 'testing-class' });
  const multiselectBadge = screen.getByTestId(testId);
  expect(multiselectBadge).toHaveClass('testing-class');
});
