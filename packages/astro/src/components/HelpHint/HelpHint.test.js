import React from 'react';
import userEvent from '@testing-library/user-event';

import axeTest from '../../utils/testUtils/testAxe';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import HelpHint from './HelpHint';

const testId = 'help-hint__button';
const tooltipValue = 'Some text';

const defaultProps = {
  children: tooltipValue,
};

const getComponent = (props = {}) => render(
  <HelpHint {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders HelpHint component', () => {
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  expect(helpHintButton).toBeInTheDocument();
});

test('shows tooltip on hover', () => {
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  expect(screen.queryByText(tooltipValue)).not.toBeInTheDocument();
  fireEvent.mouseMove(helpHintButton);
  fireEvent.mouseEnter(helpHintButton);
  const tooltip = screen.getByRole('tooltip');
  const tooltipId = tooltip.getAttribute('id');
  expect(tooltip).toBeInTheDocument();
  expect(helpHintButton).toHaveAttribute('aria-describedby', tooltipId);
});

test('shows tooltip on focus', () => {
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  expect(screen.queryByText(tooltipValue)).not.toBeInTheDocument();
  userEvent.tab();
  expect(helpHintButton).toHaveFocus();
  const tooltip = screen.getByRole('tooltip');
  const tooltipId = tooltip.getAttribute('id');
  expect(tooltip).toBeInTheDocument();
  expect(helpHintButton).toHaveAttribute('aria-describedby', tooltipId);
});

test('applies tooltipProps', () => {
  getComponent({ tooltipProps: { isOpen: true } });
  expect(screen.getByText(tooltipValue)).toBeInTheDocument();
});

test('applies iconButtonProps', () => {
  const newLabel = 'New label';
  getComponent({ iconButtonProps: { 'aria-label': newLabel } });
  expect(screen.getByLabelText(newLabel)).toBeInTheDocument();
});
