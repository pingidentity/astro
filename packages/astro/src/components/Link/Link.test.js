import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Link from '.';
import theme from '../../styles/theme';

const testId = 'test-link';
const defaultProps = {
  'data-testid': testId,
  children: 'This is a link',
};
const getComponent = (props = {}) => render(<Link {...defaultProps} {...props} />);

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
  expect(link).not.toHaveStyle({ textDecoration: 'underline' });

  userEvent.hover(link);
  expect(link).toHaveClass('is-hovered');
  expect(link).toHaveStyle({ textDecoration: 'underline' });
  userEvent.unhover(link);
});

test('link shows focus status', () => {
  // Needs href to have a tabindex
  getComponent({ href: 'blah' });
  const link = screen.getByTestId(testId);
  expect(link).not.toHaveFocus();
  expect(link).not.toHaveStyle({ textDecoration: 'underline' });

  userEvent.tab();
  expect(link).toHaveFocus();
  expect(link).toHaveClass('is-focused');
  expect(link).toHaveStyle({ color: theme.colors.active });
  expect(link).toHaveStyle({ textDecoration: 'underline' });
});

test('link shows disabled status', () => {
  // Needs href to have a tabindex
  getComponent({ href: 'blah', isDisabled: true });
  const link = screen.getByTestId(testId);

  expect(link).toHaveClass('is-disabled');
  expect(link).toHaveStyle({ opacity: 0.5, pointerEvents: 'none' });
});
