import React from 'react';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import MultiselectListContainer from './MultiselectListContainer';

const testId = 'test-multiselectListContainer';
const multiselectListBadgeId = 'multiselect-list-badge';
const multiselectListButtonId = 'multiselect-list-button';
const multiselectFilterId = 'multiselect-filter';

const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <MultiselectListContainer {...defaultProps} {...props}>
    <div data-testid={multiselectFilterId} />
  </MultiselectListContainer>,
);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default MultiselectListContainer', () => {
  getComponent();
  const multiselectListContainer = screen.getByTestId(testId);
  expect(multiselectListContainer).toBeInTheDocument();
});

test('custom classname can be passed', () => {
  getComponent({ className: 'testing-class' });
  const multiselectListContainer = screen.getByTestId(testId);
  expect(multiselectListContainer).toHaveClass('testing-class');
});

test('shows badge when container is closed', () => {
  getComponent({ selectedFilterCount: 9, state: { isOpen: false } });
  const badge = screen.getByTestId(multiselectListBadgeId);

  expect(badge).toBeInTheDocument();
});

test('updates aria label when button is clicked', () => {
  const state = { isOpen: true };
  getComponent({ state });
  const button = screen.getByTestId(multiselectListButtonId);

  userEvent.click(button);
  const multiSelect = screen.queryByTestId(multiselectFilterId);

  expect(button).toHaveAttribute('aria-label', 'Close filter menu?');
  expect(multiSelect).toBeInTheDocument();

  userEvent.click(button);
  expect(button).toHaveAttribute('aria-label', 'Open filter menu?');
  expect(multiSelect).not.toBeInTheDocument();
});

test('shows children when isOpen is true', () => {
  getComponent({ isOpen: true });

  const multiselectFilter = screen.getByTestId(multiselectFilterId);
  expect(multiselectFilter).toBeInTheDocument();
});

test('should hide children when pressing the escape key', () => {
  getComponent();
  const button = screen.getByTestId(multiselectListButtonId);
  userEvent.click(button);

  const multiSelect = screen.queryByTestId(multiselectFilterId);

  expect(multiSelect).toBeInTheDocument();
  userEvent.type(button, '{esc}');
  expect(multiSelect).not.toBeInTheDocument();
});
