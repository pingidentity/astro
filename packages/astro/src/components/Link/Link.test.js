import React from 'react';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Link from '.';

const testId = 'test-link';
const defaultProps = {
  'data-testid': testId,
  children: 'This is a link',
};
const getComponent = (props = {}) => render(<Link {...defaultProps} {...props} />);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('a link is rendered', () => {
  getComponent();
  const link = screen.getByTestId(testId);
  expect(link).toBeInstanceOf(HTMLAnchorElement);
  expect(link).toBeInTheDocument();
});

test('link shows hover status', () => {
  // Needs href to have a tabindex
  getComponent();
  const link = screen.getByTestId(testId);
  expect(link).not.toHaveClass('is-hovered');
  userEvent.hover(link);
  expect(link).toHaveClass('is-hovered');
  userEvent.unhover(link);
});

test('link shows focus status', () => {
  // Needs href to have a tabindex
  getComponent({ href: 'blah' });
  const link = screen.getByTestId(testId);
  expect(link).not.toHaveFocus();
  userEvent.tab();
  expect(link).toHaveFocus();
  expect(link).toHaveClass('is-focused');
  userEvent.tab();
  expect(link).not.toHaveFocus();
  expect(link).not.toHaveClass('is-focused');
});

test('link shows disabled status', () => {
  // Needs href to have a tabindex
  getComponent({ href: 'blah', isDisabled: true });
  const link = screen.getByTestId(testId);
  expect(link).toHaveClass('is-disabled');
});
