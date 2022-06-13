import React from 'react';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import CollapsiblePanelContainer from './CollapsiblePanelContainer';

const testId = 'test-collapsiblePanelContainer';
const collapsiblePanelBadgeId = 'collapsible-panel-badge';
const collapsiblePanelButtonId = 'collapsible-panel-button';
const collapsiblePanelId = 'collapsible-panel';

const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <CollapsiblePanelContainer {...defaultProps} {...props}>
    <div data-testid={collapsiblePanelId} />
  </CollapsiblePanelContainer>,
);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default CollapsiblePanelContainer', () => {
  getComponent();
  const collapsiblePanelContainer = screen.getByTestId(testId);
  expect(collapsiblePanelContainer).toBeInTheDocument();
});

test('custom classname can be passed', () => {
  getComponent({ className: 'testing-class' });
  const collapsiblePanelContainer = screen.getByTestId(testId);
  expect(collapsiblePanelContainer).toHaveClass('testing-class');
});

test('shows badge when container is closed', () => {
  getComponent({ selectedFilterCount: 9, state: { isOpen: false } });
  const badge = screen.getByTestId(collapsiblePanelBadgeId);

  expect(badge).toBeInTheDocument();
});

test('updates aria label when button is clicked', () => {
  const state = { isOpen: true };
  getComponent({ state });
  const button = screen.getByTestId(collapsiblePanelButtonId);
  const container = screen.getByTestId(testId);

  userEvent.click(button);

  expect(button).toHaveAttribute('aria-label', 'Close filter menu?');
  expect(container).toHaveClass('is-open');

  userEvent.click(button);
  expect(button).toHaveAttribute('aria-label', 'Open filter menu?');
  expect(container).not.toHaveClass('is-open');
});

test('shows children when isOpen is true', () => {
  getComponent({ isOpen: true });

  const collapsiblePanel = screen.getByTestId(collapsiblePanelId);
  expect(collapsiblePanel).toBeInTheDocument();
});

test('should hide children when pressing the escape key', () => {
  getComponent();
  const button = screen.getByTestId(collapsiblePanelButtonId);
  const container = screen.getByTestId(testId);

  userEvent.click(button);

  expect(container).toHaveClass('is-open');
  userEvent.type(button, '{esc}');
  expect(container).not.toHaveClass('is-open');
});
